import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend 3-6 months ahead for the best lodge availability during peak season.',
  },
  {
    question: 'Do you offer custom itineraries?',
    answer: 'Absolutely. Our travel designers curate each itinerary around your travel goals.',
  },
  {
    question: 'Can you arrange international flights?',
    answer: 'Yes, we can coordinate both regional and international flights with trusted partners.',
  },
];

const FAQAccordion = () => (
  <div>
    {faqs.map((item) => (
      <Accordion key={item.question} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>{item.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{item.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </div>
);

export default FAQAccordion;
