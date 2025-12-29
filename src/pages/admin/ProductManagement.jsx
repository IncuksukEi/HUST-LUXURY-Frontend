import { useEffect, useState } from 'react';
import { Table, Button, Space, message, Image, Modal, Form, Input, InputNumber, Popconfirm, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../api/axiosClient';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/admin/products');
            console.log("Product Data:", response.data);
            setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAdd = () => {
        setEditingProduct(null);
        setFileList([]);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setEditingProduct(record);
        setFileList([]); // Clear file list on edit open
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
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('price', values.price);
                formData.append('stock', values.stock);
                formData.append('categoryId', values.categoryId);

                if (values.description) formData.append('description', values.description);
                if (values.category_id_combo) formData.append('category_id_combo', values.category_id_combo);
                if (values.category_id_uu_dai) formData.append('category_id_uu_dai', values.category_id_uu_dai);
                if (values.materialId) formData.append('materialId', values.materialId);
                if (values.collectionId) formData.append('collectionId', values.collectionId);

                if (fileList.length > 0) {
                    formData.append('file', fileList[0].originFileObj);
                }

                if (editingProduct) {
                    // Update: POST /api/admin/products/update/{id}
                    await axiosClient.post(`/admin/products/update/${editingProduct.productId}`, formData);
                    message.success('Product updated successfully');
                } else {
                    // Create: POST /api/admin/products
                    await axiosClient.post('/admin/products', formData);
                    message.success('Product created successfully');
                }
                setIsModalOpen(false);
                fetchProducts();
            } catch (error) {
                console.error("Save failed:", error);
                if (error.response) {
                    console.log("Server Error Response:", error.response.data);
                    message.error(`Failed: ${error.response.data.message || error.response.statusText}`);
                } else {
                    message.error("Failed to save product");
                }
            }
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const beforeUpload = (file) => {
        return false; // Prevent auto upload
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

                    <Form.Item label="Image">
                        <Upload
                            listType="picture"
                            fileList={fileList}
                            onChange={onUploadChange}
                            beforeUpload={beforeUpload}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Select Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="categoryId" label="Category ID" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Form.Item name="materialId" label="Material ID" style={{ flex: 1 }}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="collectionId" label="Collection ID" style={{ flex: 1 }}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Form.Item name="category_id_uu_dai" label="Category Uu Dai ID" style={{ flex: 1 }}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="category_id_combo" label="Category Combo ID" style={{ flex: 1 }}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductManagement;
