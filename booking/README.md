# Booking Component

Újrahasznosítható React időpontfoglaló komponens. Modern, prémium kinézettel.

## Fájlstruktúra

```
booking-component/
├── BookingWidget.tsx   # Fő React komponens
├── api.ts              # API hívások
├── types.ts            # TypeScript típusok
├── styles.css          # Stílusok
└── README.md           # Dokumentáció
```

## Használat

```tsx
import { BookingWidget } from './booking-component/BookingWidget';
import './booking-component/styles.css';

function App() {
  return (
    <BookingWidget
      baseUrl="https://api.example.com"
      publicApiKey="PUBLIC_GET_KEY"
      bookingApiKey="BOOKING_POST_KEY"
    />
  );
}
```

## Props

| Prop | Típus | Leírás |
|------|-------|--------|
| `baseUrl` | `string` | Backend URL |
| `publicApiKey` | `string` | API kulcs elérhetőségek lekéréséhez |
| `bookingApiKey` | `string` | API kulcs foglalás létrehozásához |

## API Elvárások

### GET /get-availability

```
Authorization: Bearer PUBLIC_GET_KEY
```

Válasz:
```json
{
  "account_name": "Szolgáltató neve",
  "slots": [
    { "date": "2024-01-15", "time": "10:00", "datetime": "2024-01-15T10:00:00Z" }
  ],
  "service_id": ["Szolgáltatás 1", "Szolgáltatás 2"]
}
```

### POST /create-booking

```
Authorization: Bearer BOOKING_POST_KEY
Content-Type: application/json
```

Request body:
```json
{
  "name": "Ügyfél neve",
  "datetime": "2024-01-15T10:00:00Z",
  "service": "Szolgáltatás 1",
  "email": "pelda@email.com",
  "phone": "+36301234567",
  "notes": "Megjegyzés"
}
```

Hibakódok:
- `409`: Időpont már foglalt

## UI Flow

1. **Dátumválasztás** – Naptár, csak elérhető napok kattinthatók
2. **Időpont választás** – Gombos lista + szolgáltatás választó
3. **Adatok megadása** – Név (kötelező), email, telefon, megjegyzés
4. **Sikeres foglalás** – Összefoglaló + "Új foglalás" gomb

## Testreszabás

A stílusok CSS custom properties-t használnak. A `styles.css` elején módosíthatók:

```css
.booking-widget {
  --bw-primary: #0066FF;
  --bw-radius: 12px;
  /* ... */
}
```
