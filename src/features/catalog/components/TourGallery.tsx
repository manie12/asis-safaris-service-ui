import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

interface TourGalleryProps {
  images: string[];
}

const TourGallery = ({ images }: TourGalleryProps) => (
  <Grid container spacing={2}>
    {images.map((src, index) => (
      <Grid key={src} item xs={12} md={index === 0 ? 8 : 4}>
        <Box
          component="img"
          src={src}
          alt={`Tour image ${index + 1}`}
          sx={{
            width: '100%',
            height: index === 0 ? 360 : 180,
            objectFit: 'cover',
            borderRadius: 3,
          }}
        />
      </Grid>
    ))}
  </Grid>
);

export default TourGallery;
