import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
// import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import type { SvgIconComponent } from '@mui/icons-material';

import { myTripsPageStyles } from '@/design-system/theme/myTripsPageStyles';

type TripStatus = 'confirmed' | 'pending' | 'completed';

type TripCardAction = {
  label: string;
  icon: SvgIconComponent;
};

type TripCardConfig = {
  id: string;
  title: string;
  subtitle: string;
  dateRange: string;
  image: string;
  price: string;
  priceCaption: string;
  status: TripStatus;
  statusLabel: string;
  meta?: Array<{ label: string; value: string }>;
  notice?: {
    title: string;
    description: string;
  };
  primaryAction?: { label: string };
  secondaryAction?: { label: string };
  tertiaryActions: TripCardAction[];
  variant?: 'pending' | 'past';
};

type TripboardCard = {
  id: string;
  title: string;
  icon: SvgIconComponent;
  iconGradient: string;
  iconColor: string;
  collaboratorLabel: string;
  savedSafarisLabel: string;
  collaborators: string[];
  collaboratorOverflowLabel?: string;
};

const statusIconMap: Record<TripStatus, SvgIconComponent> = {
  confirmed: CheckCircleRoundedIcon,
  pending: HourglassTopRoundedIcon,
  completed: CheckCircleRoundedIcon,
};

const mobileTabOptions = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'all', label: 'All' },
] as const;

type MobileTabKey = (typeof mobileTabOptions)[number]['id'];

const upcomingTrips: TripCardConfig[] = [
  {
    id: 'maasai-mara-big-five',
    title: 'Maasai Mara Big Five Safari',
    subtitle: '5 days • Luxury Lodge Experience',
    dateRange: 'March 15-19, 2025',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/23d51f556e-3025a8cc602bc3c7712c.png',
    price: '$2,850',
    priceCaption: 'per person',
    status: 'confirmed',
    statusLabel: 'Confirmed',
    meta: [
      { label: 'Travelers:', value: '2 Adults' },
      { label: 'Booking ID:', value: 'AS2025-001234' },
      { label: 'Balance Due:', value: '$1,425 by Feb 15' },
    ],
    primaryAction: { label: 'Pay Balance' },
    secondaryAction: { label: 'Manage Trip' },
    tertiaryActions: [
      { label: 'Message Guide', icon: ForumRoundedIcon },
      { label: 'Call Support', icon: PhoneRoundedIcon },
      { label: 'Download Itinerary', icon: DownloadRoundedIcon },
      { label: 'Add to Calendar', icon: EventAvailableRoundedIcon },
    ],
  },
];

const pendingTrips: TripCardConfig[] = [
  {
    id: 'serengeti-migration',
    title: 'Serengeti Migration Safari',
    subtitle: '7 days • Premium Camping',
    dateRange: 'June 20-26, 2025',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/9782e6fd2d-b0da63baac3aadfc0b0e.png',
    price: '$3,200',
    priceCaption: 'per person',
    status: 'pending',
    statusLabel: 'Payment Due',
    variant: 'pending',
    meta: [
      { label: 'Travelers:', value: '4 Adults' },
      { label: 'Booking ID:', value: 'AS2025-004218' },
      { label: 'Deposit Due:', value: '$1,600 by Jan 15' },
    ],
    notice: {
      title: 'Payment Required',
      description: 'Complete your deposit payment by January 15, 2025 to secure your booking',
    },
    primaryAction: { label: 'Complete Payment' },
    secondaryAction: { label: 'Modify' },
    tertiaryActions: [
      { label: 'View Details', icon: VisibilityRoundedIcon },
      { label: 'Share Quote', icon: ShareRoundedIcon },
    ],
  },
];

const pastTrips: TripCardConfig[] = [
  {
    id: 'ngorongoro-crater',
    title: 'Ngorongoro Crater Safari',
    subtitle: '3 days • Classic Safari Lodge',
    dateRange: 'August 10-12, 2024',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d8695b0496-2d1bb4accc0a92f58e2a.png',
    price: '$1,950',
    priceCaption: 'per person',
    status: 'completed',
    statusLabel: 'Completed',
    variant: 'past',
    primaryAction: { label: 'Book Similar' },
    secondaryAction: { label: 'Share Experience' },
    tertiaryActions: [
      { label: 'Write Review', icon: StarRoundedIcon },
      { label: 'View Photos', icon: PhotoLibraryRoundedIcon },
      { label: 'Download Receipt', icon: ReceiptLongRoundedIcon },
    ],
  },
];

const tripboards: TripboardCard[] = [
  {
    id: 'honeymoon-ideas',
    title: 'Honeymoon Safari Ideas',
    icon: FavoriteRoundedIcon,
    iconGradient: 'linear-gradient(135deg, rgba(254,205,211,0.5) 0%, rgba(254,226,226,0.8) 100%)',
    iconColor: '#e11d48',
    collaboratorLabel: '2 collaborators',
    savedSafarisLabel: '5 saved safaris',
    collaborators: [
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    ],
  },
  {
    id: 'family-safari-2025',
    title: 'Family Safari 2025',
    icon: GroupsRoundedIcon,
    iconGradient: 'linear-gradient(135deg, rgba(191,219,254,0.6) 0%, rgba(199,210,254,0.8) 100%)',
    iconColor: '#2563eb',
    collaboratorLabel: '4 collaborators',
    savedSafarisLabel: '8 saved safaris',
    collaborators: [
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
    ],
    collaboratorOverflowLabel: '+1',
  },
];

const getMobileStatusBadgeStyles = (status: TripStatus) => {
  if (status === 'pending') {
    return myTripsPageStyles.mobileTripBadgePending;
  }

  if (status === 'completed') {
    return myTripsPageStyles.mobileTripBadgeCompleted;
  }

  return myTripsPageStyles.mobileTripBadgeConfirmed;
};

const getMobilePriceCaptionStyles = (status: TripStatus) => {
  if (status === 'pending') {
    return { color: 'rgba(217, 119, 6, 0.85)' };
  }

  if (status === 'confirmed') {
    return { color: 'rgba(16, 185, 129, 0.82)' };
  }

  return { color: 'rgba(74, 57, 42, 0.6)' };
};

const renderMobileTripCard = (trip: TripCardConfig) => {
  const {
    id,
    title,
    subtitle,
    dateRange,
    image,
    price,
    priceCaption,
    status,
    statusLabel,
    meta,
    notice,
    primaryAction,
    tertiaryActions,
  } = trip;

  const badgeStyles = {
    ...myTripsPageStyles.mobileTripBadge,
    ...getMobileStatusBadgeStyles(status),
  };

  const priceCaptionStyles = {
    ...myTripsPageStyles.mobileTripPriceCaption,
    ...getMobilePriceCaptionStyles(status),
  };

  const supportingMeta = meta ?? [];
  const [primaryMeta, ...restMeta] = supportingMeta;
  const additionalMeta = restMeta.slice(0, 2);
  const ghostActions = tertiaryActions.slice(0, 2);

  return (
    <Box key={`${id}-mobile`} sx={myTripsPageStyles.mobileTripCard}>
      <Box sx={myTripsPageStyles.mobileTripMedia}>
        <Box component="img" src={image} alt={title} sx={myTripsPageStyles.mobileTripImage} />
        <Box sx={myTripsPageStyles.mobileTripOverlay} />
        <Box sx={myTripsPageStyles.mobileTripTopRow}>
          <Box component="span" sx={badgeStyles}>
            {statusLabel}
          </Box>
          <Box component="button" type="button" sx={myTripsPageStyles.mobileTripFavoriteButton} aria-label="Save trip">
            <FavoriteRoundedIcon fontSize="small" />
          </Box>
        </Box>
        <Box sx={myTripsPageStyles.mobileTripBottomContent}>
          <Typography component="h3" sx={myTripsPageStyles.mobileTripOverlayTitle}>
            {title}
          </Typography>
          <Typography sx={myTripsPageStyles.mobileTripOverlaySubtitle}>{subtitle}</Typography>
        </Box>
      </Box>
      <Box sx={myTripsPageStyles.mobileTripBody}>
        <Box sx={myTripsPageStyles.mobileTripSummary}>
          <Box sx={myTripsPageStyles.mobileTripSummaryContent}>
            <Box sx={myTripsPageStyles.mobileTripMetaRow}>
              <Box sx={myTripsPageStyles.mobileTripMetaIcon}>
                <CalendarMonthRoundedIcon fontSize="small" />
              </Box>
              <Box sx={myTripsPageStyles.mobileTripMetaColumn}>
                <Typography component="span" sx={myTripsPageStyles.mobileTripMetaCaption}>
                  {dateRange}
                </Typography>
                {primaryMeta ? (
                  <Typography component="span" sx={myTripsPageStyles.mobileTripMetaCaption}>
                    {primaryMeta.value}
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </Box>
          <Box sx={myTripsPageStyles.mobileTripPriceBlock}>
            <Typography sx={myTripsPageStyles.mobileTripPrice}>{price}</Typography>
            <Typography sx={priceCaptionStyles}>{priceCaption}</Typography>
          </Box>
        </Box>

        {additionalMeta.length ? (
          <Box sx={myTripsPageStyles.mobileTripMetaList}>
            {additionalMeta.map(({ label, value }) => (
              <Box key={`${id}-${label}-mobile`} sx={myTripsPageStyles.mobileTripMetaItem}>
                <Typography component="span" sx={myTripsPageStyles.mobileTripMetaItemLabel}>
                  {label}
                </Typography>
                <Typography component="span">{value}</Typography>
              </Box>
            ))}
          </Box>
        ) : null}

        {notice ? (
          <Box sx={myTripsPageStyles.mobileNoticeCard}>
            <Box sx={myTripsPageStyles.mobileNoticeIcon}>
              <WarningAmberRoundedIcon fontSize="small" />
            </Box>
            <Box>
              <Typography sx={myTripsPageStyles.mobileNoticeText}>{notice.title}</Typography>
              <Typography sx={myTripsPageStyles.mobileTripMetaCaption}>{notice.description}</Typography>
            </Box>
          </Box>
        ) : null}

        <Box sx={myTripsPageStyles.mobileTripFooter}>
          {primaryAction ? (
            <Box component="button" type="button" sx={myTripsPageStyles.mobileTripPrimaryButton}>
              {primaryAction.label}
            </Box>
          ) : null}
          {ghostActions.map(({ label, icon: ActionIcon }) => (
            <Box
              key={`${id}-mobile-${label}`}
              component="button"
              type="button"
              sx={myTripsPageStyles.mobileTripGhostButton}
              aria-label={label}
            >
              <ActionIcon fontSize="small" />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const renderTripCard = (trip: TripCardConfig) => {
  const {
    id,
    title,
    subtitle,
    dateRange,
    image,
    price,
    priceCaption,
    status,
    statusLabel,
    meta,
    notice,
    primaryAction,
    secondaryAction,
    tertiaryActions,
    variant,
  } = trip;

  const StatusIcon = statusIconMap[status];

  const cardSx = {
    ...myTripsPageStyles.tripCard,
    ...(variant === 'pending' ? myTripsPageStyles.tripCardPending : {}),
    ...(variant === 'past' ? myTripsPageStyles.tripCardPast : {}),
  };

  const statusStyles = {
    ...myTripsPageStyles.statusBadge,
    ...(status === 'confirmed'
      ? myTripsPageStyles.statusBadgeConfirmed
      : status === 'pending'
      ? myTripsPageStyles.statusBadgePending
      : myTripsPageStyles.statusBadgeCompleted),
  };

  return (
    <Box key={id} sx={cardSx}>
      <Box sx={myTripsPageStyles.tripCardContent}>
        <Box sx={myTripsPageStyles.tripCardHeader}>
          <Box sx={myTripsPageStyles.tripOverview}>
            <Box sx={myTripsPageStyles.tripMedia}>
              <Box component="img" src={image} alt={title} sx={myTripsPageStyles.tripMediaImage} />
            </Box>
            <Box>
              <Typography component="h3" sx={myTripsPageStyles.tripTitle}>
                {title}
              </Typography>
              <Typography sx={myTripsPageStyles.tripSubtitle}>{subtitle}</Typography>
              <Box sx={myTripsPageStyles.tripDateRow}>
                <Box sx={myTripsPageStyles.tripDateIcon}>
                  <CalendarMonthRoundedIcon fontSize="small" />
                </Box>
                <Typography fontSize={13} fontWeight={500} color="rgba(74, 57, 42, 0.85)">
                  {dateRange}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={myTripsPageStyles.tripPriceBlock}>
            <Typography sx={myTripsPageStyles.tripPrice}>{price}</Typography>
            <Typography sx={myTripsPageStyles.tripPriceCaption}>{priceCaption}</Typography>
            <Box component="span" sx={statusStyles}>
              <StatusIcon sx={{ fontSize: 16 }} />
              {statusLabel}
            </Box>
          </Box>
        </Box>

        {meta && meta.length > 0 ? (
          <Box sx={myTripsPageStyles.metaShell}>
            {meta.map(({ label, value }) => (
              <Box key={`${id}-${label}`} sx={myTripsPageStyles.metaItem}>
                <Typography component="span" sx={myTripsPageStyles.metaLabel}>
                  {label}
                </Typography>
                <Typography component="span" sx={myTripsPageStyles.metaValue}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : null}

        {notice ? (
          <Box sx={myTripsPageStyles.noticeCard}>
            <Box sx={myTripsPageStyles.noticeIcon}>
              <WarningAmberRoundedIcon />
            </Box>
            <Box sx={myTripsPageStyles.noticeBody}>
              <Typography component="span" sx={myTripsPageStyles.noticeTitle}>
                {notice.title}
              </Typography>
              <Typography component="span" sx={myTripsPageStyles.noticeDescription}>
                {notice.description}
              </Typography>
            </Box>
          </Box>
        ) : null}

        <Box sx={myTripsPageStyles.cardFooter}>
          <Box sx={myTripsPageStyles.inlineActions}>
            {tertiaryActions.map(({ label, icon: ActionIcon }) => (
              <Box key={`${id}-${label}`} component="button" type="button" sx={myTripsPageStyles.tertiaryButton}>
                <ActionIcon fontSize="small" />
                {label}
              </Box>
            ))}
          </Box>
          <Box sx={myTripsPageStyles.cardCtas}>
            {primaryAction ? (
              <Box component="button" type="button" sx={myTripsPageStyles.primaryButton}>
                {primaryAction.label}
              </Box>
            ) : null}
            {secondaryAction ? (
              <Box component="button" type="button" sx={myTripsPageStyles.secondaryButton}>
                {secondaryAction.label}
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const renderTripboardCard = (tripboard: TripboardCard) => {
  const {
    id,
    title,
    icon: Icon,
    iconGradient,
    iconColor,
    collaborators,
    collaboratorOverflowLabel,
    collaboratorLabel,
    savedSafarisLabel,
  } = tripboard;

  return (
    <Box key={id} sx={myTripsPageStyles.tripboardCard}>
      <Box sx={myTripsPageStyles.tripboardHeader}>
        <Typography component="h3" sx={myTripsPageStyles.tripboardTitle}>
          {title}
        </Typography>
        <Box sx={{ ...myTripsPageStyles.tripboardIconWrap, backgroundImage: iconGradient, color: iconColor }}>
          <Icon fontSize="small" />
        </Box>
      </Box>
      <Box sx={myTripsPageStyles.tripboardMeta}>
        <Typography component="span">{collaboratorLabel}</Typography>
        <Typography component="span">•</Typography>
        <Typography component="span">{savedSafarisLabel}</Typography>
      </Box>
      <Box sx={myTripsPageStyles.collaboratorGroup}>
        {collaborators.map((avatarUrl) => (
          <Box
            key={`${id}-${avatarUrl}`}
            component="img"
            src={avatarUrl}
            alt="Collaborator"
            sx={myTripsPageStyles.collaboratorAvatar}
          />
        ))}
        {collaboratorOverflowLabel ? (
          <Box sx={myTripsPageStyles.collaboratorPlaceholder}>{collaboratorOverflowLabel}</Box>
        ) : null}
      </Box>
      <Box component="button" type="button" sx={myTripsPageStyles.tripboardLink}>
        View Tripboard
        <ArrowForwardRoundedIcon fontSize="small" />
      </Box>
    </Box>
  );
};

const MyTripsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileTab, setMobileTab] = useState<MobileTabKey>('upcoming');

  const mobileStats = [
    {
      id: 'upcoming',
      label: 'Upcoming',
      value: upcomingTrips.length + pendingTrips.length,
      cardStyles: myTripsPageStyles.mobileStatCardUpcoming,
    },
    {
      id: 'completed',
      label: 'Completed',
      value: pastTrips.length,
      cardStyles: myTripsPageStyles.mobileStatCardCompleted,
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      value: pendingTrips.length,
      cardStyles: myTripsPageStyles.mobileStatCardInProgress,
    },
  ];

  const mobileTrips: Record<MobileTabKey, TripCardConfig[]> = {
    upcoming: [...upcomingTrips, ...pendingTrips],
    completed: pastTrips,
    all: [...upcomingTrips, ...pendingTrips, ...pastTrips],
  };

  const visibleMobileTrips = mobileTrips[mobileTab];

  const handlePlanNewSafari = () => {
    navigate('preferences');
  };

  // const handleMobileBack = () => {
  //   navigate(-1);
  // };

  const wizardPaths = ['/preferences', '/destinations', '/dates-and-group', '/recommendations'];

  if (wizardPaths.some((path) => location.pathname.endsWith(path))) {
    return <Outlet />;
  }

  return (
    <>
      <Box sx={myTripsPageStyles.mobilePage}>
        {/* <Box component="header" id="header" sx={myTripsPageStyles.mobileHeader}>
          <Box sx={myTripsPageStyles.mobileHeaderGroup}>
            <Box
              component="button"
              type="button"
              aria-label="Go back"
              sx={myTripsPageStyles.mobileHeaderButton}
              onClick={handleMobileBack}
            >
              <ArrowBackRoundedIcon fontSize="small" />
            </Box>
            <Typography component="span" sx={myTripsPageStyles.mobileHeaderTitle}>
              My Trips
            </Typography>
          </Box>
          <Box sx={myTripsPageStyles.mobileHeaderGroup}>
            <Box component="button" type="button" aria-label="Filter trips" sx={myTripsPageStyles.mobileHeaderButton}>
              <FilterListRoundedIcon fontSize="small" />
            </Box>
            <Box component="button" type="button" aria-label="Search trips" sx={myTripsPageStyles.mobileHeaderButton}>
              <SearchRoundedIcon fontSize="small" />
            </Box>
          </Box>
        </Box> */}

        <Box component="main" id="main-content" sx={myTripsPageStyles.mobileMain}>
          <Box sx={myTripsPageStyles.mobileSection}>
            <Box sx={myTripsPageStyles.mobileStatsGrid}>
              {mobileStats.map(({ id, label, value, cardStyles }) => (
                <Box key={id} sx={{ ...myTripsPageStyles.mobileStatCard, ...cardStyles }}>
                  <Typography component="div" sx={myTripsPageStyles.mobileStatValue}>
                    {value}
                  </Typography>
                  <Typography component="div" sx={myTripsPageStyles.mobileStatLabel}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={myTripsPageStyles.mobileSection}>
            <Box sx={myTripsPageStyles.mobileTabs}>
              {mobileTabOptions.map(({ id, label }) => (
                <Box
                  key={id}
                  component="button"
                  type="button"
                  onClick={() => setMobileTab(id)}
                  sx={{
                    ...myTripsPageStyles.mobileTabButton,
                    ...(mobileTab === id ? myTripsPageStyles.mobileTabButtonActive : {}),
                  }}
                >
                  {label}
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ ...myTripsPageStyles.mobileSection, paddingBottom: 0 }}>
            {visibleMobileTrips.length ? (
              <Box sx={myTripsPageStyles.mobileTripList}>{visibleMobileTrips.map(renderMobileTripCard)}</Box>
            ) : (
              <Box sx={myTripsPageStyles.mobileTripList}>
                <Typography sx={myTripsPageStyles.mobileTripMetaCaption}>No trips to display yet.</Typography>
              </Box>
            )}
          </Box>

          <Box sx={myTripsPageStyles.mobileQuickActionSection}>
            <Box
              component="button"
              type="button"
              sx={myTripsPageStyles.mobileQuickActionButton}
              onClick={handlePlanNewSafari}
            >
              <AddRoundedIcon fontSize="small" />
              Book New Safari
            </Box>
          </Box>
        </Box>
      </Box>

      <Stack spacing={{ xs: 6, md: 8 }} sx={{ ...myTripsPageStyles.container, display: { xs: 'none', md: 'flex' } }}>
        <Box>
          <Box component="nav" sx={myTripsPageStyles.breadcrumbNav}>
            <Typography component={NavLink} to="/account" sx={{ ...myTripsPageStyles.breadcrumbLink, textDecoration: 'none' }}>
              Account
            </Typography>
            <ArrowForwardIosRoundedIcon fontSize="inherit" sx={{ fontSize: 12, color: 'rgba(90, 68, 51, 0.45)' }} />
            <Typography component="span" sx={{ color: '#3d3024', fontWeight: 600 }}>
              My Trips
            </Typography>
          </Box>
          <Box sx={myTripsPageStyles.pageHeader}>
            <Typography component="h1" sx={myTripsPageStyles.pageTitle}>
              My Trips
            </Typography>
            <Box
              component="button"
              type="button"
              sx={myTripsPageStyles.primaryCta}
              onClick={handlePlanNewSafari}
            >
              <AddRoundedIcon fontSize="small" />
              Plan New Safari
            </Box>
          </Box>
        </Box>

        <Stack spacing={{ xs: 5, md: 6 }} sx={myTripsPageStyles.sectionsStack}>
          <Box id="upcoming-trips-section  ">
            <Typography component="h2" sx={myTripsPageStyles.sectionTitle}>
              Upcoming Trips
            </Typography>
            <Stack spacing={{ xs: 4, md: 5 }}>{upcomingTrips.map(renderTripCard)}</Stack>
          </Box>

          <Box id="pending-trips-section">
            <Typography component="h2" sx={myTripsPageStyles.sectionTitle}>
              Pending Payment
            </Typography>
            <Stack spacing={{ xs: 4, md: 5 }}>{pendingTrips.map(renderTripCard)}</Stack>
          </Box>

          <Box id="past-trips-section">
            <Typography component="h2" sx={myTripsPageStyles.sectionTitle}>
              Past Trips
            </Typography>
            <Stack spacing={{ xs: 4, md: 5 }}>{pastTrips.map(renderTripCard)}</Stack>
          </Box>

          <Box id="tripboards-section">
            <Typography component="h2" sx={myTripsPageStyles.sectionTitle}>
              My Tripboards
            </Typography>
            <Box sx={myTripsPageStyles.tripboardGrid}>{tripboards.map(renderTripboardCard)}</Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default MyTripsPage;
