export interface BookingSummary {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  destination: string;
  startDate: string;
  endDate: string;
}

export interface BookingDetail extends BookingSummary {
  travelers: Array<{ name: string; nationality: string }>;
  total: number;
  currency: 'USD' | 'EUR' | 'KES';
}
