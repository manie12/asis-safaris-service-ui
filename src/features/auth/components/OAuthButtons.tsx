import Stack from '@mui/material/Stack';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

import { DSButton } from '@/design-system/components/DSButton';

const OAuthButtons = () => (
  <Stack spacing={2}>
    <DSButton startIcon={<GoogleIcon />} tone="outline" size="large" fullWidth>
      Continue with Google
    </DSButton>
    <DSButton startIcon={<AppleIcon />} tone="outline" size="large" fullWidth>
      Continue with Apple
    </DSButton>
  </Stack>
);

export default OAuthButtons;
