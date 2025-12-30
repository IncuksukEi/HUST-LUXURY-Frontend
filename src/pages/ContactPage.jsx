import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    Fade,
} from '@mui/material';
import { Phone, Calendar, Video, Mail, MapPin, Clock, ChevronRight, MessageCircle, Headphones } from 'lucide-react';

const TIFFANY_BLUE = '#0ABAB5';

// Local Static Assets - Updated with new Tiffany Diamond images
const LOCAL_IMAGES = {
    hero: '/image/tiffany-diamond-hero.webp',
    contact: '/image/tiffany-diamond-feature1.webp',
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

// Animated Contact Method Card with enhanced effects
const ContactMethodCard = ({ icon: Icon, title, description, action, actionLabel, index = 0 }) => {
    const [ref, isVisible] = useScrollAnimation(0.15);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                p: { xs: 3, md: 4 },
                border: '1px solid #e0e0e0',
                bgcolor: '#fff',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    bgcolor: TIFFANY_BLUE,
                    transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, transparent 0%, rgba(10, 186, 181, 0.03) 100%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                },
            }}
            onClick={action}
        >
            {/* Icon with glow effect */}
            <Box
                sx={{
                    display: 'inline-flex',
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: isHovered ? 'rgba(10, 186, 181, 0.1)' : '#f8f8f8',
                    transition: 'all 0.4s ease',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
            >
                <Icon
                    size={28}
                    strokeWidth={1.5}
                    color={isHovered ? TIFFANY_BLUE : '#333'}
                    style={{ transition: 'color 0.3s ease' }}
                />
            </Box>

            <Typography
                variant="h6"
                sx={{
                    mt: 3,
                    mb: 1.5,
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontWeight: 500,
                    fontSize: '1.25rem',
                    color: isHovered ? TIFFANY_BLUE : '#000',
                    transition: 'color 0.3s ease',
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary',
                    mb: 3,
                    lineHeight: 1.8,
                    fontFamily: '"Inter", sans-serif',
                }}
            >
                {description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                    component="span"
                    sx={{
                        color: isHovered ? TIFFANY_BLUE : '#000',
                        fontSize: '0.85rem',
                        letterSpacing: '0.1em',
                        fontWeight: 500,
                        fontFamily: '"Inter", sans-serif',
                        transition: 'color 0.3s ease',
                    }}
                >
                    {actionLabel}
                </Typography>
                <ChevronRight
                    size={16}
                    color={isHovered ? TIFFANY_BLUE : '#000'}
                    style={{
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'all 0.3s ease',
                    }}
                />
            </Box>
        </Box>
    );
};

// Store Card Component
const StoreCard = ({ city, address, hours, phone, index = 0 }) => {
    const [ref, isVisible] = useScrollAnimation(0.2);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                bgcolor: '#fff',
                p: { xs: 3, md: 4 },
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    bgcolor: TIFFANY_BLUE,
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s ease',
                },
                boxShadow: isHovered ? '0 10px 40px rgba(0,0,0,0.08)' : 'none',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontWeight: 500,
                    fontSize: '1.35rem',
                    mb: 3,
                    color: isHovered ? TIFFANY_BLUE : '#000',
                    transition: 'color 0.3s ease',
                }}
            >
                {city}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <MapPin
                        size={20}
                        strokeWidth={1.5}
                        color={TIFFANY_BLUE}
                        style={{ marginTop: 2, flexShrink: 0 }}
                    />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7, fontFamily: '"Inter", sans-serif' }}
                    >
                        {address}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Clock
                        size={20}
                        strokeWidth={1.5}
                        color={TIFFANY_BLUE}
                        style={{ marginTop: 2, flexShrink: 0 }}
                    />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7, fontFamily: '"Inter", sans-serif' }}
                    >
                        {hours}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Phone
                        size={20}
                        strokeWidth={1.5}
                        color={TIFFANY_BLUE}
                        style={{ marginTop: 2, flexShrink: 0 }}
                    />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7, fontFamily: '"Inter", sans-serif' }}
                    >
                        {phone}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

function ContactPage() {
    const [heroLoaded, setHeroLoaded] = useState(false);

    useEffect(() => {
        setHeroLoaded(true);
    }, []);

    const handleCall = () => {
        window.location.href = 'tel:+84123456789';
    };

    const handleBookAppointment = () => {
        window.open('https://calendly.com', '_blank');
    };

    const handleVirtualAppointment = () => {
        window.open('https://meet.google.com', '_blank');
    };

    const handleEmail = () => {
        window.location.href = 'mailto:contact@majewelry.com';
    };

    return (
        <Box sx={{ bgcolor: '#fff', overflow: 'hidden' }}>
            {/* Hero Section with Background Image */}
            <Box
                sx={{
                    position: 'relative',
                    py: { xs: 8, sm: 10, md: 14 },
                    textAlign: 'center',
                    minHeight: { xs: '50vh', sm: '55vh', md: '60vh' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Background Image */}
                <Box
                    component="img"
                    src={LOCAL_IMAGES.hero}
                    alt=""
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 0,
                    }}
                />
                {/* Dark Overlay for text readability */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 100%)',
                        zIndex: 1,
                    }}
                />
                {/* Animated radial gradient pulse effect */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '200%',
                        height: '200%',
                        background: `radial-gradient(ellipse at center, rgba(10, 186, 181, 0.15) 0%, transparent 50%)`,
                        animation: 'pulse 8s ease-in-out infinite',
                        zIndex: 2,
                        '@keyframes pulse': {
                            '0%, 100%': { transform: 'translateX(-50%) scale(1)', opacity: 0.5 },
                            '50%': { transform: 'translateX(-50%) scale(1.2)', opacity: 1 },
                        },
                    }}
                />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10 }}>
                    <Fade in={heroLoaded} timeout={800}>
                        <Typography
                            variant="overline"
                            sx={{
                                letterSpacing: 5,
                                fontSize: '0.8rem',
                                color: TIFFANY_BLUE,
                                mb: 2,
                                display: 'block',
                                fontFamily: '"Inter", sans-serif',
                            }}
                        >
                            LIÊN HỆ
                        </Typography>
                    </Fade>
                    <Fade in={heroLoaded} timeout={1200}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontFamily: '"Be Vietnam Pro", sans-serif',
                                fontWeight: 400,
                                fontSize: { xs: '2.5rem', md: '4rem' },
                                mb: 3,
                                color: '#fff',
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                            }}
                        >
                            Liên hệ với chúng tôi
                        </Typography>
                    </Fade>
                </Container>
            </Box>

            {/* Main Content - Contact Options 4 Columns using MUI Grid */}
            <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: '#fafafa' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {/* Card 1: Phone */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Box
                                onClick={handleCall}
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    height: '100%',
                                    minHeight: 280,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 2,
                                    bgcolor: '#fff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        borderColor: TIFFANY_BLUE,
                                        '& .card-icon': { color: TIFFANY_BLUE },
                                        '& .card-title': { color: TIFFANY_BLUE },
                                        '& .card-action': { transform: 'translateX(8px)' },
                                    },
                                }}
                            >
                                <Phone className="card-icon" size={36} strokeWidth={1.5} style={{ color: '#333', transition: 'color 0.3s ease' }} />
                                <Typography
                                    className="card-title"
                                    variant="h6"
                                    sx={{
                                        mt: 3,
                                        mb: 1.5,
                                        fontFamily: '"Be Vietnam Pro", sans-serif',
                                        fontWeight: 500,
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Gọi cho chúng tôi
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', mb: 2, fontFamily: '"Inter", sans-serif', fontSize: '0.875rem' }}
                                >
                                    Thứ 2 - Thứ 7, 9:00 - 21:00
                                </Typography>
                                <Box className="card-action" sx={{ display: 'flex', alignItems: 'center', gap: 1, transition: 'transform 0.3s ease', mt: 'auto' }}>
                                    <Typography sx={{ fontWeight: 600, letterSpacing: '0.03em', fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', color: TIFFANY_BLUE }}>
                                        +84 123 456 789
                                    </Typography>
                                    <ChevronRight size={16} color={TIFFANY_BLUE} />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Card 2: Appointment */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Box
                                onClick={handleBookAppointment}
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    height: '100%',
                                    minHeight: 280,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 2,
                                    bgcolor: '#fff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        borderColor: TIFFANY_BLUE,
                                        '& .card-icon': { color: TIFFANY_BLUE },
                                        '& .card-title': { color: TIFFANY_BLUE },
                                        '& .card-action': { transform: 'translateX(8px)' },
                                    },
                                }}
                            >
                                <Calendar className="card-icon" size={36} strokeWidth={1.5} style={{ color: '#333', transition: 'color 0.3s ease' }} />
                                <Typography
                                    className="card-title"
                                    variant="h6"
                                    sx={{
                                        mt: 3,
                                        mb: 1.5,
                                        fontFamily: '"Be Vietnam Pro", sans-serif',
                                        fontWeight: 500,
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Đặt lịch hẹn
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', mb: 2, fontFamily: '"Inter", sans-serif', fontSize: '0.875rem' }}
                                >
                                    Trải nghiệm dịch vụ cá nhân hóa
                                </Typography>
                                <Box className="card-action" sx={{ display: 'flex', alignItems: 'center', gap: 1, transition: 'transform 0.3s ease', mt: 'auto' }}>
                                    <Typography sx={{ fontWeight: 600, letterSpacing: '0.03em', fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', color: TIFFANY_BLUE }}>
                                        ĐẶT LỊCH HẸN
                                    </Typography>
                                    <ChevronRight size={16} color={TIFFANY_BLUE} />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Card 3: Virtual */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Box
                                onClick={handleVirtualAppointment}
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    height: '100%',
                                    minHeight: 280,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 2,
                                    bgcolor: '#fff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        borderColor: TIFFANY_BLUE,
                                        '& .card-icon': { color: TIFFANY_BLUE },
                                        '& .card-title': { color: TIFFANY_BLUE },
                                        '& .card-action': { transform: 'translateX(8px)' },
                                    },
                                }}
                            >
                                <Video className="card-icon" size={36} strokeWidth={1.5} style={{ color: '#333', transition: 'color 0.3s ease' }} />
                                <Typography
                                    className="card-title"
                                    variant="h6"
                                    sx={{
                                        mt: 3,
                                        mb: 1.5,
                                        fontFamily: '"Be Vietnam Pro", sans-serif',
                                        fontWeight: 500,
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Tư vấn trực tuyến
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', mb: 2, fontFamily: '"Inter", sans-serif', fontSize: '0.875rem' }}
                                >
                                    Kết nối video với chuyên gia
                                </Typography>
                                <Box className="card-action" sx={{ display: 'flex', alignItems: 'center', gap: 1, transition: 'transform 0.3s ease', mt: 'auto' }}>
                                    <Typography sx={{ fontWeight: 600, letterSpacing: '0.03em', fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', color: TIFFANY_BLUE }}>
                                        ĐẶT LỊCH TƯ VẤN
                                    </Typography>
                                    <ChevronRight size={16} color={TIFFANY_BLUE} />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Card 4: Email */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Box
                                onClick={handleEmail}
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    height: '100%',
                                    minHeight: 280,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 2,
                                    bgcolor: '#fff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        borderColor: TIFFANY_BLUE,
                                        '& .card-icon': { color: TIFFANY_BLUE },
                                        '& .card-title': { color: TIFFANY_BLUE },
                                        '& .card-action': { transform: 'translateX(8px)' },
                                    },
                                }}
                            >
                                <Mail className="card-icon" size={36} strokeWidth={1.5} style={{ color: '#333', transition: 'color 0.3s ease' }} />
                                <Typography
                                    className="card-title"
                                    variant="h6"
                                    sx={{
                                        mt: 3,
                                        mb: 1.5,
                                        fontFamily: '"Be Vietnam Pro", sans-serif',
                                        fontWeight: 500,
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Gửi email
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', mb: 2, fontFamily: '"Inter", sans-serif', fontSize: '0.875rem' }}
                                >
                                    Phản hồi trong 24 giờ làm việc
                                </Typography>
                                <Box className="card-action" sx={{ display: 'flex', alignItems: 'center', gap: 1, transition: 'transform 0.3s ease', mt: 'auto' }}>
                                    <Typography sx={{ fontWeight: 600, letterSpacing: '0.03em', fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', color: TIFFANY_BLUE }}>
                                        CONTACT@MAJEWELRY.COM
                                    </Typography>
                                    <ChevronRight size={16} color={TIFFANY_BLUE} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Store Information Section */}
            <Box
                sx={{
                    bgcolor: '#fafafa',
                    py: { xs: 10, md: 14 },
                    position: 'relative',
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
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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
                            GHÉ THĂM CHÚNG TÔI
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: '"Be Vietnam Pro", sans-serif',
                                fontWeight: 400,
                                fontSize: { xs: '2rem', md: '3rem' },
                            }}
                        >
                            Showroom của chúng tôi
                        </Typography>
                    </Box>

                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={5}>
                            <StoreCard
                                city="Hà Nội"
                                address="Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội"
                                hours="Thứ 2 - Chủ nhật: 9:00 - 21:00"
                                phone="+84 24 1234 5678"
                                index={0}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <StoreCard
                                city="TP. Hồ Chí Minh"
                                address="268 Lý Thường Kiệt, Quận 10, TP.HCM"
                                hours="Thứ 2 - Chủ nhật: 9:00 - 22:00"
                                phone="+84 28 1234 5678"
                                index={1}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* FAQ Teaser with Animation */}
            <Box
                sx={{
                    py: { xs: 10, md: 14 },
                    textAlign: 'center',
                    position: 'relative',
                    background: 'linear-gradient(180deg, #fff 0%, #fafafa 100%)',
                }}
            >
                <Container maxWidth="sm">
                    <Box
                        sx={{
                            display: 'inline-flex',
                            p: 2,
                            borderRadius: '50%',
                            bgcolor: 'rgba(10, 186, 181, 0.1)',
                            mb: 4,
                        }}
                    >
                        <MessageCircle size={32} color={TIFFANY_BLUE} />
                    </Box>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: '"Be Vietnam Pro", sans-serif',
                            fontWeight: 400,
                            fontSize: { xs: '1.75rem', md: '2.5rem' },
                            mb: 3,
                        }}
                    >
                        Câu hỏi thường gặp
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            mb: 5,
                            lineHeight: 1.9,
                            fontFamily: '"Inter", sans-serif',
                        }}
                    >
                        Tìm câu trả lời cho các câu hỏi về vận chuyển, đổi trả,
                        bảo hành và nhiều thông tin khác.
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            color: '#000',
                            borderColor: '#000',
                            borderRadius: 0,
                            px: 5,
                            py: 1.5,
                            fontSize: '0.85rem',
                            letterSpacing: '0.15em',
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
                                bgcolor: '#000',
                                transition: 'left 0.4s ease',
                                zIndex: -1,
                            },
                            '&:hover': {
                                color: '#fff',
                                borderColor: '#000',
                                '&::before': {
                                    left: 0,
                                },
                            },
                        }}
                    >
                        XEM FAQ
                    </Button>
                </Container>
            </Box>
        </Box >
    );
}

export default ContactPage;
