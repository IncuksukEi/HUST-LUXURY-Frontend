import React, { useEffect } from 'react'; // Bỏ useState
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Grid,
    Breadcrumbs,
    Link,
    Button
} from '@mui/material';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';

// --- MOCK DATA GIỮ NGUYÊN ---
const CATEGORY_INFO = {
    "necklaces-pendants": {
        title: "Necklaces & Pendants",
        description: "Discover Tiffany necklaces and pendants, from diamond designs to silver chains.",
        bannerImage: "/image/pearl-necklace.webp"
    },
    "earrings": {
        title: "Earrings",
        description: "Explore diamond studs, hoop earrings and more.",
        bannerImage: "/image/sapphire-earrings.webp"
    },
    "bracelets": {
        title: "Bracelets",
        description: "Classic chain bracelets, diamond tennis bracelets and bangles.",
        bannerImage: "/image/emerald-bracelet.webp"
    },
    "rings": {
        title: "Rings",
        description: "Discover engagement rings, wedding bands and fashion rings.",
        bannerImage: "/image/hero-ring.webp"
    },
    "sixteen-stone": {
        title: "Sixteen Stone",
        description: "Jean Schlumberger’s masterpiece of love and connection.",
        bannerImage: "https://media.tiffany.com/is/image/tiffanydm/2025_BOR_JLP_1_Desktop?$tile$&wid=2992&fmt=webp"
    },
    "bird-on-a-rock": {
        title: "Bird on a Rock",
        description: "Jean Schlumberger’s iconic bird perched on a gemstone.",
        bannerImage: "https://media.tiffany.com/is/image/tiffanydm/2025_BOR_HP_3_ALT_Desktop?$tile$&wid=2992&fmt=webp"
    },
    "collections": {
        title: "All Collections",
        description: "Tiffany’s most iconic designs and jewelry collections.",
        bannerImage: "https://media.tiffany.com/is/image/tiffanydm/2024_Tiffany_Collections_HP_Desktop?$tile$&wid=2992&fmt=webp"
    }
};

const MOCK_PRODUCTS = [
    { id: 1, name: "T1 Circle Pendant", price: "$6,500", image: "/image/pearl-necklace.webp", category: "necklaces-pendants" },
    { id: 2, name: "HardWear Link Earrings", price: "$18,000", image: "/image/sapphire-earrings.webp", category: "earrings" },
    { id: 3, name: "Lock Bangle", price: "$12,000", image: "/image/emerald-bracelet.webp", category: "bracelets" },
    { id: 4, name: "T True Ring", price: "$2,500", image: "/image/hero-ring.webp", category: "rings" },
    { id: 5, name: "Bird on a Rock Brooch", price: "$75,000", image: "https://media.tiffany.com/is/image/tiffanydm/2025_BOR_HP_3_ALT_Desktop?$tile$&wid=2992&fmt=webp", category: "bird-on-a-rock" },
    { id: 6, name: "Diamond Pendant", price: "$4,200", image: "/image/pearl-necklace.webp", category: "necklaces-pendants" },
    { id: 7, name: "Gold Hoop Earrings", price: "$3,100", image: "/image/sapphire-earrings.webp", category: "earrings" },
    { id: 8, name: "Wire Bracelet", price: "$5,600", image: "/image/emerald-bracelet.webp", category: "bracelets" },
];

const JewelryShopPage = () => {
    const { slug } = useParams();

    // --- 1. TÍNH TOÁN DỮ LIỆU TRỰC TIẾP (DERIVED STATE) ---
    // Không cần useEffect vì data có sẵn
    
    // Tìm thông tin Category
    const currentCategory = CATEGORY_INFO[slug] || { 
        title: "Collection", 
        description: "Explore our jewelry.", 
        bannerImage: "/image/hero-ring.webp" 
    };

    // Lọc sản phẩm
    let productList = [];
    if (slug === 'collections') {
        productList = MOCK_PRODUCTS;
    } else {
        const filtered = MOCK_PRODUCTS.filter(p => p.category === slug || slug === 'sixteen-stone');
        // Nhân bản để demo grid đầy đặn (Logic demo cũ của bạn)
        productList = [...filtered, ...filtered, ...filtered].slice(0, 8);
    }

    // --- 2. SIDE EFFECTS ---
    // Chỉ dùng useEffect cho các việc tác động bên ngoài React (như scroll window)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!currentCategory) return <Box sx={{ p: 5, textAlign: 'center' }}>Loading...</Box>;

    return (
        <Box sx={{ pb: 10 }}>
            {/* --- BREADCRUMBS --- */}
            <Container maxWidth="xl" sx={{ py: 2, px: { xs: 2, sm: 6.5, md: 6.5 } }}>
                <Breadcrumbs separator={<ChevronRight size={16} />} aria-label="breadcrumb">
                    <Link component={RouterLink} to="/" underline="hover" color="inherit" sx={{ fontSize: '0.875rem' }}>
                        Home
                    </Link>
                    <Link component={RouterLink} to="/jewelry" underline="hover" color="inherit" sx={{ fontSize: '0.875rem' }}>
                        Jewelry
                    </Link>
                    <Typography color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                        {currentCategory.title}
                    </Typography>
                </Breadcrumbs>
            </Container>

            {/* --- HERO HEADER --- */}
            <Box sx={{ textAlign: 'center', mb: 6, pt: 4, px: 2 }}>
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'Sterling Display A', fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
                    {currentCategory.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                    {currentCategory.description}
                </Typography>
            </Box>

            {/* --- TOOLBAR --- */}
            <Box sx={{ borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', mb: 4 }}>
                <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 6.5, md: 6.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                        <Button startIcon={<SlidersHorizontal size={18} />} color="inherit" sx={{ textTransform: 'none', fontSize: '0.9rem' }}>
                            Filter
                        </Button>
                        <Typography variant="body2" color="text.secondary">
                            {productList.length} Results
                        </Typography>
                        <Button color="inherit" sx={{ textTransform: 'none', fontSize: '0.9rem' }}>
                            Sort by: Featured
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* --- PRODUCT GRID --- */}
            <Box sx={{ px: { xs: 2, sm: 6.5, md: 6.5 } }}>
                <Grid container spacing={3}>
                    {productList.map((product, index) => (
                        <Grid item key={`${product.id}-${index}`} xs={6} sm={4} md={3}>
                            <Box sx={{ cursor: 'pointer', group: 'true' }}>
                                {/* Product Image */}
                                <Box sx={{ position: 'relative', width: '100%', paddingBottom: '100%', bgcolor: '#f5f5f5', mb: 2, overflow: 'hidden' }}>
                                    <Box 
                                        component="img"
                                        src={product.image}
                                        alt={product.name}
                                        sx={{
                                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': { transform: 'scale(1.05)' }
                                        }}
                                    />
                                </Box>
                                {/* Product Info */}
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                                        {product.price}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {productList.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Typography variant="h6" color="text.secondary">
                            No products found in this collection.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default JewelryShopPage;