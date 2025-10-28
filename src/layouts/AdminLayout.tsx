import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => (
  <Paper elevation={0} sx={{ p: 4, backgroundColor: '#f8f4f2', borderRadius: 4 }}>
    <Typography variant="h4" mb={3} fontFamily="Playfair Display, serif">
      Operations Dashboard
    </Typography>
    <Box display="grid" gap={3}>
      {children}
    </Box>
  </Paper>
);

export default AdminLayout;
