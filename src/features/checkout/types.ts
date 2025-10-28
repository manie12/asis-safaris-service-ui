export interface TravelerDocument {
  id: string;
  travelerName: string;
  type: 'passport' | 'visa' | 'insurance';
  url: string;
}

export interface ContactPreferences {
  email: string;
  phone: string;
  preferredChannel: 'email' | 'sms' | 'whatsapp';
}

export interface CheckoutPayload {
  travelers: Array<{
    firstName: string;
    lastName: string;
    nationality: string;
  }>;
  contactPreferences: ContactPreferences;
  notes?: string;
}
