import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import ForestRoundedIcon from '@mui/icons-material/ForestRounded';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import TerrainRoundedIcon from '@mui/icons-material/TerrainRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import type { SvgIconComponent } from '@mui/icons-material';

import destinationsPageStyles from '@/design-system/theme/destinationsPageStyles';
import { wizardHeroSharedStyles, wizardProgressSharedStyles } from '@/design-system/theme/preferencesPageStyles';
import { colorTokens, radiusTokens, spacingTokens, typographyTokens } from '@/design-system/theme/tokens';
import WizardHeroSection, { type WizardHeroHighlight } from '@/shared/components/WizardHeroSection';
import WizardProgressBar, {
    type WizardProgressStep,
    type WizardProgressStatus,
} from '@/shared/components/WizardProgressBar';

type DestinationCardMeta = {
    id: string;
    icon: SvgIconComponent;
    label: string;
};

type DestinationCard = {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    badgeLabel: string;
    meta: DestinationCardMeta[];
    priceLabel: string;
    features: string[];
    tags: string[];
};

type PackageCard = {
    id: string;
    title: string;
    description: string;
    badgeLabel: string;
    badgeColor: string;
    badgeBg: string;
    accentGradient: string;
    duration: string;
    rating: string;
    price: string;
};

type SeasonalRecommendation = {
    id: string;
    country: string;
    season: string;
    highlight: string;
};

type HighlightStat = {
    id: string;
    label: string;
    value: string;
};

type HighlightCard = {
    id: string;
    title: string;
    description: string;
    icon: SvgIconComponent;
    iconGradient: string;
    iconColor: string;
    stats: HighlightStat[];
};

type ExpertCard = {
    id: string;
    title: string;
    description: string;
    recommendation: string;
    icon: SvgIconComponent;
};

type ComparisonRow =
    | {
        id: string;
        type: 'boolean';
        feature: string;
        values: boolean[];
    }
    | {
        id: string;
        type: 'text';
        feature: string;
        values: string[];
    };

const heroHighlights: WizardHeroHighlight[] = [
    {
        id: 'countries-available',
        icon: PublicRoundedIcon,
        label: '4 Countries Available',
        iconProps: { sx: { fontSize: 18 } },
    },
    {
        id: 'national-parks',
        icon: ParkRoundedIcon,
        label: '20+ National Parks',
        iconProps: { sx: { fontSize: 18 } },
    },
];

const wizardSteps: WizardProgressStep[] = [
    { id: 1, label: 'Preferences', status: 'completed' },
    { id: 2, label: 'Destinations', status: 'active' },
    { id: 3, label: 'Dates & Group', status: 'upcoming' },
    { id: 4, label: 'Recommendations', status: 'upcoming' },
];

const wizardHeroStyles = {
    ...wizardHeroSharedStyles,
    heroHighlightLabel: { fontWeight: 600 },
} as const;

const wizardProgressStyles = {
    ...wizardProgressSharedStyles,
    header: destinationsPageStyles.progressHeader,
    steps: destinationsPageStyles.progressSteps,
    step: destinationsPageStyles.progressStep,
    node: destinationsPageStyles.progressNode,
    nodeCompleted: destinationsPageStyles.progressNodeCompleted,
    nodeActive: destinationsPageStyles.progressNodeActive,
    nodeUpcoming: destinationsPageStyles.progressNodeUpcoming,
    label: destinationsPageStyles.progressLabel,
    labelCompleted: destinationsPageStyles.progressLabelActive,
    labelActive: destinationsPageStyles.progressLabelActive,
    connector: destinationsPageStyles.progressConnector,
    connectorFilled: destinationsPageStyles.progressConnectorFilled,
    connectorPartial: destinationsPageStyles.progressConnectorPartial,
    stepWrapper: { display: 'flex', alignItems: 'center', gap: spacingTokens.sm },
} as const;

const destinationCards: DestinationCard[] = [
    {
        id: 'kenya',
        title: 'Kenya',
        subtitle: 'Home of the Great Migration',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e19438c644-c95af495da406ba40f5f.png',
        badgeLabel: 'Most Popular',
        meta: [
            { id: 'kenya-parks', icon: LocationOnRoundedIcon, label: '8 Parks' },
            { id: 'kenya-rating', icon: StarRoundedIcon, label: '4.9 Rating' },
        ],
        priceLabel: 'From $2,400',
        features: ['Maasai Mara National Reserve', 'Amboseli National Park', 'Lake Nakuru National Park'],
        tags: ['Big Five', 'Migration', 'Cultural Tours'],
    },
    {
        id: 'tanzania',
        title: 'Tanzania',
        subtitle: "Serengeti & Zanzibar",
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/51c6640129-6a98144b472ba951a4e6.png',
        badgeLabel: 'Classic Safari',
        meta: [
            { id: 'tanzania-parks', icon: LocationOnRoundedIcon, label: '6 Parks' },
            { id: 'tanzania-rating', icon: StarRoundedIcon, label: '4.8 Rating' },
        ],
        priceLabel: 'From $2,800',
        features: ['Serengeti National Park', 'Ngorongoro Conservation Area', 'Tarangire National Park'],
        tags: ['Big Five', 'Crater', 'Climbing'],
    },
    {
        id: 'uganda',
        title: 'Uganda',
        subtitle: 'Pearl of Africa',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/086385e2cb-d113f04cf4cae774cc04.png',
        badgeLabel: 'Gorilla Trekking',
        meta: [
            { id: 'uganda-parks', icon: LocationOnRoundedIcon, label: '4 Parks' },
            { id: 'uganda-rating', icon: StarRoundedIcon, label: '4.7 Rating' },
        ],
        priceLabel: 'From $3,200',
        features: ['Bwindi Impenetrable Forest', 'Queen Elizabeth National Park', 'Murchison Falls National Park'],
        tags: ['Gorillas', 'Primates', 'Bird Watching'],
    },
    {
        id: 'rwanda',
        title: 'Rwanda',
        subtitle: 'Land of a Thousand Hills',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3c9a5c3269-18c9eef8af96d7893438.png',
        badgeLabel: 'Luxury Eco',
        meta: [
            { id: 'rwanda-parks', icon: LocationOnRoundedIcon, label: '3 Parks' },
            { id: 'rwanda-rating', icon: StarRoundedIcon, label: '4.8 Rating' },
        ],
        priceLabel: 'From $4,500',
        features: ['Volcanoes National Park', 'Akagera National Park', 'Nyungwe Forest National Park'],
        tags: ['Gorillas', 'Chimpanzees', 'Canopy Walk'],
    },
];

const multiCountryPackages: PackageCard[] = [
    {
        id: 'kenya-tanzania',
        title: 'Kenya + Tanzania',
        description: 'Experience the Great Migration across both countries with seamless border crossings',
        badgeLabel: 'Popular',
        badgeColor: colorTokens.neutral.white,
        badgeBg: colorTokens.safari[600],
        accentGradient: 'linear-gradient(135deg, rgba(238,92,40,0.08) 0%, rgba(244,185,66,0.22) 100%)',
        duration: '10-14 days',
        rating: '4.9',
        price: 'From $4,200',
    },
    {
        id: 'uganda-rwanda',
        title: 'Uganda + Rwanda',
        description: 'Ultimate primate experience with gorillas and chimpanzees in both countries',
        badgeLabel: 'Primate Special',
        badgeColor: colorTokens.neutral.white,
        badgeBg: '#059669',
        accentGradient: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(110,231,183,0.2) 100%)',
        duration: '8-12 days',
        rating: '4.8',
        price: 'From $6,800',
    },
];

const seasonalRecommendations: SeasonalRecommendation[] = [
    { id: 'season-kenya', country: 'Kenya', season: 'Jul-Oct, Dec-Mar', highlight: 'Migration Season' },
    { id: 'season-tanzania', country: 'Tanzania', season: 'Jun-Oct, Dec-Mar', highlight: 'Dry Season' },
    { id: 'season-uganda', country: 'Uganda', season: 'Dec-Feb, Jun-Sep', highlight: 'Gorilla Trekking' },
    { id: 'season-rwanda', country: 'Rwanda', season: 'Jun-Sep, Dec-Feb', highlight: 'Dry Season' },
];

const highlightCards: HighlightCard[] = [
    {
        id: 'wildlife-diversity',
        title: 'Wildlife Diversity',
        description: 'Over 1,000 species across all destinations',
        icon: PetsRoundedIcon,
        iconGradient: 'linear-gradient(135deg, rgba(34,197,94,0.18) 0%, rgba(134,239,172,0.28) 100%)',
        iconColor: '#15803d',
        stats: [
            { id: 'stat-big-five', label: 'Big Five Animals', value: '✓ All Locations' },
            { id: 'stat-gorillas', label: 'Mountain Gorillas', value: 'Uganda & Rwanda' },
            { id: 'stat-migration', label: 'Great Migration', value: 'Kenya & Tanzania' },
            { id: 'stat-endemic', label: 'Endemic Species', value: 'Each Location' },
        ],
    },
    {
        id: 'conservation-impact',
        title: 'Conservation Impact',
        description: 'Supporting local communities & wildlife',
        icon: ForestRoundedIcon,
        iconGradient: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(129,140,248,0.28) 100%)',
        iconColor: '#1d4ed8',
        stats: [
            { id: 'stat-protected', label: 'Protected Areas', value: '50,000+ km²' },
            { id: 'stat-communities', label: 'Local Communities', value: '200+ Supported' },
            { id: 'stat-projects', label: 'Conservation Projects', value: '15 Active' },
            { id: 'stat-offset', label: 'Carbon Offset', value: '100% Trips' },
        ],
    },
];

const expertCards: ExpertCard[] = [
    {
        id: 'first-time',
        title: 'First-Time Safari',
        description: "Start with Kenya's Maasai Mara for the classic safari experience",
        recommendation: 'Recommended: Kenya',
        icon: StarRoundedIcon,
    },
    {
        id: 'photography',
        title: 'Wildlife Photography',
        description: "Tanzania's Serengeti offers incredible photo opportunities",
        recommendation: 'Recommended: Tanzania',
        icon: PhotoCameraRoundedIcon,
    },
    {
        id: 'unique-experience',
        title: 'Unique Experience',
        description: 'Rwanda & Uganda for exclusive gorilla encounters',
        recommendation: 'Recommended: Uganda + Rwanda',
        icon: TerrainRoundedIcon,
    },
];

const comparisonRows: ComparisonRow[] = [
    { id: 'compare-migration', type: 'boolean', feature: 'Great Migration', values: [true, true, false, false] },
    { id: 'compare-gorillas', type: 'boolean', feature: 'Mountain Gorillas', values: [false, false, true, true] },
    { id: 'compare-big-five', type: 'boolean', feature: 'Big Five', values: [true, true, true, true] },
    { id: 'compare-cultural', type: 'boolean', feature: 'Cultural Experiences', values: [true, true, true, true] },
    { id: 'compare-budget', type: 'text', feature: 'Budget Range', values: ['$2,400+', '$2,800+', '$3,200+', '$4,500+'] },
    { id: 'compare-season', type: 'text', feature: 'Best Season', values: ['Jul-Oct', 'Jun-Oct', 'Dec-Feb', 'Jun-Sep'] },
];

const connectorFillMap: Record<WizardProgressStatus, 'filled' | 'partial' | 'none'> = {
    completed: 'filled',
    active: 'partial',
    upcoming: 'none',
};

const DestinationsPage = () => {
    const navigate = useNavigate();

    const selectedCount = 0;
    const activeIndex = wizardSteps.findIndex((step) => step.status === 'active');
    const resolvedActiveIndex = activeIndex === -1 ? 0 : activeIndex;
    const currentStepNumber = wizardSteps[resolvedActiveIndex]?.id ?? wizardSteps[wizardSteps.length - 1]?.id ?? 1;
    const progressPercent = Math.round(((resolvedActiveIndex + 1) / wizardSteps.length) * 100);
    const mobileAvatarUrl = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg';

    const getMobileProgressNodeStyles = (status: WizardProgressStatus) => {
        if (status === 'completed') {
            return destinationsPageStyles.mobileProgressNodeCompleted;
        }

        if (status === 'active') {
            return destinationsPageStyles.mobileProgressNodeActive;
        }

        return destinationsPageStyles.mobileProgressNodeUpcoming;
    };

    return (
        <>
            <Box sx={destinationsPageStyles.mobilePage}>
                {/* <Box component="header" id="header" sx={destinationsPageStyles.mobileHeader}>
                    <Box sx={destinationsPageStyles.mobileHeaderBrand}>
                        <Box sx={destinationsPageStyles.mobileHeaderIcon}>
                            <TravelExploreRoundedIcon sx={{ fontSize: 18 }} />
                        </Box>
                        <Typography component="span" sx={destinationsPageStyles.mobileHeaderTitle}>
                            ASIS
                        </Typography>
                    </Box>
                    <Box sx={destinationsPageStyles.mobileHeaderActions}>
                        <Box component="button" type="button" aria-label="Search" sx={destinationsPageStyles.mobileHeaderButton}>
                            <SearchRoundedIcon fontSize="small" />
                        </Box>
                        <Box component="button" type="button" aria-label="Saved destinations" sx={destinationsPageStyles.mobileHeaderButton}>
                            <FavoriteRoundedIcon sx={{ fontSize: 18, color: colorTokens.safari[500] }} />
                        </Box>
                        <Box sx={destinationsPageStyles.mobileHeaderAvatar}>
                            <Box component="img" src={mobileAvatarUrl} alt="Profile" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                    </Box>
                </Box> */}

                <Box component="main" id="main-content" sx={destinationsPageStyles.mobileMain}>
                    <Box component="section" sx={destinationsPageStyles.mobileHeroSection}>
                        <Box sx={destinationsPageStyles.mobileHeroMedia}>
                            <Box
                                component="img"
                                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7451ed899f-8b61a5ab53e159c7ba7b.png"
                                alt="African savanna landscape at golden hour"
                                sx={destinationsPageStyles.mobileHeroImage}
                            />
                            <Box sx={destinationsPageStyles.mobileHeroOverlay} />
                        </Box>
                        <Box sx={destinationsPageStyles.mobileHeroContent}>
                            <Typography component="h1" sx={destinationsPageStyles.mobileHeroTitle}>
                                Choose Your Safari Destination
                            </Typography>
                            <Typography sx={destinationsPageStyles.mobileHeroDescription}>
                                Discover the perfect African destination for your dream safari adventure
                            </Typography>
                            <Box sx={destinationsPageStyles.mobileHeroPills}>
                                {heroHighlights.map(({ id, label }) => (
                                    <Box key={`mobile-pill-${id}`} sx={destinationsPageStyles.mobileHeroPill}>
                                        {label}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    {/* <Box component="section" sx={destinationsPageStyles.mobileWizardSection}>
                        <Box sx={destinationsPageStyles.mobileProgressSummary}>
                            <Typography component="span">Step {currentStepNumber} of {wizardSteps.length}</Typography>
                            <Typography component="span">{progressPercent}% Complete</Typography>
                        </Box>
                        <Box sx={destinationsPageStyles.mobileProgressRow}>
                            {wizardSteps.map((step, index) => {
                                const isLast = index === wizardSteps.length - 1;
                                const connectorVariant = connectorFillMap[step.status];
                                return (
                                    <Box key={`mobile-step-${step.id}`} sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm, flex: isLast ? '0 0 auto' : '0 1 auto' }}>
                                        <Box sx={destinationsPageStyles.mobileProgressStep}>
                                            <Box
                                                component="span"
                                                sx={{
                                                    ...destinationsPageStyles.mobileProgressNode,
                                                    ...getMobileProgressNodeStyles(step.status),
                                                }}
                                            >
                                                {step.status === 'completed' ? <CheckRoundedIcon sx={{ fontSize: 14 }} /> : step.id}
                                            </Box>
                                            <Typography component="span" sx={destinationsPageStyles.mobileProgressLabel}>
                                                {step.label}
                                            </Typography>
                                        </Box>
                                        {!isLast ? (
                                            <Box sx={destinationsPageStyles.mobileProgressConnector}>
                                                {connectorVariant === 'filled' ? (
                                                    <Box sx={destinationsPageStyles.mobileProgressConnectorFilled} />
                                                ) : connectorVariant === 'partial' ? (
                                                    <Box sx={destinationsPageStyles.mobileProgressConnectorPartial} />
                                                ) : null}
                                            </Box>
                                        ) : null}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box> */}

                    <Box component="section" sx={destinationsPageStyles.mobileSection}>
                        <Box sx={destinationsPageStyles.mobileSelectionCard}>
                            <Box sx={destinationsPageStyles.mobileSelectionHeader}>
                                <Typography component="h2" sx={destinationsPageStyles.mobileSelectionTitle}>
                                    Select Your Safari Destinations
                                </Typography>
                                <Typography sx={destinationsPageStyles.mobileSelectionSubtitle}>
                                    Choose one or multiple countries for your African safari experience
                                </Typography>
                            </Box>
                            <Box sx={destinationsPageStyles.mobileSelectionCounter}>
                                Selected: <Typography component="span" fontWeight={700} display="inline">{selectedCount}</Typography> destinations
                            </Box>

                            <Box sx={destinationsPageStyles.mobileDestinationList}>
                                {destinationCards.map(({ id, title, subtitle, image, badgeLabel, meta, priceLabel, tags }) => (
                                    <Box key={`mobile-destination-${id}`} sx={destinationsPageStyles.mobileDestinationCard}>
                                        <Box sx={destinationsPageStyles.mobileDestinationMedia}>
                                            <Box component="img" src={image} alt={title} sx={destinationsPageStyles.mobileDestinationImage} />
                                            <Box component="span" sx={destinationsPageStyles.mobileDestinationBadge}>
                                                {badgeLabel}
                                            </Box>
                                        </Box>
                                        <Box sx={destinationsPageStyles.mobileDestinationInfo}>
                                            <Box sx={destinationsPageStyles.mobileDestinationTitleRow}>
                                                <Typography component="h3" sx={destinationsPageStyles.mobileDestinationTitle}>
                                                    {title}
                                                </Typography>
                                                <Typography component="span" sx={destinationsPageStyles.mobileDestinationPrice}>
                                                    {priceLabel}
                                                </Typography>
                                            </Box>
                                            <Typography sx={destinationsPageStyles.mobileDestinationSubtitle}>{subtitle}</Typography>
                                            <Box sx={destinationsPageStyles.mobileDestinationMetaRow}>
                                                {meta.slice(0, 2).map(({ id: metaId, icon: MetaIcon, label }) => (
                                                    <Box key={`${id}-meta-${metaId}`} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                                                        <MetaIcon sx={{ fontSize: 16, color: colorTokens.safari[600] }} />
                                                        {label}
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Box sx={destinationsPageStyles.mobileDestinationTagGroup}>
                                                {tags.slice(0, 3).map((tag) => (
                                                    <Box key={`${id}-tag-${tag}`} sx={destinationsPageStyles.mobileDestinationTag}>
                                                        {tag}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

                            <Box sx={destinationsPageStyles.mobilePackageSection}>
                                <Typography component="h3" sx={destinationsPageStyles.mobilePackageTitle}>
                                    Multi-Country Packages
                                </Typography>
                                <Box sx={destinationsPageStyles.mobilePackageList}>
                                    {multiCountryPackages.map(({ id, title, description, badgeLabel, badgeColor, badgeBg, duration, rating, price }) => (
                                        <Box key={`mobile-package-${id}`} sx={destinationsPageStyles.mobilePackageCard}>
                                            <Box sx={destinationsPageStyles.mobilePackageHeader}>
                                                <Typography component="h4" sx={{ fontFamily: typographyTokens.heading, fontSize: 16, fontWeight: 600, color: colorTokens.earth[800] }}>
                                                    {title}
                                                </Typography>
                                                <Box component="span" sx={{ ...destinationsPageStyles.mobilePackageBadge, backgroundColor: badgeBg, color: badgeColor }}>
                                                    {badgeLabel}
                                                </Box>
                                            </Box>
                                            <Typography fontSize={13} color="rgba(74,57,42,0.7)">
                                                {description}
                                            </Typography>
                                            <Box sx={destinationsPageStyles.mobilePackageMeta}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}>
                                                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                                                        <CalendarMonthRoundedIcon sx={{ fontSize: 16, color: colorTokens.safari[600] }} />
                                                        {duration}
                                                    </Box>
                                                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                                                        <StarRoundedIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
                                                        {rating}
                                                    </Box>
                                                </Box>
                                                <Typography component="span" fontWeight={700} color={colorTokens.earth[800]}>
                                                    {price}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            <Box sx={destinationsPageStyles.mobileSeasonalCard}>
                                <Box sx={destinationsPageStyles.mobileSeasonalHeader}>
                                    <Box
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 3,
                                            borderRadius: 1,
                                            backgroundColor: 'rgba(244,185,66,0.25)',
                                            color: '#b45309',
                                        }}
                                    >
                                        <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
                                    </Box>
                                    <Typography component="h3" sx={{ fontFamily: typographyTokens.heading, fontWeight: 600, fontSize: 16, color: colorTokens.earth[800] }}>
                                        Best Time to Visit
                                    </Typography>
                                </Box>
                                <Box sx={destinationsPageStyles.mobileSeasonalGrid}>
                                    {seasonalRecommendations.map(({ id, country, season, highlight }) => (
                                        <Box key={`mobile-season-${id}`} sx={destinationsPageStyles.mobileSeasonalItem}>
                                            <Typography component="div" fontWeight={600} color={colorTokens.earth[800]}>
                                                {country}
                                            </Typography>
                                            <Typography component="div" fontSize={11} color="rgba(74,57,42,0.7)">
                                                {season}
                                            </Typography>
                                            <Typography component="div" fontSize={11} color={colorTokens.safari[600]} fontWeight={600}>
                                                {highlight}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            <Box sx={destinationsPageStyles.mobileFooterActions}>
                                <Box
                                    component="button"
                                    type="button"
                                    onClick={() => navigate('../preferences')}
                                    sx={destinationsPageStyles.mobileFooterBackButton}
                                >
                                    <ArrowBackRoundedIcon fontSize="small" />
                                </Box>
                                <Box sx={destinationsPageStyles.mobileFooterActionRow}>
                                    <Box component="button" type="button" sx={destinationsPageStyles.mobileFooterSecondaryButton}>
                                        {/* <StarRoundedIcon fontSize="small" sx={{ marginRight: 6 }} /> */}
                                        Save
                                    </Box>
                                    <Box
                                        component="button"
                                        type="button"
                                        onClick={() => navigate('/bookings/my-trips/dates-and-group')}
                                        sx={destinationsPageStyles.mobileFooterPrimaryButton}
                                    >
                                        Continue
                                        {/* <ArrowForwardRoundedIcon fontSize="small" sx={{ marginLeft: 6 }} /> */}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box component="section" sx={destinationsPageStyles.mobileExpertSection}>
                        <Box sx={destinationsPageStyles.mobileExpertCard}>
                            <Box sx={destinationsPageStyles.mobileExpertOverlay} />
                            <Box sx={destinationsPageStyles.mobileExpertContent}>
                                <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                                    <Typography component="h2" sx={{ fontFamily: typographyTokens.heading, fontWeight: 600, fontSize: 20 }}>
                                        Expert Destination Advice
                                    </Typography>
                                    <Typography fontSize={13} color="rgba(255,255,255,0.85)">
                                        Our specialists recommend the perfect combination based on your preferences
                                    </Typography>
                                </Box>
                                <Box sx={destinationsPageStyles.mobileExpertList}>
                                    {expertCards.map(({ id, title, description, recommendation, icon: Icon }) => (
                                        <Box key={`mobile-expert-${id}`} sx={destinationsPageStyles.mobileExpertItem}>
                                            <Box sx={destinationsPageStyles.mobileExpertIcon}>
                                                <Icon sx={{ fontSize: 20, color: colorTokens.neutral.white }} />
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                <Typography component="h3" fontSize={13} fontWeight={600}>
                                                    {title}
                                                </Typography>
                                                <Typography fontSize={11} color="rgba(255,255,255,0.75)">
                                                    {description}
                                                </Typography>
                                                <Typography fontSize={11} color={colorTokens.safari[200]} fontWeight={600}>
                                                    {recommendation}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Box component="button" type="button" sx={destinationsPageStyles.mobileExpertButton}>
                                    <ChatBubbleRoundedIcon fontSize="small" sx={{ marginRight: 6 }} />
                                    Chat with Expert
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box component="section" sx={destinationsPageStyles.mobileComparisonSection}>
                        <Typography component="h2" sx={destinationsPageStyles.mobileComparisonHeaderTitle}>
                            Compare Destinations
                        </Typography>
                        <Typography sx={destinationsPageStyles.mobileComparisonHeaderSubtitle}>
                            Side-by-side comparison to help you choose
                        </Typography>
                        <Box sx={destinationsPageStyles.mobileComparisonTableWrap}>
                            <Box component="table" sx={destinationsPageStyles.mobileComparisonTable}>
                                <Box component="thead">
                                    <Box component="tr">
                                        <Box
                                            component="th"
                                            sx={{
                                                ...destinationsPageStyles.mobileComparisonHeadCell,
                                                ...destinationsPageStyles.mobileComparisonCellFeature,
                                            }}
                                        >
                                            Features
                                        </Box>
                                        {destinationCards.slice(0, 4).map(({ id, title }) => (
                                            <Box key={`mobile-comparison-head-${id}`} component="th" sx={destinationsPageStyles.mobileComparisonHeadCell}>
                                                {title}
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                                <Box component="tbody">
                                    {comparisonRows.map((row, index) => {
                                        const isAlt = index % 2 === 1;
                                        return (
                                            <Box
                                                key={`mobile-comparison-row-${row.id}`}
                                                component="tr"
                                                sx={isAlt ? { backgroundColor: 'rgba(245,243,240,0.6)' } : undefined}
                                            >
                                                <Box
                                                    component="td"
                                                    sx={{
                                                        ...destinationsPageStyles.mobileComparisonCell,
                                                        ...destinationsPageStyles.mobileComparisonCellFeature,
                                                    }}
                                                >
                                                    {row.feature}
                                                </Box>
                                                {row.values.map((value, valueIndex) => (
                                                    <Box key={`mobile-comparison-${row.id}-${valueIndex}`} component="td" sx={destinationsPageStyles.mobileComparisonCell}>
                                                        {row.type === 'boolean' ? (
                                                            value ? (
                                                                <CheckCircleRoundedIcon sx={{ fontSize: 14, color: '#15803d' }} />
                                                            ) : (
                                                                <CancelRoundedIcon sx={{ fontSize: 14, color: '#b45309' }} />
                                                            )
                                                        ) : (
                                                            <Typography component="span" fontSize={11} color="rgba(74,57,42,0.75)">
                                                                {value}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                ))}
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box component="main" id="main-content" sx={{ ...destinationsPageStyles.main, display: { xs: 'none', md: 'block' } }}>
                <WizardHeroSection
                    id="hero-section"
                    image={{
                        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/77162dfde0-e5eae02708590f697e25.png',
                        alt: 'African safari landscape at golden hour',
                }}
                title="Choose Your Safari Destination"
                description="Discover the perfect African destination for your dream safari adventure"
                highlights={heroHighlights}
                styles={wizardHeroStyles}
            />

            <Box component="section" id="planning-wizard" sx={destinationsPageStyles.wizardSection}>
                <Box sx={destinationsPageStyles.wizardContainer}>
                    <WizardProgressBar
                        id="progress-bar"
                        steps={wizardSteps}
                        styles={wizardProgressStyles}
                        renderNodeContent={(step) =>
                            step.status === 'completed' ? <CheckRoundedIcon fontSize="small" /> : step.id
                        }
                        getConnectorVariant={(step) => connectorFillMap[step.status]}
                    />

                    <Box id="destinations-selection" sx={destinationsPageStyles.selectionCard}>
                        <Box sx={destinationsPageStyles.selectionHeader}>
                            <Box sx={destinationsPageStyles.selectionTitleGroup}>
                                <Typography component="h2" sx={destinationsPageStyles.selectionTitle}>
                                    Select Your Safari Destinations
                                </Typography>
                                <Typography sx={destinationsPageStyles.selectionSubtitle}>
                                    Choose one or multiple countries for your African safari experience
                                </Typography>
                            </Box>
                            <Box sx={{ ...destinationsPageStyles.selectionBadge, backgroundColor: 'rgba(238, 92, 40, 0.1)' }}>
                                <Typography component="span" fontSize={13} fontWeight={600}>
                                    Selected: <Box component="span" fontWeight={700}>{selectedCount}</Box> destinations
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={destinationsPageStyles.destinationsGrid}>
                            {destinationCards.map(({ id, title, subtitle, image, badgeLabel, meta, priceLabel, features, tags }) => (
                                <Box key={id} sx={destinationsPageStyles.destinationCard}>
                                    <Box sx={destinationsPageStyles.destinationMedia}>
                                        <Box component="img" src={image} alt={title} sx={destinationsPageStyles.destinationImage} />
                                        <Box sx={destinationsPageStyles.destinationOverlay} />
                                        <Box sx={destinationsPageStyles.destinationBadge}>{badgeLabel}</Box>
                                        <Box sx={destinationsPageStyles.destinationTitleBlock}>
                                            <Typography component="h3" sx={destinationsPageStyles.destinationTitle}>
                                                {title}
                                            </Typography>
                                            <Typography sx={destinationsPageStyles.destinationSubtitle}>{subtitle}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={destinationsPageStyles.destinationBody}>
                                        <Box sx={destinationsPageStyles.destinationMetaRow}>
                                            <Box sx={destinationsPageStyles.destinationMetaGroup}>
                                                {meta.map(({ id: metaId, icon: MetaIcon, label }) => (
                                                    <Box key={metaId} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                                                        <MetaIcon sx={{ fontSize: 18, color: colorTokens.safari[600] }} />
                                                        <Typography component="span" fontSize={13} fontWeight={600}>
                                                            {label}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Typography component="span" sx={destinationsPageStyles.destinationPrice}>
                                                {priceLabel}
                                            </Typography>
                                        </Box>

                                        <Box sx={destinationsPageStyles.destinationFeatureList}>
                                            {features.map((feature) => (
                                                <Box key={`${id}-${feature}`} sx={destinationsPageStyles.destinationFeature}>
                                                    <CheckRoundedIcon sx={{ fontSize: 16, color: colorTokens.safari[600] }} />
                                                    {feature}
                                                </Box>
                                            ))}
                                        </Box>

                                        <Box sx={destinationsPageStyles.destinationTags}>
                                            {tags.map((tag) => (
                                                <Box key={`${id}-${tag}`} sx={destinationsPageStyles.destinationTag}>
                                                    {tag}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={destinationsPageStyles.packageSection}>
                            <Typography component="h3" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: 28, color: colorTokens.earth[800] }}>
                                Multi-Country Safari Packages
                            </Typography>
                            <Box sx={destinationsPageStyles.packageGrid}>
                                {multiCountryPackages.map(({ id, title, description, badgeLabel, badgeColor, badgeBg, accentGradient, duration, rating, price }) => (
                                    <Box key={id} sx={{ ...destinationsPageStyles.packageCard, backgroundImage: accentGradient }}>
                                        <Box sx={destinationsPageStyles.packageHeader}>
                                            <Typography component="h4" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: 20, color: colorTokens.earth[800] }}>
                                                {title}
                                            </Typography>
                                            <Box
                                                component="span"
                                                sx={{
                                                    ...destinationsPageStyles.packageBadge,
                                                    backgroundColor: badgeBg,
                                                    color: badgeColor,
                                                }}
                                            >
                                                {badgeLabel}
                                            </Box>
                                        </Box>
                                        <Typography fontSize={14} color="rgba(74,57,42,0.7)">
                                            {description}
                                        </Typography>
                                        <Box sx={destinationsPageStyles.packageFooter}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                                                    <CalendarMonthRoundedIcon sx={{ fontSize: 18, color: colorTokens.safari[600] }} />
                                                    {duration}
                                                </Box>
                                                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                                                    <StarRoundedIcon sx={{ fontSize: 18, color: '#f59e0b' }} />
                                                    {rating}
                                                </Box>
                                            </Box>
                                            <Typography component="span" fontWeight={700} color={colorTokens.earth[800]}>
                                                {price}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={destinationsPageStyles.seasonalNotice}>
                            <Box sx={destinationsPageStyles.seasonalHeader}>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '12px',
                                        borderRadius: radiusTokens.md,
                                        backgroundColor: 'rgba(244,185,66,0.25)',
                                        color: '#b45309',
                                    }}
                                >
                                    <CalendarMonthRoundedIcon />
                                </Box>
                                <Typography component="h3" sx={{ fontFamily: typographyTokens.heading, fontWeight: 600, fontSize: 24, color: colorTokens.earth[800] }}>
                                    Best Time to Visit
                                </Typography>
                            </Box>
                            <Box sx={destinationsPageStyles.seasonalGrid}>
                                {seasonalRecommendations.map(({ id, country, season, highlight }) => (
                                    <Box key={id} sx={destinationsPageStyles.seasonalItem}>
                                        <Typography component="span" fontWeight={600} color={colorTokens.earth[800]}>
                                            {country}
                                        </Typography>
                                        <Typography component="span" fontSize={12} color="rgba(74,57,42,0.7)">
                                            {season}
                                        </Typography>
                                        <Typography component="span" fontSize={12} color={colorTokens.safari[600]} fontWeight={600}>
                                            {highlight}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={destinationsPageStyles.selectionFooter}>
                            <Box
                                component="button"
                                type="button"
                                onClick={() => navigate('../preferences')}
                                sx={destinationsPageStyles.footerButtonSecondary}
                            >
                                <ArrowBackRoundedIcon fontSize="small" />
                                Back to Preferences
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                <Box
                                    component="button"
                                    type="button"
                                    sx={{
                                        ...destinationsPageStyles.footerButtonPrimary,
                                        backgroundColor: colorTokens.neutral.white,
                                        color: colorTokens.earth[800],
                                        backgroundImage: 'none',
                                        boxShadow: '0 12px 24px rgba(61, 48, 36, 0.16)',
                                    }}
                                >
                                    <StarRoundedIcon fontSize="small" />
                                    Save Selections
                                </Box>
                                <Box
                                    component="button"
                                    type="button"
                                    onClick={() => navigate('/bookings/my-trips/dates-and-group')}
                                    sx={destinationsPageStyles.footerButtonPrimary}
                                >
                                    Continue to Dates & Group
                                    <ArrowForwardRoundedIcon fontSize="small" />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box component="section" id="destination-highlights" sx={destinationsPageStyles.sectionWrap}>
                <Box sx={destinationsPageStyles.sectionContainer}>
                    <Box sx={destinationsPageStyles.sectionHeader}>
                        <Typography component="h2" sx={destinationsPageStyles.sectionTitle}>
                            Why These Destinations?
                        </Typography>
                        <Typography sx={destinationsPageStyles.sectionSubtitle}>
                            Each destination offers unique wildlife experiences and unforgettable adventures
                        </Typography>
                    </Box>
                    <Box sx={destinationsPageStyles.highlightGrid}>
                        {highlightCards.map(({ id, title, description, icon: Icon, iconGradient, iconColor, stats }) => (
                            <Box key={id} sx={destinationsPageStyles.highlightCard}>
                                <Box sx={destinationsPageStyles.highlightHeader}>
                                    <Box sx={{ ...destinationsPageStyles.highlightIconWrap, backgroundImage: iconGradient, color: iconColor }}>
                                        <Icon sx={{ fontSize: 30 }} />
                                    </Box>
                                    <Box>
                                        <Typography component="h3" sx={destinationsPageStyles.highlightTitle}>
                                            {title}
                                        </Typography>
                                        <Typography fontSize={14} color="rgba(74,57,42,0.7)">
                                            {description}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    {stats.map(({ id: statId, label, value }) => (
                                        <Box key={statId} sx={destinationsPageStyles.highlightRow}>
                                            <Typography component="span">{label}</Typography>
                                            <Typography component="span" sx={destinationsPageStyles.highlightValue}>
                                                {value}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box component="section" id="expert-recommendations" sx={destinationsPageStyles.sectionWrap}>
                <Box sx={destinationsPageStyles.sectionContainer}>
                    <Box sx={destinationsPageStyles.expertSection}>
                        <Box sx={destinationsPageStyles.expertPattern} />
                        <Box sx={destinationsPageStyles.expertContent}>
                            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography component="h2" sx={{ fontFamily: typographyTokens.heading, fontWeight: 700, fontSize: { xs: 32, md: 40 } }}>
                                    Expert Destination Advice
                                </Typography>
                                <Typography fontSize={18} color="rgba(255,255,255,0.85)">
                                    Our specialists recommend the perfect combination based on your preferences
                                </Typography>
                            </Box>
                            <Box sx={destinationsPageStyles.expertCardGrid}>
                                {expertCards.map(({ id, title, description, recommendation, icon: Icon }) => (
                                    <Box key={id} sx={destinationsPageStyles.expertCard}>
                                        <Box sx={destinationsPageStyles.expertIconWrap}>
                                            <Icon sx={{ fontSize: 28, color: colorTokens.neutral.white }} />
                                        </Box>
                                        <Typography component="h3" fontWeight={600}>
                                            {title}
                                        </Typography>
                                        <Typography fontSize={14} color="rgba(255,255,255,0.7)">
                                            {description}
                                        </Typography>
                                        <Typography fontSize={14} fontWeight={600} color={colorTokens.safari[200]}>
                                            {recommendation}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            <Box component="button" type="button" sx={destinationsPageStyles.expertButton}>
                                <ChatBubbleRoundedIcon fontSize="small" />
                                Chat with Our Destination Expert
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box component="section" id="comparison-tool" sx={destinationsPageStyles.sectionWrap}>
                <Box sx={destinationsPageStyles.sectionContainer}>
                    <Box sx={destinationsPageStyles.sectionHeader}>
                        <Typography component="h2" sx={destinationsPageStyles.sectionTitle}>
                            Compare Destinations
                        </Typography>
                        <Typography sx={destinationsPageStyles.sectionSubtitle}>
                            Side-by-side comparison to help you choose the perfect safari destination
                        </Typography>
                    </Box>
                    <Box sx={destinationsPageStyles.comparisonWrap}>
                        <Box component="table" sx={destinationsPageStyles.comparisonTable}>
                            <Box component="thead">
                                <Box component="tr">
                                    <Box
                                        component="th"
                                        sx={{
                                            ...destinationsPageStyles.comparisonHeadCell,
                                            ...destinationsPageStyles.comparisonHeadCellFeature,
                                        }}
                                    >
                                        Features
                                    </Box>
                                    {destinationCards.slice(0, 4).map(({ id, title }) => (
                                        <Box key={`head-${id}`} component="th" sx={destinationsPageStyles.comparisonHeadCell}>
                                            {title}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box component="tbody">
                                {comparisonRows.map((row, index) => {
                                    const isAlt = index % 2 === 1;
                                    return (
                                        <Box
                                            key={row.id}
                                            component="tr"
                                            sx={isAlt ? destinationsPageStyles.comparisonRowAlt : undefined}
                                        >
                                            <Box
                                                component="td"
                                                sx={{
                                                    ...destinationsPageStyles.comparisonCell,
                                                    ...destinationsPageStyles.comparisonCellFeature,
                                                }}
                                            >
                                                {row.feature}
                                            </Box>
                                            {row.values.map((value, valueIndex) => (
                                                <Box key={`${row.id}-${valueIndex}`} component="td" sx={destinationsPageStyles.comparisonCell}>
                                                    {row.type === 'boolean' ? (
                                                        value ? (
                                                            <CheckCircleRoundedIcon sx={destinationsPageStyles.comparisonIconPositive} />
                                                        ) : (
                                                            <CancelRoundedIcon sx={destinationsPageStyles.comparisonIconNegative} />
                                                        )
                                                    ) : (
                                                        <Typography component="span" fontSize={13} color="rgba(74,57,42,0.75)">
                                                            {value}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            ))}
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    );
};

export default DestinationsPage;
