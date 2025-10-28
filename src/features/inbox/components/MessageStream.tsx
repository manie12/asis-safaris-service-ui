import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import type { Message } from '../types';

interface MessageStreamProps {
  messages: Message[];
}

const MessageStream = ({ messages }: MessageStreamProps) => (
  <Paper variant="outlined" sx={{ p: 3, minHeight: 360 }}>
    <Typography variant="subtitle1" fontFamily="Playfair Display, serif" mb={2}>
      Conversation
    </Typography>
    <Box display="flex" flexDirection="column" gap={1.5}>
      {messages.map((message) => (
        <Box
          key={message.id}
          alignSelf={message.sender === 'staff' ? 'flex-start' : 'flex-end'}
          bgcolor={message.sender === 'staff' ? '#f0e7e2' : '#472A28'}
          color={message.sender === 'staff' ? '#472A28' : '#fff'}
          px={2}
          py={1.5}
          borderRadius={3}
        >
          <Typography variant="body2">{message.body}</Typography>
          <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
            {new Date(message.createdAt).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  </Paper>
);

export default MessageStream;
