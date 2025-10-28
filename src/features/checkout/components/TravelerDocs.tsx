import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DSUpload } from '@/design-system/components/DSUpload';

interface TravelerDocsProps {
  onUpload: (files: File[]) => void;
}

const TravelerDocs = ({ onUpload }: TravelerDocsProps) => (
  <Stack spacing={2}>
    <Typography variant="h6">Traveler documents</Typography>
    <DSUpload
      beforeUpload={() => false}
      onChange={(info) => {
        const fileList = info.fileList.map((file) => file.originFileObj).filter(Boolean) as File[];
        onUpload(fileList);
      }}
    />
  </Stack>
);

export default TravelerDocs;
