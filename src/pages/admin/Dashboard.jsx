import { Card, Col, Row, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';

const Dashboard = () => {
    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Dashboard Overview</h2>
            <Row gutter={16}>
                <Col span={8}>
                    <Card bordered={false} style={{ background: '#e6f7ff', borderRadius: '8px' }}>
                        <Statistic
                            title="Total Users"
                            value={1128}
                            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} style={{ background: '#fff7e6', borderRadius: '8px' }}>
                        <Statistic
                            title="Total Orders"
                            value={93}
                            prefix={<ShoppingCartOutlined style={{ color: '#fa8c16' }} />}
                            valueStyle={{ color: '#fa8c16' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} style={{ background: '#f6ffed', borderRadius: '8px' }}>
                        <Statistic
                            title="Revenue"
                            value={112893}
                            precision={2}
                            prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
                            suffix="VNĐ"
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
