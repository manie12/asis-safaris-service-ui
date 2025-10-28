import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EmptyState from '@/shared/components/EmptyState';

import { useDocs } from '../api/useDocs';

const DocumentCenter = () => {
  const { data = [], isLoading } = useDocs();

  if (!data.length && !isLoading) {
    return <EmptyState title="No documents" description="Upload passports and visas during checkout." />;
  }

  return (
    <Stack spacing={2}>
      {data.map((doc) => (
        <Paper key={doc.id} variant="outlined" sx={{ p: 3 }}>
          <Typography variant="body1" fontWeight={600}>
            {doc.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
          </Typography>
        </Paper>
      ))}
    </Stack>
  );
};

export default DocumentCenter;
