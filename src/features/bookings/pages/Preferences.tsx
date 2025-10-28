import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import EmojiNatureRoundedIcon from '@mui/icons-material/EmojiNatureRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import FamilyRestroomRoundedIcon from '@mui/icons-material/FamilyRestroomRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import TerrainRoundedIcon from '@mui/icons-material/TerrainRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import ForestRoundedIcon from '@mui/icons-material/ForestRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

import {
    preferencesPageStyles,
    wizardHeroSharedStyles,
    wizardProgressSharedStyles,
} from '@/design-system/theme/preferencesPageStyles';
import { colorTokens, spacingTokens, typographyTokens } from '@/design-system/theme/tokens';
import WizardHeroSection, { type WizardHeroHighlight } from '@/shared/components/WizardHeroSection';
import WizardProgressBar, { type WizardProgressStep } from '@/shared/components/WizardProgressBar';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
// import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import CompassCalibrationRoundedIcon from '@mui/icons-material/CompassCalibrationRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const heroHighlights: WizardHeroHighlight[] = [
    {
        id: 'ai-recommendations',
        icon: AutoAwesomeRoundedIcon,
        label: 'AI-Powered Recommendations',
    },
    {
        id: 'local-guides',
        icon: EmojiNatureRoundedIcon,
        label: 'Expert Local Guides',
    },
];

const wizardSteps: WizardProgressStep[] = [
    { id: 1, label: 'Preferences', status: 'active' },
    { id: 2, label: 'Destinations', status: 'upcoming' },
    { id: 3, label: 'Dates & Group', status: 'upcoming' },
    { id: 4, label: 'Recommendations', status: 'upcoming' },
];

const wizardHeroStyles = wizardHeroSharedStyles;

const wizardProgressStyles = wizardProgressSharedStyles;

const safariStyleOptions = [
    {
        id: 'style-luxury',
        title: 'Luxury Safari',
        description: 'Premium lodges, private guides, gourmet dining',
        icon: WorkspacePremiumRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.35) 0%, rgba(253, 230, 138, 0.65) 100%)',
        color: '#b45309',
    },
    {
        id: 'style-family',
        title: 'Family Adventure',
        description: 'Kid-friendly activities, educational experiences',
        icon: FamilyRestroomRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(191, 219, 254, 0.5) 0%, rgba(199, 210, 254, 0.7) 100%)',
        color: '#2563eb',
    },
    {
        id: 'style-honeymoon',
        title: 'Romantic Getaway',
        description: 'Intimate settings, couple activities, privacy',
        icon: FavoriteRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(252, 231, 243, 0.5) 0%, rgba(251, 213, 225, 0.75) 100%)',
        color: '#e11d48',
    },
    {
        id: 'style-adventure',
        title: 'Adventure Safari',
        description: 'Camping, hiking, off-road exploration',
        icon: TerrainRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(220, 252, 231, 0.5) 0%, rgba(187, 247, 208, 0.75) 100%)',
        color: '#15803d',
    },
    {
        id: 'style-budget',
        title: 'Budget Safari',
        description: 'Great value, shared accommodations',
        icon: AccountBalanceWalletRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(233, 213, 255, 0.45) 0%, rgba(221, 214, 254, 0.7) 100%)',
        color: '#6d28d9',
    },
] as const;

const durations = ['3-5 days', '6-8 days', '9-12 days', '13+ days'] as const;

const accommodationOptions = ['Luxury Lodges', 'Tented Camps', 'Mobile Camping', 'Eco Lodges'] as const;

const interestOptions = ['Big Five', 'Migration', 'Bird Watching', 'Photography', 'Cultural Tours', 'Conservation'] as const;

const inspirationCards = [
    {
        id: 'inspiration-migration',
        title: 'Great Migration Safari',
        description: "Witness the world's greatest wildlife spectacle in Kenya & Tanzania",
        duration: '7 days',
        price: 'From $3,200',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/6d8c8f53f8-6eaeb4c2a381a4745541.png',
        badgeLabel: 'Most Popular',
        badgeSx: {
            backgroundImage: 'linear-gradient(135deg, rgba(254, 242, 199, 0.6) 0%, rgba(251, 213, 155, 0.9) 100%)',
            color: colorTokens.safari[700],
        },
        rating: 4.9,
    },
    {
        id: 'inspiration-luxury',
        title: 'Ultimate Luxury Safari',
        description: 'Five-star accommodations with private guides and gourmet dining',
        duration: '5 days',
        price: 'From $5,800',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/212414c4c0-c388ad12b36f90f1418c.png',
        badgeLabel: 'Luxury',
        badgeSx: {
            backgroundImage: 'linear-gradient(135deg, rgba(254, 243, 199, 0.55) 0%, rgba(253, 230, 138, 0.8) 100%)',
            color: '#b45309',
        },
        rating: 4.8,
    },
    {
        id: 'inspiration-family',
        title: 'Family Adventure Safari',
        description: 'Kid-friendly activities with educational wildlife experiences',
        duration: '6 days',
        price: 'From $2,400',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/43c091fc90-95a1d9ffff8c58acab41.png',
        badgeLabel: 'Family',
        badgeSx: {
            backgroundImage: 'linear-gradient(135deg, rgba(191, 219, 254, 0.6) 0%, rgba(199, 210, 254, 0.85) 100%)',
            color: '#2563eb',
        },
        rating: 4.7,
    },
] as const;

const featureCards = [
    {
        id: 'feature-award',
        title: 'Award Winning',
        description: "Recognized as Africa's best safari operator for 3 consecutive years",
        icon: EmojiEventsRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(254, 235, 200, 0.6) 0%, rgba(253, 213, 155, 0.85) 100%)',
        iconColor: colorTokens.safari[600],
    },
    {
        id: 'feature-sustainable',
        title: 'Sustainable Tourism',
        description: 'Supporting local communities and wildlife conservation efforts',
        icon: ForestRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(220, 252, 231, 0.6) 0%, rgba(187, 247, 208, 0.9) 100%)',
        iconColor: '#15803d',
    },
    {
        id: 'feature-guides',
        title: 'Expert Guides',
        description: 'Local guides with deep knowledge of wildlife and ecosystems',
        icon: GroupsRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(219, 234, 254, 0.6) 0%, rgba(191, 219, 254, 0.9) 100%)',
        iconColor: '#1d4ed8',
    },
    {
        id: 'feature-safety',
        title: 'Safety First',
        description: 'Comprehensive safety protocols and 24/7 emergency support',
        icon: ShieldRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(233, 213, 255, 0.55) 0%, rgba(244, 219, 255, 0.85) 100%)',
        iconColor: '#7c3aed',
    },
] as const;

const mobileStyles = {
    main: {
        backgroundImage: 'linear-gradient(135deg, rgba(250, 245, 235, 1) 0%, rgba(253, 244, 220, 0.85) 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottom: '1px solid rgba(210,195,176,0.6)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 12px 24px rgba(61, 48, 36, 0.08)',
    },
    headerBrand: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    iconBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 16,
        backgroundImage: `linear-gradient(135deg, ${colorTokens.safari[500]} 0%, ${colorTokens.safari[600]} 100%)`,
        boxShadow: '0 12px 20px rgba(238,92,40,0.25)',
        color: colorTokens.neutral.white,
    },
    headerActions: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    profileHeader: {
        position: 'relative',
        padding: '24px 16px 32px',
        backgroundImage: 'linear-gradient(135deg, #3d3024 0%, #5a4433 55%, #ae311b 100%)',
        overflow: 'hidden',
    },
    profileContent: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        color: colorTokens.neutral.white,
    },
    profileAvatar: {
        width: 56,
        height: 56,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid rgba(255,255,255,0.3)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.24)',
    },
    creditCard: {
        marginTop: 7,
        padding: 2,
        borderRadius: 1,
        backgroundImage: 'linear-gradient(135deg, rgba(255,247,237,0.95) 0%, rgba(253,230,200,0.9) 100%)',
        border: '1px solid rgba(238, 92, 40, 0.2)',
        boxShadow: '0 20px 32px rgba(61,48,36,0.18)',
    },
    sectionTitleRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    cardGridTwo: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 2,
    },
    cardGridOne: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    listCard: {
        borderRadius: 1,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 24px 40px rgba(61,48,36,0.18)',
    },
    quickActions: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 2,
    },
    bottomNav: {
        position: 'sticky',
        bottom: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '12px 16px',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderTop: '1px solid rgba(210,195,176,0.6)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 -12px 24px rgba(61,48,36,0.08)',
    },
} as const;

const mobileWelcomeCards = [
    {
        id: 'destinations',
        title: 'Preferred Destinations',
        subtitle: 'Set your dream safari locations',
        icon: MapRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(191,219,254,0.35) 0%, rgba(147,197,253,0.4) 100%)',
        iconColor: '#1d4ed8',
    },
    {
        id: 'budget',
        title: 'Budget Range',
        subtitle: 'Choose your comfort level',
        icon: MonetizationOnRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(187,247,208,0.35) 0%, rgba(134,239,172,0.4) 100%)',
        iconColor: '#16a34a',
    },
    {
        id: 'season',
        title: 'Travel Seasons',
        subtitle: 'Best times for your adventures',
        icon: CalendarMonthRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(221,214,254,0.35) 0%, rgba(196,181,253,0.4) 100%)',
        iconColor: '#7c3aed',
    },
] as const;

const mobilePopularDestinations = [
    {
        id: 'maasai-mara',
        title: 'Maasai Mara',
        price: 'From $1,200',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/45069c4b8d-4f01de5e53c5220af4a3.png',
        badge: 'Hot',
    },
    {
        id: 'serengeti',
        title: 'Serengeti',
        price: 'From $1,800',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f47f1d367b-1cf6fb91cac686aa4e26.png',
        badge: '',

    },
    {
        id: 'ngorongoro',
        title: 'Ngorongoro',
        price: 'From $950',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/5ee893a328-dc9dba8e4457497e3344.png',
        badge: '',

    },
    {
        id: 'amboseli',
        title: 'Amboseli',
        price: 'From $750',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/cb12741339-5630b63ee7d859767ddb.png',
        badge: '',

    },
] as const;

const mobileLuxurySafaris = [
    {
        id: 'luxury-mara',
        title: 'Maasai Mara Luxury Lodge',
        meta: '5 days • All-inclusive',
        price: '$3,200',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/220ab76677-354475980f546011d736.png',
    },
    {
        id: 'luxury-serengeti',
        title: 'Serengeti Tented Camp',
        meta: '7 days • Private guide',
        price: '$4,500',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e39b6641dd-cbe8fc023445d9e6b9dd.png',
    },
] as const;

const mobileMidRangeSafaris = [
    {
        id: 'midrange-mara',
        title: 'Mara Classic Safari',
        meta: '4 days',
        price: '$1,450',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/555c9f4564-9afa999daedcb7ed9542.png',
    },
    {
        id: 'midrange-amboseli',
        title: 'Amboseli Explorer',
        meta: '3 days',
        price: '$980',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2f918b666a-f995179fc7de42160658.png',
    },
] as const;

const mobileQuickActions = [
    {
        id: 'explore',
        label: 'Explore Safaris',
        icon: CompassCalibrationRoundedIcon,
        gradient: `linear-gradient(135deg, ${colorTokens.safari[500]} 0%, ${colorTokens.safari[600]} 100%)`,
        textColor: colorTokens.neutral.white,
        border: 'none',

    },
    {
        id: 'my-trips',
        label: 'My Trips',
        icon: WorkRoundedIcon,
        gradient: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,246,239,0.9) 100%)',
        textColor: colorTokens.earth[700],
        border: '1px solid rgba(210,195,176,0.6)',
    },
] as const;

// const mobileBottomNav = [
//     { id: 'home', label: 'Home', icon: HomeRoundedIcon, active: true },
//     { id: 'explore', label: 'Explore', icon: SearchRoundedIcon },
//     { id: 'saved', label: 'Saved', icon: FavoriteRoundedIcon },
//     { id: 'trips', label: 'Trips', icon: WorkRoundedIcon },
//     { id: 'profile', label: 'Profile', icon: PersonRoundedIcon },
// ] as const;

const testimonialCards = [
    {
        id: 'testimonial-emma',
        name: 'Emma Thompson',
        quote:
            'Absolutely incredible experience! The attention to detail and personalized service made our honeymoon safari unforgettable. We saw all the Big Five and the accommodations were beyond our expectations.',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
    },
    {
        id: 'testimonial-michael',
        name: 'Michael Johnson',
        quote:
            'Our family safari was perfectly organized. The guides were amazing with our kids, making it educational and fun. The planning process was smooth and the team was always available to help.',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    },
    {
        id: 'testimonial-sarah',
        name: 'Sarah Chen',
        quote:
            'The migration safari exceeded all expectations. Witnessing thousands of wildebeest crossing the river was breathtaking. ASIS Safaris made sure we were in the right place at the right time.',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
    },
] as const;

const PreferencesPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const mobileDestinationsChunks = useMemo(() => mobilePopularDestinations, []);
    const mobileLuxuryList = useMemo(() => mobileLuxurySafaris, []);
    const mobileMidRangeList = useMemo(() => mobileMidRangeSafaris, []);
    const handleDestinationSafari = () => {
        navigate('/bookings/my-trips/destinations');
    };
    if (isMobile) {
        return (
            <Box component="main" id="main-content" sx={mobileStyles.main}>
                <Box sx={mobileStyles.profileHeader}>
                    <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'rgba(255,255,255,0.05)\'%3E%3Cpath d=\'m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', opacity: 0.2 }} />
                    <Box sx={mobileStyles.profileContent}>
                        <Box sx={mobileStyles.profileAvatar}>
                            <Box component="img" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Profile avatar" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography fontWeight={600}>Sarah Wilson</Typography>
                            <Typography fontSize={12} sx={{ color: 'rgba(255,255,255,0.75)' }}>
                                sarah@email.com
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 8, marginTop: 2 }}>
                                <Typography fontSize={11} fontWeight={600} sx={{ backgroundImage: `linear-gradient(135deg, ${colorTokens.safari[400]} 0%, ${colorTokens.safari[500]} 100%)`, color: colorTokens.neutral.white, padding: '4px 10px', borderRadius: 999, boxShadow: '0 12px 22px rgba(238,92,40,0.28)' }}>
                                    Safari Explorer
                                </Typography>
                            </Box>
                        </Box>
                        <Box component="button" type="button" sx={{ width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <SettingsRoundedIcon sx={{ color: colorTokens.neutral.white, fontSize: 18 }} />
                        </Box>
                    </Box>

                    <Box sx={mobileStyles.creditCard}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <Box sx={{ display: 'inline-flex', padding: 2, borderRadius: .5, backgroundImage: `linear-gradient(135deg, ${colorTokens.safari[400]} 0%, ${colorTokens.safari[500]} 100%)`, color: colorTokens.neutral.white, boxShadow: '0 10px 20px rgba(238,92,40,0.22)' }}>
                                    <MonetizationOnRoundedIcon fontSize="small" />
                                </Box>
                                <Box>
                                    <Typography fontSize={12} fontWeight={600} color={colorTokens.earth[800]}>
                                        Safari Credits
                                    </Typography>
                                    <Typography fontSize={24} fontWeight={700} color={colorTokens.earth[800]}>
                                        $450.00
                                    </Typography>
                                </Box>
                            </Box>
                            <InfoOutlinedIcon sx={{ color: 'rgba(74,57,42,0.45)' }} />
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ padding: '24px 16px 6px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Box sx={{ backgroundImage: 'linear-gradient(135deg, rgba(255,247,237,0.95) 0%, rgba(252,241,219,0.92) 100%)', borderRadius: 2, border: '1px solid rgba(238,92,40,0.25)', padding: spacingTokens.xs, boxShadow: '0 24px 40px rgba(61,48,36,0.16)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 5 }}>
                            <Box sx={{ display: 'inline-flex', padding: 2, borderRadius: .5, backgroundImage: `linear-gradient(135deg, ${colorTokens.safari[500]} 0%, ${colorTokens.safari[600]} 100%)`, color: colorTokens.neutral.white, boxShadow: '0 14px 24px rgba(238,92,40,0.22)' }}>
                                <TravelExploreRoundedIcon fontSize="small" />
                            </Box>
                            <Box>
                                <Typography fontFamily={typographyTokens.heading} fontWeight={700} fontSize={18} color={colorTokens.earth[800]}>
                                    Welcome to ASIS Safaris
                                </Typography>
                                <Typography fontSize={13} color="rgba(74,57,42,0.7)">
                                    Let&apos;s personalize your experience
                                </Typography>
                            </Box>
                        </Box>
                        <Stack spacing={2}>
                            {mobileWelcomeCards.map(({ id, title, subtitle, icon: Icon, gradient, iconColor }) => (
                                <Box key={id} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1, padding: 2, display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 18px 28px rgba(61,48,36,0.12)' }}>
                                    <Box sx={{ display: 'inline-flex', padding: 2, borderRadius: .5, backgroundImage: gradient, color: iconColor }}>
                                        <Icon fontSize="small" />
                                    </Box>
                                    <Box>
                                        <Typography fontSize={14} fontWeight={600} color={colorTokens.earth[800]}>
                                            {title}
                                        </Typography>
                                        <Typography fontSize={12} color="rgba(74,57,42,0.6)">
                                            {subtitle}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Box>

                    <Box>
                        <Box sx={mobileStyles.sectionTitleRow}>
                            <Typography fontFamily={typographyTokens.heading} fontWeight={600} fontSize={18} color={colorTokens.earth[800]}>
                                Popular Destinations
                            </Typography>
                            <Typography fontSize={12} fontWeight={600} color={colorTokens.safari[600]}>
                                View All
                            </Typography>
                        </Box>
                        <Box sx={mobileStyles.cardGridTwo}>
                            {mobileDestinationsChunks.map(({ id, title, price, image, badge }) => (
                                <Box key={id} sx={mobileStyles.listCard}>
                                    <Box sx={{ position: 'relative', height: 90 }}>
                                        <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 60%)' }} />
                                        <Box sx={{ position: 'absolute', bottom: 12, left: 12 }}>
                                            <Typography fontSize={13} fontWeight={600} color={colorTokens.neutral.white}>
                                                {title}
                                            </Typography>
                                            <Typography fontSize={11} color="rgba(255,255,255,0.8)">
                                                {price}
                                            </Typography>
                                        </Box>
                                        {badge ? (
                                            <Typography fontSize={10} fontWeight={600} sx={{ position: 'absolute', top: 10, right: 10, backgroundImage: `linear-gradient(135deg, ${colorTokens.safari[500]} 0%, ${colorTokens.safari[600]} 100%)`, color: colorTokens.neutral.white, padding: '4px 8px', borderRadius: 999 }}>
                                                {badge}
                                            </Typography>
                                        ) : null}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box>
                        <Box sx={mobileStyles.sectionTitleRow}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ display: 'inline-flex', padding: 2, borderRadius: .5, backgroundImage: 'linear-gradient(135deg, rgba(253, 230, 138, 0.35) 0%, rgba(250, 204, 21, 0.4) 100%)', color: '#b45309' }}>
                                    <EmojiEventsRoundedIcon fontSize="small" />
                                </Box>
                                <Typography fontFamily={typographyTokens.heading} fontWeight={600} fontSize={18} color={colorTokens.earth[800]}>
                                    Luxury Safaris
                                </Typography>
                            </Box>
                            <Typography fontSize={12} fontWeight={600} color={colorTokens.safari[600]}>
                                View All
                            </Typography>
                        </Box>
                        <Stack spacing={6}>
                            {mobileLuxuryList.map(({ id, title, meta, price, image }) => (
                                <Box key={id} sx={mobileStyles.listCard}>
                                    <Box sx={{ position: 'relative', height: 100 }}>
                                        <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 70%)' }} />
                                        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                                            <Typography fontSize={10} fontWeight={600} sx={{ backgroundImage: 'linear-gradient(135deg, rgba(251, 191, 36, 1) 0%, rgba(217, 119, 6, 1) 100%)', color: colorTokens.neutral.white, padding: '4px 8px', borderRadius: 999 }}>
                                                Luxury
                                            </Typography>
                                        </Box>
                                        <Box sx={{ position: 'absolute', bottom: 8, left: 16, right: 16 }}>
                                            <Typography fontSize={14} fontWeight={600} color={colorTokens.neutral.white}>
                                                {title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 1 }}>
                                                <Typography fontSize={12} color="rgba(255,255,255,0.8)">
                                                    {meta}
                                                </Typography>
                                                <Typography fontSize={13} fontWeight={700} color={colorTokens.neutral.white}>
                                                    {price}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Box>

                    <Box>
                        <Box sx={mobileStyles.sectionTitleRow}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ display: 'inline-flex', padding: 2, borderRadius: .5, backgroundImage: 'linear-gradient(135deg, rgba(187, 247, 208, 0.35) 0%, rgba(134, 239, 172, 0.4) 100%)', color: '#16a34a' }}>
                                    <BalanceRoundedIcon fontSize="small" />
                                </Box>
                                <Typography fontFamily={typographyTokens.heading} fontWeight={600} fontSize={18} color={colorTokens.earth[800]}>
                                    Mid-Range Adventures
                                </Typography>
                            </Box>
                            <Typography fontSize={12} fontWeight={600} color={colorTokens.safari[600]}>
                                View All
                            </Typography>
                        </Box>
                        <Box sx={mobileStyles.cardGridTwo}>
                            {mobileMidRangeList.map(({ id, title, meta, price, image }) => (
                                <Box key={id} sx={mobileStyles.listCard}>
                                    <Box sx={{ position: 'relative', height: 100 }}>
                                        <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 70%)' }} />
                                        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                                            <Typography fontSize={10} fontWeight={600} sx={{ backgroundImage: 'linear-gradient(135deg, rgba(34,197,94,1) 0%, rgba(22,163,74,1) 100%)', color: colorTokens.neutral.white, padding: '4px 8px', borderRadius: 999 }}>
                                                Mid-Range
                                            </Typography>
                                        </Box>
                                        <Box sx={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
                                            <Typography fontSize={12} fontWeight={600} color={colorTokens.neutral.white}>
                                                {title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 1 }}>
                                                <Typography fontSize={11} color="rgba(255,255,255,0.8)">
                                                    {meta}
                                                </Typography>
                                                <Typography fontSize={12} fontWeight={700} color={colorTokens.neutral.white}>
                                                    {price}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box>
                        <Box sx={mobileStyles.quickActions}>
                            {mobileQuickActions.map(({ id, label, icon: Icon, gradient, textColor, border }) => (
                                <Box
                                    key={id}
                                    component="button"
                                    type="button"
                                    onClick={handleDestinationSafari}
                                    sx={{
                                        padding: 2,
                                        borderRadius: 1,
                                        backgroundImage: gradient,
                                        color: textColor,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 2,
                                        boxShadow: '0 20px 32px rgba(61,48,36,0.14)',
                                        border: border ?? 'none',
                                    }}                                >
                                    <Icon sx={{ fontSize: 22 }} />
                                    <Typography fontSize={13} fontWeight={600}>
                                        {label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

            </Box>
        );
    }

    return (
        <Box component="main" id="main-content" sx={preferencesPageStyles.main}>
            <WizardHeroSection
                id="hero-section"
                image={{
                    src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/77162dfde0-e5eae02708590f697e25.png',
                    alt: 'African savanna at golden hour with wildlife silhouettes',
                }}
                title="Plan Your Perfect Safari"
                description="Create unforgettable memories with our expertly crafted African safari experiences."
                highlights={heroHighlights}
                styles={wizardHeroStyles}
                copyComponent={Stack}
                copyComponentProps={{ spacing: 2 }}
                renderHighlight={({ id, icon: HighlightIcon, label }) => (
                    <Box key={id} sx={preferencesPageStyles.heroHighlight}>
                        <HighlightIcon fontSize="small" />
                        {label}
                    </Box>
                )}
            />

            <Box component="section" id="planning-wizard" sx={preferencesPageStyles.wizardSection}>
                <Box sx={preferencesPageStyles.wizardContainer}>
                    <WizardProgressBar
                        id="progress-bar"
                        steps={wizardSteps}
                        styles={wizardProgressStyles}
                        renderNodeContent={(step) => step.id}
                        getConnectorVariant={(step) =>
                            step.status === 'completed' || step.status === 'active' ? 'filled' : 'none'
                        }
                    />

                    <Box id="preferences-form" sx={preferencesPageStyles.formCard}>
                        <Box>
                            <Typography component="h2" sx={preferencesPageStyles.formHeaderTitle}>
                                Tell Us About Your Dream Safari
                            </Typography>
                            <Typography sx={preferencesPageStyles.formHeaderDescription}>
                                Help us create the perfect safari experience tailored just for you.
                            </Typography>
                        </Box>

                        <Box sx={preferencesPageStyles.formGrid}>
                            <Box id="safari-style" sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                                <Box>
                                    <Typography component="h3" sx={preferencesPageStyles.inputSectionTitle}>
                                        What's Your Safari Style?
                                    </Typography>
                                </Box>
                                <Box sx={preferencesPageStyles.optionGroup}>
                                    {safariStyleOptions.map(({ id, title, description, icon: Icon, gradient, color }) => (
                                        <Box key={id} component="label" htmlFor={id} sx={preferencesPageStyles.optionCard}>
                                            <Box component="input" type="radio" id={id} name="safari-style" sx={{ display: 'none' }} />
                                            <Box sx={{ ...preferencesPageStyles.optionIconWrap, backgroundImage: gradient, color }}>
                                                <Icon />
                                            </Box>
                                            <Box>
                                                <Typography sx={preferencesPageStyles.optionTitle}>{title}</Typography>
                                                <Typography sx={preferencesPageStyles.optionSubtitle}>{description}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            <Stack id="preferences-details" sx={{ gap: spacingTokens.xs, display: 'flex', flexDirection: 'column' }}>
                                <Box id="budget-range" sx={preferencesPageStyles.inputSection}>
                                    <Typography component="h3" sx={preferencesPageStyles.inputSectionTitle}>
                                        Budget Range (per person)
                                    </Typography>
                                    <Box sx={preferencesPageStyles.budgetCard}>
                                        <Box sx={preferencesPageStyles.budgetScale}>
                                            <span>$1,000</span>
                                            <span>$10,000+</span>
                                        </Box>
                                        <Box sx={{ px: 1 }}>
                                            <Slider
                                                aria-label="Budget range"
                                                defaultValue={3500}
                                                min={1000}
                                                max={10000}
                                                step={500}
                                                sx={{
                                                    color: colorTokens.safari[500],
                                                    height: 6,
                                                    '& .MuiSlider-rail': {
                                                        backgroundColor: 'rgba(214,198,178,0.6)',
                                                        opacity: 1,
                                                    },
                                                    '& .MuiSlider-thumb': {
                                                        width: 18,
                                                        height: 18,
                                                        border: '2px solid white',
                                                        boxShadow: '0 6px 12px rgba(238, 92, 40, 0.35)',
                                                    },
                                                }}
                                            />
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Box sx={preferencesPageStyles.sliderValueBadge}>$3,500</Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box id="duration" sx={preferencesPageStyles.inputSection}>
                                    <Typography component="h3" sx={preferencesPageStyles.inputSectionTitle}>
                                        Trip Duration
                                    </Typography>
                                    <Box sx={preferencesPageStyles.durationGrid}>
                                        {durations.map((label) => {
                                            const value = label.replace(/\s+/g, '').toLowerCase();
                                            return (
                                                <Box key={label} component="label" htmlFor={`duration-${value}`} sx={preferencesPageStyles.durationOption}>
                                                    <Box component="input" type="radio" id={`duration-${value}`} name="duration" sx={{ display: 'none' }} />
                                                    <span>{label}</span>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </Box>

                                <Box id="accommodation" sx={preferencesPageStyles.inputSection}>
                                    <Typography component="h3" sx={preferencesPageStyles.inputSectionTitle}>
                                        Accommodation Style
                                    </Typography>
                                    <Box sx={preferencesPageStyles.checkboxGroup}>
                                        {accommodationOptions.map((option) => {
                                            const value = option.replace(/\s+/g, '-').toLowerCase();
                                            return (
                                                <Box key={option} component="label" htmlFor={`accommodation-${value}`} sx={preferencesPageStyles.checkboxOption}>
                                                    <Box component="input" type="checkbox" id={`accommodation-${value}`} sx={{ display: 'none' }} />
                                                    <Typography component="span" sx={preferencesPageStyles.checkboxLabel}>
                                                        {option}
                                                    </Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </Box>

                                <Box id="interests" sx={preferencesPageStyles.inputSection}>
                                    <Typography component="h3" sx={preferencesPageStyles.inputSectionTitle}>
                                        Special Interests
                                    </Typography>
                                    <Box sx={preferencesPageStyles.interestGrid}>
                                        {interestOptions.map((interest) => {
                                            const value = interest.replace(/\s+/g, '-').toLowerCase();
                                            return (
                                                <Box key={interest} component="label" htmlFor={`interest-${value}`} sx={preferencesPageStyles.checkboxOption}>
                                                    <Box component="input" type="checkbox" id={`interest-${value}`} sx={{ display: 'none' }} />
                                                    <Typography component="span" sx={preferencesPageStyles.checkboxLabel}>
                                                        {interest}
                                                    </Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>

                        <Box sx={preferencesPageStyles.formFooter}>
                            <Box
                                component="button"
                                type="button"
                                sx={preferencesPageStyles.footerButtonSecondary}
                                onClick={() => navigate('/bookings/my-trips')}
                            >
                                <ArrowBackRoundedIcon fontSize="small" />
                                Back to My Trips
                            </Box>
                            <Box
                                component="button"
                                type="button"
                                sx={preferencesPageStyles.footerButtonPrimary}
                                onClick={() => navigate('/bookings/my-trips/destinations')}
                            >
                                Continue to Destinations
                                <ArrowForwardRoundedIcon fontSize="small" />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box component="section" id="inspiration-section" sx={preferencesPageStyles.sectionWrap}>
                <Box sx={preferencesPageStyles.sectionContainer}>
                    <Box sx={preferencesPageStyles.sectionHeader}>
                        <Typography component="h2" sx={preferencesPageStyles.sectionTitle}>
                            Need Some Inspiration?
                        </Typography>
                        <Typography sx={preferencesPageStyles.sectionSubtitle}>
                            Explore our most popular safari experiences to spark your wanderlust.
                        </Typography>
                    </Box>
                    <Box sx={preferencesPageStyles.inspirationGrid}>
                        {inspirationCards.map(({ id, title, description, duration, price, image, badgeLabel, badgeSx, rating }) => (
                            <Box key={id} sx={preferencesPageStyles.inspirationCard}>
                                <Box sx={preferencesPageStyles.inspirationMedia}>
                                    <Box component="img" src={image} alt={title} sx={preferencesPageStyles.inspirationImage} />
                                </Box>
                                <Box sx={preferencesPageStyles.inspirationContent}>
                                    <Box sx={preferencesPageStyles.inspirationBadgeRow}>
                                        <Box sx={{ ...preferencesPageStyles.inspirationBadge, ...badgeSx }}>{badgeLabel}</Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#f59e0b', fontWeight: 600, fontSize: 13 }}>
                                            <StarRoundedIcon sx={{ fontSize: 16 }} />
                                            {rating.toFixed(1)}
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography component="h3" sx={{ fontFamily: typographyTokens.heading, fontWeight: 600, color: colorTokens.earth[800], fontSize: 20 }}>
                                            {title}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, color: 'rgba(74,57,42,0.7)' }}>{description}</Typography>
                                    </Box>
                                    <Box sx={preferencesPageStyles.cardMetaRow}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <CalendarMonthRoundedIcon sx={{ fontSize: 16 }} />
                                            {duration}
                                        </Box>
                                        <Typography sx={{ fontWeight: 700, color: colorTokens.earth[800] }}>{price}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={preferencesPageStyles.callToActionWrap}>
                        <Box component="button" type="button" sx={preferencesPageStyles.secondaryCtaButton}>
                            View All Safari Packages
                            <ArrowForwardRoundedIcon fontSize="small" />
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box component="section" id="expert-help" sx={preferencesPageStyles.sectionWrap}>
                <Box sx={{ ...preferencesPageStyles.sectionContainer, ...preferencesPageStyles.expertSection }}>
                    <Box sx={preferencesPageStyles.expertCard}>
                        <Box sx={preferencesPageStyles.expertPattern} />
                        <Box sx={preferencesPageStyles.expertContent}>
                            <Box>
                                <Typography component="h2" sx={{ ...preferencesPageStyles.sectionTitle, color: colorTokens.neutral.white }}>
                                    Need Expert Help?
                                </Typography>
                                <Typography sx={{ fontSize: 18, color: 'rgba(255,255,255,0.9)', marginBottom: spacingTokens.md }}>
                                    Our safari specialists are here to help you create the perfect itinerary.
                                </Typography>
                                <Box component="ul" sx={preferencesPageStyles.expertList}>
                                    {['Personalized recommendations based on your preferences', 'Real-time availability and best pricing', '24/7 support throughout your journey'].map((item) => (
                                        <Box key={item} component="li" sx={preferencesPageStyles.expertListItem}>
                                            <CheckCircleRoundedIcon sx={{ color: '#6ee7b7' }} />
                                            {item}
                                        </Box>
                                    ))}
                                </Box>
                                <Box sx={preferencesPageStyles.expertActions}>
                                    <Box component="button" type="button" sx={preferencesPageStyles.expertPrimaryButton}>
                                        <CallRoundedIcon fontSize="small" />
                                        Call Now
                                    </Box>
                                    <Box component="button" type="button" sx={preferencesPageStyles.expertSecondaryButton}>
                                        <WhatsAppIcon fontSize="small" />
                                        WhatsApp
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box sx={preferencesPageStyles.expertProfileCard}>
                                    <Box sx={preferencesPageStyles.expertAvatar}>
                                        <Box
                                            component="img"
                                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                                            alt="Safari expert"
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>
                                    <Typography sx={{ fontFamily: typographyTokens.heading, fontWeight: 600, fontSize: 20 }}>
                                        David Kimani
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                                        Senior Safari Specialist
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#fbbf24', fontSize: 13 }}>
                                        <StarRoundedIcon sx={{ fontSize: 16 }} />
                                        15+ years experience
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box component="section" id="features-section" sx={preferencesPageStyles.sectionWrap}>
                <Box sx={preferencesPageStyles.sectionContainer}>
                    <Box sx={preferencesPageStyles.sectionHeader}>
                        <Typography component="h2" sx={preferencesPageStyles.sectionTitle}>
                            Why Choose ASIS Safaris?
                        </Typography>
                        <Typography sx={preferencesPageStyles.sectionSubtitle}>
                            Experience the difference with Africa's leading safari operator.
                        </Typography>
                    </Box>
                    <Box sx={preferencesPageStyles.featuresGrid}>
                        {featureCards.map(({ id, title, description, icon: Icon, gradient, iconColor }) => (
                            <Box key={id} sx={preferencesPageStyles.featureCard}>
                                <Box sx={{ ...preferencesPageStyles.featureIconShell, backgroundImage: gradient }}>
                                    <Icon sx={{ fontSize: 40, color: iconColor }} />
                                    <Typography component="h3" sx={{ fontFamily: typographyTokens.heading, fontWeight: 600, fontSize: 20, color: colorTokens.earth[800] }}>
                                        {title}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, color: 'rgba(74,57,42,0.7)' }}>{description}</Typography>

                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box component="section" id="testimonials-section" sx={preferencesPageStyles.sectionWrap}>
                <Box sx={preferencesPageStyles.sectionContainer}>
                    <Box sx={preferencesPageStyles.sectionHeader}>
                        <Typography component="h2" sx={preferencesPageStyles.sectionTitle}>
                            What Our Travelers Say
                        </Typography>
                        <Typography sx={preferencesPageStyles.sectionSubtitle}>
                            Real experiences from our safari adventurers.
                        </Typography>
                    </Box>
                    <Box sx={preferencesPageStyles.testimonialsGrid}>
                        {testimonialCards.map(({ id, name, quote, avatar }) => (
                            <Box key={id} sx={preferencesPageStyles.testimonialCard}>
                                <Box sx={preferencesPageStyles.testimonialHeader}>
                                    <Box sx={preferencesPageStyles.testimonialAvatar}>
                                        <Box component="img" src={avatar} alt={name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 600, csolor: colorTokens.earth[800] }}>{name}</Typography>
                                        <Box sx={{ display: 'flex', gap: 0.5, color: '#fbbf24' }}>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <StarRoundedIcon key={`${id}-star-${index}`} sx={{ fontSize: 16 }} />
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                                <Typography sx={{ fontSize: 14, color: 'rgba(74,57,42,0.75)', fontStyle: 'italic' }}>{`"${quote}"`}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PreferencesPage;
