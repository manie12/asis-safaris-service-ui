import { http, HttpResponse } from 'msw';

import quotes from '../data/quotes.json';

export const pricingHandlers = [
  http.post('/pricing/quote', async () => {
    return HttpResponse.json(quotes.default);
  }),
  http.post('/pricing/promo', async ({ request }) => {
    const payload = (await request.json()) as { code?: string };
    const isSunrise = payload.code === 'SUNRISE';
    return HttpResponse.json({ valid: isSunrise, discountPercentage: isSunrise ? 12 : 0 });
  }),
];
