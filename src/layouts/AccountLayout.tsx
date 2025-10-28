import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

interface AccountLayoutProps {
  children: ReactNode;
}

const navLinks = [
  { label: 'Profile', to: '/account' },
  { label: 'Documents', to: '/account#documents' },
  { label: 'Preferences', to: '/account#preferences' },
];

const AccountLayout = ({ children }: AccountLayoutProps) => (
  <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '280px 1fr' }} gap={4}>
    <Paper variant="outlined">
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.to} disablePadding>
            <NavLink
              to={link.to}
              style={({ isActive }) => ({
                width: '100%',
                padding: '12px 16px',
                display: 'block',
                fontWeight: isActive ? 600 : 500,
              })}
            >
              <ListItemText primary={link.label} />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Paper>
    <Paper variant="outlined" sx={{ p: 4 }}>
      {children}
      <Divider sx={{ mt: 4 }} />
    </Paper>
  </Box>
);

export default AccountLayout;
