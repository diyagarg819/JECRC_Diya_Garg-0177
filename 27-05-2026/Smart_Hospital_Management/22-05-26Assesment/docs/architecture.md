# Architecture

The platform is split into three assessment layers:

- Frontend layer: `web/` React dashboard for patients, doctors, branch admins, billing, pharmacy, lab, emergency, and telemedicine workflows.
- Backend layer: `src/Hospital.Api/` ASP.NET Core Web API. Endpoint modules live under `Features`, business rules live under `Application`, domain records live under `Domain`, and repository/audit adapters live under `Infrastructure`.
- Database layer: `infra/sql/schema.sql` SQL Server schema for identity, branches, patients, appointments, clinical data, billing, pharmacy, telemedicine, emergency, and audit logging.

The API currently uses an in-memory repository so the assessment can run without external dependencies, while the SQL script defines the production persistence model.

## Runtime Modules

- Patient Portal: registration, appointments, prescriptions, lab reports, billing visibility.
- Doctor Dashboard: appointment queue, video consult indicator, prescriptions, reports.
- Appointment Scheduler: conflict detection around doctor and time-slot overlap.
- Lab & Prescription Management: clinical report and prescription endpoints.
- Billing & Insurance: invoice endpoints and payment gateway session placeholder.
- Pharmacy: inventory and medication order endpoints, designed to become an independently deployed service.
- Telemedicine: video consult flag, room-ready session model, and symptom checker endpoint.
- Admin Analytics Dashboard: operational branch metrics, emergency counts, billing status.

## Security

- JWT bearer-style authentication is implemented locally for the demo.
- Role checks are applied on administrative, billing, and registration actions.
- Audit logging records security-sensitive actions.
- Production should move signing keys to Azure Key Vault, use HTTPS only, encrypt PHI at rest, and add SQL row-level branch isolation where appropriate.

## Scale and Reliability

- SignalR provides realtime appointment and emergency notifications.
- Appointment creation uses a lock in the local repository; SQL Server should enforce the same rule using transactions and an overlap check.
- Billing and pharmacy have separate endpoint modules and database tables so they can be extracted into microservices without changing the frontend contracts.
- Azure deployment should use App Service or AKS, Azure SQL, Azure SignalR Service, Key Vault, Application Insights, and Front Door or Application Gateway.
