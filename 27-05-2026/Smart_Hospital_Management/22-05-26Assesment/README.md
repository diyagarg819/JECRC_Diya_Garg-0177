# Central Hospital Platform

Assessment project for a multi-branch hospital digital platform using React, ASP.NET Core Web API, SQL Server design, JWT-style auth, SignalR, Docker, and Azure DevOps scaffolding.

## What Is Implemented

- React frontend with role-aware login, admin dashboard, appointment scheduler, emergency tracking, realtime notification area, and symptom checker.
- ASP.NET Core Web API with patients, doctors, appointments, lab reports, prescriptions, billing, emergency, analytics, audit, and auth endpoints.
- SignalR hub for realtime appointment and emergency events.
- Appointment conflict prevention for overlapping doctor slots.
- Dockerfiles, compose file, Azure Pipeline, SQL Server schema, and architecture notes.

## Demo Accounts

- `admin@hospital.local` / `Admin@123`
- `doctor@hospital.local` / `Doctor@123`
- `patient@hospital.local` / `Patient@123`

## Run Locally

Start the API:

```powershell
dotnet run --project .\src\Hospital.Api\Hospital.Api.csproj --urls http://localhost:5187
```

Install and start the React app:

```powershell
cd .\web
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:5173`.

## Docker

```powershell
docker compose -f .\infra\docker\docker-compose.yml up --build
```

## Next Production Steps

- Replace the in-memory repository with SQL Server persistence using EF Core or Dapper.
- Integrate ASP.NET Core Identity stores and the official JWT bearer middleware.
- Add Azure SignalR Service and Application Insights.
- Add payment gateway provider SDK and pharmacy microservice.
- Add test projects for booking conflicts, authorization, and API contracts.
