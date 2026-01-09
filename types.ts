export interface ServiceCategory {
  category_name: string;
  description: string;
}

export interface PlasticService {
  service_name: string;
  description: string;
  full_description: string;
  citation: string;
}

export interface DoctorCredentials {
  name: string;
  title: string;
  specialty: string;
  experience_since: number;
  education: string[];
  international_training: string[];
  specializations: string[];
  publications: string;
}

export interface TrustElement {
  icon: string;
  value: string;
  subtitle: string;
}

export interface Testimonial {
  type: string;
  content: string;
  source: string | null;
  date?: string;
  avatar?: string;
  reviewCount?: string;
}

export interface ContactDetails {
  phone_number: string;
  address: string;
  email_address: string;
  opening_hours: string;
}

export interface USP {
  value: string;
}

export interface LandingData {
  service_categories: ServiceCategory[];
  treatment_benefits: any[];
  unique_selling_propositions: USP[];
  pricing_structures: any[];
  contact_details: ContactDetails;
  trust_signals: Testimonial[];
}