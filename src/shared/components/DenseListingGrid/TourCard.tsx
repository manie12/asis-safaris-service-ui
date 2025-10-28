import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { DSButton } from '@/design-system/components/DSButton';
import { formatCurrency, formatDuration } from '@/utils/format';

interface TourCardProps {
  id: string;
  title: string;
  image: string;
  priceFrom: number;
  currency: 'USD' | 'EUR' | 'KES';
  durationDays: number;
}

const TourCard = ({ id, title, image, priceFrom, currency, durationDays }: TourCardProps) => (
  <Card variant="outlined" sx={{ overflow: 'hidden', height: '100%' }}>
    <CardMedia component="img" height="160" image={image} alt={title} />
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {formatDuration(durationDays)} · from {formatCurrency(priceFrom, currency)}
      </Typography>
    </CardContent>
    <CardActions sx={{ px: 2, pb: 2 }}>
      <DSButton size="small" fullWidth href={`/tours/${id}`}>
        View details
      </DSButton>
    </CardActions>
  </Card>
);

export default TourCard;
