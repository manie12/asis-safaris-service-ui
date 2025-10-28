import { http, HttpResponse } from 'msw';

const threads = [
  {
    id: 'thread_1',
    lastMessageSnippet: 'Vanessa (Guide): Confirming your flight details.',
    updatedAt: '2025-01-14T09:00:00Z',
  },
];

const messages = [
  {
    id: 'msg_1',
    threadId: 'thread_1',
    sender: 'staff',
    body: 'Hi Ayo, we confirmed your regional flights from Wilson to Mara.',
    createdAt: '2025-01-14T09:00:00Z',
  },
  {
    id: 'msg_2',
    threadId: 'thread_1',
    sender: 'traveler',
    body: 'Asante! Do you need updated passport scans?',
    createdAt: '2025-01-14T09:05:00Z',
  },
];

export const inboxHandlers = [
  http.get('/inbox/threads', async () => HttpResponse.json(threads)),
  http.get('/inbox/threads/:threadId/messages', async ({ params }) => {
    const threadMessages = messages.filter((message) => message.threadId === params.threadId);
    return HttpResponse.json(threadMessages);
  }),
  http.post('/inbox/threads/:threadId/messages', async ({ request, params }) => {
    const payload = (await request.json()) as { body?: string };
    const body = payload.body ?? '';
    const newMessage = {
      id: crypto.randomUUID(),
      threadId: params.threadId as string,
      sender: 'traveler' as const,
      body,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    return HttpResponse.json(newMessage, { status: 201 });
  }),
];
