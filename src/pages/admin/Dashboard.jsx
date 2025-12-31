import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Spin, Empty, Alert } from 'antd';
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
    const [loading, setLoading] = useState(true);
    const [debugInfo, setDebugInfo] = useState(null); // Lưu thông tin lỗi để hiện lên màn hình

    useEffect(() => {
        const fetchAndDebugData = async () => {
            try {
                setLoading(true);
                console.clear();
                console.log("--- BẮT ĐẦU DEBUG API DASHBOARD ---");

                // 1. Gọi API
                const response = await axiosClient.get('/adorders');
                const allOrders = Array.isArray(response.data) ? response.data : [];
                
                console.log("1. Tổng số đơn hàng lấy về:", allOrders.length);
                console.log("2. Dữ liệu mẫu (đơn đầu tiên):", allOrders[0]);

                if (allOrders.length === 0) {
                    setDebugInfo("API trả về danh sách rỗng (0 đơn hàng). Vui lòng tạo đơn hàng mới để test.");
                    setLoading(false);
                    return;
                }

                // 3. Phân tích dữ liệu để tìm nguyên nhân lỗi
                const firstOrder = allOrders[0];
                const statusType = typeof firstOrder.status;
                const dateString = firstOrder.orderTime;

                console.log(`3. Kiểm tra kiểu dữ liệu: Status là '${statusType}', Date là '${dateString}'`);

                // --- XỬ LÝ LOGIC ---

                // Bước A: Lọc đơn hàng thành công
                // Lưu ý: So sánh status chính xác với Enum của Backend
                const successOrders = allOrders.filter(order => order.status === 'RECEIVED');
                
                console.log("4. Số đơn hàng có status 'RECEIVED':", successOrders.length);
                if (successOrders.length === 0) {
                    console.warn("-> CẢNH BÁO: Không có đơn hàng nào 'RECEIVED'. Doanh thu sẽ bằng 0.");
                }

                // Bước B: Tính toán chỉ số
                const totalRevenue = successOrders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);
                
                const totalSold = successOrders.reduce((sum, order) => {
                    if (Array.isArray(order.products)) {
                        return sum + order.products.reduce((q, item) => q + (item.quantity || 0), 0);
                    }
                    return sum;
                }, 0);

                const uniqueUsers = new Set(allOrders.map(o => o.userId).filter(id => id)).size;

                // Bước C: Xử lý biểu đồ (Fix lỗi ngày tháng)
                const monthlyData = Array.from({ length: 12 }, (_, index) => ({
                    month: index + 1,
                    name: `Tháng ${index + 1}`,
                    revenue: 0
                }));

                let dateParseError = false;

                successOrders.forEach(order => {
                    if (order.orderTime) {
                        // FIX LỖI DATE: Backend trả về "yyyy-MM-dd HH:mm:ss" (có dấu cách)
                        // Safari/Firefox sẽ lỗi, cần thay bằng "yyyy-MM-ddTHH:mm:ss"
                        let timeString = order.orderTime;
                        if (typeof timeString === 'string' && timeString.includes(' ')) {
                            timeString = timeString.replace(' ', 'T');
                        }

                        const date = new Date(timeString);
                        
                        if (isNaN(date.getTime())) {
                            dateParseError = true;
                            console.error("Lỗi parse ngày:", order.orderTime);
                        } else {
                            // Chỉ cộng tiền nếu cùng năm hiện tại
                            const currentYear = new Date().getFullYear();
                            if (date.getFullYear() === currentYear) {
                                const monthIndex = date.getMonth();
                                monthlyData[monthIndex].revenue += (Number(order.totalPrice) || 0);
                            }
                        }
                    }
                });

                if (dateParseError) {
                    setDebugInfo("Phát hiện lỗi định dạng ngày tháng. Đã cố gắng khắc phục.");
                } else if (successOrders.length === 0) {
                    setDebugInfo("Không có đơn hàng trạng thái 'RECEIVED'. Vui lòng chuyển trạng thái đơn hàng để thấy doanh thu.");
                }

                // 4. Cập nhật State
                setStats({
                    users: uniqueUsers,
                    orders: allOrders.length,
                    revenue: totalRevenue,
                    soldProducts: totalSold
                });
                setChartData(monthlyData);

            } catch (error) {
                console.error("Lỗi Fatal:", error);
                setDebugInfo("Lỗi gọi API: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAndDebugData();
    }, []);

    if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

    return (
        <div style={{ padding: 20 }}>
            <h2 style={{ marginBottom: '20px' }}>Tổng quan (Debug Mode)</h2>
            
            {/* Hiển thị thông báo debug nếu có vấn đề */}
            {debugInfo && (
                <Alert 
                    message="Thông tin kiểm tra" 
                    description={debugInfo} 
                    type="warning" 
                    showIcon 
                    style={{ marginBottom: 20 }} 
                />
            )}

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#e6f7ff', borderRadius: '8px' }}>
                        <Statistic
                            title="Khách hàng"
                            value={stats.users}
                            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#fff7e6', borderRadius: '8px' }}>
                        <Statistic
                            title="Tổng đơn (All)"
                            value={stats.orders}
                            prefix={<ShoppingCartOutlined style={{ color: '#fa8c16' }} />}
                            valueStyle={{ color: '#fa8c16' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#f9f0ff', borderRadius: '8px' }}>
                        <Statistic
                            title="Sản phẩm bán (Received)"
                            value={stats.soldProducts}
                            prefix={<RiseOutlined style={{ color: '#722ed1' }} />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} style={{ background: '#f6ffed', borderRadius: '8px' }}>
                        <Statistic
                            title="Doanh thu (Received)"
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

            <Row gutter={16}>
                <Col span={24}>
                    <Card title={`Biểu đồ doanh thu thực tế năm ${new Date().getFullYear()}`} bordered={false} style={{ borderRadius: '8px' }}>
                        <div style={{ width: '100%', height: 400 }}>
                            {stats.revenue > 0 ? (
                                <ResponsiveContainer>
                                    <BarChart
                                        data={chartData}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis tickFormatter={(value) => new Intl.NumberFormat('vi-VN', { notation: "compact", compactDisplay: "short" }).format(value)} />
                                        <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                                        <Legend />
                                        <Bar dataKey="revenue" name="Doanh thu" fill="#52c41a" barSize={50} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <Empty description="Chưa có dữ liệu doanh thu (Cần đơn hàng trạng thái RECEIVED)" />
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;