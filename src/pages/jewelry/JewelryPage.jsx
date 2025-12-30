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
const SIXTEEN_STONE_DATA = {
    title: "Jean Schlumberger by Tiffany",
    subtitle: "Sixteen Stone",
    description: "Inspired by the textile roots of his family, Jean Schlumberger's Sixteen Stone ring features diamonds cross-stitched in gold—a masterpiece of love and connection.",
    image: "/image/BOR_JLP.webp",
    imageMobile: "/image/BOR_JLP_1_Mobile.webp",
    href: "/jewelry/shop/sixteen-stone"
};

const BIRD_ON_ROCK_DATA = {
    title: "Discover New Bird on a Rock Designs",
    description: "Reimagining Jean Schlumberger's iconic Bird on a Rock motif from 1965, Chief Artistic Officer Nathalie Verdeille introduces designs that capture the grace of nature in motion.",
    linkText: "Discover the Collection",
    href: "/jewelry/shop/bird-on-a-rock",
    image: "/image/BOR_HP_3_Desktop.webp",
    imageMobile: "/image/BOR_HP_3_MOBILE.webp"
};

const TIFFANY_COLLECTIONS_DATA = {
    title: "Tiffany Collections",
    description: "Discover the jewelry collections that feature Tiffany's most iconic designs.",
    linkText: "Browse by Collection",
    href: "/jewelry/shop/collections",
    image: "/image/VDAY_GIFTSLP_Hero_Desktop.webp",
    imageMobile: "/image/VDAY_STORIESLP.webp"
};

const JewelryPage = () => {
    return (
        <Box sx={{ pb: 10 }}>
            {/* PHẦN 1: TIÊU ĐỀ TRANG */}
            <JewelryPageHeader 
                title="Jewelry"
                description="Brilliant design. Exceptional craftsmanship. Explore the world of MAJewelry."
            />

            {/* PHẦN 2: FULL WIDTH HERO BANNER */}
            <JewelryHeroBanner data={SIXTEEN_STONE_DATA} />

            {/* PHẦN 3: BROWSE BY CATEGORY */}
            <JewelryCategoryGrid categories={CATEGORIES} />

            {/* PHẦN 4: BIRD ON A ROCK BANNER */}
            <JewelryBannerSection data={BIRD_ON_ROCK_DATA} />

            {/* PHẦN 5: TIFFANY COLLECTIONS BANNER */}
            <JewelryCollectionsBanner data={TIFFANY_COLLECTIONS_DATA} />
        </Box>
    );
};

export default JewelryPage;