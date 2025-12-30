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
            setOrders(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
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
            // [QUAN TRỌNG] Backend "updateOrder" yêu cầu đầy đủ thông tin để tái tạo lại order details.
            // Ta cần map dữ liệu từ selectedOrder sang đúng cấu trúc AdOrderRequestDTO.
            
            const payload = {
                orderId: selectedOrder.orderId,
                userId: selectedOrder.userId,
                phone: selectedOrder.phone,
                status: value, // Giá trị status mới
                orderAddress: selectedOrder.orderAddress,
                // Map lại danh sách sản phẩm để gửi về BE (quan trọng vì BE sẽ xóa và tạo lại)
                products: selectedOrder.products.map(p => ({
                    orderDetailId: p.orderDetailId, // Có thể null nếu tạo mới, nhưng đây là update
                    productId: p.productId,
                    quantity: p.quantity,
                    price: p.price,
                    name: p.name
                }))
            };

            await axiosClient.put(`/adorders/${selectedOrder.orderId}`, payload);
            message.success("Cập nhật trạng thái đơn hàng thành công");

            // Cập nhật lại state cục bộ để UI phản hồi ngay
            setSelectedOrder({ ...selectedOrder, status: value });
            // Tải lại danh sách
            fetchOrders();
        } catch (error) {
            console.error("Update failed", error);
            message.error("Cập nhật thất bại. Vui lòng kiểm tra lại.");
        } finally {
            setUpdating(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const columns = [
        { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
        { title: 'Khách hàng', dataIndex: 'fullName', key: 'fullName' },
        { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
        { title: 'Địa chỉ', dataIndex: 'orderAddress', key: 'orderAddress' },
        { 
            title: 'Tổng tiền', 
            dataIndex: 'totalPrice', 
            key: 'totalPrice',
            render: (price) => `${price?.toLocaleString()} VNĐ`,
        },
        { title: 'Thời gian', dataIndex: 'orderTime', key: 'orderTime' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'geekblue';
                // Map màu theo Enum của Backend
                if (status === 'RECEIVED') color = 'green';
                if (status === 'CANCELLED') color = 'volcano';
                if (status === 'PENDING') color = 'gold';
                if (status === 'SHIPPED') color = 'blue';
                return (
                    <Tag color={color} key={status}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleViewDetails(record.orderId)}>
                        Chi tiết
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h2 style={{ marginBottom: 16 }}>Quản lý đơn hàng (Order Management)</h2>
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="orderId"
                loading={loading}
            />

            <Modal
                title={`Chi tiết đơn hàng #${selectedOrder?.orderId}`}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="close" onClick={handleCancel}>Đóng</Button>
                ]}
                width={700}
            >
                {selectedOrder && (
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Card size="small" title="Thông tin khách hàng">
                            <Descriptions column={2}>
                                <Descriptions.Item label="Tên">{selectedOrder.fullName}</Descriptions.Item>
                                <Descriptions.Item label="SĐT">{selectedOrder.phone}</Descriptions.Item>
                                <Descriptions.Item label="Địa chỉ" span={2}>{selectedOrder.orderAddress}</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card size="small" title="Thông tin đơn hàng">
                            <Descriptions column={2}>
                                <Descriptions.Item label="Thời gian">{selectedOrder.orderTime}</Descriptions.Item>
                                <Descriptions.Item label="Tổng tiền">{selectedOrder.totalPrice?.toLocaleString()} VNĐ</Descriptions.Item>
                                <Descriptions.Item label="Trạng thái">
                                    <Select
                                        value={selectedOrder.status}
                                        style={{ width: 200 }}
                                        onChange={handleStatusChange}
                                        loading={updating}
                                    >
                                        {/* CÁC GIÁ TRỊ PHẢI KHỚP CHÍNH XÁC VỚI FILE Order.java (Enum) */}
                                        <Option value="PENDING">PENDING (Chờ xử lý)</Option>
                                        <Option value="CONFIRMED">CONFIRMED (Đã xác nhận)</Option>
                                        <Option value="SHIPPED">SHIPPED (Đang giao)</Option>
                                        <Option value="RECEIVED">RECEIVED (Đã nhận hàng)</Option>
                                        <Option value="CANCELLED">CANCELLED (Đã hủy)</Option>
                                    </Select>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card size="small" title="Danh sách sản phẩm">
                            <List
                                itemLayout="horizontal"
                                dataSource={selectedOrder.products}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.urlImg || "https://via.placeholder.com/50"} />}
                                            title={item.name}
                                            description={`Số lượng: ${item.quantity} | Đơn giá: ${item.price?.toLocaleString()} VNĐ`}
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