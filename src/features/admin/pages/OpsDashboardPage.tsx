import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AvailabilityPushPanel from '../components/AvailabilityPushPanel';
import OtaMappingsTable from '../components/OtaMappingsTable';

const OpsDashboardPage = () => (
  <Stack spacing={4}>
    <Typography variant="h4" fontFamily="Playfair Display, serif">
      Operations overview
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <AvailabilityPushPanel />
      </Grid>
      <Grid item xs={12} md={8}>
        <OtaMappingsTable />
      </Grid>
    </Grid>
  </Stack>
);

export default OpsDashboardPage;
