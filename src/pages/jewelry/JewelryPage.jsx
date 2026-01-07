import React from 'react';
import { Box } from '@mui/material';
import JewelryPageHeader from '../../components/jewelry/JewelryPageHeader';
import JewelryHeroBanner from '../../components/jewelry/JewelryHeroBanner';
import JewelryCategoryGrid from '../../components/jewelry/JewelryCategoryGrid';
import JewelryBannerSection from '../../components/jewelry/JewelryBannerSection';
import JewelryCollectionsBanner from '../../components/jewelry/JewelryCollectionsBanner';

// --- DATA DANH MỤC ---
const CATEGORIES = [
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

// --- DATA BANNER ---
const NEW_ARRIVALS_DATA = {
    title: "Hàng Mới Về",
    subtitle: "New Arrivals",
    description: "Khám phá những thiết kế mới nhất từ bộ sưu tập của chúng tôi. Mỗi món trang sức đều được chế tác tỉ mỉ với sự kết hợp hoàn hảo giữa nghệ thuật truyền thống và xu hướng hiện đại.",
    image: "/image/BOR_JLP.webp",
    imageMobile: "/image/BOR_JLP_1_Mobile.webp",
    href: "/jewelry/shop/new-jewelry"
};

const WEDDING_COLLECTION_DATA = {
    title: "Bộ Sưu Tập Cưới",
    description: "Tìm kiếm món trang sức hoàn hảo cho ngày trọng đại của bạn. Bộ sưu tập cưới của chúng tôi mang đến những thiết kế tinh tế, sang trọng, tượng trưng cho tình yêu vĩnh cửu.",
    linkText: "Khám phá Bộ Sưu Tập",
    href: "/jewelry/shop/wedding",
    image: "/image/BOR_HP_3_Desktop.webp",
    imageMobile: "/image/BOR_HP_3_MOBILE.webp"
};

const COLLECTIONS_DATA = {
    title: "Bộ Sưu Tập",
    description: "Khám phá các bộ sưu tập trang sức đặc trưng của chúng tôi, nơi mỗi thiết kế đều kể một câu chuyện riêng.",
    linkText: "Xem Tất Cả Bộ Sưu Tập",
    href: "/jewelry/shop",
    image: "/image/VDAY_GIFTSLP_Hero_Desktop.webp",
    imageMobile: "/image/VDAY_STORIESLP.webp"
};

const JewelryPage = () => {
    return (
        <Box sx={{ pb: 10 }}>
            {/* PHẦN 1: TIÊU ĐỀ TRANG */}
            <JewelryPageHeader 
                title="Trang Sức"
                description="Thiết kế xuất sắc. Nghệ thuật chế tác đặc biệt. Khám phá thế giới của MAJewelry."
            />

            {/* PHẦN 2: FULL WIDTH HERO BANNER - Hàng Mới Về */}
            <JewelryHeroBanner data={NEW_ARRIVALS_DATA} />

            {/* PHẦN 3: BROWSE BY CATEGORY */}
            <JewelryCategoryGrid categories={CATEGORIES} />

            {/* PHẦN 4: BỘ SƯU TẬP CƯỚI BANNER */}
            <JewelryBannerSection data={WEDDING_COLLECTION_DATA} />

            {/* PHẦN 5: BỘ SƯU TẬP BANNER */}
            <JewelryCollectionsBanner data={COLLECTIONS_DATA} />
        </Box>
    );
};

export default JewelryPage;