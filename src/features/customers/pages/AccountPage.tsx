import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DocumentCenter from '../components/DocumentCenter';
import ProfileForm from '../components/ProfileForm';
import ResidencyBadge from '../components/ResidencyBadge';
import { useProfile } from '../api/useProfile';

const AccountPage = () => {
  const { data } = useProfile();

  return (
    <Stack spacing={4}>
      <Typography variant="h4" fontFamily="Playfair Display, serif">
        My profile
      </Typography>
      {data ? <ResidencyBadge countryCode={data.residency} /> : null}
      <ProfileForm />
      <Typography id="documents" variant="h6">
        Document center
      </Typography>
      <DocumentCenter />
    </Stack>
  );
};

export default AccountPage;
