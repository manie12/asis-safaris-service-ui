import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DSButton } from '@/design-system/components/DSButton';
import { DSTextField } from '@/design-system/components/DSTextField';
import { useAuth } from '@/hooks/useAuth';

import OAuthButtons from '../components/OAuthButtons';
import { useRegister } from '../api/useRegister';

const RegisterPage = () => {
  const { login } = useAuth();
  const { mutateAsync, isPending, isError } = useRegister();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await mutateAsync({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    login(result.token, result.user);
  };

  const updateField = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <Paper elevation={4} sx={{ p: 5 }}>
      <Stack spacing={3} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" fontFamily="Playfair Display, serif">
          Create your traveler profile
        </Typography>
        {isError ? <Alert severity="error">We could not create your account. Try again.</Alert> : null}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <DSTextField label="First name" value={form.firstName} onChange={updateField('firstName')} />
          <DSTextField label="Last name" value={form.lastName} onChange={updateField('lastName')} />
        </Stack>
        <DSTextField label="Email" type="email" value={form.email} onChange={updateField('email')} />
        <DSTextField
          label="Password"
          type="password"
          value={form.password}
          onChange={updateField('password')}
        />
        <DSButton type="submit" size="large" disabled={isPending}>
          {isPending ? 'Creating…' : 'Create account'}
        </DSButton>
        <OAuthButtons />
      </Stack>
    </Paper>
  );
};

export default RegisterPage;
