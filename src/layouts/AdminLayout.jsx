import { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    DashboardOutlined,
    ShoppingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import axiosClient from '../api/axiosClient';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: <Link to="/admin">Dashboard</Link>,
        },
        {
            key: '/admin/products',
            icon: <ShoppingOutlined />,
            label: <Link to="/admin/products">Product Management</Link>,
        },
        {
            key: '/admin/orders',
            icon: <ShoppingOutlined />, // Reusing icon or import another one like FileTextOutlined
            label: <Link to="/admin/orders">Order Management</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', textAlign: 'center', color: 'white', lineHeight: '32px' }}>
                    {collapsed ? 'HL' : 'Hust Luxury'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/admin']}
                    selectedKeys={[location.pathname]}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff', display: 'flex', alignItems: 'center', paddingRight: 24 }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                        <Button onClick={() => navigate('/')}>Home</Button>
                        <Button type="primary" danger onClick={async () => {
                            try {
                                await axiosClient.post('/auth/logout');
                            } catch (e) {
                                console.error("Logout error", e);
                            }
                            localStorage.removeItem('token');
                            localStorage.removeItem('role');
                            navigate('/admin/login');
                        }}>Logout</Button>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
