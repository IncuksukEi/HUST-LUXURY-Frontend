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
            setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            message.error("Failed to fetch products");
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

    // --- 1. SỬA HÀM EDIT: Map dữ liệu cũ từ Backend vào Form mới ---
    const handleEdit = (record) => {
        setEditingProduct(record);
        setFileList([]); 
        
        // Logic: Lấy giá trị từ trường cũ (Backend) gán vào trường mới (Frontend)
        // Lưu ý: Kiểm tra kỹ tên biến backend trả về (thường là snake_case hoặc camelCase tùy cấu hình)
        const formValues = {
            ...record,
            // Map Combo -> Collection
            collectionId: record.category_id_combo || record.categoryIdCombo, 
            // Map UuDai -> Material
            materialId: record.category_id_uu_dai || record.categoryIdUuDai
        };
        
        form.setFieldsValue(formValues);
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

    // --- 2. SỬA HÀM SAVE: Map dữ liệu Form mới về lại trường cũ của Backend ---
    const handleOk = () => {
        form.validateFields().then(async (values) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('price', values.price);
                formData.append('stock', values.stock);
                formData.append('categoryId', values.categoryId);

                if (values.description) formData.append('description', values.description);

                // --- QUAN TRỌNG: Map ngược lại để gửi về Backend ---
                // Lấy Collection ID gửi vào category_id_combo
                if (values.collectionId) {
                    formData.append('category_id_combo', values.collectionId);
                }
                
                // Lấy Material ID gửi vào category_id_uu_dai
                if (values.materialId) {
                    formData.append('category_id_uu_dai', values.materialId);
                }

                // Xử lý file ảnh
                if (fileList.length > 0 && fileList[0].originFileObj) {
                    formData.append('file', fileList[0].originFileObj);
                }

                // Cấu hình Header bắt buộc cho Upload file
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data', 
                    },
                };

                if (editingProduct) {
                    // Update Product
                    await axiosClient.post(`/admin/products/update/${editingProduct.productId}`, formData, config);
                    message.success('Product updated successfully');
                } else {
                    // Create Product
                    await axiosClient.post('/admin/products', formData, config);
                    message.success('Product created successfully');
                }
                
                setIsModalOpen(false);
                fetchProducts();
            } catch (error) {
                console.error("Save failed:", error);
                if (error.response) {
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
            title: 'ID',
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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
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
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input product name!' }]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item name="description" label="Description">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input price!' }]}>
                        <InputNumber style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
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

                    {/* --- 3. SỬA GIAO DIỆN FORM: Đổi tên hiển thị --- */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {/* Trường Material (Frontend) -> map vào uu_dai (Backend) */}
                        <Form.Item name="materialId" label="Material ID" style={{ flex: 1 }}>
                            <InputNumber style={{ width: '100%' }} placeholder="Nhập ID Chất liệu" />
                        </Form.Item>

                        {/* Trường Collection (Frontend) -> map vào combo (Backend) */}
                        <Form.Item name="collectionId" label="Collection ID" style={{ flex: 1 }}>
                            <InputNumber style={{ width: '100%' }} placeholder="Nhập ID Bộ sưu tập" />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductManagement;