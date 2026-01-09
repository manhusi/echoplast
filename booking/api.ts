import { AvailabilityResponse, BookingRequest } from './types';

// Bence Masszázs API configuration
const BASE_URL = 'https://jdwhmvruzbvkzgfdousz.supabase.co/functions/v1';
const PUBLIC_API_KEY = 'gqjZ6ibfFh7AXWyMKwFQGrigxiEiGBwYYM0JbCxMWRnkJ69P';
const BOOKING_API_KEY = 'NzGnLjAIm33hSbZ7Izjm0k9MNGvKbJNK5X2gVQVEsv6gGvjC';

export class BookingApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public isSlotTaken: boolean = false
    ) {
        super(message);
        this.name = 'BookingApiError';
    }
}

export async function fetchAvailability(): Promise<AvailabilityResponse> {
    const response = await fetch(`${BASE_URL}/get-availability`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${PUBLIC_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new BookingApiError(
            'Nem sikerült lekérni az elérhetőségeket',
            response.status
        );
    }

    return response.json();
}

export interface BookingResponse {
    success: boolean;
    booking: {
        id: string;
        service_details?: {
            price: number;
            currency: string;
            duration_minutes: number;
        };
    };
}

export async function createBooking(data: BookingRequest): Promise<BookingResponse> {
    const response = await fetch(`${BASE_URL}/create-booking`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${BOOKING_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data,
            include_price: true, // Always request price
        }),
    });

    if (response.status === 409) {
        throw new BookingApiError(
            'Ez az időpont már nem elérhető',
            409,
            true
        );
    }

    if (!response.ok) {
        throw new BookingApiError(
            'Nem sikerült elküldeni a foglalást',
            response.status
        );
    }

    return response.json();
}
