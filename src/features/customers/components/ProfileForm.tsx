import { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DSButton } from '@/design-system/components/DSButton';
import { DSTextField } from '@/design-system/components/DSTextField';

import { useProfile } from '../api/useProfile';

const ProfileForm = () => {
  const { data, isLoading, isError } = useProfile();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (data) {
      setForm({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data]);

  if (isError) {
    return <Alert severity="error">We could not load your profile.</Alert>;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Traveler profile</Typography>
      <DSTextField label="First name" value={form.firstName} onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))} disabled={isLoading} />
      <DSTextField label="Last name" value={form.lastName} onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))} disabled={isLoading} />
      <DSTextField label="Email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} disabled />
      <DSTextField label="Phone" value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} disabled={isLoading} />
      <DSButton disabled>Save changes</DSButton>
    </Stack>
  );
};

export default ProfileForm;
