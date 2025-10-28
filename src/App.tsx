import Container from '@mui/material/Container';

import { AppRouter } from './app/routes/router';

const App = () => (
  <Container maxWidth="xl" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <AppRouter />
  </Container>
);

export default App;
