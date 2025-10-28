import { authHandlers } from './authHandlers';
import { bookingsHandlers } from './bookingsHandlers';
import { catalogHandlers } from './catalogHandlers';
import { customersHandlers } from './customersHandlers';
import { inboxHandlers } from './inboxHandlers';
import { pricingHandlers } from './pricingHandlers';

export const handlers = [
  ...authHandlers,
  ...catalogHandlers,
  ...pricingHandlers,
  ...bookingsHandlers,
  ...inboxHandlers,
  ...customersHandlers,
];
