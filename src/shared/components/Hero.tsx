import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { DSButton } from '@/design-system/components/DSButton';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(135deg, rgba(71,42,40,0.9), rgba(248,175,60,0.6))',
        borderRadius: 4,
        color: '#fff',
        p: { xs: 4, md: 8 },
        minHeight: { xs: 280, md: 360 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={3} maxWidth={480}>
        <Typography variant="h2" fontFamily="Playfair Display, serif">
          {t('hero.headline')}
        </Typography>
        <Typography variant="body1">{t('hero.subheadline')}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <DSButton size="large">Plan a trip</DSButton>
          <DSButton size="large" variant="outlined" color="secondary">
            View itineraries
          </DSButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Hero;
