import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { selectRoles, selectTenantCountry, selectUser } from '../store/selectors';
import { useAppStore, type Role } from '../store/useAppStore';

interface GuardProps {
  children: ReactNode;
}

interface AuthGuardProps extends GuardProps {
  redirectPath?: string;
}

export const AuthGuard = ({ children, redirectPath = '/auth/login' }: AuthGuardProps) => {
  const user = useAppStore(selectUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

interface TenantGuardProps extends GuardProps {
  allowedTenants: string[];
}

export const TenantGuard = ({ children, allowedTenants }: TenantGuardProps) => {
  const tenant = useAppStore(selectTenantCountry);

  if (allowedTenants.length > 0 && !allowedTenants.includes(tenant)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

interface RoleGuardProps extends GuardProps {
  roles: Role[];
}

export const RoleGuard = ({ children, roles }: RoleGuardProps) => {
  const userRoles = useAppStore(selectRoles);

  const hasRequiredRole = roles.length === 0 || roles.some((role) => userRoles.includes(role));

  if (!hasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
