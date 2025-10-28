import { http, HttpResponse } from 'msw';

const profile = {
  firstName: 'Ayo',
  lastName: 'Traveler',
  email: 'ayo@safaris.africa',
  phone: '+254700000000',
  residency: 'KE',
};

const documents = [
  { id: 'doc_1', name: 'Passport.pdf', uploadedAt: '2024-12-01T10:00:00Z' },
];

export const customersHandlers = [
  http.get('/customers/profile', async () => HttpResponse.json(profile)),
  http.get('/customers/documents', async () => HttpResponse.json(documents)),
];
