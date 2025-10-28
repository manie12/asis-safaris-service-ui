export interface QuoteRequest {
  travelerCount: number;
  travelMonth: string;
  addOns: string[];
}

export interface PromoPayload {
  code: string;
}

export interface QuoteLineItem {
  label: string;
  amount: number;
}

export interface QuoteResult {
  currency: 'USD' | 'EUR' | 'KES';
  total: number;
  lineItems: QuoteLineItem[];
}
