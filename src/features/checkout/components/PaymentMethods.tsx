import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const PaymentMethods = () => (
  <Stack spacing={2}>
    <Typography variant="h6">Payment methods</Typography>
    <RadioGroup defaultValue="card">
      <FormControlLabel value="card" control={<Radio />} label="Credit card" />
      <FormControlLabel value="mpesa" control={<Radio />} label="M-Pesa" />
      <FormControlLabel value="bank" control={<Radio />} label="Bank transfer" />
    </RadioGroup>
  </Stack>
);

export default PaymentMethods;
