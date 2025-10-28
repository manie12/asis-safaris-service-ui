import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DSButton } from '@/design-system/components/DSButton';
import EmptyState from '@/shared/components/EmptyState';

import AvailabilityCalendar from '../components/AvailabilityCalendar';
import ItineraryTabs from '../components/ItineraryTabs';
import NearbyAccommodations from '../components/NearbyAccommodations';
import TourGallery from '../components/TourGallery';
import { useAvailability } from '../api/useAvailability';
import { useTour } from '../api/useTour';

const TourDetailsPage = () => {
  const { tourId = '' } = useParams();
  const { data: tour, isLoading } = useTour(tourId);
  const { data: availability } = useAvailability(tourId);

  const slots = availability?.slots ?? [];

  const gallery = useMemo(() => tour?.gallery ?? [], [tour]);

  if (isLoading) {
    return <EmptyState title="Loading" description="Preparing your itinerary." />;
  }

  if (!tour) {
    return <EmptyState title="Tour not found" description="Try exploring the catalog again." />;
  }

  return (
    <Stack spacing={6}>
      <TourGallery images={gallery} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 4 }}>
            <Typography variant="h3" fontFamily="Playfair Display, serif" gutterBottom>
              {tour.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              {tour.description}
            </Typography>
            <ItineraryTabs itinerary={tour.itinerary} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" fontFamily="Playfair Display, serif" gutterBottom>
                Availability
              </Typography>
              <AvailabilityCalendar slots={slots} />
              <DSButton fullWidth size="large" sx={{ mt: 2 }}>
                Reserve dates
              </DSButton>
            </Paper>
            <NearbyAccommodations />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TourDetailsPage;
