import { http, HttpResponse } from 'msw';

import availability from '../data/availability.json';
import tours from '../data/tours.json';

export const catalogHandlers = [
  http.get('/countries/:countryCode/tours', async () => {
    return HttpResponse.json({
      data: tours,
      meta: {
        total: tours.length,
        page: 1,
        pageSize: tours.length,
      },
    });
  }),
  http.get('/countries/:countryCode/tours/:tourId', async ({ params }) => {
    const tour = tours.find((item) => item.id === params.tourId);
    return tour ? HttpResponse.json(tour) : HttpResponse.json({}, { status: 404 });
  }),
  http.get('/availability/:tourId', async ({ params }) => {
    const slots = availability[params.tourId as keyof typeof availability] ?? [];
    return HttpResponse.json({ tourId: params.tourId, slots });
  }),
];
