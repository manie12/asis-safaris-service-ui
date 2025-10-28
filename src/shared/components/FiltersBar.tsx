import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Cascader } from 'antd';

import { DSButton } from '@/design-system/components/DSButton';

const regionOptions = [
  {
    value: 'east-africa',
    label: 'East Africa',
    children: [
      { value: 'kenya', label: 'Kenya' },
      { value: 'tanzania', label: 'Tanzania' },
    ],
  },
  {
    value: 'southern-africa',
    label: 'Southern Africa',
    children: [
      { value: 'botswana', label: 'Botswana' },
      { value: 'south-africa', label: 'South Africa' },
    ],
  },
];

interface FiltersBarProps {
  onApply?: () => void;
}

const FiltersBar = ({ onApply }: FiltersBarProps) => (
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    spacing={2}
    alignItems="center"
    justifyContent="space-between"
    sx={{
      position: 'sticky',
      top: 80,
      zIndex: 10,
      background: '#fff',
      borderRadius: 4,
      border: '1px solid #f0e7e2',
      px: 3,
      py: 2,
    }}
  >
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" flex={1}>
      <div>
        <Typography variant="caption">Region</Typography>
        <Cascader options={regionOptions} placeholder="Select region" style={{ minWidth: 200 }} />
      </div>
      <div style={{ minWidth: 220 }}>
        <Typography variant="caption">Budget (USD)</Typography>
        <Slider defaultValue={[2000, 6000]} valueLabelDisplay="auto" min={1000} max={15000} />
      </div>
    </Stack>
    <DSButton size="large" onClick={onApply}>
      Apply
    </DSButton>
  </Stack>
);

export default FiltersBar;
