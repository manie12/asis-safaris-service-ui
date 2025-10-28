import { DatePicker, type DatePickerProps } from 'antd';

export type DSDatePickerProps = DatePickerProps;

export const DSDatePicker = (props: DSDatePickerProps) => {
  return (
    <DatePicker
      style={{
        width: '100%',
        borderRadius: 16,
        padding: '10px 14px',
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(250, 246, 240, 0.92) 100%)',
      }}
      {...props}
    />
  );
};
