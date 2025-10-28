import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DSSelect } from '@/design-system/components/DSSelect';
import { DSTextField } from '@/design-system/components/DSTextField';

export interface ContactPreferencesProps {
  value: {
    email: string;
    phone: string;
    preferredChannel: 'email' | 'sms' | 'whatsapp';
  };
  onChange: (value: ContactPreferencesProps['value']) => void;
}

const ContactPreferences = ({ value, onChange }: ContactPreferencesProps) => (
  <Stack spacing={2}>
    <Typography variant="h6">Contact preferences</Typography>
    <DSTextField
      label="Primary email"
      value={value.email}
      onChange={(event) => onChange({ ...value, email: event.target.value })}
    />
    <DSTextField
      label="Phone number"
      value={value.phone}
      onChange={(event) => onChange({ ...value, phone: event.target.value })}
    />
    <DSSelect
      label="Preferred channel"
      value={value.preferredChannel}
      onValueChange={(val) =>
        onChange({
          ...value,
          preferredChannel: val as ContactPreferencesProps['value']['preferredChannel'],
        })
      }
      options={[
        { value: 'email', label: 'Email' },
        { value: 'sms', label: 'SMS' },
        { value: 'whatsapp', label: 'WhatsApp' },
      ]}
    />
  </Stack>
);

export default ContactPreferences;
