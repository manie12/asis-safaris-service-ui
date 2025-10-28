import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { DSButton } from '@/design-system/components/DSButton';
import { trackEvent } from '@/utils/analytics';

interface ItineraryPdfButtonProps {
  bookingId: string;
}

const ItineraryPdfButton = ({ bookingId }: ItineraryPdfButtonProps) => (
  <DSButton
    startIcon={<PictureAsPdfIcon />}
    variant="outlined"
    onClick={() => trackEvent({ name: 'download_itinerary', payload: { bookingId } })}
  >
    Download itinerary PDF
  </DSButton>
);

export default ItineraryPdfButton;
