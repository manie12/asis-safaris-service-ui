import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MapSection = () => (
  <Box
    sx={{
      borderRadius: 4,
      background: '#1c1210',
      color: '#fdfaf8',
      p: 4,
      minHeight: 320,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography variant="h5" fontFamily="Playfair Display, serif" gutterBottom>
      Safari hotspots
    </Typography>
    <Typography variant="body2" maxWidth={420} textAlign="center">
      Interactive map placeholder. Integrate Mapbox or Google Maps to overlay parks, reserves and
      lodges with real-time availability.
    </Typography>
  </Box>
);

export default MapSection;
