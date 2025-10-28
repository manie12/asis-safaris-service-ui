import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppSticky = () => (
  <Box
    sx={{
      position: 'fixed',
      bottom: 32,
      right: 32,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      background: '#25D366',
      color: '#fff',
      px: 2.5,
      py: 1.5,
      borderRadius: 999,
      boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
    }}
  >
    <WhatsAppIcon />
    <Typography variant="body2" fontWeight={600}>
      Chat via WhatsApp
    </Typography>
  </Box>
);

export default WhatsAppSticky;
