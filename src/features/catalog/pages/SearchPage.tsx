import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DenseListingGrid from '@/shared/components/DenseListingGrid/DenseListingGrid';
import FiltersBar from '@/shared/components/FiltersBar';
import EmptyState from '@/shared/components/EmptyState';

const SearchPage = () => {
  return (
    <Stack spacing={4}>
      <Typography variant="h4" fontFamily="Playfair Display, serif">
        Search safaris
      </Typography>
      <FiltersBar />
      <EmptyState
        title="Refine your filters"
        description="Choose regions, travel styles or conservation priorities to refresh recommendations."
        action={<DenseListingGrid tours={[]} />}
      />
    </Stack>
  );
};

export default SearchPage;
