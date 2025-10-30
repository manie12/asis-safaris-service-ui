import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DSButton } from '@/design-system/components/DSButton';
import { DSTextField } from '@/design-system/components/DSTextField';
import { useAuth } from '@/hooks/useAuth';
import { colorTokens, radiusTokens, spacingTokens } from '@/design-system/theme/tokens';

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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colorTokens.safari[50]} 0%, ${colorTokens.earth[50]} 100%)`,
        py: spacingTokens.xl,
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 520,
          width: '100%',
          p: { xs: spacingTokens.lg, sm: spacingTokens.xl },
          borderRadius: radiusTokens.md,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 60px rgba(115, 38, 28, 0.15)',
        }}
      >
        <Stack spacing={spacingTokens.lg} component="form" onSubmit={handleSubmit}>
          {/* Header */}
          <Stack spacing={1} alignItems="center">
            <Typography
              variant="h3"
              fontFamily="Playfair Display, serif"
              fontWeight={700}
              color={colorTokens.safari[800]}
              textAlign="center"
            >
              Create Your Profile
            </Typography>
            <Typography variant="body1" color={colorTokens.neutral[500]} textAlign="center">
              Begin your unforgettable safari journey
            </Typography>
          </Stack>

          {/* Error Alert */}
          {isError ? (
            <Alert severity="error" sx={{ borderRadius: radiusTokens.sm }}>
              Unable to create your account. Please try again or contact support.
            </Alert>
          ) : null}

          {/* OAuth Buttons */}
          <Stack spacing={2}>
            <OAuthButtons />
          </Stack>

          {/* Divider */}
          <Divider>
            <Typography variant="body2" color={colorTokens.neutral[500]}>
              Or register with email
            </Typography>
          </Divider>

          {/* Form Fields */}
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <DSTextField
                label="First Name"
                value={form.firstName}
                onChange={updateField('firstName')}
                required
                autoComplete="given-name"
                placeholder="John"
              />
              <DSTextField
                label="Last Name"
                value={form.lastName}
                onChange={updateField('lastName')}
                required
                autoComplete="family-name"
                placeholder="Doe"
              />
            </Stack>
            <DSTextField
              label="Email Address"
              type="email"
              value={form.email}
              onChange={updateField('email')}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
            <DSTextField
              label="Password"
              type="password"
              value={form.password}
              onChange={updateField('password')}
              required
              autoComplete="new-password"
              placeholder="Create a strong password"
              helperText="Password must be at least 8 characters"
            />
          </Stack>

          {/* Submit Button */}
          <DSButton type="submit" size="large" disabled={isPending} fullWidth>
            {isPending ? 'Creating Account…' : 'Create Account'}
          </DSButton>

          {/* Terms and Privacy */}
          <Typography variant="caption" color={colorTokens.neutral[500]} textAlign="center" sx={{ px: 2 }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </Typography>

          {/* Sign In Link */}
          <Box sx={{ textAlign: 'center', mt: spacingTokens.md }}>
            <Typography variant="body2" color={colorTokens.neutral[500]}>
              Already have an account?{' '}
              <Link
                to="/auth/login"
                style={{
                  color: colorTokens.safari[600],
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
