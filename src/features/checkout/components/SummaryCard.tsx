import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatCurrency } from '@/utils/format';

interface SummaryCardProps {
  travelers: number;
  total: number;
  currency: 'USD' | 'EUR' | 'KES';
}

const SummaryCard = ({ travelers, total, currency }: SummaryCardProps) => (
  <Card variant="outlined">
    <CardContent>
      <Stack spacing={1.5}>
        <Typography variant="h6" fontFamily="Playfair Display, serif">
          Booking summary
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Travelers</Typography>
          <Typography variant="body2">{travelers}</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={600}>
            Total
          </Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            {formatCurrency(total, currency)}
          </Typography>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

export default SummaryCard;
