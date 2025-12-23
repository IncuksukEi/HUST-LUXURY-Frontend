import { useEffect, useState } from 'react';
import { Table, Button, Space, message, Tag, Modal, Select, Card, Descriptions, List, Avatar } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import axiosClient from '../../api/axiosClient';

const { Option } = Select;

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updating, setUpdating] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/adorders');
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            // message.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleViewDetails = async (id) => {
        try {
            const response = await axiosClient.get(`/adorders/${id}`);
            setSelectedOrder(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Failed to fetch order details:", error);
            message.error("Failed to fetch order details");
        }
    };

    const handleStatusChange = async (value) => {
        if (!selectedOrder) return;
        setUpdating(true);
        try {
            // Construct the payload as per API screenshot requirements
            // Payload needs: orderId, userId, phone, status, orderAddress, products (list of objects)
            // We can just spread selectedOrder and overwrite status, assuming the backend handles the rest or ignores extra fields.
            // Based on screenshot 7.3, it sends quite a full object.

            const payload = {
                ...selectedOrder,
                status: value
            };

            await axiosClient.put(`/adorders/${selectedOrder.orderId}`, payload);
            message.success("Order status updated");

            // Update local state
            setSelectedOrder({ ...selectedOrder, status: value });
            // Refresh list
            fetchOrders();
        } catch (error) {
            console.error("Update failed", error);
            message.error("Failed to update status");
        } finally {
            setUpdating(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Customer',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'orderAddress',
            key: 'orderAddress',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => `${price?.toLocaleString()} VNĐ`,
        },
        {
            title: 'Time',
            dataIndex: 'orderTime',
            key: 'orderTime',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'geekblue';
                if (status === 'DELIVERED') color = 'green';
                if (status === 'CANCELLED') color = 'volcano';
                if (status === 'PENDING') color = 'gold';
                return (
                    <Tag color={color} key={status}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleViewDetails(record.orderId)}>
                        View
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h2 style={{ marginBottom: 16 }}>Order Management</h2>
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="orderId"
                loading={loading}
            />

            <Modal
                title={`Order Details #${selectedOrder?.orderId}`}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="close" onClick={handleCancel}>Close</Button>
                ]}
                width={700}
            >
                {selectedOrder && (
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Card size="small" title="Customer Info">
                            <Descriptions column={2}>
                                <Descriptions.Item label="Name">{selectedOrder.fullName}</Descriptions.Item>
                                <Descriptions.Item label="Phone">{selectedOrder.phone}</Descriptions.Item>
                                <Descriptions.Item label="Address" span={2}>{selectedOrder.orderAddress}</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card size="small" title="Order Info">
                            <Descriptions column={2}>
                                <Descriptions.Item label="Time">{selectedOrder.orderTime}</Descriptions.Item>
                                <Descriptions.Item label="Total">{selectedOrder.totalPrice?.toLocaleString()} VNĐ</Descriptions.Item>
                                <Descriptions.Item label="Status">
                                    <Select
                                        defaultValue={selectedOrder.status}
                                        style={{ width: 150 }}
                                        onChange={handleStatusChange}
                                        loading={updating}
                                    >
                                        <Option value="PENDING">PENDING</Option>
                                        <Option value="CONFIRMED">CONFIRMED</Option>
                                        <Option value="SHIPPING">SHIPPING</Option>
                                        <Option value="DELIVERED">DELIVERED</Option>
                                        <Option value="CANCELLED">CANCELLED</Option>
                                    </Select>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card size="small" title="Products">
                            <List
                                itemLayout="horizontal"
                                dataSource={selectedOrder.products}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.urlImg || "https://via.placeholder.com/50"} />} // Assuming product has urlImg
                                            title={item.name}
                                            description={`Quantity: ${item.quantity} | Price: ${item.price?.toLocaleString()} VNĐ`}
                                        />
                                        <div>{(item.price * item.quantity).toLocaleString()} VNĐ</div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Space>
                )}
            </Modal>
        </div>
    );
};

export default OrderManagement;
