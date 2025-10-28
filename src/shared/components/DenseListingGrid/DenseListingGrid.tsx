import Grid from '@mui/material/Grid';

import type { TourSummary } from '@/app/api/types';

import TourCard from './TourCard';

interface DenseListingGridProps {
  tours: TourSummary[];
}

const DenseListingGrid = ({ tours }: DenseListingGridProps) => (
  <Grid container spacing={3}>
    {tours.map((tour) => (
      <Grid key={tour.id} item xs={12} sm={6} md={3}>
        <TourCard
          id={tour.id}
          title={tour.title}
          image={tour.heroImage}
          priceFrom={tour.priceFrom}
          durationDays={tour.durationDays}
          currency={tour.currency}
        />
      </Grid>
    ))}
  </Grid>
);

export default DenseListingGrid;
