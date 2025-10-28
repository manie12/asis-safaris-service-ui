import { useState, type ElementType, type MouseEvent, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CardTravelRoundedIcon from '@mui/icons-material/CardTravelRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useTranslation } from 'react-i18next';
import { topBarStyles } from '@/design-system/theme/topBarStyles';
import { rootSidebarStyles } from '@/design-system/theme/rootSidebarStyles';
import { colorTokens } from '@/design-system/theme/tokens';
import { BorderAll } from '@mui/icons-material';

interface RootLayoutProps {
  children: ReactNode;
}

type NavItem =
  | { type: 'locale' }
  | { type: 'currency' }
  | { type: 'action'; label: string; to?: string; translationKey?: string }
  | { type: 'saved'; translationKey?: string }
  | { type: 'nav'; labelKey: string; to: string }
  | { type: 'cta' }
  | { type: 'avatar' };

const eastAfricanLocales = [
  { code: 'KE', name: 'Kenya', icon: '/icons/flags/ke.svg' },
  { code: 'TZ', name: 'Tanzania', icon: '/icons/flags/tz.svg' },
  { code: 'UG', name: 'Uganda', icon: '/icons/flags/ug.svg' },
] as const;

type SidebarNavItem = {
  label: string;
  description: string;
  to: string;
  icon: ElementType;
};

const sidebarNavigation: SidebarNavItem[] = [
  { label: 'Home', description: 'Recommend & Preference', to: '/', icon: PersonRoundedIcon },
  { label: 'My Trips', description: 'Upcoming & past bookings', to: '/bookings/my-trips', icon: CardTravelRoundedIcon },
  { label: 'Saved Safaris', description: 'Your wishlist & tripboards', to: '/account#saved', icon: FavoriteRoundedIcon },
  { label: 'Preferences', description: 'Travel & notification settings', to: '/account#preferences', icon: TuneRoundedIcon },
];

const mobileLayoutStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(150deg, #faf5ef 0%, #fef7ee 45%, #f5f3f0 100%)',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottom: '1px solid rgba(210,195,176,0.55)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 12px 24px rgba(61,48,36,0.08)',
  },
  brandWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
  },
  brandIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundImage: `linear-gradient(135deg, ${colorTokens.safari[500]} 0%, ${colorTokens.safari[600]} 100%)`,
    color: colorTokens.neutral.white,
    boxShadow: '0 12px 24px rgba(238,92,40,0.22)',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  actionButton: {
    width: 36,
    height: 36,
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    overflow: 'hidden',
    border: `2px solid ${colorTokens.safari[200]}`,
    boxShadow: '0 8px 16px rgba(61,48,36,0.12)',
  },
  mainContent: {
    flex: 1,
    padding: '24px 16px 96px',
  },
  bottomNav: {
    position: 'sticky',
    bottom: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '10px 16px',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTop: '1px solid rgba(210,195,176,0.55)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 -12px 24px rgba(61,48,36,0.08)',
  },
  bottomNavButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    fontSize: 11,
    textDecoration: 'none',
  },
} as const;

const mobileNavItems = [
  { id: 'home', label: 'Home', to: '/', icon: HomeRoundedIcon },
  { id: 'explore', label: 'Explore', to: '/search', icon: SearchRoundedIcon },
  { id: 'saved', label: 'Saved', to: '/account#saved', icon: FavoriteRoundedIcon },
  { id: 'trips', label: 'Trips', to: '/bookings/my-trips', icon: CardTravelRoundedIcon },
  { id: 'profile', label: 'Profile', to: '/account', icon: PersonRoundedIcon },
] as const;

const currencyOptions = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'KES', name: 'Kenyan Shilling' },
  { code: 'TZS', name: 'Tanzanian Shilling' },
] as const;

const navItems: NavItem[] = [
  { type: 'locale' },
  { type: 'currency' },
  { type: 'action', label: 'Help' },
  { type: 'action', label: 'My Trips', to: '/bookings/my-trips' },
  { type: 'saved' },
  { type: 'nav', labelKey: 'nav.home', to: '/' },
  { type: 'nav', labelKey: 'nav.search', to: '/search' },
  { type: 'nav', labelKey: 'nav.bookings', to: '/bookings/my-trips' },
  { type: 'nav', labelKey: 'nav.inbox', to: '/inbox' },
  { type: 'nav', labelKey: 'nav.account', to: '/account' },
  { type: 'cta' },
  { type: 'avatar' },
];

const RootLayout = ({ children }: RootLayoutProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const [activeLocale, setActiveLocale] = useState<(typeof eastAfricanLocales)[number]>(eastAfricanLocales[0]);
  const [localeMenuAnchor, setLocaleMenuAnchor] = useState<null | HTMLElement>(null);
  const [activeCurrency, setActiveCurrency] = useState<(typeof currencyOptions)[number]>(currencyOptions[0]);
  const [currencyMenuAnchor, setCurrencyMenuAnchor] = useState<null | HTMLElement>(null);

  const isLocaleMenuOpen = Boolean(localeMenuAnchor);
  const isCurrencyMenuOpen = Boolean(currencyMenuAnchor);

  const handleLocaleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    setLocaleMenuAnchor(event.currentTarget);
  };

  const handleLocaleClose = () => {
    setLocaleMenuAnchor(null);
  };

  const handleLocaleSelect = (locale: (typeof eastAfricanLocales)[number]) => {
    setActiveLocale(locale);
    handleLocaleClose();
  };

  const handleCurrencyToggle = (event: MouseEvent<HTMLButtonElement>) => {
    setCurrencyMenuAnchor(event.currentTarget);
  };

  const handleCurrencyClose = () => {
    setCurrencyMenuAnchor(null);
  };

  const handleCurrencySelect = (currency: (typeof currencyOptions)[number]) => {
    setActiveCurrency(currency);
    handleCurrencyClose();
  };

  if (isMobile) {
    return (
      <Box sx={mobileLayoutStyles.container}>
        <Box component="header" sx={mobileLayoutStyles.header}>
          <Box component={Link} to="/" sx={mobileLayoutStyles.brandWrap}>
            {/* <Box sx={mobileLayoutStyles.brandIcon}>
              <TravelExploreRoundedIcon fontSize="small" />
            </Box> */}
            <Typography
              fontFamily="Playfair Display, serif"
              fontWeight={700}
              fontSize={18}
              sx={{
                backgroundImage: `linear-gradient(135deg, ${colorTokens.earth[800]} 0%, ${colorTokens.safari[700]} 100%)`,
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              ASIS
            </Typography>
          </Box>
          <Box sx={mobileLayoutStyles.headerActions}>
            <Box component="button" type="button" sx={mobileLayoutStyles.actionButton}>
              <SearchRoundedIcon sx={{ color: 'rgba(74,57,42,0.7)' }} />
            </Box>
            <Box component="button" type="button" sx={mobileLayoutStyles.actionButton}>
              <FavoriteRoundedIcon sx={{ color: colorTokens.safari[500] }} />
            </Box>
            <Box sx={mobileLayoutStyles.avatar}>
              <Box
                component="img"
                src="/avatars/default-traveler.svg"
                alt="Traveler avatar"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Box>
        </Box>

        <Box component="main" sx={mobileLayoutStyles.mainContent}>
          {children}
        </Box>

        <Box component="nav" sx={mobileLayoutStyles.bottomNav}>
          {mobileNavItems.map(({ id, label, to, icon: Icon }) => {
            const isActive =
              id === 'home'
                ? location.pathname === '/'
                : id === 'explore'
                  ? location.pathname.startsWith('/search')
                  : id === 'saved'
                    ? location.pathname === '/account' && location.hash.includes('saved')
                    : id === 'trips'
                      ? location.pathname.startsWith('/bookings')
                      : location.pathname === '/account' && !location.hash.includes('saved');

            return (
              <Box
                key={id}
                component={Link}
                to={to}
                sx={{
                  ...mobileLayoutStyles.bottomNavButton,
                  color: isActive ? colorTokens.safari[600] : 'rgba(74,57,42,0.55)',
                }}
              >
                <Icon sx={{ fontSize: 22 }} />
                <Typography fontSize={11} fontWeight={isActive ? 600 : 500}>
                  {label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      sx={{ background: 'linear-gradient(150deg, #faf5ef 0%, #fef7ee 35%, #f5f3f0 100%)' }}
    >
      <AppBar position="sticky" elevation={0} sx={topBarStyles.appBar}>
        <Toolbar sx={topBarStyles.toolbar}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box component="img" src="/icons/binoculars.svg" alt="Asis Safaris logo" sx={{ width: 40, height: 40 }} />
              <Typography variant="h5" fontFamily="Playfair Display, serif" fontWeight={700} sx={topBarStyles.logoText}>
                ASIS Safaris
              </Typography>
            </Stack>
          </Link>
          <Box flex={1} display="flex" justifyContent="center">
            <Paper component="form" elevation={0} sx={topBarStyles.searchPaper}>
              <Box component="img" src="/icons/magnifying-glass.svg" alt="Search" sx={topBarStyles.searchIcon} />
              <InputBase
                fullWidth
                placeholder="Search destinations, packages, or experiences"
                sx={topBarStyles.searchInput}
              />
            </Paper>
          </Box>
          <Stack direction="row" alignItems="center" sx={topBarStyles.navStack}>
            {navItems.map((item, index) => {
              switch (item.type) {
                case 'locale':
                  return (
                    <Box
                      key={`locale-${index}`}
                      component="button"
                      type="button"
                      id="locale-toggle-button"
                      onClick={handleLocaleToggle}
                      aria-haspopup="true"
                      aria-expanded={isLocaleMenuOpen ? 'true' : undefined}
                      aria-controls={isLocaleMenuOpen ? 'locale-menu' : undefined}
                      sx={topBarStyles.localeToggle}
                    >
                      <Box sx={topBarStyles.flagGroup}>
                        <Box
                          component="img"
                          src={activeLocale.icon}
                          alt={`${activeLocale.name} flag`}
                          sx={topBarStyles.flagIcon}
                        />
                        <Typography sx={topBarStyles.localeLabel}>{activeLocale.code}</Typography>
                      </Box>
                      <Box
                        component="img"
                        src="/icons/chevron-down.svg"
                        alt="Open locale selector"
                        sx={topBarStyles.chevronIcon}
                      />
                    </Box>
                  );
                case 'currency':
                  return (
                    <Box
                      key={`currency-${index}`}
                      component="button"
                      type="button"
                      id="currency-toggle-button"
                      onClick={handleCurrencyToggle}
                      aria-haspopup="true"
                      aria-expanded={isCurrencyMenuOpen ? 'true' : undefined}
                      aria-controls={isCurrencyMenuOpen ? 'currency-menu' : undefined}
                      sx={topBarStyles.currencyToggle}
                    >
                      <Typography sx={topBarStyles.currencyLabel}>{activeCurrency.code}</Typography>
                      <Box
                        component="img"
                        src="/icons/chevron-down.svg"
                        alt="Open currency selector"
                        sx={topBarStyles.chevronIcon}
                      />
                    </Box>
                  );
                case 'action': {
                  const label = item.translationKey ? t(item.translationKey) : item.label;
                  if (item.to) {
                    return (
                      <Box
                        key={`action-${label}`}
                        component={Link}
                        to={item.to}
                        sx={topBarStyles.quickLink}
                      >
                        {label}
                      </Box>
                    );
                  }
                  return (
                    <Box key={`action-${label}`} component="button" type="button" sx={topBarStyles.quickLink}>
                      {label}
                    </Box>
                  );
                }
                case 'saved':
                  return (
                    <Box key="saved" component="button" type="button" sx={topBarStyles.savedButton}>
                      <Box component="img" src="/icons/heart-outline.svg" alt="Saved itineraries" sx={topBarStyles.savedIcon} />
                      {item.translationKey ? t(item.translationKey) : 'Saved'}
                    </Box>
                  );
                // case 'nav':
                //   return (
                //     <NavLink key={item.to} to={item.to} style={({ isActive }) => topBarStyles.navLink(isActive)}>
                //       {t(item.labelKey)}
                //     </NavLink>
                //   );
                // case 'cta':
                //   return (
                //     <Link key="cta" to="/checkout" style={{ textDecoration: 'none' }}>
                //       <DSButton tone="brand" size="large">
                //         Book Now
                //       </DSButton>
                //     </Link>
                //   );
                case 'avatar':
                  return (
                    <Box key="avatar" sx={topBarStyles.avatarRing}>
                      <Box
                        component="img"
                        src="/avatars/default-traveler.svg"
                        alt="Traveler avatar"
                        sx={{ width: '100%', height: '100%' }}
                      />
                    </Box>
                  );
                default:
                  return null;
              }
            })}
          </Stack>
          <Menu
            id="locale-menu"
            anchorEl={localeMenuAnchor}
            open={isLocaleMenuOpen}
            onClose={handleLocaleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            MenuListProps={{ 'aria-labelledby': 'locale-toggle-button' }}
          >
            {eastAfricanLocales.map((locale) => (
              <MenuItem
                key={locale.code}
                selected={locale.code === activeLocale.code}
                onClick={() => handleLocaleSelect(locale)}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    component="img"
                    src={locale.icon}
                    alt={`${locale.name} flag`}
                    sx={topBarStyles.flagIcon}
                  />
                  <Typography variant="body2">{locale.name}</Typography>
                </Stack>
              </MenuItem>
            ))}
          </Menu>
          <Menu
            id="currency-menu"
            anchorEl={currencyMenuAnchor}
            open={isCurrencyMenuOpen}
            onClose={handleCurrencyClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            MenuListProps={{ 'aria-labelledby': 'currency-toggle-button' }}
          >
            {currencyOptions.map((currency) => (
              <MenuItem
                key={currency.code}
                selected={currency.code === activeCurrency.code}
                onClick={() => handleCurrencySelect(currency)}
              >
                <Typography variant="body2">
                  {currency.name} ({currency.code})
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, py: 6 }}>
        <Box sx={rootSidebarStyles.layout}>
          <Box component="aside" sx={rootSidebarStyles.aside}>
            <Box sx={rootSidebarStyles.panel}>
              <Box sx={rootSidebarStyles.header}>
                <Box sx={rootSidebarStyles.headerOverlay} />
                <Box sx={rootSidebarStyles.headerContent}>
                  <Box sx={rootSidebarStyles.avatar}>
                    <Box
                      component="img"
                      src="/avatars/default-traveler.svg"
                      alt="Sarah Wilson profile"
                      sx={rootSidebarStyles.avatarImage}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={rootSidebarStyles.userName}>
                      Sarah Wilson
                    </Typography>
                    <Typography variant="body2" sx={rootSidebarStyles.userEmail}>
                      sarah@email.com
                    </Typography>
                    <Box sx={rootSidebarStyles.badge}>Safari Explorer</Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={rootSidebarStyles.body}>
                <Box sx={rootSidebarStyles.creditsCard}>
                  <Box sx={rootSidebarStyles.creditsHeader}>
                    <Box sx={rootSidebarStyles.creditsTitleWrap}>
                      <Box sx={rootSidebarStyles.creditsIcon}>
                        <MonetizationOnRoundedIcon fontSize="small" />
                      </Box>
                      <Typography sx={rootSidebarStyles.creditsTitle}>Safari Credits</Typography>
                    </Box>
                    <InfoOutlinedIcon fontSize="small" sx={rootSidebarStyles.creditsHelp} />
                  </Box>
                  <Typography sx={rootSidebarStyles.creditsValue}>$450.00</Typography>
                  <Typography sx={rootSidebarStyles.creditsMeta}>Expires Dec 31, 2025</Typography>
                </Box>
                <Box component="nav" sx={rootSidebarStyles.nav}>
                  {sidebarNavigation.map(({ label, description, to, icon: Icon }) => (
                    <NavLink key={to} to={to} style={{ textDecoration: 'none' }}>
                      {({ isActive }) => (
                        <Box sx={rootSidebarStyles.navItem(isActive)}>
                          <Box sx={rootSidebarStyles.navContent}>
                            <Box sx={rootSidebarStyles.navIcon(isActive)}>
                              <Icon fontSize="small" />
                            </Box>
                            <Box sx={rootSidebarStyles.navTextGroup}>
                              <Typography sx={rootSidebarStyles.navTitle}>{label}</Typography>
                              <Typography sx={rootSidebarStyles.navSubtitle}>{description}</Typography>
                            </Box>
                          </Box>
                          <ChevronRightRoundedIcon
                            fontSize="small"
                            sx={{
                              ...rootSidebarStyles.navChevron,
                              ...(isActive && { color: colorTokens.safari[500] }),
                            }}
                          />
                        </Box>
                      )}
                    </NavLink>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={rootSidebarStyles.main}>{children}</Box>
        </Box>
      </Container>
      <Box component="footer" bgcolor="#2a1918" color="#fdfaf8" py={6} mt={6} sx={{ width: '100%' }}>
        <Container maxWidth={false} disableGutters sx={{ px: { xs: 3, md: 8 } }}>
          <Typography variant="h6" gutterBottom>
            Plan your next sunrise
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            Crafted itineraries, conservation-forward stays and local guides across East Africa.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default RootLayout;
