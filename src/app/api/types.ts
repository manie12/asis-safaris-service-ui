export interface ApiError {
  statusCode: number;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface TourSummary {
  id: string;
  title: string;
  countryCode: string;
  priceFrom: number;
  currency: 'USD' | 'EUR' | 'KES';
  heroImage: string;
  durationDays: number;
}

export interface AvailabilitySlot {
  date: string;
  available: boolean;
  seatsRemaining: number;
}

export interface QuoteResponse {
  total: number;
  currency: 'USD' | 'EUR' | 'KES';
  lineItems: Array<{
    label: string;
    amount: number;
  }>;
}
