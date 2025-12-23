import { useEffect, useState } from 'react';
import { Table, Button, Space, message, Image, Modal, Form, Input, InputNumber, Popconfirm } from 'antd';
import axiosClient from '../../api/axiosClient';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/admin/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            // message.error("Failed to fetch products."); // Optional: Don't show error on 404/empty
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAdd = () => {
        setEditingProduct(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setEditingProduct(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`/admin/products/${id}`);
            message.success('Deleted product successfully');
            fetchProducts();
        } catch (error) {
            console.error("Delete failed:", error);
            message.error("Failed to delete product");
        }
    };

    const handleOk = () => {
        form.validateFields().then(async (values) => {
            try {
                if (editingProduct) {
                    // Update
                    await axiosClient.put(`/admin/products/${editingProduct.productId}`, values);
                    message.success('Product updated successfully');
                } else {
                    // Create
                    await axiosClient.post('/admin/products', values);
                    message.success('Product created successfully');
                }
                setIsModalOpen(false);
                fetchProducts();
            } catch (error) {
                console.error("Save failed:", error);
                message.error("Failed to save product");
            }
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Valid',
            dataIndex: 'productId',
            key: 'productId',
            width: 70,
        },
        {
            title: 'Image',
            dataIndex: 'urlImg',
            key: 'urlImg',
            render: (url) => <Image width={50} src={url || "https://via.placeholder.com/50"} fallback="https://via.placeholder.com/50" />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price (VNĐ)',
            dataIndex: 'price',
            key: 'price',
            render: (price) => price?.toLocaleString(),
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" size="small" onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.productId)}>
                        <Button type="primary" danger size="small">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Product Management</h2>
                <Button type="primary" onClick={handleAdd}>Add Product</Button>
            </div>
            <Table
                columns={columns}
                dataSource={products}
                rowKey="productId"
                loading={loading}
            />

            <Modal title={editingProduct ? "Edit Product" : "Add Product"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="urlImg" label="Image URL">
                        <Input />
                    </Form.Item>
                    <Form.Item name="categoryId" label="Category ID" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    {/* Optional fields based on screenshot */}
                    <Form.Item name="category_id_uu_dai" label="Category Uu Dai ID">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="category_id_combo" label="Category Combo ID">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductManagement;
