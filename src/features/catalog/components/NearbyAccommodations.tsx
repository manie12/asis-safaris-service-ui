import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const placeholders = [
  { name: 'Mara Skyline Camp', distance: '15km' },
  { name: 'Ol Pejeta Bush Villas', distance: '42km' },
  { name: 'Amboseli View Lodge', distance: '58km' },
];

const NearbyAccommodations = () => (
  <Paper variant="outlined">
    <Typography variant="h6" px={3} pt={3} fontFamily="Playfair Display, serif">
      Nearby accommodation
    </Typography>
    <List>
      {placeholders.map((item) => (
        <ListItem key={item.name} divider>
          <ListItemText primary={item.name} secondary={`${item.distance} from departure point`} />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default NearbyAccommodations;
