import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { DSButton } from '@/design-system/components/DSButton';
import { DSTextField } from '@/design-system/components/DSTextField';
import { colorTokens, radiusTokens, spacingTokens } from '@/design-system/theme/tokens';

import { useResetPassword } from '../api/useResetPassword';

const ResetPasswordPage = () => {
  const { mutateAsync, isPending, isSuccess, isError } = useResetPassword();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateAsync({ email });
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
        {isSuccess ? (
          // Success State
          <Stack spacing={spacingTokens.lg} alignItems="center">
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colorTokens.accent.emerald}15, ${colorTokens.accent.emerald}30)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 48,
                  color: colorTokens.accent.emerald,
                }}
              />
            </Box>
            <Stack spacing={1} alignItems="center">
              <Typography
                variant="h4"
                fontFamily="Playfair Display, serif"
                fontWeight={700}
                color={colorTokens.safari[800]}
                textAlign="center"
              >
                Check Your Email
              </Typography>
              <Typography variant="body1" color={colorTokens.neutral[500]} textAlign="center" sx={{ px: 2 }}>
                We've sent password reset instructions to
              </Typography>
              <Typography variant="body1" fontWeight={600} color={colorTokens.safari[700]} textAlign="center">
                {email}
              </Typography>
            </Stack>
            <Alert severity="info" sx={{ borderRadius: radiusTokens.sm, width: '100%' }}>
              Please check your spam folder if you don't see the email in your inbox.
            </Alert>
            <DSButton
              component={Link}
              to="/auth/login"
              size="large"
              fullWidth
              startIcon={<ArrowBackIcon />}
              tone="outline"
            >
              Back to Sign In
            </DSButton>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color={colorTokens.neutral[500]}>
                Didn't receive the email?{' '}
                <Box
                  component="button"
                  type="button"
                  onClick={() => mutateAsync({ email })}
                  disabled={isPending}
                  sx={{
                    background: 'none',
                    border: 'none',
                    color: colorTokens.safari[600],
                    cursor: 'pointer',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                    '&:disabled': {
                      opacity: 0.5,
                      cursor: 'not-allowed',
                    },
                  }}
                >
                  Resend
                </Box>
              </Typography>
            </Box>
          </Stack>
        ) : (
          // Form State
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
                Reset Password
              </Typography>
              <Typography variant="body1" color={colorTokens.neutral[500]} textAlign="center" sx={{ px: 2 }}>
                Enter your email address and we'll send you instructions to reset your password
              </Typography>
            </Stack>

            {/* Error Alert */}
            {isError ? (
              <Alert severity="error" sx={{ borderRadius: radiusTokens.sm }}>
                Unable to send reset email. Please verify your email address or contact support.
              </Alert>
            ) : null}

            {/* Form Field */}
            <DSTextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />

            {/* Submit Button */}
            <DSButton type="submit" size="large" disabled={isPending} fullWidth>
              {isPending ? 'Sending…' : 'Send Reset Link'}
            </DSButton>

            {/* Back to Login Link */}
            <Box sx={{ textAlign: 'center', mt: spacingTokens.md }}>
              <Link
                to="/auth/login"
                style={{
                  color: colorTokens.safari[600],
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                Back to Sign In
              </Link>
            </Box>
          </Stack>
        )}
      </Paper>
    </Box>
  );
};

export default ResetPasswordPage;
