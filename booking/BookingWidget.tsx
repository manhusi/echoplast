import React, { useState, useEffect, useMemo } from 'react';
import { fetchAvailability, createBooking, BookingApiError } from './api';
import {
    Slot,
    AvailabilityResponse,
    BookingStep,
    BookingFormData,
    BookingResult,
} from './types';

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

function formatShortDate(dateStr: string): string {
    const date = new Date(dateStr);
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}.`;
}

interface BookingWidgetProps {
    initialService?: string | null;
}

export function BookingWidget({ initialService }: BookingWidgetProps) {
    const [step, setStep] = useState<BookingStep>('service');
    const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedService, setSelectedService] = useState<string | null>(initialService || null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [selectedMinute, setSelectedMinute] = useState<string | null>(null);
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
                const data = await fetchAvailability();
                setAvailability(data);

                // Auto-select service if provided via prop OR if only one service exists
                if (initialService) {
                    setSelectedService(initialService);
                    setStep('date');
                } else if (data.service_id.length === 1) {
                    setSelectedService(data.service_id[0]);
                    setStep('date');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Hiba történt');
            } finally {
                setLoading(false);
            }
        };

        loadAvailability();
    }, [initialService]); // Add initialService to dependency array

    // Get all available services
    const allServices = useMemo(() => {
        if (!availability) return [];
        const servicesFromSlots = availability.slots.flatMap(s => s.available_services || []);
        if (servicesFromSlots.length > 0) {
            return [...new Set(servicesFromSlots)];
        }
        return availability.service_id || [];
    }, [availability]);

    // Get slots filtered by selected service
    const slotsForService = useMemo(() => {
        if (!availability || !selectedService) return [];
        const hasAvailableServices = availability.slots.some(
            s => s.available_services && s.available_services.length > 0
        );
        if (hasAvailableServices) {
            return availability.slots.filter(
                s => s.available_services && s.available_services.includes(selectedService)
            );
        }
        return availability.slots;
    }, [availability, selectedService]);

    // Get available dates for selected service
    const availableDates = useMemo(() => {
        return new Set(slotsForService.map(slot => slot.date));
    }, [slotsForService]);

    // Get slots for selected date
    const slotsForDate = useMemo(() => {
        if (!selectedDate) return [];
        return slotsForService.filter(slot => slot.date === selectedDate);
    }, [slotsForService, selectedDate]);

    // Get available hours for selected date (unique, sorted)
    const availableHours = useMemo(() => {
        const hours = [...new Set(slotsForDate.map(s => s.time.split(':')[0]))].sort();
        return hours;
    }, [slotsForDate]);

    // Get slots for selected hour
    const slotsForHour = useMemo(() => {
        if (!selectedHour) return [];
        return slotsForDate.filter(s => s.time.startsWith(selectedHour + ':'));
    }, [slotsForDate, selectedHour]);

    // Get available minutes for selected hour
    const availableMinutes = useMemo(() => {
        return slotsForHour.map(s => s.time.split(':')[1]);
    }, [slotsForHour]);

    // Get the selected slot
    const selectedSlot = useMemo(() => {
        if (!selectedHour || !selectedMinute) return null;
        return slotsForHour.find(s => s.time === `${selectedHour}:${selectedMinute}`) || null;
    }, [slotsForHour, selectedHour, selectedMinute]);

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

    // Handlers
    const handleServiceSelect = (service: string) => {
        setSelectedService(service);
        setSelectedDate(null);
        setSelectedHour(null);
        setSelectedMinute(null);
        setStep('date');
    };

    const handleDateSelect = (day: number) => {
        const dateKey = formatDateKey(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );
        setSelectedDate(dateKey);
        setSelectedHour(null);
        setSelectedMinute(null);
        setStep('time');
    };

    const handleHourSelect = (hour: string) => {
        setSelectedHour(hour);
        setSelectedMinute(null);
    };

    const handleMinuteSelect = (minute: string) => {
        setSelectedMinute(minute);
    };

    const handleContinueToForm = () => {
        if (selectedSlot) {
            setStep('form');
        }
    };

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot || !selectedService) return;

        try {
            setSubmitting(true);
            setError(null);

            await createBooking({
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
                setSelectedHour(null);
                setSelectedMinute(null);
            } else {
                setError(err instanceof Error ? err.message : 'Hiba történt');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setStep('service');
        setSelectedService(null);
        setSelectedDate(null);
        setSelectedHour(null);
        setSelectedMinute(null);
        setFormData({ name: '', email: '', phone: '', notes: '' });
        setBookingResult(null);
        setError(null);

        fetchAvailability()
            .then((data) => {
                setAvailability(data);
                if (data.service_id.length === 1) {
                    setSelectedService(data.service_id[0]);
                    setStep('date');
                }
            })
            .catch(() => { });
    };

    const handleBack = () => {
        switch (step) {
            case 'date':
                if (allServices.length > 1) {
                    setStep('service');
                    setSelectedDate(null);
                }
                break;
            case 'time':
                setStep('date');
                setSelectedHour(null);
                setSelectedMinute(null);
                break;
            case 'form':
                setStep('time');
                break;
        }
    };

    const navigateMonth = (direction: 1 | -1) => {
        setCurrentMonth((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + direction);
            return newDate;
        });
    };

    const stepIndex = { service: 0, date: 1, time: 2, form: 3, success: 4 };
    const totalSteps = 4;

    // Get step subtitle
    const getStepSubtitle = () => {
        switch (step) {
            case 'service': return 'Válasszon szolgáltatást';
            case 'date': return 'Válasszon napot';
            case 'time': return 'Válasszon időpontot';
            case 'form': return 'Adja meg adatait';
            case 'success': return 'Sikeres foglalás';
        }
    };

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
                        {getStepSubtitle()}
                    </p>
                </div>

                <div className="booking-widget__content">
                    {/* Step Indicator */}
                    {step !== 'success' && (
                        <div className="booking-widget__steps">
                            {Array.from({ length: totalSteps }).map((_, i) => (
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

                    {/* Step 1: Service Selection */}
                    {step === 'service' && (
                        <div className="booking-widget__fade-in">
                            <div className="booking-widget__service-list">
                                {allServices.map((service) => (
                                    <button
                                        key={service}
                                        type="button"
                                        className="booking-widget__service-card"
                                        onClick={() => handleServiceSelect(service)}
                                    >
                                        <span className="booking-widget__service-name">{service}</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Date Selection */}
                    {step === 'date' && (
                        <div className="booking-widget__fade-in">
                            {/* Selected Service Summary */}
                            <div className="booking-widget__selection-summary">
                                <span className="booking-widget__summary-text">
                                    🎯 {selectedService}
                                </span>
                            </div>

                            {/* Calendar */}
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
                                        const isPast = new Date(dateKey) < new Date(todayStr);

                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                className={`booking-widget__day ${isToday ? 'booking-widget__day--today' : ''
                                                    } ${!hasSlots || isPast ? 'booking-widget__day--disabled' : ''
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

                            {/* Navigation */}
                            {allServices.length > 1 && (
                                <div className="booking-widget__nav">
                                    <button
                                        type="button"
                                        className="booking-widget__button booking-widget__button--secondary"
                                        onClick={handleBack}
                                    >
                                        Vissza
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Time Selection (Hour + Minute on ONE screen) */}
                    {step === 'time' && (
                        <div className="booking-widget__fade-in">
                            {/* Summary */}
                            <div className="booking-widget__selection-summary">
                                <span className="booking-widget__summary-text">
                                    🎯 {selectedService} • {selectedDate && formatShortDate(selectedDate)}
                                    {selectedHour && selectedMinute && ` • ${selectedHour}:${selectedMinute}`}
                                </span>
                            </div>

                            {/* Hour Selection */}
                            <div className="booking-widget__time-section">
                                <label className="booking-widget__label booking-widget__label--step">
                                    <span className="booking-widget__step-number">1</span>
                                    Válasszon órát
                                </label>
                                <div className="booking-widget__time-grid">
                                    {availableHours.map((hour) => (
                                        <button
                                            key={hour}
                                            type="button"
                                            className={`booking-widget__time-btn ${selectedHour === hour ? 'booking-widget__time-btn--selected' : ''
                                                }`}
                                            onClick={() => handleHourSelect(hour)}
                                        >
                                            {hour}:00
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Minute Selection (appears after hour is selected) */}
                            {selectedHour && (
                                <div className="booking-widget__time-section booking-widget__fade-in">
                                    <label className="booking-widget__label booking-widget__label--step">
                                        <span className="booking-widget__step-number">2</span>
                                        Válasszon percet
                                    </label>
                                    <div className="booking-widget__time-grid">
                                        {availableMinutes.map((minute) => (
                                            <button
                                                key={minute}
                                                type="button"
                                                className={`booking-widget__time-btn ${selectedMinute === minute ? 'booking-widget__time-btn--selected' : ''
                                                    }`}
                                                onClick={() => handleMinuteSelect(minute)}
                                            >
                                                {selectedHour}:{minute}
                                            </button>
                                        ))}
                                    </div>
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
                                    disabled={!selectedSlot}
                                >
                                    Tovább
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Form */}
                    {step === 'form' && (
                        <div className="booking-widget__fade-in">
                            {/* Selected Summary */}
                            <div className="booking-widget__selection-summary">
                                <span className="booking-widget__summary-text">
                                    🎯 {selectedService} • {selectedDate && formatShortDate(selectedDate)} • {selectedHour}:{selectedMinute}
                                </span>
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
                                        <span className="booking-widget__success-label">Szolgáltatás</span>
                                        <span className="booking-widget__success-value">
                                            {bookingResult.service}
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
