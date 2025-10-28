import { http, HttpResponse } from 'msw';

const bookings = [
  {
    id: 'bk_1',
    status: 'confirmed',
    destination: 'Masai Mara, Kenya',
    startDate: '2025-02-11',
    endDate: '2025-02-16',
    travelers: [
      { name: 'Ayo Traveler', nationality: 'Kenyan' },
      { name: 'Zuri Explorer', nationality: 'Kenyan' }
    ],
    total: 4800,
    currency: 'USD'
  }
];

export const bookingsHandlers = [
  http.get('/bookings', async () => HttpResponse.json(bookings)),
  http.get('/bookings/:bookingId', async ({ params }) => {
    const booking = bookings.find((item) => item.id === params.bookingId);
    return booking ? HttpResponse.json(booking) : HttpResponse.json({}, { status: 404 });
  }),
  http.post('/bookings', async () => HttpResponse.json({ bookingId: 'bk_2', status: 'pending' })),
];
