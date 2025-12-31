import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    Fade,
    Grow,
    Slide,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Diamond, Heart, Award, Sparkles } from 'lucide-react';

const TIFFANY_BLUE = '#0ABAB5';

// Local Static Assets - Updated with new Tiffany Diamond images
const LOCAL_IMAGES = {
    hero: '/image/tiffany-diamond-hero.webp',
    story1: '/image/tiffany-diamond-feature1.webp',
    story2: '/image/tiffany-diamond-feature2.webp',
    blueBox: '/image/holiday-still-desktop.webp',
    feature: '/image/BOR_JLP.webp',
};

// Custom hook for scroll animation
const useScrollAnimation = (threshold = 0.2) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isVisible];
};

// Animated Section Component
const AnimatedSection = ({ children, delay = 0, direction = 'up' }) => {
    const [ref, isVisible] = useScrollAnimation(0.15);

    const transforms = {
        up: 'translateY(60px)',
        down: 'translateY(-60px)',
        left: 'translateX(-60px)',
        right: 'translateX(60px)',
    };

    return (
        <Box
            ref={ref}
            sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translate(0)' : transforms[direction],
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
            }}
        >
            {children}
        </Box>
    );
};

// Animated Image with Hover Effect
const AnimatedImage = ({ src, alt, sx = {} }) => {
    const [ref, isVisible] = useScrollAnimation(0.1);

    return (
        <Box
            ref={ref}
            sx={{
                overflow: 'hidden',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'transparent',
                    transition: 'all 0.4s ease',
                },
                '&:hover': {
                    '& img': {
                        transform: 'scale(1.05)',
                    },
                    '&::after': {
                        bgcolor: 'rgba(10, 186, 181, 0.1)',
                    },
                },
                ...sx,
            }}
        >
            <Box
                component="img"
                src={src}
                alt={alt}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
        </Box>
    );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
    const [ref, isVisible] = useScrollAnimation(0.2);

    return (
        <Box
            ref={ref}
            sx={{
                textAlign: 'center',
                p: 4,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
                '&:hover': {
                    '& .feature-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        color: TIFFANY_BLUE,
                    },
                },
            }}
        >
            <Box
                className="feature-icon"
                sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: '#f8f8f8',
                    mb: 3,
                    transition: 'all 0.4s ease',
                }}
            >
                <Icon size={32} strokeWidth={1.5} />
            </Box>
            <Typography
                variant="h6"
                sx={{
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontWeight: 500,
                    mb: 2,
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    fontFamily: '"Inter", sans-serif',
                }}
            >
                {description}
            </Typography>
        </Box>
    );
};

function AboutPage() {
    const navigate = useNavigate();
    const [heroLoaded, setHeroLoaded] = useState(false);

    useEffect(() => {
        setHeroLoaded(true);
    }, []);

    return (
        <Box sx={{ bgcolor: '#fff', overflow: 'hidden' }}>
            {/* Hero Section with Parallax Effect */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '70vh', md: '90vh' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Animated Background */}
                <Box
                    component="img"
                    src={LOCAL_IMAGES.hero}
                    alt="MAJewelry Heritage"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '110%',
                        objectFit: 'cover',
                        transform: heroLoaded ? 'scale(1)' : 'scale(1.1)',
                        transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                />
                {/* Gradient Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
                    }}
                />
                {/* Animated Decorative Elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        opacity: heroLoaded ? 0.3 : 0,
                        transform: heroLoaded ? 'translateY(0)' : 'translateY(-20px)',
                        transition: 'all 1.5s ease 0.5s',
                    }}
                >
                    <Sparkles size={40} color="#fff" />
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '30%',
                        right: '15%',
                        opacity: heroLoaded ? 0.3 : 0,
                        transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 1.5s ease 0.7s',
                    }}
                >
                    <Diamond size={50} color="#fff" />
                </Box>

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Fade in={heroLoaded} timeout={1000}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: '#fff',
                                letterSpacing: 6,
                                fontSize: { xs: '0.7rem', md: '0.85rem' },
                                mb: 2,
                                display: 'block',
                                fontFamily: '"Inter", sans-serif',
                            }}
                        >
                            THE WORLD OF
                        </Typography>
                    </Fade>
                    <Fade in={heroLoaded} timeout={1500}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontFamily: '"Be Vietnam Pro", sans-serif',
                                color: '#fff',
                                fontWeight: 400,
                                fontSize: { xs: '3rem', md: '5.5rem' },
                                letterSpacing: '0.08em',
                                textShadow: '0 4px 30px rgba(0,0,0,0.3)',
                            }}
                        >
                            MAJewelry
                        </Typography>
                    </Fade>
                    <Fade in={heroLoaded} timeout={2000}>
                        <Typography
                            sx={{
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: { xs: '1rem', md: '1.2rem' },
                                mt: 3,
                                fontFamily: '"Inter", sans-serif',
                                fontWeight: 300,
                            }}
                        >
                            Nơi nghệ thuật gặp gỡ đam mê
                        </Typography>
                    </Fade>
                </Container>

                {/* Scroll Indicator */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 40,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        animation: 'bounce 2s infinite',
                        '@keyframes bounce': {
                            '0%, 20%, 50%, 80%, 100%': { transform: 'translateX(-50%) translateY(0)' },
                            '40%': { transform: 'translateX(-50%) translateY(-10px)' },
                            '60%': { transform: 'translateX(-50%) translateY(-5px)' },
                        },
                    }}
                >
                    <ChevronRight
                        size={30}
                        color="#fff"
                        style={{ transform: 'rotate(90deg)', opacity: 0.7 }}
                    />
                </Box>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fafafa' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <FeatureCard
                                icon={Diamond}
                                title="Chất lượng Hoàn hảo"
                                description="Mỗi viên đá quý được tuyển chọn kỹ lưỡng, đảm bảo tiêu chuẩn cao nhất về độ trong, cắt và màu sắc."
                                delay={0}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FeatureCard
                                icon={Heart}
                                title="Thiết kế Độc đáo"
                                description="Những tác phẩm nghệ thuật được tạo ra với tình yêu và sự sáng tạo, phản ánh cá tính riêng của bạn."
                                delay={0.2}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FeatureCard
                                icon={Award}
                                title="Cam kết Vĩnh cửu"
                                description="Bảo hành trọn đời và dịch vụ chăm sóc khách hàng tận tâm cho mỗi sản phẩm."
                                delay={0.4}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Section 1: An Iconic Heritage */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 16 } }}>
                <Grid container spacing={{ xs: 4, md: 10 }} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <AnimatedSection delay={0}>
                            <Typography
                                variant="overline"
                                sx={{
                                    color: TIFFANY_BLUE,
                                    letterSpacing: 4,
                                    fontSize: '0.75rem',
                                    mb: 2,
                                    display: 'block',
                                    fontFamily: '"Inter", sans-serif',
                                }}
                            >
                                CÂU CHUYỆN CỦA CHÚNG TÔI
                            </Typography>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontFamily: '"Be Vietnam Pro", sans-serif',
                                    fontWeight: 400,
                                    fontSize: { xs: '2rem', md: '3.5rem' },
                                    mb: 4,
                                    lineHeight: 1.2,
                                }}
                            >
                                Di sản Biểu tượng
                            </Typography>
                        </AnimatedSection>
                        <AnimatedSection delay={0.2}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 2,
                                    fontSize: '1.05rem',
                                    mb: 4,
                                    fontFamily: '"Inter", sans-serif',
                                }}
                            >
                                Được thành lập với sứ mệnh mang đến những tác phẩm trang sức
                                đẳng cấp thế giới, <strong>MAJewelry</strong> tin rằng mỗi món trang sức
                                không chỉ là phụ kiện, mà còn là biểu tượng của tình yêu, sự cam kết
                                và những khoảnh khắc đáng nhớ trong cuộc sống.
                            </Typography>
                        </AnimatedSection>
                        <AnimatedSection delay={0.4}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 2,
                                    fontSize: '1.05rem',
                                    fontFamily: '"Inter", sans-serif',
                                }}
                            >
                                Với đội ngũ nghệ nhân tài hoa và sự kết hợp giữa kỹ thuật truyền thống
                                và công nghệ hiện đại, mỗi sản phẩm đều là một tác phẩm
                                nghệ thuật độc đáo, được chế tác với tình yêu và sự tỉ mỉ tuyệt đối.
                            </Typography>
                        </AnimatedSection>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <AnimatedImage
                            src={LOCAL_IMAGES.story1}
                            alt="Heritage"
                            sx={{ height: { xs: 400, md: 550 } }}
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* Section 2: Craftsmanship - Reversed Layout */}
            <Box sx={{ bgcolor: '#f5f5f5', py: { xs: 8, md: 16 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={{ xs: 4, md: 10 }} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid item xs={12} md={6}>
                            <AnimatedImage
                                src={LOCAL_IMAGES.story2}
                                alt="Craftsmanship"
                                sx={{ height: { xs: 400, md: 550 } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <AnimatedSection delay={0} direction="right">
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: TIFFANY_BLUE,
                                        letterSpacing: 4,
                                        fontSize: '0.75rem',
                                        mb: 2,
                                        display: 'block',
                                        fontFamily: '"Inter", sans-serif',
                                    }}
                                >
                                    SỰ TINH XẢO
                                </Typography>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontFamily: '"Be Vietnam Pro", sans-serif',
                                        fontWeight: 400,
                                        fontSize: { xs: '2rem', md: '3.5rem' },
                                        mb: 4,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Nghệ thuật Thủ công
                                </Typography>
                            </AnimatedSection>
                            <AnimatedSection delay={0.2} direction="right">
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 2,
                                        fontSize: '1.05rem',
                                        mb: 4,
                                        fontFamily: '"Inter", sans-serif',
                                    }}
                                >
                                    Mỗi tác phẩm của chúng tôi đều được chế tác bởi những nghệ nhân
                                    bậc thầy, sử dụng những kỹ thuật truyền thống được truyền lại
                                    qua nhiều thế hệ, kết hợp với công nghệ hiện đại tiên tiến nhất.
                                </Typography>
                            </AnimatedSection>
                            <AnimatedSection delay={0.4} direction="right">
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 2,
                                        fontSize: '1.05rem',
                                        fontFamily: '"Inter", sans-serif',
                                    }}
                                >
                                    Từ việc lựa chọn những viên kim cương hoàn hảo nhất đến quy trình
                                    đánh bóng tỉ mỉ từng chi tiết, chúng tôi cam kết mang đến sự hoàn mỹ
                                    trong từng sản phẩm.
                                </Typography>
                            </AnimatedSection>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Section 3: Full Width Quote with Parallax */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '60vh', md: '80vh' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={LOCAL_IMAGES.blueBox}
                    alt="MAJewelry Collection"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(10,186,181,0.3) 0%, rgba(0,0,0,0.5) 100%)',
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <AnimatedSection>
                        <Typography
                            sx={{
                                fontFamily: '"Be Vietnam Pro", sans-serif',
                                fontStyle: 'italic',
                                color: '#fff',
                                fontWeight: 400,
                                fontSize: { xs: '1.5rem', md: '2.5rem' },
                                lineHeight: 1.6,
                                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                            }}
                        >
                            "Mỗi viên kim cương đều có câu chuyện riêng,<br />
                            và chúng tôi tạo ra những câu chuyện đẹp nhất"
                        </Typography>
                        <Typography
                            sx={{
                                color: 'rgba(255,255,255,0.8)',
                                mt: 3,
                                fontSize: '0.9rem',
                                letterSpacing: 3,
                                fontFamily: '"Inter", sans-serif',
                            }}
                        >
                            — MAJEWELRY —
                        </Typography>
                    </AnimatedSection>
                </Container>
            </Box>

            {/* Section 4: Sustainability */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 16 } }}>
                <Grid container spacing={{ xs: 4, md: 10 }} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <AnimatedSection delay={0}>
                            <Typography
                                variant="overline"
                                sx={{
                                    color: TIFFANY_BLUE,
                                    letterSpacing: 4,
                                    fontSize: '0.75rem',
                                    mb: 2,
                                    display: 'block',
                                    fontFamily: '"Inter", sans-serif',
                                }}
                            >
                                TRÁCH NHIỆM
                            </Typography>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontFamily: '"Be Vietnam Pro", sans-serif',
                                    fontWeight: 400,
                                    fontSize: { xs: '2rem', md: '3.5rem' },
                                    mb: 4,
                                    lineHeight: 1.2,
                                }}
                            >
                                Cam kết Bền vững
                            </Typography>
                        </AnimatedSection>
                        <AnimatedSection delay={0.2}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 2,
                                    fontSize: '1.05rem',
                                    mb: 4,
                                    fontFamily: '"Inter", sans-serif',
                                }}
                            >
                                Chúng tôi tin rằng vẻ đẹp thực sự đến từ sự có trách nhiệm.
                                Tất cả nguyên liệu của chúng tôi đều được khai thác và chế biến
                                theo các tiêu chuẩn đạo đức nghiêm ngặt nhất.
                            </Typography>
                        </AnimatedSection>
                        <AnimatedSection delay={0.4}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 2,
                                    fontSize: '1.05rem',
                                    fontFamily: '"Inter", sans-serif',
                                }}
                            >
                                Từ vàng được tái chế đến kim cương có nguồn gốc minh bạch,
                                mỗi sản phẩm đều phản ánh cam kết của chúng tôi với một tương lai bền vững hơn.
                            </Typography>
                        </AnimatedSection>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <AnimatedImage
                            src={LOCAL_IMAGES.feature}
                            alt="Sustainability"
                            sx={{ height: { xs: 400, md: 550 } }}
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* CTA Section with Animated Background */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
                    py: { xs: 10, md: 14 },
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, ${TIFFANY_BLUE}, transparent)`,
                    },
                }}
            >
                {/* Decorative Elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '5%',
                        opacity: 0.1,
                        animation: 'float 6s ease-in-out infinite',
                        '@keyframes float': {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' },
                        },
                    }}
                >
                    <Diamond size={80} color="#fff" />
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '5%',
                        opacity: 0.1,
                        animation: 'float 6s ease-in-out infinite 3s',
                    }}
                >
                    <Sparkles size={60} color="#fff" />
                </Box>

                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                    <AnimatedSection>
                        <Typography
                            variant="h3"
                            sx={{
                                fontFamily: '"Be Vietnam Pro", sans-serif',
                                color: '#fff',
                                fontWeight: 400,
                                fontSize: { xs: '2rem', md: '3rem' },
                                mb: 3,
                            }}
                        >
                            Khám phá Bộ sưu tập
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255,255,255,0.7)',
                                mb: 5,
                                lineHeight: 1.8,
                                fontSize: '1.1rem',
                                fontFamily: '"Inter", sans-serif',
                            }}
                        >
                            Tìm kiếm món trang sức hoàn hảo cho bạn hoặc người bạn yêu thương.
                        </Typography>
                        <Button
                            onClick={() => navigate('/jewelry')}
                            sx={{
                                color: '#fff',
                                fontSize: '0.9rem',
                                letterSpacing: '0.15em',
                                fontWeight: 500,
                                px: 5,
                                py: 2,
                                border: `1px solid ${TIFFANY_BLUE}`,
                                borderRadius: 0,
                                fontFamily: '"Inter", sans-serif',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.4s ease',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: '-100%',
                                    width: '100%',
                                    height: '100%',
                                    bgcolor: TIFFANY_BLUE,
                                    transition: 'left 0.4s ease',
                                    zIndex: -1,
                                },
                                '&:hover': {
                                    color: '#fff',
                                    '&::before': {
                                        left: 0,
                                    },
                                },
                            }}
                            endIcon={<ChevronRight size={18} />}
                        >
                            XEM BỘ SƯU TẬP
                        </Button>
                    </AnimatedSection>
                </Container>
            </Box>
        </Box>
    );
}

export default AboutPage;
