import React, { useState, useEffect, useMemo } from 'react';
import { fetchAvailability, createBooking, BookingApiError } from './api';
import {
    Slot,
    AvailabilityResponse,
    BookingStep,
    BookingFormData,
    BookingResult,
} from './types';

interface BookingWidgetProps {
    baseUrl: string;
    publicApiKey: string;
    bookingApiKey: string;
}

const WEEKDAYS = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
const MONTHS = [
    'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();
    return `${year}. ${month} ${day}.`;
}

export function BookingWidget({ baseUrl, publicApiKey, bookingApiKey }: BookingWidgetProps) {
    const [step, setStep] = useState<BookingStep>('date');
    const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        email: '',
        phone: '',
        notes: '',
    });

    const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

    // Fetch availability on mount
    useEffect(() => {
        const loadAvailability = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchAvailability(baseUrl, publicApiKey);
                setAvailability(data);

                // Auto-select service if only one
                if (data.service_id.length === 1) {
                    setSelectedService(data.service_id[0]);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Hiba történt');
            } finally {
                setLoading(false);
            }
        };

        loadAvailability();
    }, [baseUrl, publicApiKey]);

    // Get available dates
    const availableDates = useMemo(() => {
        if (!availability) return new Set<string>();
        return new Set(availability.slots.map((slot) => slot.date));
    }, [availability]);

    // Get slots for selected date
    const slotsForDate = useMemo(() => {
        if (!availability || !selectedDate) return [];
        return availability.slots.filter((slot) => slot.date === selectedDate);
    }, [availability, selectedDate]);

    // Calendar helpers
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;

        const days: (number | null)[] = [];
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    const formatDateKey = (year: number, month: number, day: number) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const today = new Date();
    const todayStr = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

    const handleDateSelect = (day: number) => {
        const dateKey = formatDateKey(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );
        setSelectedDate(dateKey);
        setSelectedSlot(null);
        setStep('time');
    };

    const handleSlotSelect = (slot: Slot) => {
        setSelectedSlot(slot);
    };

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedService(e.target.value);
    };

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleContinueToForm = () => {
        if (selectedSlot && selectedService) {
            setStep('form');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot || !selectedService) return;

        try {
            setSubmitting(true);
            setError(null);

            await createBooking(baseUrl, bookingApiKey, {
                name: formData.name,
                datetime: selectedSlot.datetime,
                service: selectedService,
                email: formData.email || undefined,
                phone: formData.phone || undefined,
                notes: formData.notes || undefined,
            });

            setBookingResult({
                accountName: availability?.account_name || '',
                date: selectedSlot.date,
                time: selectedSlot.time,
                service: selectedService,
            });
            setStep('success');
        } catch (err) {
            if (err instanceof BookingApiError && err.isSlotTaken) {
                setError('Ez az időpont már nem elérhető. Kérjük, válasszon másikat.');
                setStep('time');
                setSelectedSlot(null);
            } else {
                setError(err instanceof Error ? err.message : 'Hiba történt');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setStep('date');
        setSelectedDate(null);
        setSelectedSlot(null);
        setFormData({ name: '', email: '', phone: '', notes: '' });
        setBookingResult(null);
        setError(null);

        // Reload availability
        fetchAvailability(baseUrl, publicApiKey)
            .then((data) => {
                setAvailability(data);
                if (data.service_id.length === 1) {
                    setSelectedService(data.service_id[0]);
                }
            })
            .catch(() => { });
    };

    const handleBack = () => {
        if (step === 'time') {
            setStep('date');
            setSelectedSlot(null);
        } else if (step === 'form') {
            setStep('time');
        }
    };

    const navigateMonth = (direction: 1 | -1) => {
        setCurrentMonth((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + direction);
            return newDate;
        });
    };

    const stepIndex = { date: 0, time: 1, form: 2, success: 3 };

    // Loading state
    if (loading) {
        return (
            <div className="booking-widget">
                <div className="booking-widget__card">
                    <div className="booking-widget__loading">
                        <div className="booking-widget__loading-spinner" />
                        <span className="booking-widget__loading-text">Betöltés...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-widget">
            <div className="booking-widget__card">
                <div className="booking-widget__header">
                    <h2 className="booking-widget__title">
                        {availability?.account_name || 'Időpontfoglalás'}
                    </h2>
                    <p className="booking-widget__subtitle">
                        {step === 'date' && 'Válasszon dátumot'}
                        {step === 'time' && 'Válasszon időpontot'}
                        {step === 'form' && 'Adja meg adatait'}
                        {step === 'success' && 'Sikeres foglalás'}
                    </p>
                </div>

                <div className="booking-widget__content">
                    {/* Step Indicator */}
                    {step !== 'success' && (
                        <div className="booking-widget__steps">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className={`booking-widget__step-dot ${i === stepIndex[step]
                                            ? 'booking-widget__step-dot--active'
                                            : i < stepIndex[step]
                                                ? 'booking-widget__step-dot--completed'
                                                : ''
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Error Display */}
                    {error && (
                        <div className="booking-widget__error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Date Selection */}
                    {step === 'date' && (
                        <div className="booking-widget__fade-in">
                            <div className="booking-widget__calendar">
                                <div className="booking-widget__calendar-header">
                                    <span className="booking-widget__calendar-title">
                                        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                    </span>
                                    <div className="booking-widget__calendar-nav">
                                        <button
                                            type="button"
                                            className="booking-widget__calendar-btn"
                                            onClick={() => navigateMonth(-1)}
                                            aria-label="Előző hónap"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M15 18l-6-6 6-6" />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="booking-widget__calendar-btn"
                                            onClick={() => navigateMonth(1)}
                                            aria-label="Következő hónap"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M9 18l6-6-6-6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="booking-widget__weekdays">
                                    {WEEKDAYS.map((day) => (
                                        <div key={day} className="booking-widget__weekday">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="booking-widget__days">
                                    {getDaysInMonth(currentMonth).map((day, index) => {
                                        if (day === null) {
                                            return (
                                                <div
                                                    key={`empty-${index}`}
                                                    className="booking-widget__day booking-widget__day--empty"
                                                />
                                            );
                                        }

                                        const dateKey = formatDateKey(
                                            currentMonth.getFullYear(),
                                            currentMonth.getMonth(),
                                            day
                                        );
                                        const hasSlots = availableDates.has(dateKey);
                                        const isToday = dateKey === todayStr;
                                        const isSelected = dateKey === selectedDate;
                                        const isPast = new Date(dateKey) < new Date(todayStr);

                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                className={`booking-widget__day ${isToday ? 'booking-widget__day--today' : ''
                                                    } ${isSelected ? 'booking-widget__day--selected' : ''} ${!hasSlots || isPast ? 'booking-widget__day--disabled' : ''
                                                    } ${hasSlots && !isPast ? 'booking-widget__day--has-slots' : ''}`}
                                                onClick={() => hasSlots && !isPast && handleDateSelect(day)}
                                                disabled={!hasSlots || isPast}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Time Selection */}
                    {step === 'time' && (
                        <div className="booking-widget__fade-in">
                            {/* Selected Date Summary */}
                            <div className="booking-widget__selected-summary">
                                <span className="booking-widget__selected-info">
                                    📅 {selectedDate && formatDate(selectedDate)}
                                </span>
                                <button
                                    type="button"
                                    className="booking-widget__selected-change"
                                    onClick={handleBack}
                                >
                                    Módosítás
                                </button>
                            </div>

                            {/* Service Selector */}
                            {availability && availability.service_id.length > 1 && (
                                <div className="booking-widget__service-selector">
                                    <label className="booking-widget__label">Szolgáltatás</label>
                                    <select
                                        className="booking-widget__select"
                                        value={selectedService || ''}
                                        onChange={handleServiceChange}
                                    >
                                        <option value="">Válasszon szolgáltatást...</option>
                                        {availability.service_id.map((service) => (
                                            <option key={service} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Time Slots */}
                            <label className="booking-widget__label">Elérhető időpontok</label>
                            {slotsForDate.length > 0 ? (
                                <div className="booking-widget__slots">
                                    {slotsForDate.map((slot) => (
                                        <button
                                            key={slot.datetime}
                                            type="button"
                                            className={`booking-widget__slot ${selectedSlot?.datetime === slot.datetime
                                                    ? 'booking-widget__slot--selected'
                                                    : ''
                                                }`}
                                            onClick={() => handleSlotSelect(slot)}
                                        >
                                            {slot.time}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="booking-widget__empty">
                                    Nincs elérhető időpont ezen a napon
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="booking-widget__nav">
                                <button
                                    type="button"
                                    className="booking-widget__button booking-widget__button--secondary"
                                    onClick={handleBack}
                                >
                                    Vissza
                                </button>
                                <button
                                    type="button"
                                    className="booking-widget__button booking-widget__button--primary"
                                    onClick={handleContinueToForm}
                                    disabled={!selectedSlot || !selectedService}
                                >
                                    Tovább
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    {step === 'form' && (
                        <div className="booking-widget__fade-in">
                            {/* Selected Summary */}
                            <div className="booking-widget__selected-summary">
                                <span className="booking-widget__selected-info">
                                    📅 {selectedDate && formatDate(selectedDate)} – {selectedSlot?.time}
                                </span>
                                <button
                                    type="button"
                                    className="booking-widget__selected-change"
                                    onClick={() => setStep('time')}
                                >
                                    Módosítás
                                </button>
                            </div>

                            <form className="booking-widget__form" onSubmit={handleSubmit}>
                                <div className="booking-widget__field">
                                    <label className="booking-widget__label">
                                        Név <span className="booking-widget__required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="booking-widget__input"
                                        placeholder="Teljes név"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>

                                <div className="booking-widget__field">
                                    <label className="booking-widget__label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="booking-widget__input"
                                        placeholder="pelda@email.com"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                    />
                                </div>

                                <div className="booking-widget__field">
                                    <label className="booking-widget__label">Telefonszám</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="booking-widget__input"
                                        placeholder="+36 30 123 4567"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                    />
                                </div>

                                <div className="booking-widget__field">
                                    <label className="booking-widget__label">Megjegyzés</label>
                                    <textarea
                                        name="notes"
                                        className="booking-widget__input booking-widget__textarea"
                                        placeholder="Opcionális megjegyzés..."
                                        value={formData.notes}
                                        onChange={handleFormChange}
                                    />
                                </div>

                                <div className="booking-widget__nav">
                                    <button
                                        type="button"
                                        className="booking-widget__button booking-widget__button--secondary"
                                        onClick={handleBack}
                                        disabled={submitting}
                                    >
                                        Vissza
                                    </button>
                                    <button
                                        type="submit"
                                        className="booking-widget__button booking-widget__button--primary"
                                        disabled={!formData.name || submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <span className="booking-widget__spinner" />
                                                Küldés...
                                            </>
                                        ) : (
                                            'Foglalás'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Success */}
                    {step === 'success' && bookingResult && (
                        <div className="booking-widget__fade-in">
                            <div className="booking-widget__success">
                                <div className="booking-widget__success-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                                <h3 className="booking-widget__success-title">
                                    Sikeres foglalás!
                                </h3>
                                <p className="booking-widget__success-message">
                                    A foglalást sikeresen rögzítettük.
                                </p>

                                <div className="booking-widget__success-details">
                                    <div className="booking-widget__success-row">
                                        <span className="booking-widget__success-label">Szolgáltató</span>
                                        <span className="booking-widget__success-value">
                                            {bookingResult.accountName}
                                        </span>
                                    </div>
                                    <div className="booking-widget__success-row">
                                        <span className="booking-widget__success-label">Dátum</span>
                                        <span className="booking-widget__success-value">
                                            {formatDate(bookingResult.date)}
                                        </span>
                                    </div>
                                    <div className="booking-widget__success-row">
                                        <span className="booking-widget__success-label">Időpont</span>
                                        <span className="booking-widget__success-value">
                                            {bookingResult.time}
                                        </span>
                                    </div>
                                    <div className="booking-widget__success-row">
                                        <span className="booking-widget__success-label">Szolgáltatás</span>
                                        <span className="booking-widget__success-value">
                                            {bookingResult.service}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="booking-widget__button booking-widget__button--primary"
                                    onClick={handleReset}
                                >
                                    Új foglalás
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingWidget;
