import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosClient from '../../api/axiosClient';

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 1128, // Mock data
        orders: 0,
        revenue: 0
    });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/adorders');
                const orders = Array.isArray(response.data) ? response.data : [];

                // Calculate Stats
                const totalOrders = orders.length;
                const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);

                // Process Chart Data (Revenue by Date)
                const revenueMap = {};
                orders.forEach(order => {
                    if (order.createdTime) {
                        try {
                            const date = new Date(order.createdTime).toISOString().split('T')[0];
                            revenueMap[date] = (revenueMap[date] || 0) + (Number(order.totalPrice) || 0);
                        } catch (e) {
                            console.error("Date parse error", e);
                        }
                    }
                });

                const data = Object.keys(revenueMap).map(date => ({
                    date,
                    revenue: revenueMap[date]
                })).sort((a, b) => new Date(a.date) - new Date(b.date));

                setChartData(data);
                setStats(prev => ({
                    ...prev,
                    orders: totalOrders,
                    revenue: totalRevenue
                }));
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Dashboard Overview</h2>

            {/* Statistics Cards */}
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={8}>
                    <Card bordered={false} style={{ background: '#e6f7ff', borderRadius: '8px' }}>
                        <Statistic
                            title="Total Users"
                            value={stats.users}
                            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} style={{ background: '#fff7e6', borderRadius: '8px' }}>
                        <Statistic
                            title="Total Orders"
                            value={stats.orders}
                            prefix={<ShoppingCartOutlined style={{ color: '#fa8c16' }} />}
                            valueStyle={{ color: '#fa8c16' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} style={{ background: '#f6ffed', borderRadius: '8px' }}>
                        <Statistic
                            title="Total Revenue"
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
                    <Card title="Revenue Analytics" bordered={false} style={{ borderRadius: '8px' }}>
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <BarChart
                                    data={chartData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                                    <Legend />
                                    <Bar dataKey="revenue" name="Revenue (VNĐ)" fill="#1890ff" />
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
