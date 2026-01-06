// Booking Component Types

export interface Slot {
  date: string;      // YYYY-MM-DD
  time: string;      // HH:MM
  datetime: string;  // ISO string
}

export interface AvailabilityResponse {
  account_name: string;
  slots: Slot[];
  service_id: string[];  // szolgáltatás nevek
}

export interface BookingRequest {
  name: string;
  datetime: string;  // ISO datetime
  service: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export type BookingStep = 'date' | 'time' | 'form' | 'success';

export interface BookingResult {
  accountName: string;
  date: string;
  time: string;
  service: string;
}
