import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import AccountLayout from '@/layouts/AccountLayout';
import RootLayout from '@/layouts/RootLayout';
import EmptyState from '@/shared/components/EmptyState';

import { AuthGuard, RoleGuard } from './guards';
import type { Role } from '../store/useAppStore';
import PreferencesPage from '@/features/bookings/pages/Preferences';

const HomePage = lazy(() => import('@/features/catalog/pages/HomePage'));
const SearchPage = lazy(() => import('@/features/catalog/pages/SearchPage'));
const TourDetailsPage = lazy(() => import('@/features/catalog/pages/TourDetailsPage'));

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage'));

const CheckoutPage = lazy(() => import('@/features/checkout/pages/CheckoutPage'));
const ConfirmationPage = lazy(() => import('@/features/bookings/pages/ConfirmationPage'));
const MyTripsPage = lazy(() => import('@/features/bookings/pages/MyTripsPage'));
const DestinationsPage = lazy(() => import('@/features/bookings/pages/Destinations'));
const DatesGroupPage = lazy(() => import('@/features/bookings/pages/DatesGroup'));
const RecommendationsPage = lazy(() => import('@/features/bookings/pages/Recommendations'));

const InboxPage = lazy(() => import('@/features/inbox/pages/InboxPage'));
const AccountPage = lazy(() => import('@/features/customers/pages/AccountPage'));

const OpsDashboardPage = lazy(() => import('@/features/admin/pages/OpsDashboardPage'));

const AdminGuard = ({ roles, children }: { roles: Role[]; children: ReactNode }) => (
  <AuthGuard>
    <RoleGuard roles={roles}>{children}</RoleGuard>
  </AuthGuard>
);

const SuspenseRoute = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<EmptyState title="Loading" description="Fetching latest data..." />}>
    {children}
  </Suspense>
);

const AuthLayout = () => (
  <div style={{ maxWidth: 420, margin: '64px auto' }}>
    <SuspenseRoute>
      <Outlet />
    </SuspenseRoute>
  </div>
);

export const AppRouter = () =>
  useRoutes([
    {
      path: '/',
      element: (
        <RootLayout>
          <SuspenseRoute>
            <Outlet />
          </SuspenseRoute>
        </RootLayout>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: 'search', element: <SearchPage /> },
        { path: 'tours/:tourId', element: <TourDetailsPage /> },

        {
          path: 'bookings',
          children: [
            { index: true, element: <Navigate to="my-trips" replace /> },
            {
              path: 'confirmation',
              element: (
                <AuthGuard>
                  <ConfirmationPage />
                </AuthGuard>
              ),
            },
            {
              path: 'checkout',
              element: (
                // <AuthGuard>
                <CheckoutPage />
                // </AuthGuard>
              ),
            },
            {
              path: 'my-trips',
              element: (
                // <AuthGuard>
                <MyTripsPage />
                // </AuthGuard>
              ),
              children: [
                { index: true, element: <></> },
                {
                  path: 'preferences',
                  element: (
                    // <AuthGuard>
                    <PreferencesPage />
                    // </AuthGuard>
                  ),
                },
                {
                  path: 'destinations',
                  element: (
                    // <AuthGuard>
                    <DestinationsPage />
                    // </AuthGuard>
                  ),
                },
                {
                  path: 'dates-and-group',
                  element: (
                    // <AuthGuard>
                    <DatesGroupPage />
                    // </AuthGuard>
                  ),
                },
                {
                  path: 'recommendations',
                  element: (
                    // <AuthGuard>
                    <RecommendationsPage />
                    // </AuthGuard>
                  ),
                },
              ]
            },
          ],
        },
        {
          path: 'inbox',
          element: (
            <AuthGuard>
              <InboxPage />
            </AuthGuard>
          ),
        },
        {
          path: 'account',
          element: (
            // <AuthGuard>
            <AccountLayout>
              <AccountPage />
            </AccountLayout>
            // </AuthGuard>
          ),
        },
        {
          path: 'admin',
          element: (
            <AdminGuard roles={['admin', 'staff']}>
              <AdminLayout>
                <OpsDashboardPage />
              </AdminLayout>
            </AdminGuard>
          ),
        },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'reset-password', element: <ResetPasswordPage /> },
      ],
    },
  ]);
