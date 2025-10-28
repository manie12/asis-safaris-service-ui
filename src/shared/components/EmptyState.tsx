import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <Box
    sx={{
      border: '1px dashed rgba(71,42,40,0.3)',
      borderRadius: 4,
      p: 6,
      textAlign: 'center',
      color: 'text.secondary',
    }}
  >
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    {description ? <Typography variant="body2">{description}</Typography> : null}
    {action ? <Box mt={3}>{action}</Box> : null}
  </Box>
);

export default EmptyState;
