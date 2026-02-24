# Helen Wine Shop — Backend

This is an Express + MongoDB backend for the Helen Wine Shop catalog and order requests.

Getting started:

1. Copy `.env.example` to `.env` and set `MONGODB_URI`.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Seed sample data:

```bash
npm run seed
```

4. Run server:

```bash
npm run dev
```

API endpoints:
- `GET /api/wines` — list wines
- `GET /api/wines/:id` — get single wine
- `POST /api/orders` — submit order (body: customerName, phone, deliveryArea, notes, items)
