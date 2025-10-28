import { setupWorker } from 'msw/browser';

import { env } from '@/app/config/env';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const startMockWorker = async () => {
  if (!env.enableMsw) {
    return;
  }

  await worker.start({
    onUnhandledRequest: 'bypass',
  });
};
