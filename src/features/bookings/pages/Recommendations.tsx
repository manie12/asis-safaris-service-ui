import { useMemo, useState, type ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import recommendationsPageStyles from '@/design-system/theme/recommendationsPageStyles';
import { colorTokens, spacingTokens, typographyTokens } from '@/design-system/theme/tokens';
import WizardHeroSection, { type WizardHeroHighlight, type WizardHeroStyles } from '@/shared/components/WizardHeroSection';
import WizardProgressBar, { type WizardProgressStep, type WizardProgressStyles } from '@/shared/components/WizardProgressBar';
import { useNavigate } from 'react-router-dom';

const heroHighlights: WizardHeroHighlight[] = [
    {
        id: 'personalized',
        icon: AutoAwesomeRoundedIcon,
        label: 'Personalized for You',
    },
    {
        id: 'curated',
        icon: WorkspacePremiumRoundedIcon,
        label: 'Expert Curated',
    },
];

const wizardSteps: WizardProgressStep[] = [
    { id: 1, label: 'Preferences', status: 'completed' },
    { id: 2, label: 'Destinations', status: 'completed' },
    { id: 3, label: 'Dates & Group', status: 'completed' },
    { id: 4, label: 'Recommendations', status: 'active' },
];

type SummaryItem = {
    id: string;
    label: string;
    value: string;
};

const summaryItems: SummaryItem[] = [
    { id: 'destinations', label: 'Destinations', value: 'Kenya, Tanzania' },
    { id: 'dates', label: 'Travel Dates', value: 'July 15 – 25, 2024' },
    { id: 'group', label: 'Group Size', value: '2 Adults' },
    { id: 'budget', label: 'Budget Range', value: 'Mid-Range' },
];

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc' | 'reviews';
type DurationFilter = 'all' | '5-7' | '8-10' | '11-14' | '15-plus';
type StyleFilter = 'all' | 'luxury' | 'mid-range' | 'budget' | 'family' | 'adventure';

type SafariPackage = {
    id: string;
    title: string;
    description: string;
    badge: {
        label: string;
        gradient: string;
        icon?: typeof AutoAwesomeRoundedIcon;
    };
    mainImage: { src: string; alt: string };
    gallery: { src: string; alt: string }[];
    extraPhotosCount: number;
    rating: { value: number; reviews: number };
    durationLabel: string;
    durationDays: number;
    guestsLabel: string;
    priceValue: number;
    priceLabel: string;
    priceSuffix: string;
    savingLabel?: string;
    highlights: string[];
    includes: string[];
    destinations: Array<{ id: string; label: string; nights: string }>;
    durationCategory: DurationFilter;
    styleCategory: StyleFilter;
    perksLabel?: string;
};

const safariPackages: SafariPackage[] = [
    {
        id: 'ultimate-kenya-tanzania',
        title: 'Ultimate Kenya & Tanzania Safari',
        description:
            'Experience the Great Migration, Big Five encounters, and luxury accommodations across Maasai Mara, Serengeti, and Ngorongoro Crater.',
        badge: {
            label: 'Best Match',
            gradient: 'linear-gradient(135deg, #22c55e 0%, #0d9488 100%)',
            icon: AutoAwesomeRoundedIcon,
        },
        mainImage: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4cf7f1f342-baaf43c8a2562d04d5ac.png',
            alt: 'Maasai Mara lions resting under an acacia tree at golden hour',
        },
        gallery: [
            {
                src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ff62189add-3ae17015d5f433f9032f.png',
                alt: 'Serengeti wildebeest migration crossing the river',
            },
            {
                src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4469d64902-50eb9662ba9f323cdc52.png',
                alt: 'Luxury safari camp interior with sunset views',
            },
            {
                src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d8695b0496-a5501fcf45c853c88a2e.png',
                alt: 'Ngorongoro crater landscape in Tanzania',
            },
        ],
        extraPhotosCount: 8,
        rating: { value: 4.9, reviews: 247 },
        durationLabel: '10 days / 9 nights',
        durationDays: 10,
        guestsLabel: '2 – 8 guests',
        priceValue: 5890,
        priceLabel: '$5,890',
        priceSuffix: 'per person',
        savingLabel: 'Save $600 vs booking separately',
        highlights: ['Great Migration viewing', 'Big Five game drives', 'Ngorongoro Crater tour', 'Maasai cultural visit'],
        includes: ['Luxury lodge accommodation', 'All meals & drinks', 'Park fees & game drives', 'Professional guide'],
        destinations: [
            { id: 'maasai-mara', label: 'Maasai Mara', nights: '3 nights' },
            { id: 'serengeti', label: 'Serengeti', nights: '4 nights' },
            { id: 'ngorongoro', label: 'Ngorongoro', nights: '2 nights' },
        ],
        durationCategory: '8-10',
        styleCategory: 'luxury',
        perksLabel: 'Private guide included',
    },
    {
        id: 'family-kenya-adventure',
        title: 'Family Kenya Adventure Safari',
        description:
            'Perfect family safari with child-friendly accommodations, educational activities, and shorter game drives designed for young explorers.',
        badge: {
            label: 'Family Favourite',
            gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
            icon: GroupsRoundedIcon,
        },
        mainImage: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/1e8942e8ae-9f77de007d64b06ce1f9.png',
            alt: 'Family on safari spotting elephants from a jeep',
        },
        gallery: [
            {
                src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e3dc2011c9-9bfce48fc4dadf4a41aa.png',
                alt: 'Amboseli National Park with Mount Kilimanjaro in the background',
            },
            {
                src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e9d1f8020d-1316c29fc92bdce025cc.png',
                alt: 'Family-friendly safari lodge pool at sunset',
            },
            {
                src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e1a40d329f-e00291b1acec885a7922.png',
                alt: 'Lake Nakuru flamingos in Kenya',
            },
        ],
        extraPhotosCount: 6,
        rating: { value: 4.7, reviews: 189 },
        durationLabel: '8 days / 7 nights',
        durationDays: 8,
        guestsLabel: 'Families welcome',
        priceValue: 4290,
        priceLabel: '$4,290',
        priceSuffix: 'per person',
        savingLabel: 'Kids under 12: 50% off',
        highlights: ['Kid-friendly game drives', 'Educational activities', 'Swimming pools', "Children's menu"],
        includes: ['Family rooms & suites', 'All meals included', 'Park fees & activities', 'Dedicated family guide'],
        destinations: [
            { id: 'amboseli', label: 'Amboseli', nights: '3 nights' },
            { id: 'lake-nakuru', label: 'Lake Nakuru', nights: '2 nights' },
            { id: 'maasai-cultural', label: 'Maasai Mara', nights: '2 nights' },
        ],
        durationCategory: '8-10',
        styleCategory: 'family',
        perksLabel: 'Complimentary kids club',
    },
    {
        id: 'great-migration-classic',
        title: 'Great Migration Classic Safari',
        description:
            'Witness dramatic river crossings and expansive savanna landscapes with a balanced mix of comfort camps and boutique lodges.',
        badge: {
            label: 'Migration Season',
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            icon: CalendarMonthRoundedIcon,
        },
        mainImage: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ff48c2d2f4-4d21e6f0d6ad0c5d904c.png',
            alt: 'Wildebeest crossing the Mara River during Great Migration',
        },
        gallery: [
            {
                src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/968c6b38f0-79314e2de62a3394a9c1.png',
                alt: 'Safari vehicle observing cheetahs in the Serengeti',
            },
            {
                src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3d9c5c01d2-b4b49d3e1f1f5d305b9c.png',
                alt: 'Boutique safari lodge terrace at sunset',
            },
            {
                src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/a1b578ec9a-85dbf76ce5a8f1d80dd0.png',
                alt: 'Balloon safari over the Maasai Mara',
            },
        ],
        extraPhotosCount: 5,
        rating: { value: 4.8, reviews: 212 },
        durationLabel: '9 days / 8 nights',
        durationDays: 9,
        guestsLabel: 'Small groups (max 12)',
        priceValue: 4890,
        priceLabel: '$4,890',
        priceSuffix: 'per person',
        highlights: ['Sunrise balloon safari', 'Exclusive migration viewing', 'Night drives', 'Conservation talk'],
        includes: ['Boutique camp stays', 'Daily game drives', 'Internal flights', 'All park fees'],
        destinations: [
            { id: 'serengeti-central', label: 'Serengeti Central', nights: '4 nights' },
            { id: 'maasai-mara', label: 'Maasai Mara', nights: '3 nights' },
            { id: 'arusha', label: 'Arusha', nights: '1 night' },
        ],
        durationCategory: '8-10',
        styleCategory: 'mid-range',
        perksLabel: 'Balloon safari included',
    },
];

const wizardHeroStyles: WizardHeroStyles = {
    heroSection: recommendationsPageStyles.heroSection,
    heroMediaWrap: recommendationsPageStyles.heroMediaWrap,
    heroImage: recommendationsPageStyles.heroImage,
    heroOverlay: recommendationsPageStyles.heroOverlay,
    heroContentWrap: recommendationsPageStyles.heroContentWrap,
    heroCopy: recommendationsPageStyles.heroCopy,
    heroTitle: recommendationsPageStyles.heroTitle,
    heroDescription: recommendationsPageStyles.heroDescription,
    heroHighlights: recommendationsPageStyles.heroHighlights,
    heroHighlight: recommendationsPageStyles.heroHighlight,
};

const wizardProgressStyles: WizardProgressStyles = {
    header: recommendationsPageStyles.progressHeader,
    steps: recommendationsPageStyles.progressSteps,
    stepWrapper: recommendationsPageStyles.stepWrapper,
    step: recommendationsPageStyles.progressStep,
    node: recommendationsPageStyles.progressNode,
    nodeCompleted: recommendationsPageStyles.progressNodeCompleted,
    nodeActive: recommendationsPageStyles.progressNodeActive,
    label: recommendationsPageStyles.progressLabel,
    labelCompleted: recommendationsPageStyles.progressLabelCompleted,
    labelActive: recommendationsPageStyles.progressLabelActive,
    connector: recommendationsPageStyles.progressConnector,
    connectorFilled: recommendationsPageStyles.progressConnectorFilled,
};

const sortOptionLabels: Record<SortOption, string> = {
    recommended: 'Recommended',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low',
    'duration-asc': 'Duration: Shortest',
    'duration-desc': 'Duration: Longest',
    reviews: 'Best Reviews',
};

const durationFilterLabels: Record<DurationFilter, string> = {
    all: 'All Durations',
    '5-7': '5-7 Days',
    '8-10': '8-10 Days',
    '11-14': '11-14 Days',
    '15-plus': '15+ Days',
};

const styleFilterLabels: Record<StyleFilter, string> = {
    all: 'All Styles',
    luxury: 'Luxury',
    'mid-range': 'Mid-Range',
    budget: 'Budget',
    family: 'Family-Friendly',
    adventure: 'Adventure',
};

const RecommendationsPage = () => {
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState<SortOption>('recommended');
    const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');
    const [styleFilter, setStyleFilter] = useState<StyleFilter>('all');
    const [savedPackages, setSavedPackages] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(safariPackages.map(({ id }) => [id, false])),
    );

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value as SortOption);
    };

    const handleDurationChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDurationFilter(event.target.value as DurationFilter);
    };

    const handleStyleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setStyleFilter(event.target.value as StyleFilter);
    };

    const toggleSavedPackage = (id: string) => {
        setSavedPackages((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredPackages = useMemo(() =>
        safariPackages.filter((pkg) => {
            const durationMatch = durationFilter === 'all' || pkg.durationCategory === durationFilter;
            const styleMatch = styleFilter === 'all' || pkg.styleCategory === styleFilter;
            return durationMatch && styleMatch;
        }),
        [durationFilter, styleFilter]);

    const sortedPackages = useMemo(() => {
        const next = [...filteredPackages];

        switch (sortOption) {
            case 'price-asc':
                next.sort((a, b) => a.priceValue - b.priceValue);
                break;
            case 'price-desc':
                next.sort((a, b) => b.priceValue - a.priceValue);
                break;
            case 'duration-asc':
                next.sort((a, b) => a.durationDays - b.durationDays);
                break;
            case 'duration-desc':
                next.sort((a, b) => b.durationDays - a.durationDays);
                break;
            case 'reviews':
                next.sort((a, b) => b.rating.value - a.rating.value);
                break;
            default:
                next.sort((a, b) => b.rating.value - a.rating.value);
        }

        return next;
    }, [filteredPackages, sortOption]);

    const packageCountLabel = `${sortedPackages.length} packages found`;
    // const totalSteps = wizardSteps.length;
    // const activeStepIndex = wizardSteps.findIndex((step) => step.status === 'active');
    // const completedSteps = wizardSteps.filter((step) => step.status === 'completed').length;
    // const currentStepNumber = activeStepIndex >= 0 ? activeStepIndex + 1 : Math.max(completedSteps, 1);
    // const progressFraction = `${currentStepNumber}/${totalSteps}`;
    // const progressSummaryLabel = `Step ${currentStepNumber} of ${totalSteps}`;
    // const mobileAvatarUrl = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg';
    const summaryValueMap = useMemo(
        () => Object.fromEntries(summaryItems.map(({ id, value }) => [id, value])),
        [],
    );
    // const connectorVariant = (
    //     current: WizardProgressStep,
    //     next?: WizardProgressStep,
    // ): 'filled' | 'partial' | 'none' => {
    //     if (current.status === 'completed') {
    //         return 'filled';
    //     }

    //     if (current.status === 'active') {
    //         return next?.status === 'upcoming' ? 'partial' : 'filled';
    //     }

    //     return 'none';
    // };

    // const hasSavedPackages = useMemo(() => Object.values(savedPackages).some(Boolean), [savedPackages]);

    const renderRatingStars = (rating: number) =>
        Array.from({ length: 5 }).map((_, index) =>
            rating >= index + 1 ? (
                <StarRoundedIcon key={`mobile-rating-star-${index}`} sx={{ fontSize: 16, color: '#fbbf24' }} />
            ) : (
                <StarBorderRoundedIcon key={`mobile-rating-star-${index}`} sx={{ fontSize: 16, color: '#fbbf24' }} />
            ),
        );

    const renderMobilePackageCard = (pkg: SafariPackage) => {
        const isSaved = savedPackages[pkg.id];
        const RatingIcon = pkg.badge.icon ?? AutoAwesomeRoundedIcon;
        const [firstGallery, secondGallery] = pkg.gallery;
        const remainingPhotos = pkg.extraPhotosCount;

        return (
            <Box key={`mobile-package-${pkg.id}`} sx={recommendationsPageStyles.mobilePackageCard}>
                <Box sx={recommendationsPageStyles.mobilePackageMedia}>
                    <Box sx={{ position: 'absolute', top: spacingTokens.sm, left: spacingTokens.sm }}>
                        <Box sx={{ ...recommendationsPageStyles.mobilePackageBadge, backgroundImage: pkg.badge.gradient }}>
                            <RatingIcon sx={{ fontSize: 14 }} />
                            {pkg.badge.label}
                        </Box>
                    </Box>
                    <Box
                        component="button"
                        type="button"
                        onClick={() => toggleSavedPackage(pkg.id)}
                        aria-pressed={isSaved}
                        sx={recommendationsPageStyles.mobilePackageSaveButton}
                    >
                        {isSaved ? (
                            <FavoriteRoundedIcon sx={{ fontSize: 20, color: colorTokens.safari[500] }} />
                        ) : (
                            <FavoriteBorderRoundedIcon sx={{ fontSize: 20, color: 'rgba(74,57,42,0.75)' }} />
                        )}
                    </Box>
                    <Box
                        component="img"
                        src={pkg.mainImage.src}
                        alt={pkg.mainImage.alt}
                        sx={recommendationsPageStyles.mobilePackageImage}
                    />
                    <Box sx={recommendationsPageStyles.mobilePackageGallery}>
                        {firstGallery ? (
                            <Box
                                component="img"
                                src={firstGallery.src}
                                alt={firstGallery.alt}
                                sx={recommendationsPageStyles.mobilePackageGalleryImage}
                            />
                        ) : null}
                        {secondGallery ? (
                            <Box
                                component="img"
                                src={secondGallery.src}
                                alt={secondGallery.alt}
                                sx={recommendationsPageStyles.mobilePackageGalleryImage}
                            />
                        ) : null}
                        <Box sx={recommendationsPageStyles.mobilePackageGalleryMore}>
                            +{remainingPhotos} photos
                        </Box>
                    </Box>
                </Box>

                <Box sx={recommendationsPageStyles.mobilePackageBody}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <Typography component="h3" sx={recommendationsPageStyles.mobilePackageTitle}>
                            {pkg.title}
                        </Typography>
                        <Typography sx={recommendationsPageStyles.mobilePackageDescription}>
                            {pkg.description}
                        </Typography>
                    </Box>

                    <Box sx={recommendationsPageStyles.mobilePackageRating}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                            {renderRatingStars(pkg.rating.value)}
                            <Typography component="span" fontSize={12} color="rgba(74,57,42,0.7)">
                                {pkg.rating.value.toFixed(1)} ({pkg.rating.reviews})
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Typography component="span" fontSize={18} fontWeight={700} color={colorTokens.safari[600]}>
                                {pkg.priceLabel}
                            </Typography>
                            <Typography component="span" fontSize={11} color="rgba(74,57,42,0.6)">
                                {pkg.priceSuffix}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={recommendationsPageStyles.mobilePackageMeta}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <CalendarMonthRoundedIcon sx={{ fontSize: 16, color: colorTokens.safari[500] }} />
                            {pkg.durationLabel}
                        </Box>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <GroupsRoundedIcon sx={{ fontSize: 16, color: colorTokens.safari[500] }} />
                            {pkg.guestsLabel}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                        <Typography component="h4" fontSize={13} fontWeight={600} color={colorTokens.earth[800]}>
                            Key Highlights
                        </Typography>
                        <Box sx={recommendationsPageStyles.mobilePackageHighlights}>
                            {pkg.highlights.slice(0, 4).map((highlight) => (
                                <Box key={`mobile-highlight-${pkg.id}-${highlight}`} sx={recommendationsPageStyles.mobilePackageHighlight}>
                                    <CheckRoundedIcon sx={{ fontSize: 14, color: '#22c55e' }} />
                                    <Typography component="span" fontSize={12} color="rgba(74,57,42,0.75)">
                                        {highlight}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                        <Typography component="h4" fontSize={13} fontWeight={600} color={colorTokens.earth[800]}>
                            Destinations
                        </Typography>
                        <Box sx={recommendationsPageStyles.mobilePackageDestinations}>
                            {pkg.destinations.map(({ id, label, nights }) => (
                                <Box key={`mobile-destination-${pkg.id}-${id}`} sx={recommendationsPageStyles.mobilePackageDestination}>
                                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colorTokens.safari[500] }} />
                                    <Typography component="span" fontSize={12} color="rgba(74,57,42,0.75)">
                                        {label} ({nights})
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={recommendationsPageStyles.mobilePackageActions}>
                        <Box component="button" type="button" sx={recommendationsPageStyles.mobileSecondaryButton}>
                            Details
                        </Box>
                        <Box
                            component="button"
                            type="button"
                            onClick={() => navigate('/bookings/checkout')}
                            sx={recommendationsPageStyles.mobilePrimaryButton}
                        >
                            Book Now
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    };

    const renderMobileLayout = () => (
        <Box sx={recommendationsPageStyles.mobilePage}>
            {/* <Box component="header" id="recommendations-mobile-header" sx={recommendationsPageStyles.mobileHeader}>
                <Box sx={recommendationsPageStyles.mobileHeaderBrand}>
                    <Box sx={recommendationsPageStyles.mobileHeaderIcon}>
                        <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Typography component="span" sx={recommendationsPageStyles.mobileHeaderTitle}>
                        ASIS
                    </Typography>
                </Box>
                <Box sx={recommendationsPageStyles.mobileHeaderActions}>
                    <Box component="button" type="button" aria-label="Search" sx={recommendationsPageStyles.mobileHeaderButton}>
                        <SearchRoundedIcon fontSize="small" />
                    </Box>
                    <Box
                        component="button"
                        type="button"
                        aria-label="Saved safaris"
                        sx={{
                            ...recommendationsPageStyles.mobileHeaderButton,
                            color: hasSavedPackages ? colorTokens.safari[600] : 'rgba(74,57,42,0.75)',
                        }}
                    >
                        {hasSavedPackages ? (
                            <FavoriteRoundedIcon fontSize="small" />
                        ) : (
                            <FavoriteBorderRoundedIcon fontSize="small" />
                        )}
                    </Box>
                    <Box sx={recommendationsPageStyles.mobileHeaderAvatar}>
                        <Box
                            component="img"
                            src={mobileAvatarUrl}
                            alt="Profile"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                </Box>
            </Box> */}

            <Box component="main" id="recommendations-mobile-main" sx={recommendationsPageStyles.mobileMain}>
                <Box component="section" sx={recommendationsPageStyles.mobileHeroSection}>
                    <Box sx={recommendationsPageStyles.mobileHeroMedia}>
                        <Box
                            component="img"
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/83b5981d2d-fba18cf52e9ad954ea66.png"
                            alt="African wildlife collage with elephants, lions, and zebras"
                            sx={recommendationsPageStyles.mobileHeroImage}
                        />
                        <Box sx={recommendationsPageStyles.mobileHeroOverlay} />
                    </Box>
                    <Box sx={recommendationsPageStyles.mobileHeroContent}>
                        <Typography component="h1" sx={recommendationsPageStyles.mobileHeroTitle}>
                            Your Perfect Safari Awaits
                        </Typography>
                        <Typography sx={recommendationsPageStyles.mobileHeroDescription}>
                            Curated safari experiences for your Kenya &amp; Tanzania adventure
                        </Typography>
                        <Box sx={recommendationsPageStyles.mobileHeroHighlights}>
                            {heroHighlights.map(({ id, icon: HighlightIcon, label }) => (
                                <Box key={`mobile-hero-highlight-${id}`} sx={recommendationsPageStyles.mobileHeroHighlight}>
                                    <HighlightIcon sx={{ fontSize: 16 }} />
                                    {label}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* <Box sx={recommendationsPageStyles.mobileWizardSection}>
                    <Box sx={recommendationsPageStyles.mobileProgressHeader}>
                        <Typography component="span" fontWeight={600} color={colorTokens.earth[700]}>
                            {progressSummaryLabel}
                        </Typography>
                        <Typography component="span">{progressFraction}</Typography>
                    </Box>
                    <Box sx={recommendationsPageStyles.mobileProgressSteps}>
                        {wizardSteps.map((step, index) => {
                            const nextStep = wizardSteps[index + 1];
                            const variant = connectorVariant(step, nextStep);
                            const isLast = index === wizardSteps.length - 1;
                            const nodeStyles =
                                step.status === 'completed'
                                    ? {
                                          ...recommendationsPageStyles.mobileProgressNode,
                                          ...recommendationsPageStyles.mobileProgressNodeCompleted,
                                      }
                                    : step.status === 'active'
                                    ? {
                                          ...recommendationsPageStyles.mobileProgressNode,
                                          ...recommendationsPageStyles.mobileProgressNodeActive,
                                      }
                                    : {
                                          ...recommendationsPageStyles.mobileProgressNode,
                                          ...recommendationsPageStyles.mobileProgressNodeUpcoming,
                                      };

                            return (
                                <Box
                                    key={`recommendations-mobile-progress-${step.id}`}
                                    sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}
                                >
                                    <Box sx={recommendationsPageStyles.mobileProgressStep}>
                                        <Box component="span" sx={nodeStyles}>
                                            {step.status === 'completed' ? <CheckRoundedIcon sx={{ fontSize: 14 }} /> : step.id}
                                        </Box>
                                        <Typography component="span" sx={recommendationsPageStyles.mobileProgressLabel}>
                                            {step.label}
                                        </Typography>
                                    </Box>
                                    {!isLast ? (
                                        <Box sx={recommendationsPageStyles.mobileProgressConnector}>
                                            {variant === 'filled' ? (
                                                <Box sx={recommendationsPageStyles.mobileProgressConnectorFilled} />
                                            ) : variant === 'partial' ? (
                                                <Box sx={recommendationsPageStyles.mobileProgressConnectorPartial} />
                                            ) : null}
                                        </Box>
                                    ) : null}
                                </Box>
                            );
                        })}
                    </Box>
                </Box> */}

                <Box component="section" sx={{ padding: '0 16px 0', display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                    <Box sx={recommendationsPageStyles.mobileSummaryCard}>
                        <Typography component="h2" fontFamily={typographyTokens.heading} fontSize={20} fontWeight={700} color={colorTokens.earth[800]}>
                            Your Safari Preferences
                        </Typography>
                        <Box sx={recommendationsPageStyles.mobileSummaryGrid}>
                            {summaryItems.map(({ id, label }) => (
                                <Box key={`mobile-summary-${id}`} sx={recommendationsPageStyles.mobileSummaryItem}>
                                    <Typography sx={recommendationsPageStyles.mobileSummaryLabel}>{label}</Typography>
                                    <Typography sx={recommendationsPageStyles.mobileSummaryValue}>{summaryValueMap[id]}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={recommendationsPageStyles.mobileFilterCard}>
                        <Box sx={recommendationsPageStyles.mobileFilterHeader}>
                            <Typography component="h3" fontFamily={typographyTokens.heading} fontSize={18} fontWeight={600} color={colorTokens.earth[800]}>
                                Filter Results
                            </Typography>
                            <Typography component="span" fontSize={12} color="rgba(74,57,42,0.6)">
                                {sortedPackages.length} packages
                            </Typography>
                        </Box>
                        <Box sx={recommendationsPageStyles.mobileFilterControls}>
                            <Box
                                component="select"
                                value={sortOption}
                                onChange={handleSortChange}
                                sx={recommendationsPageStyles.mobileFilterSelect}
                            >
                                {Object.entries(sortOptionLabels).map(([value, label]) => (
                                    <Box key={`mobile-sort-${value}`} component="option" value={value}>
                                        Sort by: {label}
                                    </Box>
                                ))}
                            </Box>
                            <Box sx={recommendationsPageStyles.mobileFilterRow}>
                                <Box
                                    component="select"
                                    value={durationFilter}
                                    onChange={handleDurationChange}
                                    sx={recommendationsPageStyles.mobileFilterSelect}
                                >
                                    {Object.entries(durationFilterLabels).map(([value, label]) => (
                                        <Box key={`mobile-duration-${value}`} component="option" value={value}>
                                            {label}
                                        </Box>
                                    ))}
                                </Box>
                                <Box
                                    component="select"
                                    value={styleFilter}
                                    onChange={handleStyleChange}
                                    sx={recommendationsPageStyles.mobileFilterSelect}
                                >
                                    {Object.entries(styleFilterLabels).map(([value, label]) => (
                                        <Box key={`mobile-style-${value}`} component="option" value={value}>
                                            {label}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box component="button" type="button" sx={recommendationsPageStyles.mobileFilterButton}>
                                <TuneRoundedIcon sx={{ fontSize: 16 }} />
                                More Filters
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box component="section" sx={recommendationsPageStyles.mobilePackageList}>
                    {sortedPackages.map((pkg) => renderMobilePackageCard(pkg))}
                </Box>

                <Box sx={recommendationsPageStyles.mobileLoadMore}>
                    <Box component="button" type="button" sx={recommendationsPageStyles.mobileLoadMoreButton}>
                        Load More Packages
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <>
            {renderMobileLayout()}

            <Box component="main" sx={{ ...recommendationsPageStyles.main, display: { xs: 'none', md: 'block' } }}>
            <WizardHeroSection
                id="recommendations-hero"
                image={{
                    src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/83b5981d2d-f2c937fca75ae2b45216.png',
                    alt: 'African wildlife collage with elephants, lions, and zebras at golden hour',
                }}
                title="Your Perfect Safari Awaits"
                description="Based on your preferences, we have curated the best safari experiences for your Kenya & Tanzania adventure."
                highlights={heroHighlights}
                styles={wizardHeroStyles}
            />

            <Box component="section" id="planning-wizard" sx={recommendationsPageStyles.wizardSection}>
                <Box sx={recommendationsPageStyles.wizardContainer}>
                    <WizardProgressBar
                        id="recommendations-progress"
                        steps={wizardSteps}
                        styles={wizardProgressStyles}
                        getConnectorVariant={() => 'filled'}
                    // trailingContent={
                    //   <Typography component="span" fontSize={13} color="rgba(74,57,42,0.65)">
                    //     Step 4 of 4
                    //   </Typography>
                    // }
                    />

                    <Box sx={recommendationsPageStyles.summaryCard}>
                        <Typography component="h2" fontSize={24} fontFamily={typographyTokens.heading} fontWeight={700} color={colorTokens.earth[800]}>
                            Your Safari Preferences
                        </Typography>
                        <Box sx={recommendationsPageStyles.summaryGrid}>
                            {summaryItems.map(({ id, label, value }) => (
                                <Box key={id}>
                                    <Typography sx={recommendationsPageStyles.summaryLabel}>{label}</Typography>
                                    <Typography sx={recommendationsPageStyles.summaryValue}>{value}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={recommendationsPageStyles.filterCard}>
                        <Box sx={recommendationsPageStyles.filterHeader}>
                            <Typography component="h3" fontSize={20} fontFamily={typographyTokens.heading} fontWeight={600} color={colorTokens.earth[800]}>
                                Refine Your Results
                            </Typography>
                            <Typography fontSize={13} color="rgba(74,57,42,0.7)">{packageCountLabel}</Typography>
                        </Box>
                        <Box sx={recommendationsPageStyles.filterControls}>
                            <Box
                                component="select"
                                value={sortOption}
                                onChange={handleSortChange}
                                sx={recommendationsPageStyles.filterSelect}
                            >
                                {Object.entries(sortOptionLabels).map(([value, label]) => (
                                    <Box key={value} component="option" value={value}>
                                        Sort by: {label}
                                    </Box>
                                ))}
                            </Box>
                            <Box
                                component="select"
                                value={durationFilter}
                                onChange={handleDurationChange}
                                sx={recommendationsPageStyles.filterSelect}
                            >
                                {Object.entries(durationFilterLabels).map(([value, label]) => (
                                    <Box key={value} component="option" value={value}>
                                        {label}
                                    </Box>
                                ))}
                            </Box>
                            <Box
                                component="select"
                                value={styleFilter}
                                onChange={handleStyleChange}
                                sx={recommendationsPageStyles.filterSelect}
                            >
                                {Object.entries(styleFilterLabels).map(([value, label]) => (
                                    <Box key={value} component="option" value={value}>
                                        {label}
                                    </Box>
                                ))}
                            </Box>
                            <Box component="button" type="button" sx={recommendationsPageStyles.filterTrigger}>
                                <TuneRoundedIcon sx={{ fontSize: 18 }} />
                                More Filters
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={recommendationsPageStyles.packageList}>
                        {sortedPackages.map((pkg) => {
                            const isSaved = savedPackages[pkg.id];
                            const RatingIcon = pkg.badge.icon ?? AutoAwesomeRoundedIcon;

                            return (
                                <Box key={pkg.id} sx={recommendationsPageStyles.packageCard}>
                                    <Box sx={recommendationsPageStyles.packageMedia}>
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: spacingTokens.md,
                                                left: spacingTokens.md,
                                                display: 'flex',
                                                gap: spacingTokens.xs,
                                            }}
                                        >
                                            <Box sx={{ ...recommendationsPageStyles.packageBadge, backgroundImage: pkg.badge.gradient }}>
                                                <RatingIcon sx={{ fontSize: 16 }} />
                                                {pkg.badge.label}
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: spacingTokens.md,
                                                right: spacingTokens.md,
                                            }}
                                        >
                                            <Box
                                                component="button"
                                                type="button"
                                                onClick={() => toggleSavedPackage(pkg.id)}
                                                aria-pressed={isSaved}
                                                sx={recommendationsPageStyles.packageSaveButton}
                                            >
                                                {isSaved ? (
                                                    <FavoriteRoundedIcon sx={{ fontSize: 20, color: colorTokens.safari[500] }} />
                                                ) : (
                                                    <FavoriteBorderRoundedIcon sx={{ fontSize: 20 }} />
                                                )}
                                            </Box>
                                        </Box>
                                        <Box sx={recommendationsPageStyles.packageGallery}>
                                            <Box sx={recommendationsPageStyles.galleryPrimary}>
                                                <Box
                                                    component="img"
                                                    src={pkg.mainImage.src}
                                                    alt={pkg.mainImage.alt}
                                                    sx={recommendationsPageStyles.galleryPrimaryImage}
                                                />
                                            </Box>
                                            <Box sx={recommendationsPageStyles.gallerySecondary}>
                                                {pkg.gallery.map((image) => (
                                                    <Box
                                                        key={`${pkg.id}-${image.src}`}
                                                        component="img"
                                                        src={image.src}
                                                        alt={image.alt}
                                                        sx={recommendationsPageStyles.galleryThumb}
                                                    />
                                                ))}
                                                <Box sx={recommendationsPageStyles.galleryPlaceholder}>+{pkg.extraPhotosCount} more photos</Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={recommendationsPageStyles.packageContent}>
                                        <Box sx={recommendationsPageStyles.packageHeader}>
                                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacingTokens.sm }}>
                                                <Typography component="h3" sx={recommendationsPageStyles.packageTitle}>
                                                    {pkg.title}
                                                </Typography>
                                                <Typography sx={recommendationsPageStyles.packageDescription}>{pkg.description}</Typography>
                                                <Box sx={recommendationsPageStyles.ratingRow}>
                                                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                                                        {Array.from({ length: 5 }).map((_, index) =>
                                                            index < Math.round(pkg.rating.value) ? (
                                                                <StarRoundedIcon key={`${pkg.id}-star-${index}`} sx={{ fontSize: 18, color: '#fbbf24' }} />
                                                            ) : (
                                                                <StarBorderRoundedIcon key={`${pkg.id}-star-${index}`} sx={{ fontSize: 18, color: '#e7e5e4' }} />
                                                            ),
                                                        )}
                                                        <Typography fontSize={12} color="rgba(74,57,42,0.65)">
                                                            {pkg.rating.value.toFixed(1)} ({pkg.rating.reviews} reviews)
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={recommendationsPageStyles.statItem}>
                                                        <CalendarMonthRoundedIcon sx={{ fontSize: 16, color: colorTokens.safari[500] }} />
                                                        {pkg.durationLabel}
                                                    </Box>
                                                    <Box sx={recommendationsPageStyles.statItem}>
                                                        <GroupsRoundedIcon sx={{ fontSize: 16, color: colorTokens.safari[500] }} />
                                                        {pkg.guestsLabel}
                                                    </Box>
                                                    {pkg.perksLabel ? (
                                                        <Box sx={{ ...recommendationsPageStyles.destinationPill, backgroundColor: 'rgba(34,197,94,0.12)' }}>
                                                            <CheckRoundedIcon sx={{ fontSize: 14 }} />
                                                            {pkg.perksLabel}
                                                        </Box>
                                                    ) : null}
                                                </Box>
                                            </Box>
                                            <Box sx={recommendationsPageStyles.priceStack}>
                                                <Typography sx={recommendationsPageStyles.priceValue}>{pkg.priceLabel}</Typography>
                                                <Typography fontSize={12} color="rgba(74,57,42,0.65)">
                                                    {pkg.priceSuffix}
                                                </Typography>
                                                {pkg.savingLabel ? (
                                                    <Typography fontSize={11} color="#16a34a" fontWeight={600}>
                                                        {pkg.savingLabel}
                                                    </Typography>
                                                ) : null}
                                            </Box>
                                        </Box>

                                        <Box sx={recommendationsPageStyles.sectionGrid}>
                                            <Box sx={recommendationsPageStyles.sectionBlock}>
                                                <Typography sx={recommendationsPageStyles.sectionHeading}>Highlights</Typography>
                                                <Box component="ul" sx={recommendationsPageStyles.bulletList}>
                                                    {pkg.highlights.map((item) => (
                                                        <Box key={item} component="li" sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.xs }}>
                                                            <CheckRoundedIcon sx={{ fontSize: 16, color: '#22c55e' }} />
                                                            {item}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                            <Box sx={recommendationsPageStyles.sectionBlock}>
                                                <Typography sx={recommendationsPageStyles.sectionHeading}>Included</Typography>
                                                <Box component="ul" sx={recommendationsPageStyles.bulletList}>
                                                    {pkg.includes.map((item) => (
                                                        <Box key={item} component="li" sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.xs }}>
                                                            <CheckRoundedIcon sx={{ fontSize: 16, color: '#22c55e' }} />
                                                            {item}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                            <Box sx={recommendationsPageStyles.sectionBlock}>
                                                <Typography sx={recommendationsPageStyles.sectionHeading}>Destinations</Typography>
                                                <Stack spacing={spacingTokens.xs}>
                                                    {pkg.destinations.map(({ id, label, nights }) => (
                                                        <Box key={id} sx={recommendationsPageStyles.destinationPill}>
                                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colorTokens.safari[500] }} />
                                                            {label} ({nights})
                                                        </Box>
                                                    ))}
                                                </Stack>
                                            </Box>
                                        </Box>

                                        <Box sx={recommendationsPageStyles.packageFooter}>
                                            <Box sx={recommendationsPageStyles.footerActions}>
                                                <Box component="button" type="button" sx={recommendationsPageStyles.tertiaryButton}>
                                                    <VisibilityRoundedIcon sx={{ fontSize: 16 }} />
                                                    View Details
                                                </Box>
                                                <Box component="button" type="button" sx={recommendationsPageStyles.tertiaryButton}>
                                                    <ShareRoundedIcon sx={{ fontSize: 16 }} />
                                                    Share
                                                </Box>
                                                <Box component="button" type="button" sx={recommendationsPageStyles.tertiaryButton}>
                                                    <CompareArrowsRoundedIcon sx={{ fontSize: 16 }} />
                                                    Compare
                                                </Box>
                                            </Box>
                                            <Box sx={recommendationsPageStyles.footerPrimaryActions}>
                                                <Box component="button" type="button" sx={recommendationsPageStyles.secondaryButton}>
                                                    <EventAvailableRoundedIcon sx={{ fontSize: 16 }} />
                                                    Check Availability
                                                </Box>
                                                <Box component="button" type="button" sx={recommendationsPageStyles.primaryButton} onClick={() => navigate('/bookings/checkout')}
                                                >
                                                    Book Now
                                                    <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>

                    <Box sx={recommendationsPageStyles.recommendationBanner}>
                        <Box sx={recommendationsPageStyles.bannerContent}>
                            <Typography component="h3" fontSize={20} fontFamily={typographyTokens.heading} fontWeight={600} color={colorTokens.earth[800]}>
                                Need a custom itinerary?
                            </Typography>
                            <Typography fontSize={14} color="rgba(74,57,42,0.7)">
                                Our safari experts can tailor any of these packages to match your schedule, interests, and travel style.
                            </Typography>
                        </Box>
                        <Box sx={recommendationsPageStyles.bannerActions}>
                            <Box component="button" type="button" sx={recommendationsPageStyles.bannerButton}>
                                <ChatRoundedIcon sx={{ fontSize: 16 }} />
                                Chat with an Expert
                            </Box>
                            <Box component="button" type="button" sx={recommendationsPageStyles.bannerButton}>
                                <DownloadRoundedIcon sx={{ fontSize: 16 }} />
                                Download Brochure
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    );
};

export default RecommendationsPage;
