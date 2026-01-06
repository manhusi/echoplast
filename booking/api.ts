import { AvailabilityResponse, BookingRequest } from './types';

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

export async function fetchAvailability(
    baseUrl: string,
    apiKey: string
): Promise<AvailabilityResponse> {
    const response = await fetch(`${baseUrl}/get-availability`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
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

export async function createBooking(
    baseUrl: string,
    apiKey: string,
    data: BookingRequest
): Promise<void> {
    const response = await fetch(`${baseUrl}/create-booking`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
}
