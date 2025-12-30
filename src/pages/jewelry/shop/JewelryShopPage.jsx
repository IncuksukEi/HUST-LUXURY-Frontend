import React from 'react';
import { useParams } from 'react-router-dom'; 
import { Box, Container, Typography } from '@mui/material';
import JewelryCategorySection from '../../../components/jewelry/JewelryCategorySection';
import JewelryProduct from '../../../components/jewelry/JewelryProduct';
import JewelryCategoryGrid from '../../../components/jewelry/JewelryCategoryGrid';
import JewelryCategoryDescription from '../../../components/jewelry/JewelryCategoryDescription';

// --- CONSTANTS ĐỂ GENERATE DATA CHUẨN ---
const COLLECTIONS = ['Tiffany T', 'Tiffany HardWear', 'Elsa Peretti', 'Tiffany Lock', 'Tiffany Knot'];
const MATERIALS = ['Yellow Gold', 'Rose Gold', 'White Gold', 'Sterling Silver', 'Platinum'];
const GEMSTONES = ['Diamond', 'Sapphire', 'Ruby', 'Mother-of-pearl', 'No Gemstones'];

// Hàm hỗ trợ lấy ảnh dựa trên category
const getBaseImageName = (slug) => {
    if (slug.includes('necklace')) return 'necklaces';
    if (slug.includes('earring')) return 'earrings'; // Lưu ý: cần đảm bảo file ảnh tồn tại
    if (slug.includes('bracelet')) return 'necklaces'; // Tạm dùng necklaces nếu chưa có ảnh bracelet đủ bộ
    if (slug.includes('ring')) return 'hero-ring'; // Tạm dùng hero-ring
    return 'necklaces'; // Fallback
};

// --- HÀM GENERATE DATA MỚI ---
const GENERATE_PRODUCTS = (categoryName, slug, count) => {
    const baseImg = getBaseImageName(slug);
    
    return Array.from({ length: count }, (_, i) => {
        // Chọn random thuộc tính
        const collection = COLLECTIONS[i % COLLECTIONS.length];
        const material = MATERIALS[i % MATERIALS.length];
        const gemstone = GEMSTONES[i % GEMSTONES.length];
        
        // Mỗi sản phẩm chỉ có 1 ảnh
        const imageIndex = (i % 4) + 1; // Lặp lại ảnh 1-4
        const image = `/image/${baseImg}-${imageIndex}.webp`;

        return {
            id: i + 1,
            name: `${collection} ${categoryName} ${i + 1}`,
            description: `${collection} design in ${material} ${gemstone !== 'No Gemstones' ? `with ${gemstone}` : ''}. A bold statement of modern love.`,
            price: `$${(Math.random() * 10000 + 2000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
            category: categoryName,
            
            // Các trường quan trọng cho Filter & UI mới
            collection: collection,
            material: material,
            gemstone: gemstone,
            isNew: i < 4, // 4 sản phẩm đầu tiên là New
            image: image // Chỉ 1 ảnh
        };
    });
};

const CATEGORY_DATA_MAP = {
    // URL: /jewelry/shop/necklaces-pendants
    "necklaces-pendants": {
        label: 'Necklaces & Pendants',
        description: "Merging striking design with exceptional craftsmanship, explore our collection of necklaces and pendants that only Tiffany artisans could imagine. From sterling silver and gold chain necklaces to elegant lariat necklaces and short and long pendants—perfect for layering—featuring diamonds, symbols of love and signature House motifs. Discover the House's iconic link jewelry, as well as iconic lock, knot and T motifs. Our pearl necklace collection features classic styles and modern designs that push the boundaries of creativity. Tiffany's master craftspeople meticulously choose and place the world's most beautiful pearls in our timeless designs. For the ultimate statement, explore the House's coveted diamond necklaces, from solitaire diamond pendants or pavé designs that can be worn every day to elegant styles for your most special occasions. Looking for a meaningful gift? A personalized necklace is a memorable gift that will be worn for years to come. Add an engraving, such as a monogram, significant date or message for a special touch. From contemporary to classic designs, a Tiffany necklace is an expression of love to be treasured for generations.",
        browseLinks: [
            { label: 'Browse Earrings', href: '/jewelry/shop/earrings' },
            { label: 'Browse Bracelets', href: '/jewelry/shop/bracelets' },
            { label: 'Browse Rings', href: '/jewelry/shop/rings' }
        ],
        products: GENERATE_PRODUCTS('Pendant', 'necklaces-pendants', 24),
        subItems: [ 
            { name: 'Everyday Diamonds', image: '/image/necklaces-1.webp', href: '/jewelry/shop/necklaces-pendants/everyday' },
            { name: 'Chain', image: '/image/necklaces-2.webp', href: '/jewelry/shop/necklaces-pendants/chain' },
            { name: 'Layering', image: '/image/necklaces-3.webp', href: '/jewelry/shop/necklaces-pendants/layering' },
            { name: 'Bold', image: '/image/necklaces-4.webp', href: '/jewelry/shop/necklaces-pendants/bold' },
        ]
    },

    // URL: /jewelry/shop/earrings
    "earrings": {
        label: 'Earrings',
        description: "Defined by the House's signature motifs, our earrings capture the inventiveness and creativity for which we're known. From timeless to bold designs, each set of earrings is expertly crafted by our world-renowned artisans using time-honored techniques. Start with our striking collection of stud earrings that bring elegance to everyday style and special occasions. Discover diamond studs, pearl studs and colored gemstone studs that will be treasured for generations. For striking style, explore drop earrings or statement earrings in distinctive shapes you can only find here, from our knot and lock-inspired House motifs to sculptural waves to modern florals. Our diverse collection of heart earrings features sophisticated and playful designs in stud, hoop and drop styles. Explore our coveted collection of diamond earrings, including pavé diamond hoops, solitaire diamond earrings and diamond drop earrings imagined by our artisans. To create the perfect earring stack, pair an unexpected combination of metals, shapes or lengths, such as diamond studs, drop earrings and small hoops. Presented in our iconic Blue Box, Tiffany earrings are extraordinary pieces that will be loved from generation to generation.",
        browseLinks: [
            { label: 'Browse Necklaces & Pendants', href: '/jewelry/shop/necklaces-pendants' },
            { label: 'Browse Rings', href: '/jewelry/shop/rings' },
            { label: 'Browse Bracelets', href: '/jewelry/shop/bracelets' }
        ],
        products: GENERATE_PRODUCTS('Earrings', 'earrings', 20),
        subItems: [ 
            { name: 'Stud', image: '/image/sapphire-earrings.webp', href: '/jewelry/shop/earrings/stud' },
            { name: 'Hoop', image: '/image/sapphire-earrings.webp', href: '/jewelry/shop/earrings/hoop' },
            { name: 'Drop & Dangle', image: '/image/sapphire-earrings.webp', href: '/jewelry/shop/earrings/drop' },
            { name: 'Wedding', image: '/image/sapphire-earrings.webp', href: '/jewelry/shop/earrings/wedding' },
            { name: 'Statement', image: '/image/sapphire-earrings.webp', href: '/jewelry/shop/earrings/statement' },
        ]
    },

    // URL: /jewelry/shop/bracelets
    "bracelets": {
        label: 'Bracelets',
        description: "Discover Tiffany's renowned collection of bracelets. From chain bracelets to cuffs to sleek bangles, each design is meticulously crafted by the House's world-renowned artisans who use time-honored techniques and the finest precious metals. Start with our gold and sterling silver bracelets distinguished with signature motifs and captivating details, such as our iconic T, elegant gauge link and lock-inspired symbol. Our bangles are designed in wide or narrow styles and make a bold statement whether worn on their own or combined as a set. Explore stacking bracelets to create the perfect combination. Among our favorite styles to bring together are a diamond tennis bracelet, narrow bangle and link bracelet for a striking contrast of texture. Looking for a meaningful birthday gift? Explore birthstone bracelets for a gift they'll treasure for years to come. Our collection of timeless designs reflects the House's legendary inventiveness and creativity with bracelets only our artisans could imagine.",
        browseLinks: [
            { label: 'Browse Necklaces & Pendants', href: '/jewelry/shop/necklaces-pendants' },
            { label: 'Browse Earrings', href: '/jewelry/shop/earrings' },
            { label: 'Browse Rings', href: '/jewelry/shop/rings' }
        ],
        products: GENERATE_PRODUCTS('Bracelet', 'bracelets', 16),
        subItems: [
            { name: 'Chain', image: '/image/emerald-bracelet.webp' },
            { name: 'Bangle', image: '/image/emerald-bracelet.webp' },
            { name: 'Tennis', image: '/image/emerald-bracelet.webp' },
            { name: 'Stacking', image: '/image/emerald-bracelet.webp' },
            { name: 'Cuff', image: '/image/emerald-bracelet.webp' },
        ]
    },

    // URL: /jewelry/shop/rings
    "rings": {
        label: 'Rings',
        description: "Explore Tiffany's exceptional collection of rings, where timeless elegance meets contemporary design. From classic solitaire diamond engagement rings to bold statement pieces, each ring is meticulously crafted by our master artisans using the finest materials and time-honored techniques. Discover our iconic collections featuring signature motifs including the T, lock, and knot designs. Whether you're seeking a delicate stacking ring, a striking statement piece, or a meaningful band, our rings are designed to be treasured for generations. Our collection includes everything from everyday elegance to pieces for your most special occasions, all presented in our iconic Blue Box.",
        browseLinks: [
            { label: 'Browse Necklaces & Pendants', href: '/jewelry/shop/necklaces-pendants' },
            { label: 'Browse Earrings', href: '/jewelry/shop/earrings' },
            { label: 'Browse Bracelets', href: '/jewelry/shop/bracelets' }
        ],
        products: GENERATE_PRODUCTS('Ring', 'rings', 16),
        subItems: [
            { name: 'Stacking', image: '/image/hero-ring.webp' },
            { name: 'Statement', image: '/image/hero-ring.webp' },
            { name: 'Bands', image: '/image/hero-ring.webp' },
            { name: 'Signet', image: '/image/hero-ring.webp' },
        ]
    }
};

// Categories data cho Browse by Category section
const BROWSE_CATEGORIES = [
    {
        label: "Necklaces & Pendants",
        href: "/jewelry/shop/necklaces-pendants",
        image: "/image/pearl-necklace.webp"
    },
    {
        label: "Earrings",
        href: "/jewelry/shop/earrings",
        image: "/image/sapphire-earrings.webp"
    },
    {
        label: "Bracelets",
        href: "/jewelry/shop/bracelets",
        image: "/image/emerald-bracelet.webp"
    },
    {
        label: "Rings",
        href: "/jewelry/shop/rings",
        image: "/image/hero-ring.webp"
    },
];

const JewelryShopPage = () => {
    const { slug } = useParams();
    const currentCategoryData = CATEGORY_DATA_MAP[slug];

    if (!currentCategoryData) {
        return (
            <Container sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h5">Danh mục không tồn tại</Typography>
                <Typography variant="body1" sx={{mt: 2}}>Vui lòng quay lại trang chủ.</Typography>
            </Container>
        );
    }

    return (
        <Box>
            <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6.5 } }}>
                {/* Header Categories */}
                {/* <JewelryCategorySection data={currentCategoryData} /> */}

                {/* Product Grid & Filter */}
                {/* Truyền key=slug để React remount component khi chuyển category, reset state filter */}
                {/* Component sẽ tự fetch từ API dựa trên categorySlug */}
                <JewelryProduct key={slug} categorySlug={slug} />
            </Container>

            {/* Browse by Category Section */}
            <JewelryCategoryGrid 
                categories={BROWSE_CATEGORIES}
                title="Browse by Category"
                description="Explore our iconic jewelry designs."
            />

            {/* Category Description Section - Ở cuối trang */}
            <JewelryCategoryDescription categoryData={currentCategoryData} />
        </Box>
    );
};

export default JewelryShopPage;