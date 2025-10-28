import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import type { Thread } from '../types';

interface ThreadListProps {
  threads: Thread[];
  selectedThreadId?: string;
  onSelect: (threadId: string) => void;
}

const ThreadList = ({ threads, selectedThreadId, onSelect }: ThreadListProps) => (
  <Paper variant="outlined" sx={{ height: '100%', overflowY: 'auto' }}>
    <Typography variant="subtitle1" px={3} py={2} fontFamily="Playfair Display, serif">
      Inbox
    </Typography>
    <List disablePadding>
      {threads.map((thread) => (
        <ListItem key={thread.id} disablePadding>
          <ListItemButton
            selected={thread.id === selectedThreadId}
            onClick={() => onSelect(thread.id)}
          >
            <ListItemText primary={thread.lastMessageSnippet} secondary={thread.updatedAt} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default ThreadList;
