import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Link,
    Grid
} from '@mui/material';
import { ChevronRight } from 'lucide-react';

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
    description: "Inspired by the textile roots of his family, Jean Schlumberger’s Sixteen Stone ring features diamonds cross-stitched in gold—a masterpiece of love and connection.",
    image: "https://media.tiffany.com/is/image/tiffanydm/2025_BOR_JLP_1_Desktop?$tile$&wid=2992&fmt=webp",
    href: "/jewelry/shop/sixteen-stone"
};

const BIRD_ON_ROCK_DATA = {
    title: "Discover New Bird on a Rock Designs",
    description: "Reimagining Jean Schlumberger’s iconic Bird on a Rock motif from 1965, Chief Artistic Officer Nathalie Verdeille introduces designs that capture the grace of nature in motion.",
    linkText: "Discover the Collection",
    href: "/jewelry/shop/bird-on-a-rock",
    image: "https://media.tiffany.com/is/image/tiffanydm/2025_BOR_HP_3_ALT_Desktop?$tile$&wid=2992&fmt=webp"
};

const TIFFANY_COLLECTIONS_DATA = {
    title: "Tiffany Collections",
    description: "Discover the jewelry collections that feature Tiffany’s most iconic designs.",
    linkText: "Browse by Collection",
    href: "/jewelry/shop/collections",
    image: "https://media.tiffany.com/is/image/tiffanydm/2025_VDAY_GIFTSLP_Hero_Desktop?$tile$&wid=2992&fmt=webp"
};

const JewelryPage = () => {
    return (
        <Box sx={{ pb: 10 }}>

            {/* PHẦN 1: TIÊU ĐỀ TRANG */}
            <Box sx={{
                mb: 4,
                px: { xs: 2, sm: 6.5, md: 6.5 }
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" sx={{ fontFamily: 'Sterling Display A', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, mb: 1.5 }}>
                        Jewelry
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mx: 'auto', fontSize: { xs: '0.75rem', md: '0.875rem' }, mb: 1.75, maxWidth: '600px' }}>
                        Brilliant design. Exceptional craftsmanship. Explore the world of MAJewelry.
                    </Typography>
                </Box>
            </Box>

            {/* PHẦN 2: FULL WIDTH HERO BANNER */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: '60vh', md: '90vh' },
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}
            >
                {/* Hình nền */}
                <Box
                    component="img"
                    src={SIXTEEN_STONE_DATA.image}
                    alt="Sixteen Stone Ring"
                    sx={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        objectFit: 'cover', zIndex: 0
                    }}
                />

                {/* Lớp phủ tối */}
                <Box
                    sx={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.2)', zIndex: 1
                    }}
                />

                {/* Nội dung Text Overlay */}
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        textAlign: 'left',
                        color: '#fff',
                        pl: { xs: 4, sm: 6.5, md: 10, lg: 15 },
                        pr: 4,
                        maxWidth: '600px'
                    }}
                >
                    <Typography variant="overline" sx={{ letterSpacing: 2, mb: 1, display: 'block', fontSize: { xs: '0.7rem', md: '0.8rem' }, fontWeight: 600 }}>
                        {SIXTEEN_STONE_DATA.title}
                    </Typography>
                    <Typography variant="h2" sx={{ fontFamily: 'serif', mb: 2, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, fontWeight: 400 }}>
                        {SIXTEEN_STONE_DATA.subtitle}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.6, textShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}>
                        {SIXTEEN_STONE_DATA.description}
                    </Typography>

                    <Link
                        component={RouterLink}
                        to={SIXTEEN_STONE_DATA.href}
                        underline="none"
                        sx={{
                            color: '#000',
                            display: 'inline-flex', alignItems: 'center', gap: 1, position: 'relative',
                            fontWeight: 600, fontSize: '0.95rem', letterSpacing: 0.5, px: 0, py: 1,
                            '&::after': {
                                content: '""', position: 'absolute', bottom: 4, left: 0, width: '0%', height: '1px', bgcolor: '#81d8d0', transition: 'width 0.3s ease-in-out'
                            },
                            '&:hover': {
                                color: '#000',
                                '&::after': { width: '100%' }
                            },
                            '& svg': { transition: 'transform 0.3s ease' },
                            '&:hover svg': { transform: 'translateX(4px)' }
                        }}
                    >
                        Shop the Collection <ChevronRight size={18} strokeWidth={2} />
                    </Link>
                </Box>
            </Box>

            {/* PHẦN 3: BROWSE BY CATEGORY (Sử dụng CSS GRID thay vì MUI GRID component) */}
            <Box sx={{ px: { xs: 2, sm: 6.5, md: 6.5 }, py: { xs: 2, sm: 6.5, md: 6.5 } }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.5rem' }, mb: 1.5, fontWeight: 600 }}>
                        Browse by Category
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mx: 'auto', fontSize: { xs: '0.875rem', md: '1rem' }, maxWidth: 600 }}>
                        Explore our iconic jewelry designs.
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' },
                    gap: 3,
                }}>
                    {CATEGORIES.map((cat, index) => (
                        <Box
                            key={index}
                            component={RouterLink}
                            to={cat.href}
                            sx={{
                                textDecoration: 'none',
                                color: 'text.primary',
                                display: 'block',
                                '&:hover .cat-underline': { width: '100%' }
                            }}
                        >
                            <Box sx={{
                                width: '100%',
                                paddingBottom: '100%', // Kỹ thuật tạo hình vuông an toàn
                                position: 'relative',
                                overflow: 'hidden',
                                mb: 2,
                                bgcolor: '#f5f5f5'
                            }}>
                                <Box
                                    component="img"
                                    src={cat.image}
                                    alt={cat.label}
                                    sx={{
                                        position: 'absolute',
                                        top: 0, left: 0, width: '100%', height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.6s'
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography
                                    variant="h6"
                                    align="center"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: '1rem', md: '1.125rem' },
                                        pb: 1.125,
                                        color: 'text.primary'
                                    }}
                                >
                                    {cat.label}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Link
                                    component={RouterLink}
                                    to={cat.href}
                                    underline="none"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 400,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        position: 'relative',

                                        // Gạch chân
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: -2,
                                            left: 0,
                                            width: '0%', // Ban đầu ẩn
                                            height: '1px',
                                            bgcolor: '#81d8d0', // Màu gạch chân
                                            transition: 'width 0.3s ease-in-out' // Hiện dần
                                        },

                                        '&:hover': {
                                            color: 'text.primary', // GIỮ NGUYÊN MÀU CHỮ
                                            '&::after': {
                                                width: '100%' // Hiện full gạch chân
                                            }
                                        },

                                        '& svg': { transition: 'transform 0.3s' },
                                        '&:hover svg': { transform: 'translateX(3px)' }
                                    }}
                                >
                                    Browse Now <ChevronRight size={16} strokeWidth={2} />
                                </Link>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    // Mobile: Auto height (để xếp chồng), Desktop: Fixed height (để làm banner ngang)
                    height: { xs: 'auto', md: '700px' },
                    overflow: 'hidden',
                    bgcolor: '#fff' // Màu nền cho phần text khi ở mobile
                }}
            >
                {/* 1. Ảnh nền (Chỉ hiển thị full-width trên Desktop) */}
                <Box
                    component="img"
                    src={BIRD_ON_ROCK_DATA.image}
                    alt="Bird on a Rock Designs"
                    sx={{
                        // Desktop: Absolute full màn hình
                        display: { xs: 'none', md: 'block' },
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center right', zIndex: 0
                    }}
                />

                {/* 2. Ảnh riêng cho Mobile (Hiển thị dạng khối phía trên) */}
                <Box
                    component="img"
                    src={BIRD_ON_ROCK_DATA.image}
                    alt="Bird on a Rock Designs"
                    sx={{
                        // Mobile: Block, Desktop: None
                        display: { xs: 'block', md: 'none' },
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '4/3', // Tỷ lệ ảnh mobile cho đẹp
                        objectFit: 'cover',
                        objectPosition: 'center right' // Focus vào người mẫu
                    }}
                />

                {/* 3. Grid container chứa Text */}
                <Grid
                    container
                    sx={{
                        position: { xs: 'static', md: 'relative' },
                        zIndex: 1,
                        height: '100%',
                        alignItems: 'center'
                    }}
                >
                    {/* Cột Text */}
                    <Grid
                        item
                        xs={12} md={6}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: { xs: 'center', md: 'center' },
                            p: { xs: 4, md: 4 },
                            pr: { md: 8 },
                            bgcolor: { xs: '#fff', md: 'transparent' }
                        }}
                    >
                        <Box sx={{
                            maxWidth: '450px',
                            textAlign: { xs: 'center', md: 'center' },
                            width: '100%'
                        }}>
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    fontWeight: 600,
                                    mb: 1.25,
                                    lineHeight: 1.2,
                                    color: '#000'
                                }}
                            >
                                {BIRD_ON_ROCK_DATA.title}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    mb: 1.75,
                                    fontSize: { xs: '0.875rem', md: '0.875rem' },
                                    lineHeight: 1.7
                                }}
                            >
                                {BIRD_ON_ROCK_DATA.description}
                            </Typography>

                            <Link
                                component={RouterLink}
                                to={BIRD_ON_ROCK_DATA.href}
                                underline="none"
                                sx={{
                                    color: '#000',
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""', position: 'absolute', bottom: -2, left: 0, width: '0%', height: '1px', bgcolor: '#81d8d0', transition: 'width 0.3s ease-in-out'
                                    },
                                    '&:hover': {
                                        color: '#000',
                                        '&::after': { width: '100%' }
                                    },
                                    '& svg': { transition: 'transform 0.3s' },
                                    '&:hover svg': { transform: 'translateX(4px)' }
                                }}
                            >
                                {BIRD_ON_ROCK_DATA.linkText} <ChevronRight size={18} strokeWidth={2} />
                            </Link>
                        </Box>
                    </Grid>

                    {/* Cột trống bên phải (Desktop only) */}
                    <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'block' } }} />
                </Grid>
            </Box>
            <Box
                sx={{
                    position: 'relative', width: '100%',
                    height: { xs: 'auto', lg: '500px' },
                    overflow: 'hidden',
                    mt: { xs: 2, lg: 6.5 }
                }}
            >
                <Box
                    component="img"
                    src={TIFFANY_COLLECTIONS_DATA.image}
                    alt={TIFFANY_COLLECTIONS_DATA.title}
                    sx={{
                        position: { xs: 'relative', lg: 'absolute' },
                        top: 0, left: 0,
                        width: '100%',
                        height: { xs: 'auto', lg: '100%' },
                        aspectRatio: { xs: '16/9', lg: 'unset' },
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 0
                    }}
                />

                <Box
                    sx={{
                        position: { xs: 'relative', lg: 'absolute' },
                        zIndex: 1,
                        height: { xs: 'auto', lg: '100%' },
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', lg: 'flex-start' },
                        textAlign: { xs: 'center', lg: 'left' },
                        bgcolor: { xs: '#fff', lg: 'transparent' },
                        p: { xs: 6, lg: 0 },
                        pl: { lg: 15 },
                        pb: { xs: 8, lg: 0 }
                    }}
                >
                    <Box sx={{ maxWidth: '450px', textAlign: 'center', mx: { xs: 'auto', lg: 0 } }}>
                        <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, lineHeight: 1.2, color: '#000', fontWeight: 600 }}>
                            {TIFFANY_COLLECTIONS_DATA.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1.75, mt: 1.25, fontSize: { xs: '0.875rem', md: '0.875rem' }, lineHeight: 1.7 }}>
                            {TIFFANY_COLLECTIONS_DATA.description}
                        </Typography>
                        <Link component={RouterLink} to={TIFFANY_COLLECTIONS_DATA.href} underline="none" sx={{
                            color: '#000', fontSize: '0.875rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 0.5, position: 'relative', '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: -2,
                                left: 0,
                                width: '0%',
                                height: '1px',
                                bgcolor: '#81d8d0',
                                transition: 'width 0.3s ease-in-out'
                            }, '&:hover': { color: '#000', '&::after': { width: '100%' } }, '& svg': { transition: 'transform 0.3s' }, '&:hover svg': { transform: 'translateX(4px)' }
                        }}>
                            {TIFFANY_COLLECTIONS_DATA.linkText} <ChevronRight size={18} strokeWidth={2} />
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default JewelryPage;