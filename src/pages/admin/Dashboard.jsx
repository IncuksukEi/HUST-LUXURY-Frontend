import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, message } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, RiseOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosClient from '../../api/axiosClient';

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        orders: 0,
        revenue: 0,
        soldProducts: 0
    });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // 1. Gọi các API thống kê từ AnalyticsController
                const [usersRes, ordersRes, productsRes, monthlySalesRes] = await Promise.all([
                    axiosClient.get('/analytics/unique-customers'),
                    axiosClient.get('/analytics/total-orders'),
                    axiosClient.get('/analytics/total-quantity'),
                    axiosClient.get('/analytics/monthly-sales?year=' + new Date().getFullYear()) // Lấy năm hiện tại
                ]);

                // 2. Cập nhật Stats Cards
                // Lưu ý: Backend trả về Map<String, Long> nên cần truy cập đúng key
                setStats({
                    users: usersRes.data.customerCount || 0,
                    orders: ordersRes.data.orderCount || 0,
                    soldProducts: productsRes.data.totalQuantitySold || 0,
                    // Do AnalyticsController chưa có API total-revenue riêng lẻ, 
                    // ta có thể tính tổng từ monthlySales hoặc gọi API orders cũ.
                    // Tạm thời tính tổng từ biểu đồ doanh thu tháng để đồng bộ.
                    revenue: (monthlySalesRes.data || []).reduce((acc, curr) => acc + (curr.totalSales || 0), 0)
                });

                // 3. Cập nhật Dữ liệu Biểu đồ (Monthly Sales)
                const salesData = monthlySalesRes.data || [];
                
                // Format lại dữ liệu cho Recharts
                const formattedChartData = salesData.map(item => ({
                    name: `Tháng ${item.month}`,
                    revenue: item.totalSales
                }));

                setChartData(formattedChartData);

            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                // Fallback: Nếu API analytics lỗi, thử dùng logic cũ (Daily) nhưng sửa tên biến
                fetchFallbackData();
            }
        };

        // Hàm Fallback dùng logic cũ của bạn (đã sửa lỗi createdTime -> orderTime)
        const fetchFallbackData = async () => {
            try {
                const response = await axiosClient.get('/adorders');
                const orders = Array.isArray(response.data) ? response.data : [];

                const totalOrders = orders.length;
                const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);
                
                // Logic cũ: Doanh thu theo ngày
                const revenueMap = {};
                orders.forEach(order => {
                    // [SỬA LỖI QUAN TRỌNG]: Đổi createdTime -> orderTime
                    if (order.orderTime) { 
                        try {
                            const date = new Date(order.orderTime).toISOString().split('T')[0];
                            revenueMap[date] = (revenueMap[date] || 0) + (Number(order.totalPrice) || 0);
                        } catch (e) {
                            console.error("Date parse error", e);
                        }
                    }
                });

                const data = Object.keys(revenueMap).map(date => ({
                    name: date, // Đổi key thành 'name' cho thống nhất
                    revenue: revenueMap[date]
                })).sort((a, b) => new Date(a.name) - new Date(b.name));

                setChartData(data);
                setStats(prev => ({ ...prev, orders: totalOrders, revenue: totalRevenue }));
            } catch (err) {
                console.error("Fallback fetch failed", err);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Tổng quan (Dashboard)</h2>

            {/* Statistics Cards */}
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#e6f7ff', borderRadius: '8px' }}>
                        <Statistic
                            title="Tổng khách hàng"
                            value={stats.users}
                            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#fff7e6', borderRadius: '8px' }}>
                        <Statistic
                            title="Tổng đơn hàng"
                            value={stats.orders}
                            prefix={<ShoppingCartOutlined style={{ color: '#fa8c16' }} />}
                            valueStyle={{ color: '#fa8c16' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#f9f0ff', borderRadius: '8px' }}>
                        <Statistic
                            title="Sản phẩm đã bán"
                            value={stats.soldProducts}
                            prefix={<RiseOutlined style={{ color: '#722ed1' }} />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#f6ffed', borderRadius: '8px' }}>
                        <Statistic
                            title="Tổng doanh thu"
                            value={stats.revenue}
                            precision={0}
                            prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
                            suffix="VNĐ"
                            valueStyle={{ color: '#52c41a' }}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Biểu đồ doanh thu (Theo tháng)" bordered={false} style={{ borderRadius: '8px' }}>
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip 
                                        formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} 
                                    />
                                    <Legend />
                                    <Bar dataKey="revenue" name="Doanh thu (VNĐ)" fill="#1890ff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;