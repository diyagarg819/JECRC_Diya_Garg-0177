# 🚚 LogiTrack — Logistics & Supply Chain System

A full-stack logistics management platform built with **ASP.NET Core 8** + **Angular 17**.

---

## 📁 Project Structure

```
LogiTrack/
├── backend/
│   ├── LogiTrack.API/           # ASP.NET Core Web API (controllers, startup)
│   ├── LogiTrack.Application/   # Services, DTOs, interfaces, AutoMapper
│   ├── LogiTrack.Core/          # Domain entities, enums, repository interfaces
│   └── LogiTrack.Infrastructure/# EF Core, repositories, SignalR hub, Kafka
├── frontend/
│   └── src/app/
│       ├── core/                # Models, services, guards, interceptors
│       ├── layout/              # Shell component (sidebar + topbar)
│       └── modules/
│           ├── dashboard/       # KPI overview, charts
│           ├── shipments/       # List, detail, public tracking
│           ├── fleet/           # Live GPS fleet view
│           ├── warehouse/       # Inventory management
│           ├── routes/          # Route optimization
│           ├── analytics/       # Charts & reporting
│           ├── customers/       # Customer management
│           └── auth/            # Login
├── docker-compose.yml
└── README.md
```

---

## 🛠️ Prerequisites

| Tool | Version |
|------|---------|
| .NET SDK | 8.0+ |
| Node.js | 20+ |
| Angular CLI | 17+ |
| PostgreSQL | 15+ |
| Docker & Docker Compose | Latest |

---

## 🚀 Quick Start

### Option A — Docker (Recommended)

```bash
# Clone & start everything
docker-compose up -d

# Access:
# Frontend:  http://localhost:4200
# API:       http://localhost:5000
# Swagger:   http://localhost:5000/swagger
```

---

### Option B — Manual Setup

#### 1. Database — PostgreSQL

```sql
CREATE DATABASE "LogiTrackDb";
```

Or update `backend/LogiTrack.API/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=LogiTrackDb;Username=YOUR_USER;Password=YOUR_PASS"
}
```

#### 2. Backend — ASP.NET Core

```bash
cd backend

# Restore packages
dotnet restore LogiTrack.sln

# Apply EF Core migrations (auto-runs on startup too)
cd LogiTrack.API
dotnet ef database update --project ../LogiTrack.Infrastructure

# Run the API
dotnet run
# API runs at: http://localhost:5000
# Swagger UI:  http://localhost:5000/swagger
```

#### 3. Frontend — Angular

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
ng serve
# Runs at: http://localhost:4200
```

---

## 🗄️ Database Migrations

```bash
cd backend/LogiTrack.API

# Add new migration
dotnet ef migrations add MigrationName --project ../LogiTrack.Infrastructure

# Apply migrations
dotnet ef database update --project ../LogiTrack.Infrastructure

# Rollback
dotnet ef database update PreviousMigrationName --project ../LogiTrack.Infrastructure
```

---

## 📡 Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/shipments | Paginated shipments list |
| POST | /api/shipments | Create shipment |
| GET | /api/shipments/track/{number} | Public tracking |
| PATCH | /api/shipments/{id}/status | Update status |
| POST | /api/shipments/{id}/assign | Assign driver + vehicle |
| GET | /api/vehicles | All vehicles |
| GET | /api/vehicles/fleet-summary | Fleet status counts |
| POST | /api/vehicles/telemetry | IoT telemetry push |
| GET | /api/analytics/dashboard | Dashboard KPIs |
| POST | /api/routes/optimize | Route optimization |

---

## 🔌 Real-Time (SignalR)

Hub URL: `http://localhost:5000/hubs/tracking`

**Client methods to invoke:**
```javascript
hub.invoke('JoinFleetRoom')           // Subscribe to all vehicle updates
hub.invoke('JoinShipmentGroup', 'LT20240101XXXXX')  // Track one shipment
hub.invoke('JoinVehicleGroup', vehicleId)
```

**Events received:**
```javascript
hub.on('VehicleLocationUpdated', (msg) => { ... })
hub.on('ShipmentStatusUpdated', (msg) => { ... })
hub.on('FleetAlertReceived', (msg) => { ... })
```

---

## 🗺️ Google Maps Setup

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable: Maps JavaScript API, Directions API, Geocoding API
3. Add to `frontend/src/environments/environment.ts`:
   ```typescript
   googleMapsApiKey: 'YOUR_KEY_HERE'
   ```
4. Add to `backend/LogiTrack.API/appsettings.json`:
   ```json
   "GoogleMaps": { "ApiKey": "YOUR_KEY_HERE" }
   ```

---

## ⚡ Kafka (Optional)

Kafka is used for IoT vehicle telemetry streaming.

```bash
# Start with Docker
docker-compose up kafka zookeeper -d

# Topics auto-created:
# - vehicle-telemetry
# - shipment-events

# Enable consumer in Program.cs:
# builder.Services.AddHostedService<VehicleTelemetryConsumer>();
```

---

## 🏗️ Architecture

```
Angular 17 (SPA)
     │ HTTP REST + SignalR WebSocket
     ▼
ASP.NET Core 8 API
     │
     ├── Application Layer  (Services, DTOs, AutoMapper)
     ├── Domain Layer       (Entities, Interfaces)
     └── Infrastructure
           ├── PostgreSQL (EF Core)
           ├── SignalR Hub (live GPS)
           └── Kafka Consumer (IoT telemetry)
```

---

## 🧩 Modules

| Module | Features |
|--------|----------|
| **Dashboard** | KPI cards, order trend chart, shipping method breakdown, fleet gauge, recent deliveries |
| **Shipments** | Paginated list, status filter, create/assign/update, full tracking timeline |
| **Fleet** | Live vehicle list, status filter, map placeholder, vehicle detail panel, SignalR updates |
| **Warehouse** | Warehouse cards with capacity bars, inventory table, barcode scan simulation, low-stock alerts |
| **Routes** | Route planner form, waypoint management, optimization call, result display |
| **Analytics** | Delivery trend (SVG line chart), revenue bar chart, fuel area chart, driver performance table |
| **Customers** | Card grid, search, add modal, detail panel |
| **Public Tracking** | No-login shipment tracking page at `/track/:trackingNumber` |

---

## 📦 Tech Stack

**Backend:**
- ASP.NET Core 8 · Clean Architecture
- Entity Framework Core 8 + Npgsql (PostgreSQL)
- SignalR (real-time WebSocket)
- Confluent.Kafka (event streaming)
- AutoMapper · Serilog · JWT Auth

**Frontend:**
- Angular 17 (Standalone components, Signals)
- RxJS · Angular Router (lazy loading)
- @microsoft/signalr
- Pure CSS (no component library required)

---

## 🔑 Default Login

```
Email:    admin@logitrack.com
Password: admin123
```

> In demo mode the frontend works without a running backend — all pages fall back to realistic mock data.

---

## 📝 License

MIT — free to use and modify for commercial projects.
