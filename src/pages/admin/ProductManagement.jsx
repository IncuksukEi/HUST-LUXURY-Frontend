import { useEffect, useState } from 'react';
import { Table, Button, Space, message, Image, Modal, Form, Input, InputNumber, Popconfirm, Upload, Select, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../api/axiosClient';

const { Option } = Select;

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    // Dữ liệu mapping cứng ở FE (để hiển thị tên cho đẹp)
    const categoryOptions = [
        { id: 1, name: 'Dây chuyền (Necklaces)' },
        { id: 2, name: 'Bông tai (Earrings)' },
        { id: 3, name: 'Vòng tay (Bracelets)' },
        { id: 4, name: 'Nhẫn (Rings)' },
    ];

    const materialOptions = [
        { id: 1, name: 'Vàng (Gold)' },
        { id: 2, name: 'Bạc (Silver)' },
        { id: 3, name: 'Kim Cương (Diamond)' },
        { id: 4, name: 'Bạch Kim (Platinum)' },
        { id: 5, name: 'Đá Quý (Gemstone)' },
    ];

    const collectionOptions = [
        { id: 100, name: 'Bộ Sưu Tập Cưới (Wedding)' },
        { id: 101, name: 'Summer Vibes' },
        { id: 102, name: 'Quà Tặng (Gift)' },
        { id: 103, name: 'Luxury Limited' },
    ];

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/admin/products');
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
        setFileList([]); 
        // Map lại các trường ID cũ/mới nếu cần
        const formValues = {
            ...record,
            collectionId: record.category_id_combo || record.categoryIdCombo, 
            materialId: record.category_id_uu_dai || record.categoryIdUuDai
        };
        form.setFieldsValue(formValues);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`/admin/products/${id}`);
            message.success('Đã xóa sản phẩm thành công');
            fetchProducts();
        } catch (error) {
            console.error("Delete failed:", error);
            // Bắt lỗi từ Backend trả về
            if (error.response && error.response.data && error.response.data.error) {
                 // Nếu BE trả về message lỗi cụ thể (VD: Ràng buộc khóa ngoại)
                 message.error(error.response.data.error);
            } else {
                 // Lỗi chung chung hoặc lỗi 500 do Constraint Violation
                 message.error("Không thể xóa sản phẩm này (Sản phẩm đã có trong đơn hàng hoặc giỏ hàng).");
            }
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
                if (values.collectionId) formData.append('category_id_combo', values.collectionId);
                if (values.materialId) formData.append('category_id_uu_dai', values.materialId);

                if (fileList.length > 0 && fileList[0].originFileObj) {
                    formData.append('file', fileList[0].originFileObj);
                }

                const config = { headers: { 'Content-Type': 'multipart/form-data' } };

                if (editingProduct) {
                    await axiosClient.post(`/admin/products/update/${editingProduct.productId}`, formData, config);
                    message.success('Cập nhật thành công');
                } else {
                    await axiosClient.post('/admin/products', formData, config);
                    message.success('Thêm mới thành công');
                }
                
                setIsModalOpen(false);
                fetchProducts();
            } catch (error) {
                console.error("Save failed:", error);
                message.error("Lưu thất bại: " + (error.response?.data?.error || error.message));
            }
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const beforeUpload = () => false;

    const columns = [
        { title: 'ID', dataIndex: 'productId', key: 'productId', width: 60 },
        {
            title: 'Ảnh',
            dataIndex: 'urlImg',
            key: 'urlImg',
            render: (url) => <Image width={50} src={url || "https://via.placeholder.com/50"} fallback="https://via.placeholder.com/50" />,
        },
        { title: 'Tên SP', dataIndex: 'name', key: 'name', width: 200 },
        {
            title: 'Danh mục',
            key: 'category',
            render: (_, record) => {
                const cat = categoryOptions.find(c => c.id === record.categoryId);
                return cat ? <Tag color="blue">{cat.name}</Tag> : record.categoryId;
            }
        },
        {
            title: 'Chất liệu', 
            key: 'material',
            render: (_, record) => {
                const matId = record.category_id_uu_dai || record.categoryIdUuDai;
                const mat = materialOptions.find(m => m.id === matId);
                return mat ? mat.name : "";
            }
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        },
        { title: 'Kho', dataIndex: 'stock', key: 'stock' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" size="small" onClick={() => handleEdit(record)}>Sửa</Button>
                    <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.productId)}>
                        <Button type="primary" danger size="small">Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Quản lý sản phẩm</h2>
                <Button type="primary" onClick={handleAdd}>Thêm sản phẩm</Button>
            </div>
            
            <Table
                columns={columns}
                dataSource={products}
                rowKey="productId"
                loading={loading}
                pagination={{ pageSize: 8 }}
            />

            <Modal title={editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700}>
                <Form form={form} layout="vertical">
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]} style={{ flex: 2 }}>
                            <Input placeholder="Nhập tên sản phẩm..." />
                        </Form.Item>
                        <Form.Item name="price" label="Giá bán (VNĐ)" rules={[{ required: true }]} style={{ flex: 1 }}>
                            <InputNumber style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                        </Form.Item>
                    </div>

                    <Form.Item name="description" label="Mô tả chi tiết">
                        <Input.TextArea rows={3} placeholder="Mô tả về sản phẩm..." />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Form.Item name="categoryId" label="Danh mục (Category)" rules={[{ required: true }]} style={{ flex: 1 }}>
                            <Select placeholder="Chọn danh mục">
                                {categoryOptions.map(opt => (
                                    <Option key={opt.id} value={opt.id}>{opt.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="stock" label="Tồn kho" rules={[{ required: true }]} style={{ flex: 1 }}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Form.Item name="materialId" label="Chất liệu (Material)" style={{ flex: 1 }}>
                            <Select placeholder="Chọn chất liệu" allowClear>
                                {materialOptions.map(opt => (
                                    <Option key={opt.id} value={opt.id}>{opt.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="collectionId" label="Bộ sưu tập (Collection)" style={{ flex: 1 }}>
                            <Select placeholder="Chọn bộ sưu tập" allowClear>
                                {collectionOptions.map(opt => (
                                    <Option key={opt.id} value={opt.id}>{opt.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item label="Hình ảnh sản phẩm">
                        <Upload
                            listType="picture"
                            fileList={fileList}
                            onChange={onUploadChange}
                            beforeUpload={beforeUpload}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductManagement;