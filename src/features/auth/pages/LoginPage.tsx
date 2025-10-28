import { useState } from 'react';
import type { FormEvent } from 'react';

import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/hooks/useAuth';
import { DSButton } from '@/design-system/components/DSButton';
import { DSTextField } from '@/design-system/components/DSTextField';

import { useLogin } from '../api/useLogin';

const LoginPage = () => {
  const { login } = useAuth();
  const { mutateAsync, isPending, isError } = useLogin();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await mutateAsync(credentials);
    login(result.token, result.user);
  };

  return (
    <Paper elevation={4} sx={{ p: 5 }}>
      <Stack spacing={3} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" fontFamily="Playfair Display, serif">
          Welcome back
        </Typography>
        {isError ? <Alert severity="error">Invalid credentials</Alert> : null}
        <DSTextField
          label="Email"
          type="email"
          value={credentials.email}
          onChange={(event) => setCredentials((prev) => ({ ...prev, email: event.target.value }))}
        />
        <DSTextField
          label="Password"
          type="password"
          value={credentials.password}
          onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
        />
        <DSButton type="submit" size="large" disabled={isPending}>
          {isPending ? 'Signing in…' : 'Sign in'}
        </DSButton>
      </Stack>
    </Paper>
  );
};

export default LoginPage;
