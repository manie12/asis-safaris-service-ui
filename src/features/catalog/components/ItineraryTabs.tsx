import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

interface ItineraryTabsProps {
  itinerary: ItineraryItem[];
}

const ItineraryTabs = ({ itinerary }: ItineraryTabsProps) => {
  const [activeDay, setActiveDay] = useState(0);

  if (itinerary.length === 0) {
    return null;
  }

  const selected = itinerary[activeDay];

  return (
    <Box>
      <Tabs
        value={activeDay}
        onChange={(_event, value) => setActiveDay(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        {itinerary.map((item) => (
          <Tab key={item.day} label={`Day ${item.day}: ${item.title}`} />
        ))}
      </Tabs>
      <Typography variant="h6" gutterBottom>
        {selected.title}
      </Typography>
      <Typography variant="body2">{selected.description}</Typography>
    </Box>
  );
};

export default ItineraryTabs;
