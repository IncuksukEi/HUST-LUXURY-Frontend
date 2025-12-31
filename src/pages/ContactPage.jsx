import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
} from '@mui/material';
import { Phone, Calendar, Video, Mail, MapPin, Clock, ChevronRight, MessageCircle } from 'lucide-react';

const TIFFANY_BLUE = '#0ABAB5';

// Local Static Assets
const LOCAL_IMAGES = {
    jewelry: '/image/contact-tiffany-rings.webp',
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

// Contact List Item Component - Tiffany style
const ContactListItem = ({ icon: Icon, title, subtitle, onClick, index = 0 }) => {
    const [ref, isVisible] = useScrollAnimation(0.1);

    return (
        <Box
            ref={ref}
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 2.5,
                px: 0,
                cursor: 'pointer',
                borderBottom: '1px solid #e5e5e5',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                '&:hover': {
                    '& .contact-icon': { color: TIFFANY_BLUE },
                    '& .contact-title': { color: TIFFANY_BLUE },
                    '& .contact-arrow': { transform: 'translateX(6px)', color: TIFFANY_BLUE },
                },
            }}
        >
            <Icon
                className="contact-icon"
                size={20}
                strokeWidth={1.5}
                style={{ color: '#333', flexShrink: 0, transition: 'color 0.3s ease' }}
            />
            <Box sx={{ flex: 1 }}>
                <Typography
                    className="contact-title"
                    sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        transition: 'color 0.3s ease',
                    }}
                >
                    {title}
                    {subtitle && (
                        <Typography
                            component="span"
                            sx={{
                                ml: 1,
                                fontWeight: 400,
                                fontSize: '0.85rem',
                                color: 'text.secondary',
                                textTransform: 'none',
                                letterSpacing: 0,
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Typography>
            </Box>
            <ChevronRight
                className="contact-arrow"
                size={18}
                style={{ color: '#999', flexShrink: 0, transition: 'all 0.3s ease' }}
            />
        </Box>
    );
};

// Store Card Component with enhanced hover effects
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
                p: { xs: 4, md: 5 },
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
                    height: '4px',
                    bgcolor: TIFFANY_BLUE,
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s ease',
                },
                boxShadow: isHovered
                    ? '0 15px 50px rgba(0,0,0,0.12)'
                    : '0 2px 20px rgba(0,0,0,0.04)',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontWeight: 500,
                    fontSize: '1.5rem',
                    mb: 4,
                    color: isHovered ? TIFFANY_BLUE : '#000',
                    transition: 'color 0.3s ease',
                }}
            >
                {city}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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

export function ContactPage() {
    // Action handlers
    const handleCall = () => window.location.href = 'tel:+84123456789';
    const handleBookAppointment = () => console.log('Navigate to booking');
    const handleVirtualAppointment = () => console.log('Navigate to virtual');
    const handleEmail = () => window.location.href = 'mailto:contact@majewelry.com';
    const handleText = () => console.log('Open text chat');

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
            {/* Main Content - Two Columns: Title+Contact List + Image */}
            <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 8, md: 12 } }}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: { xs: 6, md: 10 },
                            alignItems: 'flex-start',
                        }}
                    >
                        {/* Left Column - Title + Description + Contact Options List */}
                        <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 40%' } }}>
                            {/* Title */}
                            <Typography
                                variant="h2"
                                sx={{
                                    fontFamily: '"Be Vietnam Pro", sans-serif',
                                    fontWeight: 400,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    mb: 3,
                                    color: '#000',
                                }}
                            >
                                Liên hệ
                            </Typography>
                            {/* Description */}
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.9,
                                    fontFamily: '"Inter", sans-serif',
                                    fontSize: '0.95rem',
                                    mb: 5,
                                }}
                            >
                                Không có câu hỏi nào quá nhỏ hay yêu cầu nào quá lớn với đội ngũ tư vấn viên của chúng tôi.
                                Từ việc chọn nhẫn đính hôn hay quà tặng đến đặt lịch hẹn tại cửa hàng hoặc trực tuyến — chúng tôi luôn sẵn sàng phục vụ.
                            </Typography>
                            {/* Contact Options List */}
                            <Box>
                                <ContactListItem
                                    icon={Phone}
                                    title="Gọi cho chúng tôi"
                                    subtitle="(+84 123 456 789)"
                                    onClick={handleCall}
                                    index={0}
                                />
                                <ContactListItem
                                    icon={Calendar}
                                    title="Đặt lịch hẹn"
                                    onClick={handleBookAppointment}
                                    index={1}
                                />
                                <ContactListItem
                                    icon={Video}
                                    title="Tư vấn trực tuyến"
                                    onClick={handleVirtualAppointment}
                                    index={2}
                                />
                                <ContactListItem
                                    icon={Mail}
                                    title="Gửi email"
                                    onClick={handleEmail}
                                    index={3}
                                />
                                <ContactListItem
                                    icon={MessageCircle}
                                    title="Nhắn tin"
                                    onClick={handleText}
                                    index={4}
                                />
                            </Box>
                        </Box>

                        {/* Right Column - Jewelry Image */}
                        <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 60%' } }}>
                            <Box
                                component="img"
                                src={LOCAL_IMAGES.jewelry}
                                alt="MAJewelry Diamond Rings"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Showroom Section */}
            <Box
                sx={{
                    bgcolor: '#f8f8f8',
                    py: { xs: 10, md: 14 },
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
                                fontSize: { xs: '2rem', md: '2.75rem' },
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

            {/* FAQ Section */}
            <Box
                sx={{
                    py: { xs: 10, md: 14 },
                    textAlign: 'center',
                    bgcolor: '#fff',
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
                            fontSize: { xs: '1.75rem', md: '2.25rem' },
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
