import { useState } from 'react';
import type { FormEvent } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { DSButton } from '@/design-system/components/DSButton';

interface MessageComposerProps {
  onSend: (body: string) => Promise<void> | void;
}

const MessageComposer = ({ onSend }: MessageComposerProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;
    await onSend(message);
    setMessage('');
  };

  return (
    <Stack component="form" direction={{ xs: 'column', md: 'row' }} spacing={2} onSubmit={handleSubmit}>
      <TextField
        fullWidth
        placeholder="Write a reply"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        multiline
        minRows={2}
      />
      <DSButton type="submit">Send</DSButton>
    </Stack>
  );
};

export default MessageComposer;
