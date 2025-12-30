import { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Spin, Alert } from 'antd';
import axiosClient from '../api/axiosClient';

const { Meta } = Card;
const { Title } = Typography;

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm gọi API
    const fetchProducts = async () => {
        try {
            // Gọi vào endpoint Public mà mình đã cấu hình ở Backend
            const response = await axiosClient.get('/products');
            // Hoặc /products/search?q= nếu backend bạn quy định thế
            setProducts(response.data);
        } catch (err) {
            console.error("Lỗi gọi API:", err);
            setError("Không thể kết nối đến Backend. Hãy chắc chắn Backend đang chạy!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Hust Luxury Menu</Title>

            {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}

            {loading ? (
                <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>
            ) : (
                <Row gutter={[16, 16]}>
                    {products.map((product) => (
                        <Col key={product.productId} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={<img alt={product.name} src={product.urlImg || "https://via.placeholder.com/150"} style={{ height: 200, objectFit: 'cover' }} />}
                            >
                                <Meta title={product.name} description={`${product.price.toLocaleString()} VNĐ`} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default HomePage;
