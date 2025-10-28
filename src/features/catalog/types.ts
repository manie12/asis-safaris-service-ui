import type { AvailabilitySlot, PaginatedResponse, TourSummary } from '@/app/api/types';

export type TourListResponse = PaginatedResponse<TourSummary>;

export interface TourDetails extends TourSummary {
  description: string;
  highlights: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  gallery: string[];
  inclusions: string[];
  exclusions: string[];
}

export interface AvailabilityResponse {
  tourId: string;
  slots: AvailabilitySlot[];
}
