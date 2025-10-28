import Stack from '@mui/material/Stack';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

import { DSButton } from '@/design-system/components/DSButton';

const OAuthButtons = () => (
  <Stack spacing={2} mt={2}>
    <DSButton startIcon={<GoogleIcon />} variant="outlined">
      Continue with Google
    </DSButton>
    <DSButton startIcon={<AppleIcon />} variant="outlined">
      Continue with Apple
    </DSButton>
  </Stack>
);

export default OAuthButtons;
