import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { 
    Box, Container, Grid, Typography, Button, IconButton, 
    Checkbox, FormControlLabel, Menu, Chip, Fade, Drawer, useMediaQuery, useTheme
} from '@mui/material';
import { 
    ChevronDown, ChevronUp, X, Heart, Filter
} from 'lucide-react';

// --- 1. CONSTANTS & MOCK DATA ---
const COLLECTIONS = ['Tiffany T', 'Tiffany HardWear', 'Elsa Peretti', 'Tiffany Lock', 'Tiffany Knot'];
const MATERIALS = ['Yellow Gold', 'Rose Gold', 'White Gold', 'Sterling Silver', 'Platinum'];
const GEMSTONES = ['Diamond', 'Sapphire', 'Ruby', 'Mother-of-pearl', 'No Gemstones'];
const SORT_OPTIONS = ['Recommendations', 'New to Tiffany', 'Price High to Low', 'Price Low to High'];

// Tạo data giả lập nhiều ảnh để test tính năng Carousel
const MOCK_PRODUCTS = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? `Tiffany T Smile Pendant` : `Tiffany Lock Pendant`,
    // Description chỉ hiện khi hover
    description: i % 2 === 0 
        ? "Graphic angles and clean lines blend to create the beautiful clarity of the Tiffany T collection." 
        : "Inspired by the power of togetherness and inclusivity, Tiffany Lock is a bold and visual statement about the personal bonds that make us who we are.",
    price: `$${(Math.random() * 5000 + 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    collection: COLLECTIONS[i % COLLECTIONS.length], 
    material: MATERIALS[i % MATERIALS.length],
    gemstone: GEMSTONES[i % GEMSTONES.length],
    isNew: i < 5, 
    // Mỗi sản phẩm chỉ có 1 ảnh
    image: ['/image/necklaces-1.webp', '/image/necklaces-2.webp', '/image/necklaces-3.webp', '/image/necklaces-4.webp'][i % 4]
}));

// --- 2. FILTER COMPONENT (Desktop Dropdown) ---
const FilterDropdown = ({ label, options, selected, onToggle }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    return (
        <Box>
            <Box onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 0.5, userSelect: 'none' }}>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: open ? 600 : 400 }}>{label}</Typography>
                {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} elevation={0} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }} sx={{ mt: 1, '& .MuiPaper-root': { borderRadius: 0, border: '1px solid #e0e0e0', minWidth: 220, p: 2, maxHeight: 350, boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' } }}>
                {options.map((opt) => (
                    <Box key={opt} sx={{ py: 0.5 }}>
                        <FormControlLabel control={<Checkbox size="small" checked={selected.includes(opt)} onChange={() => onToggle(opt)} sx={{ color: '#ccc', '&.Mui-checked': { color: '#000' } }} />} label={<Typography variant="body2">{opt}</Typography>} />
                    </Box>
                ))}
            </Menu>
        </Box>
    );
};

// --- 2b. FILTER SECTION COMPONENT (for Mobile Sidebar) ---
const FilterSection = ({ title, options, selected, onToggle, sectionKey, expandedSections, onToggleSection }) => {
    const isExpanded = expandedSections[sectionKey];
    return (
        <Box sx={{ borderBottom: '1px solid #f0f0f0', py: 2 }}>
            <Box 
                onClick={() => onToggleSection(sectionKey)}
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    mb: isExpanded ? 2 : 0
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    {title}
                </Typography>
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Box>
            {isExpanded && (
                <Box sx={{ pl: 0 }}>
                    {options.map((opt) => (
                        <Box key={opt} sx={{ py: 0.75 }}>
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        size="small" 
                                        checked={selected.includes(opt)} 
                                        onChange={() => onToggle(opt)} 
                                        sx={{ color: '#ccc', '&.Mui-checked': { color: '#000' } }} 
                                    />
                                } 
                                label={<Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{opt}</Typography>} 
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

// --- 2c. MOBILE FILTER SIDEBAR ---
const MobileFilterSidebar = ({ 
    open, 
    onClose, 
    collections, 
    materials, 
    gemstones,
    selectedCollections,
    selectedMaterials,
    selectedGemstones,
    onToggleCollection,
    onToggleMaterial,
    onToggleGemstone,
    onClearAll
}) => {
    const [expandedSections, setExpandedSections] = useState({
        collections: true,
        materials: false,
        gemstones: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '85%', sm: '400px' },
                    maxWidth: '400px',
                    borderRadius: 0
                }
            }}
        >
            <Box sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
                {/* Header with Close Button */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                        Filter
                    </Typography>
                    <IconButton onClick={onClose} sx={{ p: 0 }}>
                        <X size={20} />
                    </IconButton>
                </Box>

                {/* Clear All Button */}
                {(selectedCollections.length > 0 || selectedMaterials.length > 0 || selectedGemstones.length > 0) && (
                    <Button 
                        variant="text" 
                        onClick={onClearAll}
                        sx={{ 
                            textTransform: 'none', 
                            color: '#666', 
                            fontSize: '0.85rem', 
                            textDecoration: 'underline',
                            mb: 2,
                            p: 0,
                            minWidth: 'auto',
                            '&:hover': { bgcolor: 'transparent', color: '#000' }
                        }}
                    >
                        Clear All
                    </Button>
                )}

                {/* Filter Sections */}
                <FilterSection
                    title="Designers & Collections"
                    options={collections}
                    selected={selectedCollections}
                    onToggle={onToggleCollection}
                    sectionKey="collections"
                    expandedSections={expandedSections}
                    onToggleSection={toggleSection}
                />
                <FilterSection
                    title="Materials"
                    options={materials}
                    selected={selectedMaterials}
                    onToggle={onToggleMaterial}
                    sectionKey="materials"
                    expandedSections={expandedSections}
                    onToggleSection={toggleSection}
                />
                <FilterSection
                    title="Gemstones"
                    options={gemstones}
                    selected={selectedGemstones}
                    onToggle={onToggleGemstone}
                    sectionKey="gemstones"
                    expandedSections={expandedSections}
                    onToggleSection={toggleSection}
                />
            </Box>
        </Drawer>
    );
};

// --- 3. PRODUCT CARD (Logic Tiffany Style) ---
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false); 

    // Mỗi sản phẩm chỉ có 1 ảnh
    const productImage = product.image || product.images?.[0] || '/placeholder.png';

    return (
        // [WRAPPER]: Giữ vị trí trong Grid. 
        // Height phải đủ lớn để chứa phần cơ bản (Ảnh + Tên + Giá) để layout không bị gãy.
        <Box 
            sx={{ 
                position: 'relative', 
                width: '100%',
                height: { xs: 'auto', md: '400px' }, // Fixed height để giữ layout ổn định, giảm xuống để khoảng cách nhỏ hơn
                mb: 0,
                overflow: { xs: 'visible', md: 'visible' } // Cho phép hover card đè lên
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            {/* [BASE CARD]: Card cơ bản chỉ hiện ảnh khi không hover */}
            <Box 
                onClick={() => navigate(`/jewelry/shop/shop/${product.id}`)}
                sx={{ 
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    p: { xs: 0.5, md: 1 },
                    bgcolor: '#fff',
                    cursor: 'pointer',
                    zIndex: 1
                }}
            >
                {/* Wishlist Icon - Luôn hiện trên base card */}
                <IconButton
                    onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
                    sx={{ 
                        position: 'absolute', 
                        top: { xs: 5, md: 12 }, 
                        right: { xs: 5, md: 12 }, 
                        zIndex: 10,
                        color: isLiked ? '#d32f2f' : '#999',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        width: { xs: 28, md: 32 },
                        height: { xs: 28, md: 32 },
                        opacity: { xs: 1, md: isHovered ? 0 : 1 }, // Ẩn khi hover để hiện trên hover card
                        transition: 'opacity 0.3s ease',
                        '&:hover': { 
                            bgcolor: 'rgba(255, 255, 255, 1)'
                        }
                    }}
                >
                    <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={1.5} />
                </IconButton>

                {/* New Tag - Luôn hiện trên base card */}
                {product.isNew && (
                    <Box sx={{ 
                        position: 'absolute', 
                        top: { xs: 8, md: 12 }, 
                        left: { xs: 8, md: 12 }, 
                        zIndex: 10,
                        bgcolor: '#fff',
                        border: '1px solid #000',
                        px: 1,
                        py: 0.25,
                        opacity: { xs: 1, md: isHovered ? 0 : 1 }, // Ẩn khi hover để hiện trên hover card
                        transition: 'opacity 0.3s ease'
                    }}>
                        <Typography sx={{ 
                            fontSize: '0.65rem', 
                            fontWeight: 700, 
                            letterSpacing: '0.05em', 
                            textTransform: 'uppercase',
                            color: '#000',
                            lineHeight: 1.2
                        }}>
                            New
                        </Typography>
                    </Box>
                )}

                {/* 3. Image Area - Chỉ 1 ảnh */}
                <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%', bgcolor: '#f9f9f9' }}>
                    <Box component="img" 
                        src={productImage} 
                        alt={product.name}
                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }}
                    />
                </Box>
            </Box>

            {/* [HOVER CARD]: Card đè lên khi hover, hiện đầy đủ thông tin */}
            <Box 
                onClick={() => navigate(`/jewelry/shop/shop/${product.id}`)}
                sx={{ 
                    position: 'absolute',
                    top: { xs: 0, md: -8 },
                    left: { xs: 0, md: -8 },
                    right: { xs: 0, md: -8 },
                    p: { xs: 0.5, md: 1 },
                    bgcolor: '#fff',
                    // Border màu xanh nhạt khi hover (Tiffany style)
                    border: { 
                        xs: 'none', 
                        md: '2px solid #b3d9e6'
                    },
                    // Shadow nhẹ khi hover
                    boxShadow: { 
                        xs: 'none', 
                        md: '0px 4px 12px rgba(0,0,0,0.08)'
                    },
                    transition: 'opacity 0.3s ease-out',
                    cursor: 'pointer',
                    zIndex: { xs: 1, md: isHovered ? 100 : -1 }, // Đè lên khi hover
                    opacity: { xs: 1, md: isHovered ? 1 : 0 },
                    pointerEvents: { xs: 'auto', md: isHovered ? 'auto' : 'none' },
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    visibility: { xs: 'visible', md: isHovered ? 'visible' : 'hidden' }
                }}
            >
                {/* 1. Wishlist Icon (Góc phải trên) - Luôn hiển thị trên hover card */}
                <IconButton
                    onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
                    sx={{ 
                        position: 'absolute', 
                        top: { xs: 5, md: 12 }, 
                        right: { xs: 5, md: 12 }, 
                        zIndex: 15,
                        color: isLiked ? '#d32f2f' : '#999',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        width: { xs: 28, md: 32 },
                        height: { xs: 28, md: 32 },
                        '&:hover': { 
                            bgcolor: 'rgba(255, 255, 255, 1)'
                        }
                    }}
                >
                    <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={1.5} />
                </IconButton>

                {/* 2. New Tag (Góc trái trên) - Có viền bên ngoài */}
                {product.isNew && (
                    <Box sx={{ 
                        position: 'absolute', 
                        top: { xs: 8, md: 12 }, 
                        left: { xs: 8, md: 12 }, 
                        zIndex: 15,
                        bgcolor: '#fff',
                        border: '1px solid #000',
                        px: 1,
                        py: 0.25
                    }}>
                        <Typography sx={{ 
                            fontSize: '0.65rem', 
                            fontWeight: 700, 
                            letterSpacing: '0.05em', 
                            textTransform: 'uppercase',
                            color: '#000',
                            lineHeight: 1.2
                        }}>
                            New
                        </Typography>
                    </Box>
                )}

                {/* 3. Image Area - Trên hover card, scale nhỏ hơn */}
                <Box sx={{ 
                    position: 'relative', 
                    width: '100%', 
                    paddingTop: '100%', 
                    mb: 1.5, 
                    bgcolor: '#f9f9f9',
                    overflow: 'hidden'
                }}>
                    <Box component="img" 
                        src={productImage} 
                        alt={product.name}
                        sx={{ 
                            position: 'absolute', 
                            top: '50%', 
                            left: '50%', 
                            transform: 'translate(-50%, -50%) scale(0.85)',
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            mixBlendMode: 'multiply',
                            transition: 'transform 0.3s ease'
                        }}
                    />
                </Box>

                {/* 4. Product Info - Chỉ hiện khi hover */}
                <Box sx={{ 
                    textAlign: 'center', 
                    px: { xs: 0.5, md: 1 }, 
                    mt: { xs: 1, md: 1.5 },
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                }}>
                    <Typography variant="subtitle2" sx={{ 
                        fontFamily: 'Sterling Display A', 
                        fontSize: { xs: '0.85rem', md: '0.95rem' }, 
                        fontWeight: 500, 
                        mb: 0.5, 
                        lineHeight: 1.3,
                        color: '#000'
                    }}>
                        {product.collection}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                        fontSize: { xs: '0.8rem', md: '0.9rem' }, 
                        color: '#333', 
                        mb: 0.5,
                        lineHeight: 1.4
                    }}>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                        fontSize: { xs: '0.8rem', md: '0.9rem' }, 
                        color: '#666',
                        mb: 2
                    }}>
                        {product.price}
                    </Typography>

                    {/* Description */}
                    <Typography variant="caption" color="text.secondary" sx={{ 
                        display: 'block', 
                        mb: 2, 
                        lineHeight: 1.6, 
                        px: 1,
                        fontSize: '0.8rem',
                        color: '#666'
                    }}>
                        {product.material} with {product.gemstone}. <br/>
                        {product.description}
                    </Typography>

                    {/* View Details Button */}
                    <Button 
                        variant="outlined" 
                        fullWidth
                        sx={{ 
                            borderRadius: 0, 
                            color: '#000', 
                            borderColor: '#000', 
                            borderWidth: '1px',
                            textTransform: 'none', 
                            fontSize: '0.85rem', 
                            py: 1.25,
                            fontWeight: 400,
                            transition: 'all 0.2s ease',
                            '&:hover': { 
                                bgcolor: '#000', 
                                color: '#fff',
                                borderColor: '#000'
                            }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/jewelry/shop/shop/${product.id}`);
                        }}
                    >
                        View details
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

// --- 4. MAIN COMPONENT ---
const JewelryProduct = ({ products = MOCK_PRODUCTS }) => { 
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [searchParams, setSearchParams] = useSearchParams();
    
    const ITEMS_PER_PAGE = 12; // Số sản phẩm mỗi trang
    
    // Đọc page từ URL query parameter khi khởi tạo
    const [currentPage, setCurrentPage] = useState(() => {
        const page = parseInt(searchParams.get('page') || '1', 10);
        return page > 0 ? page : 1;
    });
    
    // Sync currentPage với URL khi URL thay đổi từ bên ngoài (như browser back/forward)
    useEffect(() => {
        const handlePopState = () => {
            const page = parseInt(searchParams.get('page') || '1', 10);
            if (page > 0) {
                setCurrentPage(page);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [searchParams]);
    
    // Helper function để cập nhật page và URL cùng lúc
    const updatePage = (newPage) => {
        setCurrentPage(newPage);
        const newSearchParams = new URLSearchParams(searchParams);
        if (newPage === 1) {
            newSearchParams.delete('page');
        } else {
            newSearchParams.set('page', newPage.toString());
        }
        setSearchParams(newSearchParams, { replace: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Filter State
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedGemstones, setSelectedGemstones] = useState([]);
    const [sortOption, setSortOption] = useState('Recommendations');
    const [anchorSort, setAnchorSort] = useState(null);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Helpers
    const toggleFilter = (item, currentList, setList) => {
        setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
        updatePage(1); // Reset về trang 1 khi filter thay đổi
    };
    const handleClearAll = () => {
        setSelectedCollections([]); setSelectedMaterials([]); setSelectedGemstones([]);
        updatePage(1);
    };

    // Filter Logic
    const filteredProducts = products.filter(p => {
        const colMatch = selectedCollections.length === 0 || (p.collection && selectedCollections.includes(p.collection));
        const matMatch = selectedMaterials.length === 0 || (p.material && selectedMaterials.includes(p.material));
        const gemMatch = selectedGemstones.length === 0 || (p.gemstone && selectedGemstones.includes(p.gemstone));
        return colMatch && matMatch && gemMatch;
    }).sort((a, b) => {
        // Simple sort logic demo
        if (sortOption === 'Price High to Low') return parseInt(b.price.replace(/\D/g,'')) - parseInt(a.price.replace(/\D/g,''));
        if (sortOption === 'Price Low to High') return parseInt(a.price.replace(/\D/g,'')) - parseInt(b.price.replace(/\D/g,''));
        if (sortOption === 'New to Tiffany') return b.isNew ? 1 : -1;
        return a.id - b.id; // Default
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    // Đảm bảo currentPage không vượt quá totalPages
    const validPage = totalPages > 0 ? Math.min(currentPage, Math.max(1, totalPages)) : 1;
    const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const visibleProducts = filteredProducts.slice(startIndex, endIndex);
    const hasActiveFilters = selectedCollections.length > 0 || selectedMaterials.length > 0 || selectedGemstones.length > 0;

    return (
        <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4, lg: 6 } }}>
            {/* Header & Breadcrumb */}
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', textTransform: 'uppercase', fontSize: { xs: '0.65rem', md: '0.7rem' }, letterSpacing: '0.1em' }}>
                Home &nbsp;/&nbsp; Jewelry &nbsp;/&nbsp; Necklaces & Pendants
            </Typography>
            <Typography variant="h4" sx={{ fontFamily: 'Sterling Display A', mb: { xs: 3, md: 4 }, fontWeight: 400, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                Necklaces & Pendants
            </Typography>

            {/* Filter Bar */}
            <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #f0f0f0' }}>
                {/* Mobile: Filter & Sort Buttons */}
                {isMobile ? (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setMobileFilterOpen(true)}
                            startIcon={<Filter size={16} />}
                            sx={{
                                flex: 1,
                                borderRadius: 0,
                                borderColor: '#000',
                                color: '#000',
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                py: 1,
                                '&:hover': { bgcolor: '#f5f5f5', borderColor: '#000' }
                            }}
                        >
                            Filter by
                            {hasActiveFilters && (
                                <Chip 
                                    label={selectedCollections.length + selectedMaterials.length + selectedGemstones.length}
                                    size="small"
                                    sx={{ 
                                        ml: 1, 
                                        height: 18, 
                                        minWidth: 18, 
                                        bgcolor: '#000', 
                                        color: '#fff',
                                        '& .MuiChip-label': { px: 0.5, fontSize: '0.7rem' }
                                    }}
                                />
                            )}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={(e) => setAnchorSort(e.currentTarget)}
                            endIcon={<ChevronDown size={16} />}
                            sx={{
                                flex: 1,
                                borderRadius: 0,
                                borderColor: '#000',
                                color: '#000',
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                py: 1,
                                '&:hover': { bgcolor: '#f5f5f5', borderColor: '#000' }
                            }}
                        >
                            Sort by
                        </Button>
                    </Box>
                ) : (
                    /* Desktop: Filter Dropdowns */
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ maxWidth: '80%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 2, flexWrap: 'wrap' }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Filter by:</Typography>
                                <FilterDropdown label="Designers & Collections" options={COLLECTIONS} selected={selectedCollections} onToggle={(val) => toggleFilter(val, selectedCollections, setSelectedCollections)} />
                                <FilterDropdown label="Materials" options={MATERIALS} selected={selectedMaterials} onToggle={(val) => toggleFilter(val, selectedMaterials, setSelectedMaterials)} />
                                <FilterDropdown label="Gemstones" options={GEMSTONES} selected={selectedGemstones} onToggle={(val) => toggleFilter(val, selectedGemstones, setSelectedGemstones)} />
                            </Box>

                            {/* Chips */}
                            {hasActiveFilters && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                                    <Button variant="text" size="small" onClick={handleClearAll} sx={{ textTransform: 'none', color: '#666', fontSize: '0.8rem', textDecoration: 'underline', '&:hover':{ bgcolor:'transparent', color:'#000'} }}>Clear All</Button>
                                    {[...selectedCollections, ...selectedMaterials, ...selectedGemstones].map(item => (
                                        <Chip key={item} label={item} onDelete={() => {
                                            if(selectedCollections.includes(item)) toggleFilter(item, selectedCollections, setSelectedCollections);
                                            else if(selectedMaterials.includes(item)) toggleFilter(item, selectedMaterials, setSelectedMaterials);
                                            else toggleFilter(item, selectedGemstones, setSelectedGemstones);
                                        }} deleteIcon={<X size={14} />} sx={{ bgcolor: '#f5f5f5', borderRadius: '4px', '& .MuiChip-label': { px: 1, fontSize: '0.75rem' } }} />
                                    ))}
                                </Box>
                            )}
                        </Box>

                        {/* Sort */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>Sort by:</Typography>
                            <Box onClick={(e) => setAnchorSort(e.currentTarget)} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{sortOption}</Typography>
                                <ChevronDown size={14} style={{ marginLeft: 4 }} />
                            </Box>
                        </Box>
                    </Box>
                )}

                {/* Mobile: Active Filter Chips */}
                {isMobile && hasActiveFilters && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                        <Button variant="text" size="small" onClick={handleClearAll} sx={{ textTransform: 'none', color: '#666', fontSize: '0.75rem', textDecoration: 'underline', p: 0, minWidth: 'auto', '&:hover':{ bgcolor:'transparent', color:'#000'} }}>Clear All</Button>
                        {[...selectedCollections, ...selectedMaterials, ...selectedGemstones].map(item => (
                            <Chip 
                                key={item} 
                                label={item} 
                                onDelete={() => {
                                    if(selectedCollections.includes(item)) toggleFilter(item, selectedCollections, setSelectedCollections);
                                    else if(selectedMaterials.includes(item)) toggleFilter(item, selectedMaterials, setSelectedMaterials);
                                    else toggleFilter(item, selectedGemstones, setSelectedGemstones);
                                }} 
                                deleteIcon={<X size={12} />} 
                                size="small"
                                sx={{ bgcolor: '#f5f5f5', borderRadius: '4px', '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } }} 
                            />
                        ))}
                    </Box>
                )}

                {/* Sort Menu (Shared for both mobile and desktop) */}
                <Menu anchorEl={anchorSort} open={Boolean(anchorSort)} onClose={() => setAnchorSort(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    {SORT_OPTIONS.map(opt => (
                        <Button key={opt} fullWidth onClick={() => { setSortOption(opt); setAnchorSort(null); }} sx={{ justifyContent: 'flex-start', color: '#000', textTransform: 'none', px: 2, py: 1, fontWeight: sortOption === opt ? 700 : 400 }}>
                            {opt}
                        </Button>
                    ))}
                </Menu>
            </Box>

            {/* Mobile Filter Sidebar */}
            <MobileFilterSidebar
                open={mobileFilterOpen}
                onClose={() => setMobileFilterOpen(false)}
                collections={COLLECTIONS}
                materials={MATERIALS}
                gemstones={GEMSTONES}
                selectedCollections={selectedCollections}
                selectedMaterials={selectedMaterials}
                selectedGemstones={selectedGemstones}
                onToggleCollection={(val) => {
                    toggleFilter(val, selectedCollections, setSelectedCollections);
                }}
                onToggleMaterial={(val) => {
                    toggleFilter(val, selectedMaterials, setSelectedMaterials);
                }}
                onToggleGemstone={(val) => {
                    toggleFilter(val, selectedGemstones, setSelectedGemstones);
                }}
                onClearAll={handleClearAll}
            />

            {/* Showing Info & View All */}
            {visibleProducts.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                        Showing {startIndex + 1} - {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
                    </Typography>
                    {totalPages > 1 && (
                        <Button
                            variant="text"
                            onClick={() => {
                                updatePage(totalPages);
                            }}
                            sx={{
                                textTransform: 'none',
                                color: '#000',
                                fontSize: { xs: '0.8rem', md: '0.875rem' },
                                textDecoration: 'underline',
                                p: 0,
                                minWidth: 'auto',
                                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                            }}
                        >
                            View All
                        </Button>
                    )}
                </Box>
            )}

            {/* PRODUCT GRID */}
            {visibleProducts.length > 0 ? (
                <Grid container spacing={0} sx={{ mx: -1 }}> 
                    {/* mx: -1 để bù lại padding của Grid Item nếu muốn khít hơn, hoặc dùng spacing={2} cho thoáng */}
                    {visibleProducts.map((product) => (
                        // size={{ xs: 6, md: 3 }} -> 4 cột trên Desktop, 2 cột trên Mobile
                        <Grid key={product.id} size={{ xs: 6, sm: 6, md: 3 }} sx={{ px: 1, mb: 1 }}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ py: 10, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Sterling Display A' }}>No results found.</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>Try removing some filters.</Typography>
                    <Button variant="outlined" onClick={handleClearAll} sx={{ color: '#000', borderColor: '#000', borderRadius: 0 }}>Clear Filters</Button>
                </Box>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{ mt: { xs: 4, md: 8 }, textAlign: 'center', borderTop: '1px solid #f0f0f0', pt: { xs: 3, md: 4 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        {/* Previous Button */}
                        <Button
                            variant="outlined"
                            onClick={() => {
                                updatePage(Math.max(1, validPage - 1));
                            }}
                            disabled={validPage === 1}
                            sx={{
                                color: '#000',
                                borderColor: '#000',
                                borderRadius: 0,
                                px: { xs: 2, md: 3 },
                                py: { xs: 0.75, md: 1 },
                                textTransform: 'none',
                                fontSize: { xs: '0.8rem', md: '0.875rem' },
                                minWidth: { xs: 80, md: 100 },
                                '&:hover': { bgcolor: '#f5f5f5', borderColor: '#000' },
                                '&:disabled': { borderColor: '#ccc', color: '#ccc' }
                            }}
                        >
                            Previous
                        </Button>

                        {/* Page Numbers */}
                        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (validPage <= 3) {
                                    pageNum = i + 1;
                                } else if (validPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = validPage - 2 + i;
                                }

                                return (
                                    <Button
                                        key={pageNum}
                                        variant={validPage === pageNum ? "contained" : "outlined"}
                                        onClick={() => {
                                            updatePage(pageNum);
                                        }}
                                        sx={{
                                            minWidth: { xs: 32, md: 40 },
                                            height: { xs: 32, md: 40 },
                                            p: 0,
                                            color: validPage === pageNum ? '#fff' : '#000',
                                            bgcolor: validPage === pageNum ? '#000' : 'transparent',
                                            borderColor: '#000',
                                            borderRadius: 0,
                                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                                            '&:hover': {
                                                bgcolor: validPage === pageNum ? '#000' : '#f5f5f5',
                                                borderColor: '#000'
                                            }
                                        }}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </Box>

                        {/* Next Button */}
                        <Button
                            variant="outlined"
                            onClick={() => {
                                updatePage(Math.min(totalPages, validPage + 1));
                            }}
                            disabled={validPage === totalPages}
                            sx={{
                                color: '#000',
                                borderColor: '#000',
                                borderRadius: 0,
                                px: { xs: 2, md: 3 },
                                py: { xs: 0.75, md: 1 },
                                textTransform: 'none',
                                fontSize: { xs: '0.8rem', md: '0.875rem' },
                                minWidth: { xs: 80, md: 100 },
                                '&:hover': { bgcolor: '#f5f5f5', borderColor: '#000' },
                                '&:disabled': { borderColor: '#ccc', color: '#ccc' }
                            }}
                        >
                            Next
                        </Button>
                    </Box>

                    {/* Back to Top */}
                    <Box 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: 1, 
                            cursor: 'pointer', 
                            mt: { xs: 3, md: 4 } 
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                            Back to Top
                        </Typography>
                        <ChevronUp size={16} />
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default JewelryProduct;