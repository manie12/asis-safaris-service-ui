import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import WhatsApp from '@mui/icons-material/WhatsApp';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';

import datesGroupPageStyles from '@/design-system/theme/datesGroupPageStyles';
import { colorTokens, spacingTokens } from '@/design-system/theme/tokens';
import WizardHeroSection, { type WizardHeroHighlight, type WizardHeroStyles } from '@/shared/components/WizardHeroSection';
import WizardProgressBar, { type WizardProgressStep, type WizardProgressStyles } from '@/shared/components/WizardProgressBar';

const heroHighlights: WizardHeroHighlight[] = [
  {
    id: 'best-season',
    icon: CalendarMonthRoundedIcon,
    label: 'Best Season Guidance',
  },
  {
    id: 'group-discounts',
    icon: GroupsRoundedIcon,
    label: 'Group Discounts Available',
  },
];

const wizardSteps: WizardProgressStep[] = [
  { id: 1, label: 'Preferences', status: 'completed' },
  { id: 2, label: 'Destinations', status: 'completed' },
  { id: 3, label: 'Dates & Group', status: 'active' },
  { id: 4, label: 'Recommendations', status: 'upcoming' },
];

type DateOptionId = 'specific' | 'flexible';

type DateOption = {
  id: DateOptionId;
  title: string;
  description: string;
};

const dateOptions: DateOption[] = [
  {
    id: 'specific',
    title: 'Specific Dates',
    description: 'I have exact travel dates in mind',
  },
  {
    id: 'flexible',
    title: 'Flexible Dates',
    description: "I'm flexible with my travel dates",
  },
];

type FlexibleMonth = {
  id: string;
  label: string;
  descriptor: string;
  isPeak?: boolean;
};

const flexibleMonths: FlexibleMonth[] = [
  { id: 'jan', label: 'Jan', descriptor: 'Dry Season' },
  { id: 'feb', label: 'Feb', descriptor: 'Dry Season' },
  { id: 'mar', label: 'Mar', descriptor: 'Calving' },
  { id: 'jul', label: 'Jul', descriptor: 'Peak', isPeak: true },
  { id: 'aug', label: 'Aug', descriptor: 'Peak', isPeak: true },
  { id: 'sep', label: 'Sep', descriptor: 'Peak', isPeak: true },
];

const tripDurations = ['5-7 days', '8-10 days', '11-14 days', '15+ days'] as const;

type GroupCounterId = 'adults' | 'children';

type GroupCounts = Record<GroupCounterId, number>;

type GroupCounterConfig = {
  id: GroupCounterId;
  label: string;
  value: number;
  min: number;
};

const groupCounters: GroupCounterConfig[] = [
  { id: 'adults', label: 'Adults', value: 2, min: 1 },
  { id: 'children', label: 'Children', value: 0, min: 0 },
];

type AccommodationOption = {
  id: string;
  title: string;
  description: string;
  price: string;
  isHighlighted?: boolean;
};

const accommodationOptions: AccommodationOption[] = [
  {
    id: 'luxury',
    title: 'Luxury Lodges & Camps',
    description: 'Premium accommodations with full service',
    price: '$500-800/night',
  },
  {
    id: 'mid-range',
    title: 'Mid-Range Lodges',
    description: 'Comfortable accommodations with good service',
    price: '$200-400/night',
    isHighlighted: true,
  },
  {
    id: 'budget',
    title: 'Budget Camps',
    description: 'Basic but clean accommodations',
    price: '$80-150/night',
  },
];

const groupTypes = [
  'Family with children',
  'Couple/Honeymoon',
  'Friends group',
  'Solo traveler',
  'Corporate/Team building',
];

const specialRequirements = [
  'Dietary restrictions',
  'Mobility assistance needed',
  'Photography focused trip',
  'Cultural experiences priority',
];

const budgetBands = [
  {
    id: 'budget',
    amount: '$3,200',
    label: 'Budget Option',
    tag: '',
    note: 'Per person for 10 days',
    isFeatured: false,

  },
  {
    id: 'mid-range',
    amount: '$5,800',
    label: 'Mid-Range',
    note: 'Per person for 10 days',
    tag: 'Most Popular',
    isFeatured: true,
  },
  {
    id: 'luxury',
    amount: '$12,500',
    label: 'Luxury',
    tag: '',
    note: 'Per person for 10 days',
    isFeatured: false,

  },
] as const;

const seasonalInsights = [
  {
    id: 'great-migration',
    icon: StarRoundedIcon,
    label: 'July-October',
    description: 'Great Migration & dry weather',
    iconColor: '#22c55e',
  },
  {
    id: 'calving-season',
    icon: WbSunnyRoundedIcon,
    label: 'December-March',
    description: 'Calving season & fewer crowds',
    iconColor: '#fb923c',
  },
  {
    id: 'green-season',
    icon: WaterDropRoundedIcon,
    label: 'April-May',
    description: 'Green season & lower prices',
    iconColor: '#3b82f6',
  },
] as const;

type TravelTip = {
  id: string;
  title: string;
  description: string;
  icon: typeof CalendarMonthRoundedIcon;
  iconColor: string;
  iconBg: string;
  items: { id: string; title: string; description: string }[];
};

const travelTips: TravelTip[] = [
  {
    id: 'best-times',
    title: 'Best Times to Visit',
    description: 'Plan around wildlife highlights and weather patterns',
    icon: CalendarMonthRoundedIcon,
    iconColor: '#2563eb',
    iconBg: 'linear-gradient(135deg, rgba(191, 219, 254, 0.8) 0%, rgba(199, 210, 254, 0.9) 100%)',
    items: [
      {
        id: 'dry-season',
        title: 'Dry Season (Jun-Oct)',
        description: 'Best wildlife viewing with clear skies',
      },
      {
        id: 'migration-season',
        title: 'Migration Season (Jul-Sep)',
        description: 'Witness the Great Migration in Serengeti & Maasai Mara',
      },
      {
        id: 'green-season',
        title: 'Green Season (Mar-May)',
        description: 'Lush landscapes with fewer crowds and better rates',
      },
    ],
  },
  {
    id: 'group-benefits',
    title: 'Group Size Benefits',
    description: 'Different group sizes unlock unique experiences',
    icon: GroupsRoundedIcon,
    iconColor: '#a855f7',
    iconBg: 'linear-gradient(135deg, rgba(233, 213, 255, 0.8) 0%, rgba(221, 214, 254, 0.9) 100%)',
    items: [
      {
        id: 'couples',
        title: 'Couples (2 people)',
        description: 'Intimate, romantic experiences with private guides',
      },
      {
        id: 'families',
        title: 'Families (4-6 people)',
        description: 'Educational game drives and bonding activities',
      },
      {
        id: 'groups',
        title: 'Groups (8+ people)',
        description: 'Group discounts and private safari vehicles',
      },
    ],
  },
  {
    id: 'budget-planning',
    title: 'Budget Planning',
    description: 'Allocate your safari budget with confidence',
    icon: CalculateRoundedIcon,
    iconColor: '#16a34a',
    iconBg: 'linear-gradient(135deg, rgba(187, 247, 208, 0.8) 0%, rgba(220, 252, 231, 0.9) 100%)',
    items: [
      {
        id: 'flights',
        title: 'Flights',
        description: '$800-2000 from major cities',
      },
      {
        id: 'visa',
        title: 'Visa & Vaccinations',
        description: '$50-150 per person',
      },
      {
        id: 'personal',
        title: 'Personal Expenses',
        description: '$30-100 per day for souvenirs and extras',
      },
    ],
  },
];

const calendarWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

type CalendarDayStatus = 'past' | 'available' | 'peak' | 'booked';

type CalendarDay = {
  day: number;
  status: CalendarDayStatus;
  price?: string;
  label?: string;
};

const calendarDays: CalendarDay[] = [
  { day: 1, status: 'past' },
  { day: 2, status: 'past' },
  { day: 3, status: 'past' },
  { day: 4, status: 'available', price: '$4,200' },
  { day: 5, status: 'available', price: '$4,200' },
  { day: 6, status: 'peak', price: '$5,800' },
  { day: 7, status: 'booked', label: 'Booked' },
];

const calendarLegend = [
  {
    id: 'available',
    label: 'Available - Good Price',
    color: 'rgba(220, 252, 231, 0.9)',
    border: 'rgba(34, 197, 94, 0.4)',
  },
  {
    id: 'peak',
    label: 'Available - Peak Price',
    color: 'rgba(254, 235, 200, 0.9)',
    border: 'rgba(251, 191, 36, 0.4)',
  },
  {
    id: 'booked',
    label: 'Fully Booked',
    color: 'rgba(254, 202, 202, 0.9)',
    border: 'rgba(239, 68, 68, 0.35)',
  },
  {
    id: 'past',
    label: 'Past Dates',
    color: 'rgba(240, 236, 229, 0.5)',
    border: 'transparent',
  },
] as const;

type ExpertCard = {
  id: string;
  name: string;
  title: string;
  description: string;
  quote: string;
  experience: string;
  avatar: string;
};

const experts: ExpertCard[] = [
  {
    id: 'james',
    name: 'James Mwangi',
    title: 'Kenya & Tanzania Specialist',
    description: '15+ years experience',
    quote: "I've been guiding safaris for over 15 years and love helping families create unforgettable memories.",
    experience: 'Kenya & Tanzania specialist',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
  },
  {
    id: 'sarah',
    name: 'Sarah Uwimana',
    title: 'Uganda & Rwanda Expert',
    description: 'Gorilla trekking specialist',
    quote: 'Specializing in primate experiences, I will help you plan the perfect gorilla and chimpanzee encounters.',
    experience: 'Primate trekking experiences',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg',
  },
];

const defaultAccommodationId =
  accommodationOptions.find((option) => option.isHighlighted)?.id ?? accommodationOptions[0]?.id ?? '';

const defaultGroupCounts: GroupCounts = {
  adults: groupCounters.find((counter) => counter.id === 'adults')?.value ?? 1,
  children: groupCounters.find((counter) => counter.id === 'children')?.value ?? 0,
};

const defaultFlexibleMonths = flexibleMonths.filter((month) => month.isPeak).map((month) => month.id);

const defaultSpecialRequirements = specialRequirements.length ? [specialRequirements[0]] : [];

const wizardHeroStyles: WizardHeroStyles = {
  heroSection: datesGroupPageStyles.heroSection,
  heroMediaWrap: datesGroupPageStyles.heroMediaWrap,
  heroImage: datesGroupPageStyles.heroImage,
  heroOverlay: datesGroupPageStyles.heroOverlay,
  heroContentWrap: datesGroupPageStyles.heroContentWrap,
  heroCopy: datesGroupPageStyles.heroCopy,
  heroTitle: datesGroupPageStyles.heroTitle,
  heroDescription: datesGroupPageStyles.heroDescription,
  heroHighlights: datesGroupPageStyles.heroHighlights,
  heroHighlight: datesGroupPageStyles.heroHighlight,
};

const wizardProgressStyles: WizardProgressStyles = {
  header: datesGroupPageStyles.progressHeader,
  steps: datesGroupPageStyles.progressSteps,
  stepWrapper: datesGroupPageStyles.stepWrapper,
  step: datesGroupPageStyles.progressStep,
  node: datesGroupPageStyles.progressNode,
  nodeCompleted: datesGroupPageStyles.progressNodeCompleted,
  nodeActive: datesGroupPageStyles.progressNodeActive,
  nodeUpcoming: datesGroupPageStyles.progressNodeUpcoming,
  label: datesGroupPageStyles.progressLabel,
  labelCompleted: datesGroupPageStyles.progressLabelCompleted,
  labelActive: datesGroupPageStyles.progressLabelActive,
  connector: datesGroupPageStyles.progressConnector,
  connectorFilled: datesGroupPageStyles.progressConnectorFilled,
  connectorPartial: datesGroupPageStyles.progressConnectorPartial,
};

const connectorVariant = (
  current: WizardProgressStep,
  next: WizardProgressStep | undefined,
): 'filled' | 'partial' | 'none' => {
  if (current.status === 'completed') {
    return 'filled';
  }

  if (current.status === 'active') {
    return next?.status === 'upcoming' ? 'partial' : 'filled';
  }

  return 'none';
};

const DatesGroupPage = () => {
  const navigate = useNavigate();

  const [selectedDateOption, setSelectedDateOption] = useState<DateOptionId>('specific');
  const [specificDates, setSpecificDates] = useState({ departure: '', return: '' });
  const [selectedFlexibleMonths, setSelectedFlexibleMonths] = useState<string[]>(defaultFlexibleMonths);
  const [selectedTripDuration, setSelectedTripDuration] = useState<(typeof tripDurations)[number]>(
    tripDurations[1] ?? tripDurations[0],
  );
  const [groupCounts, setGroupCounts] = useState<GroupCounts>(defaultGroupCounts);
  const [selectedAccommodation, setSelectedAccommodation] = useState<string>(defaultAccommodationId);
  const [selectedGroupType, setSelectedGroupType] = useState(groupTypes[0] ?? '');
  const [selectedSpecialRequirements, setSelectedSpecialRequirements] = useState<string[]>(
    defaultSpecialRequirements,
  );

  // const totalSteps = wizardSteps.length;
  // const activeStepIndex = wizardSteps.findIndex((step) => step.status === 'active');
  // const completedSteps = wizardSteps.filter((step) => step.status === 'completed').length;
  // const currentStepNumber = activeStepIndex >= 0 ? activeStepIndex + 1 : Math.max(completedSteps, 1);
  // const progressFraction = `${currentStepNumber}/${totalSteps}`;
  // const progressSummaryLabel = `Step ${currentStepNumber} of ${totalSteps}`;
  // const mobileAvatarUrl = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg';
  const selectedDestinationSummary = 'Kenya, Tanzania';
  const isSpecificDateSelection = selectedDateOption === 'specific';
  const isFlexibleDateSelection = selectedDateOption === 'flexible';

  const totalTravelers = groupCounts.adults + groupCounts.children;

  const handleDateOptionSelect = (id: DateOptionId) => {
    setSelectedDateOption(id);
  };

  const handleSpecificDateChange = (field: 'departure' | 'return') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSpecificDates((prev) => ({ ...prev, [field]: value }));
    };

  const toggleFlexibleMonth = (id: string) => {
    setSelectedFlexibleMonths((prev) =>
      prev.includes(id) ? prev.filter((monthId) => monthId !== id) : [...prev, id],
    );
  };

  const changeGroupCount = (counterId: GroupCounterId, delta: number) => {
    setGroupCounts((prev) => {
      const config = groupCounters.find((counter) => counter.id === counterId);
      if (!config) {
        return prev;
      }

      const nextValue = Math.max(config.min, prev[counterId] + delta);
      if (nextValue === prev[counterId]) {
        return prev;
      }

      return { ...prev, [counterId]: nextValue };
    });
  };

  const toggleSpecialRequirement = (requirement: string) => {
    setSelectedSpecialRequirements((prev) =>
      prev.includes(requirement)
        ? prev.filter((item) => item !== requirement)
        : [...prev, requirement],
    );
  };

  const renderMobileLayout = () => (
    <Box sx={datesGroupPageStyles.mobilePage}>
      {/* <Box component="header" id="dates-group-mobile-header" sx={datesGroupPageStyles.mobileHeader}>
        <Box sx={datesGroupPageStyles.mobileHeaderBrand}>
          <Box sx={datesGroupPageStyles.mobileHeaderIcon}>
            <TravelExploreRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography component="span" sx={datesGroupPageStyles.mobileHeaderTitle}>
            ASIS
          </Typography>
        </Box>
        <Box sx={datesGroupPageStyles.mobileHeaderActions}>
          <Box
            component="button"
            type="button"
            aria-label="Search safaris"
            sx={datesGroupPageStyles.mobileHeaderButton}
          >
            <SearchRoundedIcon fontSize="small" />
          </Box>
          <Box sx={datesGroupPageStyles.mobileHeaderAvatar}>
            <Box
              component="img"
              src={mobileAvatarUrl}
              alt="Profile"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>
      </Box> */}

      <Box component="main" id="dates-group-mobile-main" sx={datesGroupPageStyles.mobileMain}>
        <Box component="section" sx={datesGroupPageStyles.mobileHeroSection}>
          <Box sx={datesGroupPageStyles.mobileHeroMedia}>
            <Box
              component="img"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b123e3fbc4-405d92f10b13e2876569.png"
              alt="African savanna sunset with acacia tree silhouettes"
              sx={datesGroupPageStyles.mobileHeroImage}
            />
            <Box sx={datesGroupPageStyles.mobileHeroOverlay} />
          </Box>
          <Box sx={datesGroupPageStyles.mobileHeroContent}>
            <Typography component="h1" sx={datesGroupPageStyles.mobileHeroTitle}>
              Plan Your Safari Dates
            </Typography>
            <Typography sx={datesGroupPageStyles.mobileHeroDescription}>
              Choose your travel dates and group size
            </Typography>
            <Box sx={datesGroupPageStyles.mobileHeroHighlights}>
              {heroHighlights.map(({ id, icon: HighlightIcon, label }) => (
                <Box key={`mobile-hero-highlight-${id}`} sx={datesGroupPageStyles.mobileHeroHighlight}>
                  <HighlightIcon sx={{ fontSize: 18 }} />
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* <Box sx={datesGroupPageStyles.mobileWizardSection}>
          <Box sx={datesGroupPageStyles.mobileProgressHeader}>
            <Typography component="span" fontWeight={600} color={colorTokens.earth[700]}>
              {progressSummaryLabel}
            </Typography>
            <Typography component="span">{progressFraction}</Typography>
          </Box>
          <Box sx={datesGroupPageStyles.mobileProgressSteps}>
            {wizardSteps.map((step, index) => {
              const nextStep = wizardSteps[index + 1];
              const variant = connectorVariant(step, nextStep);
              const isLast = index === wizardSteps.length - 1;
              const nodeStyles =
                step.status === 'completed'
                  ? {
                      ...datesGroupPageStyles.mobileProgressNode,
                      ...datesGroupPageStyles.mobileProgressNodeCompleted,
                    }
                  : step.status === 'active'
                  ? {
                      ...datesGroupPageStyles.mobileProgressNode,
                      ...datesGroupPageStyles.mobileProgressNodeActive,
                    }
                  : {
                      ...datesGroupPageStyles.mobileProgressNode,
                      ...datesGroupPageStyles.mobileProgressNodeUpcoming,
                    };

              return (
                <Box
                  key={`mobile-progress-step-${step.id}`}
                  sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}
                >
                  <Box sx={datesGroupPageStyles.mobileProgressStep}>
                    <Box component="span" sx={nodeStyles}>
                      {step.status === 'completed' ? <CheckRoundedIcon sx={{ fontSize: 14 }} /> : step.id}
                    </Box>
                    <Typography component="span" sx={datesGroupPageStyles.mobileProgressLabel}>
                      {step.label}
                    </Typography>
                  </Box>
                  {!isLast ? (
                    <Box sx={datesGroupPageStyles.mobileProgressConnector}>
                      {variant === 'filled' ? (
                        <Box sx={datesGroupPageStyles.mobileProgressConnectorFilled} />
                      ) : variant === 'partial' ? (
                        <Box sx={datesGroupPageStyles.mobileProgressConnectorPartial} />
                      ) : null}
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Box> */}

        <Box component="section" sx={datesGroupPageStyles.mobileSection}>
          <Box sx={datesGroupPageStyles.mobileSelectionCard}>
            <Box sx={datesGroupPageStyles.mobileSelectionHeader}>
              <Typography component="h2" sx={datesGroupPageStyles.mobileSelectionTitle}>
                Travel Dates & Group
              </Typography>
              <Typography sx={datesGroupPageStyles.mobileSelectionSubtitle}>
                Select your dates and tell us about your group
              </Typography>
            </Box>
            <Box sx={datesGroupPageStyles.mobileSelectionBadge}>
              <Typography component="span">Selected: {selectedDestinationSummary}</Typography>
              {totalTravelers > 0 ? (
                <Typography component="span">
                  {totalTravelers} traveler{totalTravelers > 1 ? 's' : ''}
                </Typography>
              ) : null}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.sm }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                <Typography
                  component="h3"
                  sx={{ ...datesGroupPageStyles.sectionTitle, fontSize: 20, margin: 0 }}
                >
                  When would you like to travel?
                </Typography>
                <Typography sx={{ ...datesGroupPageStyles.sectionDescription, fontSize: 13 }}>
                  Choose specific travel dates or stay flexible with seasonal windows
                </Typography>
              </Box>

              <Box sx={datesGroupPageStyles.mobileOptionGroup}>
                {dateOptions.map(({ id, title, description }) => {
                  const isSelected = selectedDateOption === id;
                  return (
                    <Box
                      key={`mobile-date-option-${id}`}
                      component="button"
                      type="button"
                      onClick={() => handleDateOptionSelect(id)}
                      aria-pressed={isSelected}
                      sx={{
                        ...datesGroupPageStyles.mobileOptionCard,
                        ...(isSelected ? datesGroupPageStyles.mobileOptionCardActive : {}),
                        textAlign: 'left',
                        outline: 'none',
                      }}
                    >
                      <Box
                        sx={{
                          ...datesGroupPageStyles.mobileOptionRadio,
                          ...(isSelected ? datesGroupPageStyles.mobileOptionRadioActive : {}),
                        }}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography fontWeight={600} color={colorTokens.earth[800]}>
                          {title}
                        </Typography>
                        <Typography fontSize={13} color="rgba(74,57,42,0.68)">
                          {description}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {isSpecificDateSelection ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                  <Box sx={datesGroupPageStyles.inputField}>
                    <Typography component="label" sx={datesGroupPageStyles.inputLabel} htmlFor="mobile-departure-date">
                      Departure Date
                    </Typography>
                    <Box
                      id="mobile-departure-date"
                      component="input"
                      type="date"
                      value={specificDates.departure}
                      onChange={handleSpecificDateChange('departure')}
                      sx={{ ...datesGroupPageStyles.inputSurface, borderRadius: 16 }}
                    />
                  </Box>
                  <Box sx={datesGroupPageStyles.inputField}>
                    <Typography component="label" sx={datesGroupPageStyles.inputLabel} htmlFor="mobile-return-date">
                      Return Date
                    </Typography>
                    <Box
                      id="mobile-return-date"
                      component="input"
                      type="date"
                      value={specificDates.return}
                      onChange={handleSpecificDateChange('return')}
                      sx={{ ...datesGroupPageStyles.inputSurface, borderRadius: 16 }}
                    />
                  </Box>
                </Box>
              ) : null}

              {isFlexibleDateSelection ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.sm }}>
                  <Box sx={datesGroupPageStyles.inputField}>
                    <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                      Preferred Months
                    </Typography>
                    <Box sx={datesGroupPageStyles.monthGrid}>
                      {flexibleMonths.map(({ id, label, descriptor, isPeak }) => {
                        const isSelected = selectedFlexibleMonths.includes(id);
                        return (
                          <Box
                            key={`mobile-month-${id}`}
                            component="button"
                            type="button"
                            onClick={() => toggleFlexibleMonth(id)}
                            sx={{
                              ...datesGroupPageStyles.monthCard,
                              ...(isPeak ? datesGroupPageStyles.monthCardHighlight : {}),
                              ...(isSelected ? datesGroupPageStyles.monthCardSelected : {}),
                              textAlign: 'center',
                            }}
                          >
                            <Typography component="span" fontWeight={600} color={colorTokens.earth[800]}>
                              {label}
                            </Typography>
                            <Typography component="span" fontSize={11} color="rgba(74,57,42,0.65)">
                              {descriptor}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                  <Box sx={datesGroupPageStyles.inputField}>
                    <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                      Trip Duration
                    </Typography>
                    <Box
                      component="select"
                      value={selectedTripDuration}
                      onChange={(event) =>
                        setSelectedTripDuration(event.target.value as (typeof tripDurations)[number])
                      }
                      sx={{ ...datesGroupPageStyles.selectField, borderRadius: 1 }}
                    >
                      {tripDurations.map((duration) => (
                        <Box component="option" value={duration} key={`mobile-duration-${duration}`}>
                          {duration}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              ) : null}

              <Box sx={datesGroupPageStyles.mobileSeasonalCard}>
                <Box sx={datesGroupPageStyles.mobileSeasonalHeader}>
                  <Box sx={datesGroupPageStyles.mobileSeasonalIcon}>
                    <LightbulbRoundedIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Typography component="h4" fontWeight={600} color={colorTokens.earth[800]}>
                    Seasonal Tips
                  </Typography>
                </Box>
                <Box sx={datesGroupPageStyles.mobileSeasonalList}>
                  {seasonalInsights.map(({ id, icon: InsightIcon, label, description, iconColor }) => (
                    <Box key={`mobile-seasonal-${id}`} sx={datesGroupPageStyles.mobileSeasonalItem}>
                      <InsightIcon sx={{ fontSize: 16, color: iconColor }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                        <Typography component="span" fontSize={13} fontWeight={600} color={colorTokens.earth[800]}>
                          {label}
                        </Typography>
                        <Typography component="span" fontSize={12} color="rgba(74,57,42,0.7)">
                          {description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.sm }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                <Typography
                  component="h3"
                  sx={{ ...datesGroupPageStyles.sectionTitle, fontSize: 20, margin: 0 }}
                >
                  Group Details
                </Typography>
                <Typography sx={{ ...datesGroupPageStyles.sectionDescription, fontSize: 13 }}>
                  Tell us about everyone joining this safari
                </Typography>
              </Box>

              <Box sx={datesGroupPageStyles.counterGrid}>
                {groupCounters.map(({ id, label, min }) => {
                  const value = groupCounts[id];
                  const isDecrementDisabled = value <= min;
                  return (
                    <Box key={`mobile-counter-${id}`} sx={datesGroupPageStyles.counterCard}>
                      <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                        {label}
                      </Typography>
                      <Box sx={datesGroupPageStyles.counterControl}>
                        <Box
                          component="button"
                          type="button"
                          onClick={() => changeGroupCount(id, -1)}
                          disabled={isDecrementDisabled}
                          sx={{
                            ...datesGroupPageStyles.counterButton,
                            ...(isDecrementDisabled ? datesGroupPageStyles.counterButtonDisabled : {}),
                            border: 'none',
                            background: 'none',
                          }}
                        >
                          <RemoveRoundedIcon fontSize="small" />
                        </Box>
                        <Box sx={datesGroupPageStyles.counterValue}>{value}</Box>
                        <Box
                          component="button"
                          type="button"
                          onClick={() => changeGroupCount(id, 1)}
                          sx={{
                            ...datesGroupPageStyles.counterButton,
                            border: 'none',
                            background: 'none',
                          }}
                        >
                          <AddRoundedIcon fontSize="small" />
                        </Box>
                      </Box>
                      <Typography fontSize={11} color="rgba(74,57,42,0.55)">
                        Minimum {min} traveler{min > 1 ? 's' : ''}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.sm }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                  <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                    Accommodation Preference
                  </Typography>
                  <Stack spacing={spacingTokens.xs}>
                    {accommodationOptions.map(({ id, title, description, price, isHighlighted }) => {
                      const isSelected = selectedAccommodation === id;
                      return (
                        <Box
                          key={`mobile-accommodation-${id}`}
                          component="button"
                          type="button"
                          onClick={() => setSelectedAccommodation(id)}
                          aria-pressed={isSelected}
                          sx={{
                            ...datesGroupPageStyles.accommodationCard,
                            ...(isHighlighted || isSelected
                              ? {
                                borderColor: colorTokens.safari[400],
                                boxShadow: '0 18px 36px rgba(238, 92, 40, 0.18)',
                              }
                              : {}),
                            textAlign: 'left',
                            outline: 'none',
                          }}
                        >
                          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography fontWeight={600} color={colorTokens.earth[800]}>
                              {title}
                            </Typography>
                            <Typography fontSize={13} color="rgba(74,57,42,0.65)">
                              {description}
                            </Typography>
                          </Box>
                          <Typography fontSize={13} fontWeight={600} color={colorTokens.safari[600]}>
                            {price}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                  <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                    Group Type
                  </Typography>
                  <Box
                    component="select"
                    value={selectedGroupType}
                    onChange={(event) => setSelectedGroupType(event.target.value)}
                    sx={{ ...datesGroupPageStyles.selectField, borderRadius: 1 }}
                  >
                    {groupTypes.map((option) => (
                      <Box component="option" value={option} key={`mobile-group-type-${option}`}>
                        {option}
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.xs }}>
                  <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                    Special Requirements
                  </Typography>
                  <Box sx={datesGroupPageStyles.checkboxGroup}>
                    {specialRequirements.map((requirement) => {
                      const isChecked = selectedSpecialRequirements.includes(requirement);
                      return (
                        <Box
                          key={`mobile-requirement-${requirement}`}
                          component="label"
                          sx={{
                            ...datesGroupPageStyles.checkboxItem,
                            ...(isChecked
                              ? {
                                borderColor: colorTokens.safari[400],
                                boxShadow: '0 12px 28px rgba(238, 92, 40, 0.12)',
                              }
                              : {}),
                          }}
                        >
                          <Box
                            component="input"
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSpecialRequirement(requirement)}
                            sx={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                          />
                          <Box
                            sx={{
                              ...datesGroupPageStyles.checkboxIndicator,
                              ...(isChecked ? datesGroupPageStyles.checkboxIndicatorActive : {}),
                            }}
                          >
                            {isChecked ? <CheckRoundedIcon sx={{ fontSize: 14 }} /> : null}
                          </Box>
                          <Typography fontSize={13} color={colorTokens.earth[700]}>
                            {requirement}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={datesGroupPageStyles.budgetSection}>
              <Typography component="h3" sx={{ ...datesGroupPageStyles.sectionTitle, fontSize: 20, margin: 0 }}>
                Budget Estimates
              </Typography>
              <Box sx={datesGroupPageStyles.budgetGrid}>
                {budgetBands.map(({ id, amount, label, note, tag, isFeatured }) => (
                  <Box
                    key={`mobile-budget-${id}`}
                    sx={{
                      ...datesGroupPageStyles.budgetCard,
                      ...(isFeatured ? datesGroupPageStyles.budgetCardFeatured : {}),
                    }}
                  >
                    <Typography fontSize={26} fontWeight={700} color={isFeatured ? colorTokens.safari[600] : '#15803d'}>
                      {amount}
                    </Typography>
                    <Typography fontSize={13} color="rgba(74,57,42,0.7)">
                      {label}
                    </Typography>
                    <Typography fontSize={11} color="rgba(74,57,42,0.6)">
                      {note}
                    </Typography>
                    {tag ? <Box sx={datesGroupPageStyles.budgetTag}>{tag}</Box> : null}
                  </Box>
                ))}
              </Box>
              <Typography sx={datesGroupPageStyles.budgetNote}>
                *Includes accommodation, meals, park fees, and game drives.
              </Typography>
            </Box>

            <Box sx={datesGroupPageStyles.residentCard}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    backgroundColor: 'rgba(34,197,94,0.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#15803d',
                  }}
                >
                  <LocationOnRoundedIcon sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                  <Typography component="h4" fontSize={17} fontWeight={600} color={colorTokens.earth[800]}>
                    East African Resident?
                  </Typography>
                  <Typography fontSize={13} color="rgba(74,57,42,0.7)">
                    Unlock up to 40% in resident discounts
                  </Typography>
                </Box>
              </Box>
              <Box component="button" type="button" sx={datesGroupPageStyles.residentButton}>
                <LocationOnRoundedIcon sx={{ fontSize: 16 }} />
                Apply Resident Discount
              </Box>
            </Box>

            <Box sx={datesGroupPageStyles.mobileFooter}>
              <Box
                component="button"
                type="button"
                onClick={() => navigate('../destinations')}
                sx={datesGroupPageStyles.mobileFooterBackButton}
              >
                <ArrowBackRoundedIcon fontSize="small" />
              </Box>
              <Box sx={datesGroupPageStyles.mobileFooterActionRow}>
                <Box component="button" type="button" sx={datesGroupPageStyles.mobileFooterSecondaryButton}>
                  Save
                </Box>
                <Box
                  component="button"
                  type="button"
                  onClick={() => navigate('../recommendations')}
                  sx={datesGroupPageStyles.mobileFooterPrimaryButton}
                >
                  Recommendations
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box component="section" sx={datesGroupPageStyles.mobileTipsSection}>
          <Box sx={datesGroupPageStyles.mobileTipsHeader}>
            <Typography component="h2" sx={datesGroupPageStyles.mobileTipsTitle}>
              Planning Tips
            </Typography>
            <Typography sx={datesGroupPageStyles.mobileTipsSubtitle}>
              Expert advice for your safari
            </Typography>
          </Box>
          <Box sx={datesGroupPageStyles.mobileTipList}>
            {travelTips.map(({ id, title, description, icon: TipIcon, iconBg, iconColor, items }) => (
              <Box key={`mobile-tip-${id}`} sx={datesGroupPageStyles.mobileTipCard}>
                <Box
                  sx={{
                    ...datesGroupPageStyles.mobileTipIconWrap,
                    backgroundImage: iconBg,
                    color: iconColor,
                  }}
                >
                  <TipIcon sx={{ fontSize: 28 }} />
                </Box>
                <Typography component="h3" sx={datesGroupPageStyles.mobileTipTitle}>
                  {title}
                </Typography>
                <Typography fontSize={13} color="rgba(74,57,42,0.7)">
                  {description}
                </Typography>
                <Box sx={datesGroupPageStyles.mobileTipItems}>
                  {items.map(({ id: itemId, title: itemTitle, description: itemDescription }) => (
                    <Box key={`mobile-tip-${id}-${itemId}`} sx={datesGroupPageStyles.mobileTipItem}>
                      <CheckRoundedIcon sx={{ fontSize: 16, color: colorTokens.safari[600], marginTop: 0.2 }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                        <Typography component="span" fontSize={13} fontWeight={600} color={colorTokens.earth[800]}>
                          {itemTitle}
                        </Typography>
                        <Typography component="span" fontSize={12} color="rgba(74,57,42,0.68)">
                          {itemDescription}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {renderMobileLayout()}

      <Box component="main" sx={{ ...datesGroupPageStyles.main, display: { xs: 'none', md: 'block' } }}>
        <WizardHeroSection
          id="dates-group-hero"
          image={{
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b123e3fbc4-405d92f10b13e2876569.png',
            alt: 'African savanna sunset with acacia tree silhouettes',
          }}
          title="Plan Your Safari Dates"
          description="Choose your preferred travel dates and group size for the perfect safari experience"
          highlights={heroHighlights}
          styles={wizardHeroStyles}
        />

        <Box component="section" id="planning-wizard" sx={datesGroupPageStyles.wizardSection}>
          <Box sx={datesGroupPageStyles.wizardContainer}>
            <WizardProgressBar
              id="dates-group-progress"
              steps={wizardSteps}
              styles={wizardProgressStyles}
              getConnectorVariant={connectorVariant}
            // trailingContent={
            //   <Typography component="span" fontSize={13} color="rgba(74,57,42,0.65)">
            //     Step 3 of 4
            //   </Typography>
            // }
            />

            <Box id="dates-group-selection" sx={datesGroupPageStyles.selectionCard}>
              <Box sx={datesGroupPageStyles.selectionHeader}>
                <Box sx={datesGroupPageStyles.selectionTitleGroup}>
                  <Typography component="h2" sx={datesGroupPageStyles.selectionTitle}>
                    Travel Dates & Group Details
                  </Typography>
                  <Typography sx={datesGroupPageStyles.selectionSubtitle}>
                    Select your preferred travel dates and tell us about your group
                  </Typography>
                </Box>
                <Box sx={datesGroupPageStyles.selectionBadge}>
                  <Typography component="span" fontSize={13} fontWeight={500} color="inherit">
                    Selected:
                  </Typography>
                  <Typography component="span" fontSize={13} fontWeight={700} color="inherit">
                    Kenya, Tanzania
                  </Typography>
                  {totalTravelers > 0 ? (
                    <Typography component="span" fontSize={13} fontWeight={500} color="inherit">
                      • {totalTravelers} traveler{totalTravelers > 1 ? 's' : ''}
                    </Typography>
                  ) : null}
                </Box>
              </Box>

              <Box sx={datesGroupPageStyles.contentGrid}>
                <Box sx={datesGroupPageStyles.sectionColumn}>
                  <Box sx={datesGroupPageStyles.sectionIntro}>
                    <Typography component="h3" sx={datesGroupPageStyles.sectionTitle}>
                      When would you like to travel?
                    </Typography>
                    <Typography sx={datesGroupPageStyles.sectionDescription}>
                      Indicate specific travel dates or choose flexible windows that fit your schedule
                    </Typography>
                  </Box>

                  <Box sx={datesGroupPageStyles.optionGroup}>
                    {dateOptions.map(({ id, title, description }) => {
                      const isSelected = selectedDateOption === id;
                      return (
                        <Box
                          key={id}
                          component="button"
                          type="button"
                          onClick={() => handleDateOptionSelect(id)}
                          aria-pressed={isSelected}
                          sx={{
                            ...datesGroupPageStyles.optionCard,
                            ...(isSelected ? datesGroupPageStyles.optionCardActive : {}),
                            textAlign: 'left',
                            outline: 'none',
                          }}
                        >
                          <Box
                            sx={{
                              ...datesGroupPageStyles.optionRadio,
                              ...(isSelected ? datesGroupPageStyles.optionRadioActive : {}),
                            }}
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography fontWeight={600} color={colorTokens.earth[800]}>
                              {title}
                            </Typography>
                            <Typography fontSize={13} color="rgba(74,57,42,0.65)">
                              {description}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>

                  {selectedDateOption === 'specific' ? (
                    <Box sx={datesGroupPageStyles.inputGroup}>
                      <Box sx={datesGroupPageStyles.inputField}>
                        <Typography component="label" sx={datesGroupPageStyles.inputLabel} htmlFor="departure-date">
                          Departure Date
                        </Typography>
                        <Box
                          id="departure-date"
                          component="input"
                          type="date"
                          value={specificDates.departure}
                          onChange={handleSpecificDateChange('departure')}
                          sx={datesGroupPageStyles.inputSurface}
                        />
                      </Box>
                      <Box sx={datesGroupPageStyles.inputField}>
                        <Typography component="label" sx={datesGroupPageStyles.inputLabel} htmlFor="return-date">
                          Return Date
                        </Typography>
                        <Box
                          id="return-date"
                          component="input"
                          type="date"
                          value={specificDates.return}
                          onChange={handleSpecificDateChange('return')}
                          sx={datesGroupPageStyles.inputSurface}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.sm }}>
                        <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                          Preferred Travel Months
                        </Typography>
                        <Box sx={datesGroupPageStyles.monthGrid}>
                          {flexibleMonths.map(({ id, label, descriptor, isPeak }) => {
                            const isSelected = selectedFlexibleMonths.includes(id);
                            return (
                              <Box
                                key={id}
                                component="button"
                                type="button"
                                onClick={() => toggleFlexibleMonth(id)}
                                aria-pressed={isSelected}
                                sx={{
                                  ...datesGroupPageStyles.monthCard,
                                  ...(isPeak ? datesGroupPageStyles.monthCardHighlight : {}),
                                  ...(isSelected ? datesGroupPageStyles.monthCardSelected : {}),
                                  outline: 'none',
                                }}
                              >
                                <Typography fontWeight={600}>{label}</Typography>
                                <Typography fontSize={11} color={isSelected || isPeak ? 'inherit' : 'rgba(74,57,42,0.6)'}>
                                  {descriptor}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.sm }}>
                        <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                          Trip Duration
                        </Typography>
                        <Box sx={datesGroupPageStyles.pillGroup}>
                          {tripDurations.map((duration) => {
                            const isSelected = selectedTripDuration === duration;
                            return (
                              <Box
                                key={duration}
                                component="button"
                                type="button"
                                onClick={() => setSelectedTripDuration(duration)}
                                aria-pressed={isSelected}
                                sx={{
                                  ...datesGroupPageStyles.pillOption,
                                  ...(isSelected ? datesGroupPageStyles.pillOptionActive : {}),
                                  outline: 'none',
                                }}
                              >
                                {duration}
                              </Box>
                            );
                          })}
                        </Box>
                        <Typography fontSize={12} color="rgba(74,57,42,0.6)">
                          Popular choice for migrations and multi-park itineraries
                        </Typography>
                      </Box>
                    </>
                  )}

                  <Box sx={datesGroupPageStyles.seasonalCard}>
                    <Box sx={datesGroupPageStyles.seasonalHeader}>
                      <Box sx={datesGroupPageStyles.seasonalIconWrap}>
                        <LightbulbRoundedIcon sx={{ fontSize: 20 }} />
                      </Box>
                      <Typography component="h4" fontWeight={600} color={colorTokens.earth[800]}>
                        Seasonal Insights
                      </Typography>
                    </Box>
                    <Box sx={datesGroupPageStyles.seasonalList}>
                      {seasonalInsights.map(({ id, icon: Icon, label, description, iconColor }) => (
                        <Box key={id} sx={datesGroupPageStyles.seasonalItem}>
                          <Icon sx={{ fontSize: 18, color: iconColor }} />
                          <Typography component="span" fontWeight={600} color={colorTokens.earth[800]}>
                            {label}:
                          </Typography>
                          <Typography component="span" fontSize={13} color="rgba(74,57,42,0.7)">
                            {description}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Box sx={datesGroupPageStyles.sectionColumn}>
                  <Box sx={datesGroupPageStyles.sectionIntro}>
                    <Typography component="h3" sx={datesGroupPageStyles.sectionTitle}>
                      Tell us about your group
                    </Typography>
                    <Typography sx={datesGroupPageStyles.sectionDescription}>
                      Group composition helps us tailor safari vehicles, rooming, and activities
                    </Typography>
                  </Box>

                  <Box sx={datesGroupPageStyles.counterGrid}>
                    {groupCounters.map(({ id, label, min }) => {
                      const value = groupCounts[id];
                      const isDecrementDisabled = value <= min;
                      return (
                        <Box key={id} sx={datesGroupPageStyles.counterCard}>
                          <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                            {label}
                          </Typography>
                          <Box sx={datesGroupPageStyles.counterControl}>
                            <Box
                              component="button"
                              type="button"
                              onClick={() => changeGroupCount(id, -1)}
                              disabled={isDecrementDisabled}
                              sx={{
                                ...datesGroupPageStyles.counterButton,
                                ...(isDecrementDisabled ? datesGroupPageStyles.counterButtonDisabled : {}),
                                border: 'none',
                                background: 'none',
                              }}
                            >
                              <RemoveRoundedIcon fontSize="small" />
                            </Box>
                            <Box sx={datesGroupPageStyles.counterValue}>{value}</Box>
                            <Box
                              component="button"
                              type="button"
                              onClick={() => changeGroupCount(id, 1)}
                              sx={{
                                ...datesGroupPageStyles.counterButton,
                                border: 'none',
                                background: 'none',
                              }}
                            >
                              <AddRoundedIcon fontSize="small" />
                            </Box>
                          </Box>
                          <Typography fontSize={11} color="rgba(74,57,42,0.55)">
                            Minimum {min} traveler{min > 1 ? 's' : ''}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.sm }}>
                    <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                      Accommodation Preference
                    </Typography>
                    <Stack spacing={spacingTokens.sm}>
                      {accommodationOptions.map(({ id, title, description, price, isHighlighted }) => {
                        const isSelected = selectedAccommodation === id;
                        return (
                          <Box
                            key={id}
                            component="button"
                            type="button"
                            onClick={() => setSelectedAccommodation(id)}
                            aria-pressed={isSelected}
                            sx={{
                              ...datesGroupPageStyles.accommodationCard,
                              ...(isHighlighted || isSelected
                                ? {
                                  borderColor: colorTokens.safari[400],
                                  boxShadow: '0 18px 36px rgba(238, 92, 40, 0.18)',
                                }
                                : {}),
                              textAlign: 'left',
                              outline: 'none',
                            }}
                          >
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              <Typography fontWeight={600} color={colorTokens.earth[800]}>
                                {title}
                              </Typography>
                              <Typography fontSize={13} color="rgba(74,57,42,0.65)">
                                {description}
                              </Typography>
                            </Box>
                            <Typography fontSize={13} fontWeight={600} color={colorTokens.safari[600]}>
                              {price}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.sm }}>
                    <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                      Group Type
                    </Typography>
                    <Box
                      component="select"
                      value={selectedGroupType}
                      onChange={(event) => setSelectedGroupType(event.target.value)}
                      sx={{
                        ...datesGroupPageStyles.selectField,
                        appearance: 'none',
                        backgroundImage: 'none',
                      }}
                    >
                      {groupTypes.map((option) => (
                        <Box component="option" value={option} key={option}>
                          {option}
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.sm }}>
                    <Typography component="label" sx={datesGroupPageStyles.inputLabel}>
                      Special Requirements
                    </Typography>
                    <Box sx={datesGroupPageStyles.checkboxGroup}>
                      {specialRequirements.map((requirement) => {
                        const isChecked = selectedSpecialRequirements.includes(requirement);
                        return (
                          <Box
                            key={requirement}
                            component="label"
                            sx={{
                              ...datesGroupPageStyles.checkboxItem,
                              ...(isChecked
                                ? {
                                  borderColor: colorTokens.safari[400],
                                  boxShadow: '0 12px 28px rgba(238, 92, 40, 0.12)',
                                }
                                : {}),
                            }}
                          >
                            <Box
                              component="input"
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleSpecialRequirement(requirement)}
                              sx={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                            />
                            <Box
                              sx={{
                                ...datesGroupPageStyles.checkboxIndicator,
                                ...(isChecked ? datesGroupPageStyles.checkboxIndicatorActive : {}),
                              }}
                            >
                              {isChecked ? <CheckRoundedIcon sx={{ fontSize: 14 }} /> : null}
                            </Box>
                            <Typography fontSize={13} color={colorTokens.earth[700]}>
                              {requirement}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={datesGroupPageStyles.budgetSection}>
                <Typography component="h3" sx={datesGroupPageStyles.sectionTitle}>
                  Estimated Budget Range
                </Typography>
                <Box sx={datesGroupPageStyles.budgetGrid}>
                  {budgetBands.map(({ id, amount, label, note, tag, isFeatured }) => (
                    <Box
                      key={id}
                      sx={{
                        ...datesGroupPageStyles.budgetCard,
                        ...(isFeatured ? datesGroupPageStyles.budgetCardFeatured : {}),
                      }}
                    >
                      <Typography fontSize={28} fontWeight={700} color={isFeatured ? colorTokens.safari[600] : '#15803d'}>
                        {amount}
                      </Typography>
                      <Typography fontSize={13} color="rgba(74,57,42,0.65)">
                        {label}
                      </Typography>
                      <Typography fontSize={11} color="rgba(74,57,42,0.55)">
                        {note}
                      </Typography>
                      {tag ? <Box sx={datesGroupPageStyles.budgetTag}>{tag}</Box> : null}
                    </Box>
                  ))}
                </Box>
                <Typography sx={datesGroupPageStyles.budgetNote}>
                  *Prices include accommodation, meals, park fees, and game drives. Flights not included.
                </Typography>
              </Box>

              <Box sx={datesGroupPageStyles.residentCard}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 18,
                      backgroundColor: 'rgba(34,197,94,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#15803d',
                    }}
                  >
                    <LocationOnRoundedIcon />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography component="h4" fontSize={18} fontWeight={600} color={colorTokens.earth[800]}>
                      East African Resident?
                    </Typography>
                    <Typography fontSize={13} color="rgba(74,57,42,0.7)">
                      Get up to 40% discount on park fees and special resident rates
                    </Typography>
                  </Box>
                </Box>
                <Box component="button" type="button" sx={datesGroupPageStyles.residentButton}>
                  Apply Resident Discount
                </Box>
              </Box>

              <Box sx={datesGroupPageStyles.selectionFooter}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => navigate('../destinations')}
                  sx={datesGroupPageStyles.footerButtonSecondary}
                >
                  <ArrowBackRoundedIcon fontSize="small" />
                  Back to Destinations
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: spacingTokens.sm, justifyContent: 'flex-end' }}>
                  <Box component="button" type="button" sx={datesGroupPageStyles.footerButtonSecondary}>
                    <BookmarkRoundedIcon fontSize="small" />
                    Save Progress
                  </Box>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => navigate('../recommendations')}
                    sx={datesGroupPageStyles.footerButtonPrimary}
                  >
                    View Recommendations
                    <ArrowForwardRoundedIcon fontSize="small" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box component="section" id="travel-tips" sx={datesGroupPageStyles.travelTipsSection}>
          <Box sx={datesGroupPageStyles.travelTipsContainer}>
            <Box sx={datesGroupPageStyles.sectionHeader}>
              <Typography component="h2" sx={datesGroupPageStyles.sectionHeaderTitle}>
                Planning Your Perfect Safari
              </Typography>
              <Typography sx={datesGroupPageStyles.sectionHeaderSubtitle}>
                Expert tips to help you make the best choices for your African adventure
              </Typography>
            </Box>
            <Box sx={datesGroupPageStyles.tipsGrid}>
              {travelTips.map(({ id, title, description, icon: Icon, iconColor, iconBg, items }) => (
                <Box key={id} sx={datesGroupPageStyles.tipCard}>
                  <Box sx={datesGroupPageStyles.tipCardHeader}>
                    <Box
                      sx={{
                        ...datesGroupPageStyles.tipIconWrap,
                        backgroundImage: iconBg,
                        color: iconColor,
                      }}
                    >
                      <Icon sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography component="h3" fontSize={22} fontWeight={600} color={colorTokens.earth[800]}>
                      {title}
                    </Typography>
                    <Typography fontSize={13} color="rgba(74,57,42,0.65)">
                      {description}
                    </Typography>
                  </Box>
                  <Box sx={datesGroupPageStyles.tipList}>
                    {items.map(({ id: itemId, title: itemTitle, description: itemDescription }) => (
                      <Box key={itemId} sx={{ display: 'flex', alignItems: 'flex-start', gap: spacingTokens.xs }}>
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: 6,
                            backgroundColor: 'rgba(238, 92, 40, 0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: colorTokens.safari[600],
                            marginTop: 0.3,
                          }}
                        >
                          <CheckRoundedIcon sx={{ fontSize: 14 }} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography fontSize={14} fontWeight={600} color={colorTokens.earth[800]}>
                            {itemTitle}
                          </Typography>
                          <Typography fontSize={13} color="rgba(74,57,42,0.65)">
                            {itemDescription}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box component="section" id="calendar-availability" sx={datesGroupPageStyles.calendarSection}>
          <Box sx={datesGroupPageStyles.calendarContainer}>
            <Box sx={datesGroupPageStyles.calendarCard}>
              <Box sx={datesGroupPageStyles.calendarHeader}>
                <Typography component="h2" sx={datesGroupPageStyles.sectionTitle}>
                  Live Availability Calendar
                </Typography>
                <Typography fontSize={14} color="rgba(74,57,42,0.65)">
                  See real-time availability and pricing for your selected destinations
                </Typography>
              </Box>

              <Box sx={datesGroupPageStyles.calendarWeekHeader}>
                {calendarWeekDays.map((day) => (
                  <Box key={day} component="span" sx={{ textAlign: 'center' }}>
                    {day}
                  </Box>
                ))}
              </Box>

              <Box sx={datesGroupPageStyles.calendarGrid}>
                {calendarDays.map(({ day, status, price, label }) => {
                  const statusSx =
                    status === 'available'
                      ? datesGroupPageStyles.calendarDayAvailable
                      : status === 'peak'
                        ? datesGroupPageStyles.calendarDayPeak
                        : status === 'booked'
                          ? datesGroupPageStyles.calendarDayBooked
                          : {};

                  return (
                    <Box key={day} sx={{ ...datesGroupPageStyles.calendarDay, ...statusSx }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Typography fontWeight={600}>{day}</Typography>
                        {price ? (
                          <Typography fontSize={12}>{price}</Typography>
                        ) : label ? (
                          <Typography fontSize={12}>{label}</Typography>
                        ) : null}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box sx={datesGroupPageStyles.calendarLegend}>
                {calendarLegend.map(({ id, label, color, border }) => (
                  <Box key={id} sx={datesGroupPageStyles.legendItem}>
                    <Box
                      sx={{
                        ...datesGroupPageStyles.legendSwatch,
                        backgroundColor: color,
                        borderColor: border,
                        borderWidth: border === 'transparent' ? 0 : 1,
                        borderStyle: border === 'transparent' ? 'none' : 'solid',
                      }}
                    />
                    {label}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box component="section" id="expert-consultation" sx={datesGroupPageStyles.consultationSection}>
          <Box sx={datesGroupPageStyles.consultationOverlay} />
          <Box sx={datesGroupPageStyles.consultationContainer}>
            <Box sx={datesGroupPageStyles.consultationHeader}>
              <Typography component="h2" sx={datesGroupPageStyles.consultationTitle}>
                Need Help Planning?
              </Typography>
              <Typography sx={datesGroupPageStyles.consultationSubtitle}>
                Our safari experts are here to help you create the perfect itinerary
              </Typography>
            </Box>

            <Stack spacing={spacingTokens.sm}>
              {experts.map(({ id, name, title, description, quote, avatar }) => (
                <Box key={id} sx={datesGroupPageStyles.expertCard}>
                  <Box sx={datesGroupPageStyles.expertHeader}>
                    <Box sx={datesGroupPageStyles.expertAvatar}>
                      <Box component="img" src={avatar} alt={name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography component="h3" fontSize={18} fontWeight={600}>
                        {name}
                      </Typography>
                      <Typography fontSize={13} color="rgba(255,255,255,0.8)">
                        {title}
                      </Typography>
                      <Typography fontSize={12} color="rgba(255,255,255,0.65)">
                        {description}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography fontSize={13} color="rgba(255,255,255,0.75)">
                    “{quote}”
                  </Typography>
                  <Box sx={datesGroupPageStyles.contactButtons}>
                    <Box component="button" type="button" sx={datesGroupPageStyles.contactButtonPrimary}>
                      <PhoneRoundedIcon sx={{ fontSize: 16 }} />
                      Call Now
                    </Box>
                    <Box component="button" type="button" sx={datesGroupPageStyles.contactButtonSecondary}>
                      <WhatsApp sx={{ fontSize: 16 }} />
                      WhatsApp
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>

            <Box component="form" sx={datesGroupPageStyles.consultationForm}>
              <Typography component="h3" fontSize={22} fontWeight={600}>
                Request Free Consultation
              </Typography>
              <Box sx={datesGroupPageStyles.formRow}>
                <Box
                  component="input"
                  type="text"
                  placeholder="First Name"
                  sx={datesGroupPageStyles.formField}
                />
                <Box
                  component="input"
                  type="text"
                  placeholder="Last Name"
                  sx={datesGroupPageStyles.formField}
                />
              </Box>
              <Box
                component="input"
                type="email"
                placeholder="Email Address"
                sx={datesGroupPageStyles.formField}
              />
              <Box
                component="input"
                type="tel"
                placeholder="Phone Number"
                sx={datesGroupPageStyles.formField}
              />
              <Box sx={datesGroupPageStyles.formField}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: spacingTokens.sm }}>
                  <Typography fontSize={13} color="rgba(255,255,255,0.85)">
                    Preferred Contact Time
                  </Typography>
                  <AccessTimeRoundedIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.65)' }} />
                </Box>
              </Box>
              <Box
                component="textarea"
                placeholder="Tell us about your safari preferences and any questions you have..."
                sx={{ ...datesGroupPageStyles.formField, ...datesGroupPageStyles.formTextArea }}
              />
              <Box component="button" type="submit" sx={datesGroupPageStyles.formButton}>
                <EventAvailableRoundedIcon sx={{ fontSize: 18 }} />
                Schedule Free Consultation
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DatesGroupPage;
