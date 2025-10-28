import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DSButton } from '@/design-system/components/DSButton';
import { trackEvent } from '@/utils/analytics';

const AvailabilityPushPanel = () => (
  <Paper variant="outlined" sx={{ p: 3 }}>
    <Stack spacing={2}>
      <Typography variant="h6">Push availability</Typography>
      <Typography variant="body2" color="text.secondary">
        Sync the latest inventory updates to connected OTAs and the in-house booking engine.
      </Typography>
      <DSButton
        onClick={() => trackEvent({ name: 'availability_push', payload: { triggeredBy: 'ops_dashboard' } })}
      >
        Push now
      </DSButton>
    </Stack>
  </Paper>
);

export default AvailabilityPushPanel;
