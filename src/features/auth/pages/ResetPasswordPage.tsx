import { useState } from 'react';
import type { FormEvent } from 'react';

import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DSButton } from '@/design-system/components/DSButton';
import { DSTextField } from '@/design-system/components/DSTextField';

import { useResetPassword } from '../api/useResetPassword';

const ResetPasswordPage = () => {
  const { mutateAsync, isPending, isSuccess, isError } = useResetPassword();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateAsync({ email });
  };

  return (
    <Paper elevation={4} sx={{ p: 5 }}>
      <Stack spacing={3} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" fontFamily="Playfair Display, serif">
          Reset your password
        </Typography>
        {isSuccess ? (
          <Alert severity="success">We sent you reset instructions.</Alert>
        ) : null}
        {isError ? (
          <Alert severity="error">We could not send the reset email.</Alert>
        ) : null}
        <DSTextField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <DSButton type="submit" size="large" disabled={isPending}>
          {isPending ? 'Sending…' : 'Send reset link'}
        </DSButton>
      </Stack>
    </Paper>
  );
};

export default ResetPasswordPage;
