import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface BookingTimelineProps {
  stages: Array<{
    label: string;
    completed: boolean;
  }>;
}

const BookingTimeline = ({ stages }: BookingTimelineProps) => (
  <Stack spacing={2}>
    {stages.map((stage) => (
      <Stack key={stage.label} direction="row" alignItems="center" spacing={1.5}>
        <CheckCircleIcon color={stage.completed ? 'success' : 'disabled'} />
        <Typography variant="body2" fontWeight={stage.completed ? 600 : 400}>
          {stage.label}
        </Typography>
      </Stack>
    ))}
  </Stack>
);

export default BookingTimeline;
