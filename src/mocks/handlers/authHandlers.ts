import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post('/auth/login', async () => {
    return HttpResponse.json({
      token: 'mock-token',
      user: {
        id: '1',
        name: 'Ayo Traveler',
        email: 'ayo@safaris.africa',
        roles: ['traveler'],
      },
    });
  }),
  http.post('/auth/register', async () => {
    return HttpResponse.json({
      token: 'mock-token',
      user: {
        id: '2',
        name: 'New Traveler',
        email: 'new@safaris.africa',
        roles: ['traveler'],
      },
    });
  }),
  http.post('/auth/reset-password', async () => HttpResponse.json({ success: true })),
];
