import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EmptyState from '@/shared/components/EmptyState';

import MessageComposer from '../components/MessageComposer';
import MessageStream from '../components/MessageStream';
import ThreadList from '../components/ThreadList';
import { useSendMessage } from '../api/useSendMessage';
import { useThreads } from '../api/useThreads';
import { useMessages } from '../api/useMessages';

const InboxPage = () => {
  const { data: threads = [], isLoading } = useThreads();
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const { data: messages = [] } = useMessages(selectedThreadId);
  const sendMessage = useSendMessage();

  if (!isLoading && threads.length === 0) {
    return <EmptyState title="Inbox is empty" description="Conversations with travel designers will appear here." />;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontFamily="Playfair Display, serif">
        Messages
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ThreadList
            threads={threads}
            selectedThreadId={selectedThreadId ?? undefined}
            onSelect={(threadId) => setSelectedThreadId(threadId)}
          />
        </Grid>
        <Grid item xs={12} md={8} display="flex" flexDirection="column" gap={3}>
          <MessageStream messages={messages} />
          <MessageComposer
            onSend={async (body) => {
              if (!selectedThreadId) return;
              await sendMessage.mutateAsync({ threadId: selectedThreadId, body });
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default InboxPage;
