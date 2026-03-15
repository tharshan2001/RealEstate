# 🏞️ Land Sales Platform — MERN Backend

A backend API for a land-only real estate platform. Built with **MongoDB, Express, React, Node.js** using **ES6** syntax. Supports public land browsing, buyer inquiry submission, and protected admin/agent management with a built-in CRM.

---

## Features

- Public API for browsing land listings and submitting inquiries
- JWT-protected routes for Admin and Agent roles
- CRM module to track and manage buyer leads
- Optional transaction/offer tracking
- Map-ready coordinates stored per listing

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES6 modules) |
| Framework | Express.js |
| Database | MongoDB via Mongoose |
| Auth | JSON Web Tokens (JWT) |
| Environment | dotenv |

---

## Project Structure

```
land-sales-backend/
├── server.js
├── .env
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Land.js
│   ├── Lead.js
│   └── Transaction.js
├── routes/
│   ├── auth.js
│   ├── lands.js
│   ├── leads.js
│   └── transactions.js
├── controllers/
│   ├── authController.js
│   ├── landController.js
│   ├── leadController.js
│   └── transactionController.js
└── middleware/
    ├── authMiddleware.js
    └── errorHandler.js
```

---

## Data Models

### User
Admins and agents only — buyers do not require accounts.

| Field | Type | Notes |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Hashed |
| `role` | String | `admin` or `agent` |
| `phone` | String | Optional |

---

### Land
Core listing entity for all land plots.

| Field | Type | Notes |
|---|---|---|
| `title` | String | Required |
| `description` | String | Detailed info |
| `price` | Number | Required |
| `area` | Number | sq meters or acres |
| `landType` | String | `residential`, `agricultural`, `commercial`, `industrial` |
| `utilities` | [String] | e.g. water, electricity, road access |
| `location` | Object | address, city, state, zipcode, lat/lng coordinates |
| `images` | [String] | Image URLs |
| `ownerName` | String | Landowner name |
| `ownerContact` | String | Phone or email |
| `assignedAgent` | ObjectId | Ref: User |
| `status` | String | `available` or `sold` |

---

### Lead *(CRM)*
Captures buyer inquiries — no login required.

| Field | Type | Notes |
|---|---|---|
| `land` | ObjectId | Ref: Land, required |
| `contactName` | String | Required |
| `contactEmail` | String | Optional |
| `contactPhone` | String | Optional |
| `message` | String | Inquiry text |
| `assignedAgent` | ObjectId | Ref: User |
| `status` | String | `new`, `contacted`, `inProgress`, `closed` |
| `priority` | String | `low`, `medium`, `high` |

---

### Transaction *(Optional)*
Tracks offers and purchase attempts.

| Field | Type | Notes |
|---|---|---|
| `land` | ObjectId | Ref: Land |
| `buyerName` | String | Required |
| `buyerContact` | String | Optional |
| `offerPrice` | Number | Required |
| `status` | String | `pending`, `accepted`, `rejected` |

---

## API Routes

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/login` | Public |

### Lands
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/lands` | Public |
| GET | `/api/lands/:id` | Public |
| POST | `/api/lands` | Protected |
| PUT | `/api/lands/:id` | Protected |
| DELETE | `/api/lands/:id` | Protected |

### Leads *(CRM)*
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/leads` | Public |
| GET | `/api/leads` | Protected |
| PUT | `/api/leads/:id` | Protected |

### Transactions
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/transactions` | Public |
| GET | `/api/transactions` | Protected |
| PUT | `/api/transactions/:id` | Protected |

> **Protected** routes require a `Bearer <token>` header obtained from `/api/auth/login`.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Run the server

```bash
# Development
npm run dev

# Production
npm start
```

---

## Authentication Flow

1. Admin or agent calls `POST /api/auth/login` with email and password
2. Server returns a signed JWT
3. Include the token in subsequent requests:
   ```
   Authorization: Bearer <token>
   ```

---

## Notes

- Buyers submit inquiries via `POST /api/leads` with no authentication required
- All models include `createdAt` and `updatedAt` timestamps automatically
- `location.coordinates` (lat/lng) supports map-based filtering on the frontend
- CRM lead status and priority fields support agent workflow management
