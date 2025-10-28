import { useState } from 'react';
import type { FormEvent } from 'react';

import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs, { type Dayjs } from 'dayjs';

import { DSButton } from '@/design-system/components/DSButton';
import { DSDatePicker } from '@/design-system/components/DSDatePicker';
import { DSSelect } from '@/design-system/components/DSSelect';
import { formatCurrency } from '@/utils/format';
import { useQuote } from '../api/useQuote';
import { usePromoValidate } from '../api/usePromoValidate';

const travelerMixOptions = [
  { value: '2', label: 'Couple (2 travelers)' },
  { value: '4', label: 'Family (4 travelers)' },
  { value: '6', label: 'Private group (6 travelers)' },
];

const QuoteForm = () => {
  const [travelerCount, setTravelerCount] = useState('2');
  const [promoCode, setPromoCode] = useState('');
  const [travelDate, setTravelDate] = useState<Dayjs | null>(dayjs());

  const quote = useQuote();
  const promo = usePromoValidate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!travelDate) return;

    await quote.mutateAsync({
      travelerCount: Number(travelerCount),
      travelMonth: travelDate.format('YYYY-MM'),
      addOns: [],
    });

    if (promoCode) {
      await promo.mutateAsync({ code: promoCode });
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h5" fontFamily="Playfair Display, serif">
          Quick quote
        </Typography>
        {quote.isSuccess && quote.data ? (
          <Alert severity="success">
            Estimated total: {formatCurrency(quote.data.total, quote.data.currency)}
          </Alert>
        ) : null}
        {promo.isSuccess ? (
          <Alert severity="info">Promo applied: {promo.data.discountPercentage}% off</Alert>
        ) : null}
        <DSSelect
          label="Traveler mix"
          value={travelerCount}
          options={travelerMixOptions}
          onValueChange={(value) => setTravelerCount(value)}
        />
        <DSDatePicker
          picker="month"
          value={travelDate}
          onChange={(value) => setTravelDate(value)}
          allowClear={false}
        />
        <DSSelect
          label="Promo code"
          value={promoCode}
          options={[{ value: '', label: 'No promo' }, { value: 'SUNRISE', label: 'SUNRISE' }]}
          onValueChange={(value) => setPromoCode(value)}
        />
        <DSButton type="submit" size="large" disabled={quote.isPending}>
          {quote.isPending ? 'Estimating…' : 'Request quote'}
        </DSButton>
      </Stack>
    </Paper>
  );
};

export default QuoteForm;
