import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { currencyFormatter } from '@/i18n/currency';

const priceMap = new Map(
  Array.from({ length: 30 }).map((_, index) => {
    const date = dayjs().add(index, 'day');
    const price = 3500 + index * 25;
    return [date.format('YYYY-MM-DD'), price] as const;
  }),
);

const PriceCalendar = () => {
  const dateCellRender = (value: Dayjs) => {
    const price = priceMap.get(value.format('YYYY-MM-DD'));
    if (!price) return null;
    return <span style={{ color: '#472A28', fontWeight: 600 }}>{currencyFormatter(price, 'USD')}</span>;
  };

  return <Calendar fullscreen={false} value={dayjs()} dateCellRender={dateCellRender} />;
};

export default PriceCalendar;
