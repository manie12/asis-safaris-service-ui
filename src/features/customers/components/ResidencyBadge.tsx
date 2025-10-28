import Chip from '@mui/material/Chip';

import { resolveCountryName } from '@/utils/country';

interface ResidencyBadgeProps {
  countryCode: string;
}

const ResidencyBadge = ({ countryCode }: ResidencyBadgeProps) => (
  <Chip label={`Resident of ${resolveCountryName(countryCode)}`} color="secondary" variant="outlined" />
);

export default ResidencyBadge;
