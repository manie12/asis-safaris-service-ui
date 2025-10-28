import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import BookingTimeline from '../components/BookingTimeline';
import ItineraryPdfButton from '../components/ItineraryPdfButton';

const ConfirmationPage = () => (
  <Paper sx={{ p: 5 }}>
    <Stack spacing={3} alignItems="flex-start">
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 48 }} />
      <Typography variant="h4" fontFamily="Playfair Display, serif">
        Karibu! Your safari is confirmed.
      </Typography>
      <Typography variant="body1" color="text.secondary">
        We emailed your confirmation. A dedicated travel designer will share next steps in 24 hours.
      </Typography>
      <BookingTimeline
        stages={[
          { label: 'Deposit received', completed: true },
          { label: 'Traveler documents verified', completed: true },
          { label: 'Guide briefing scheduled', completed: false },
        ]}
      />
      <ItineraryPdfButton bookingId="pending" />
    </Stack>
  </Paper>
);

export default ConfirmationPage;
