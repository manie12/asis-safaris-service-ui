import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import type { AvailabilitySlot } from '@/app/api/types';

interface AvailabilityCalendarProps {
  slots: AvailabilitySlot[];
}

const AvailabilityCalendar = ({ slots }: AvailabilityCalendarProps) => {
  const slotMap = new Map(slots.map((slot) => [slot.date, slot]));

  const dateCellRender = (value: Dayjs) => {
    const key = value.format('YYYY-MM-DD');
    const slot = slotMap.get(key);

    if (!slot) {
      return null;
    }

    return (
      <div style={{ color: slot.available ? '#139A43' : '#B00020', fontWeight: 600 }}>
        {slot.available ? `${slot.seatsRemaining} seats` : 'Sold out'}
      </div>
    );
  };

  return (
    <Calendar
      fullscreen={false}
      value={dayjs()}
      dateCellRender={dateCellRender}
      style={{ borderRadius: 16, padding: 16, background: '#fff' }}
    />
  );
};

export default AvailabilityCalendar;
