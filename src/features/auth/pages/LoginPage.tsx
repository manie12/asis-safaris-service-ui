import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/hooks/useAuth';
import { DSButton } from '@/design-system/components/DSButton';
import { DSTextField } from '@/design-system/components/DSTextField';
import { colorTokens, radiusTokens, spacingTokens } from '@/design-system/theme/tokens';

import { useLogin } from '../api/useLogin';
import OAuthButtons from '../components/OAuthButtons';

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
          maxWidth: 480,
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
              Welcome Back
            </Typography>
            <Typography variant="body1" color={colorTokens.neutral[500]} textAlign="center">
              Sign in to continue your safari adventure
            </Typography>
          </Stack>

          {/* Error Alert */}
          {isError ? (
            <Alert severity="error" sx={{ borderRadius: radiusTokens.sm }}>
              Invalid email or password. Please try again.
            </Alert>
          ) : null}

          {/* Form Fields */}
          <Stack spacing={2}>
            <DSTextField
              label="Email Address"
              type="email"
              value={credentials.email}
              onChange={(event) => setCredentials((prev) => ({ ...prev, email: event.target.value }))}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
            <DSTextField
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </Stack>

          {/* Forgot Password Link */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              to="/auth/reset-password"
              style={{
                color: colorTokens.safari[600],
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Forgot password?
            </Link>
          </Box>

          {/* Submit Button */}
          <DSButton type="submit" size="large" disabled={isPending} fullWidth>
            {isPending ? 'Signing in…' : 'Sign In'}
          </DSButton>

          {/* Divider */}
          <Divider sx={{ my: spacingTokens.md }}>
            <Typography variant="body2" color={colorTokens.neutral[500]}>
              Or continue with
            </Typography>
          </Divider>

          {/* OAuth Buttons */}
          <OAuthButtons />

          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center', mt: spacingTokens.md }}>
            <Typography variant="body2" color={colorTokens.neutral[500]}>
              Don't have an account?{' '}
              <Link
                to="/auth/register"
                style={{
                  color: colorTokens.safari[600],
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Create account
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginPage;
