import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CompassOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';

// import DenseListingGrid from '@/shared/components/DenseListingGrid/DenseListingGrid';
// import FAQAccordion from '@/shared/components/FAQAccordion';
// import FiltersBar from '@/shared/components/FiltersBar';
// import Hero from '@/shared/components/Hero';
// import MapSection from '@/shared/components/MapSection';
import WhatsAppSticky from '@/shared/components/WhatsAppSticky';
// import EmptyState from '@/shared/components/EmptyState';
// import { useTours } from '../api/useTours';
import { homePageStyles } from '@/design-system/theme/homePageStyles';
import { colorTokens } from '@/design-system/theme/tokens';

// const fallbackTours = [
//   {
//     id: '1',
//     title: 'Mara sunrise balloon safari',
//     heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
//     priceFrom: 4200,
//     currency: 'USD' as const,
//     durationDays: 5,
//     countryCode: 'KE',
//   },
//   {
//     id: '2',
//     title: 'Amboseli elephant watch',
//     heroImage: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b',
//     priceFrom: 2800,
//     currency: 'USD' as const,
//     durationDays: 4,
//     countryCode: 'KE',
//   },
// ];

const preferenceHighlights = [
  {
    id: 'destinations',
    title: 'Preferred Destinations',
    description: 'Set your dream safari locations',
    icon: MapOutlinedIcon,
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(147,197,253,0.35) 100%)',
    color: '#1d4ed8',
  },
  {
    id: 'budget',
    title: 'Budget Range',
    description: 'Choose your comfort level',
    icon: PaidOutlinedIcon,
    gradient: 'linear-gradient(135deg, rgba(34,197,94,0.18) 0%, rgba(187,247,208,0.45) 100%)',
    color: '#047857',
  },
  {
    id: 'seasons',
    title: 'Travel Seasons',
    description: 'Best times for your adventures',
    icon: CalendarMonthOutlinedIcon,
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(221,214,254,0.45) 100%)',
    color: '#6d28d9',
  },
] as const;

const popularDestinations = [
  {
    id: 'maasai-mara',
    name: 'Maasai Mara',
    price: 'From $1,200',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/45069c4b8d-e124504002d3e7be1432.png',
    tag: 'Hot',
  },
  {
    id: 'serengeti',
    name: 'Serengeti',
    price: 'From $1,800',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f47f1d367b-8c035831dd988b642cfb.png',
    tag: '',

  },
  {
    id: 'ngorongoro',
    name: 'Ngorongoro',
    price: 'From $950',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/5ee893a328-d4f7ac74d336fb86ca8f.png',
    tag: '',

  },
  {
    id: 'amboseli',
    name: 'Amboseli',
    price: 'From $750',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/cb12741339-074e09fcd82e2265fe3b.png',
    tag: '',

  },
] as const;

const luxurySafaris = [
  {
    id: 'maasai-luxury',
    name: 'Maasai Mara Luxury Lodge',
        duration: '',
    price: '$3,200',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/220ab76677-f23fd3f10083a2f3f3c2.png',
    tag: 'Luxury',
  },
  {
    id: 'serengeti-camp',
    name: 'Serengeti Tented Camp',
    duration: '7 days • Private guide',
    price: '$4,500',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e39b6641dd-ae76829c63919f2b50b9.png',
    tag: 'Luxury',
  },
  {
    id: 'ultimate-five',
    name: 'Ultimate Big Five',
    duration: '10 days • Multi-park',
    price: '$6,800',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8de1995048-4f3f61c5bb05ce2461b4.png',
    tag: 'Luxury',
  },
] as const;

const midRangeSafaris = [
  {
    id: 'mara-classic',
    name: 'Mara Classic Safari',
    duration: '4 days',
    price: '$1,450',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/555c9f4564-6f4814669684b42b8bf0.png',
    tag: 'Mid-Range',
  },
  {
    id: 'amboseli-explorer',
    name: 'Amboseli Explorer',
    duration: '3 days',
    price: '$980',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2f918b666a-f4cd58ebf063ca5a0be6.png',
    tag: 'Mid-Range',
  },
  {
    id: 'ngorongoro-retreat',
    name: 'Ngorongoro Retreat',
    duration: '5 days',
    price: '$1,620',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/31b1021811-6a83a88710e4d2ade540.png',
    tag: 'Mid-Range',
  },
  {
    id: 'arusha-adventure',
    name: 'Arusha Adventure',
    duration: '6 days',
    price: '$1,890',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/a5c5a89c56-34fd6893f7ce4b05261a.png',
    tag: 'Mid-Range',
  },
] as const;

const HomePage = () => {
  // const { data, isLoading } = useTours();
  // const tours = data?.data ?? fallbackTours;

  return (
    <Stack spacing={{ xs: 6, md: 8 }} sx={homePageStyles.container}>
      {/* <Hero /> */}
      {/* <FiltersBar /> */}
      <Box component="section" id="profile-content" sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 5, md: 6 } }}>
        <Box>
          <Box component="nav" sx={homePageStyles.breadcrumbNav}>
            <Typography component={NavLink} to="/account" sx={{ ...homePageStyles.breadcrumbLink, textDecoration: 'none' }}>
              Home
            </Typography>
            <ArrowForwardIosRoundedIcon fontSize="inherit" sx={{ fontSize: 12, color: 'rgba(90,68,51,0.45)' }} />
            <Typography sx={{ color: colorTokens.earth[800], fontWeight: 600 }}>Preferences</Typography>
          </Box>
          <Box sx={homePageStyles.pageHeader}>
            <Typography component="h1" sx={homePageStyles.pageTitle}>
              Welcome to ASIS Safaris
            </Typography>
            <Box
              component={NavLink}
              to="/search"
              sx={{ ...homePageStyles.primaryCta, textDecoration: 'none' }}
            >
              <CompassOutlinedIcon />
              Explore Safaris
            </Box>
          </Box>
        </Box>

        <Box sx={homePageStyles.welcomeCard}>
          <Box sx={homePageStyles.welcomePattern} />
          <Box sx={homePageStyles.welcomeContent}>
            <Box sx={homePageStyles.welcomeIconWrap}>
              <MapOutlinedIcon fontSize="large" />
            </Box>
            <Box>
              <Typography component="h2" sx={homePageStyles.welcomeHeadline}>
                Let's personalize your safari experience
              </Typography>
              <Typography sx={homePageStyles.welcomeDescription}>
                Tell us your preferences to get the best recommendations.
              </Typography>
            </Box>
          </Box>
          <Box sx={homePageStyles.welcomeGrid}>
            {preferenceHighlights.map(({ id, title, description, icon: Icon, gradient, color }) => (
              <Box key={id} sx={homePageStyles.preferenceCard}>
                <Box sx={{ ...homePageStyles.preferenceIcon, backgroundImage: gradient, color }}>
                  <Icon fontSize="medium" />
                </Box>
                <Typography sx={homePageStyles.preferenceTitle}>{title}</Typography>
                <Typography sx={homePageStyles.preferenceDescription}>{description}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box id="popular-destinations">
          <Box sx={homePageStyles.sectionHeader}>
            <Typography component="h2" sx={homePageStyles.sectionTitle}>
              Popular Destinations
            </Typography>
            <Box component={NavLink} to="/search" sx={{ ...homePageStyles.sectionCta, textDecoration: 'none' }}>
              View All
            </Box>
          </Box>
          <Box sx={homePageStyles.destinationsGrid}>
            {popularDestinations.map(({ id, name, price, image, tag }) => (
              <Box key={id} sx={homePageStyles.safariCard}>
                <Box sx={homePageStyles.safariMedia}>
                  <Box
                    component="img"
                    src={image}
                    alt={name}
                    sx={homePageStyles.safariImage}
                  />
                  <Box sx={homePageStyles.safariGradientOverlay} />
                  {tag ? <Box sx={homePageStyles.safariBadge}>{tag}</Box> : null}
                  <Box sx={homePageStyles.safariContent}>
                    <Typography sx={homePageStyles.safariName}>{name}</Typography>
                    <Typography sx={homePageStyles.safariMeta}>{price}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box id="luxury-safaris">
          <Box sx={homePageStyles.sectionHeader}>
            <Box sx={homePageStyles.sectionTitleWrap}>
              <Box sx={{ ...homePageStyles.sectionIcon, backgroundColor: 'rgba(251, 191, 36, 0.18)', color: '#d97706' }}>
                <DiamondOutlinedIcon fontSize="small" />
              </Box>
              <Typography component="h2" sx={homePageStyles.sectionTitle}>
                Luxury Safaris
              </Typography>
            </Box>
            <Box component={NavLink} to="/search?collection=luxury" sx={{ ...homePageStyles.sectionCta, textDecoration: 'none' }}>
              View All
            </Box>
          </Box>
          <Box sx={homePageStyles.luxuryGrid}>
            {luxurySafaris.map(({ id, name, duration, price, image, tag }) => (
              <Box key={id} sx={homePageStyles.safariCard}>
                <Box sx={{ ...homePageStyles.safariMedia, height: { xs: 220, md: 240 } }}>
                  <Box component="img" src={image} alt={name} sx={homePageStyles.safariImage} />
                  <Box sx={homePageStyles.safariGradientOverlay} />
                  <Box sx={{ ...homePageStyles.safariBadge, backgroundImage: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }}>
                    {tag}
                  </Box>
                  <Box sx={{ ...homePageStyles.safariContent, bottom: 24 }}>
                    <Typography sx={{ ...homePageStyles.safariName, mb: 0.5 }}>{name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
                      <Typography sx={{ ...homePageStyles.safariMeta, color: 'rgba(255,255,255,0.85)' }}>{duration}</Typography>
                      <Typography sx={homePageStyles.safariPriceTag}>{price}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box id="midrange-safaris">
          <Box sx={homePageStyles.sectionHeader}>
            <Box sx={homePageStyles.sectionTitleWrap}>
              <Box sx={{ ...homePageStyles.sectionIcon, backgroundColor: 'rgba(74, 222, 128, 0.18)', color: '#15803d' }}>
                <BalanceOutlinedIcon fontSize="small" />
              </Box>
              <Typography component="h2" sx={homePageStyles.sectionTitle}>
                Mid-Range Adventures
              </Typography>
            </Box>
            <Box
              component={NavLink}
              to="/search?collection=mid-range"
              sx={{ ...homePageStyles.sectionCta, textDecoration: 'none' }}
            >
              View All
            </Box>
          </Box>
          <Box sx={homePageStyles.destinationsGrid}>
            {midRangeSafaris.map(({ id, name, duration, price, image, tag }) => (
              <Box key={id} sx={homePageStyles.safariCard}>
                <Box sx={{ ...homePageStyles.safariMedia, height: { xs: 200, md: 210 } }}>
                  <Box component="img" src={image} alt={name} sx={homePageStyles.safariImage} />
                  <Box sx={homePageStyles.safariGradientOverlay} />
                  <Box sx={{ ...homePageStyles.safariBadge, backgroundImage: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                    {tag}
                  </Box>
                  <Box sx={{ ...homePageStyles.safariContent, bottom: 22 }}>
                    <Typography sx={homePageStyles.safariName}>{name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                      <Typography sx={{ ...homePageStyles.safariMeta, color: 'rgba(255,255,255,0.85)' }}>{duration}</Typography>
                      <Typography sx={{ ...homePageStyles.safariPriceTag, fontSize: 16 }}>{price}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* <Box component="section">
        <Typography variant="h5" mb={2} fontFamily="Playfair Display, serif">
          Popular departures
        </Typography>
        {tours.length === 0 && !isLoading ? (
          <EmptyState title="No tours" description="Adjust filters to discover more itineraries." />
        ) : (
          <DenseListingGrid tours={tours} />
        )}
      </Box> */}
      {/* <MapSection /> */}
      {/* <Box component="section">
        <Typography variant="h5" mb={2} fontFamily="Playfair Display, serif">
          Frequently asked questions
        </Typography>
        <FAQAccordion />
      </Box> */}
      <WhatsAppSticky />
    </Stack>
  );
};

export default HomePage;
