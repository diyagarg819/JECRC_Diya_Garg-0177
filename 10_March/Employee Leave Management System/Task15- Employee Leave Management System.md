Question
5
Task: Employee Leave Management System
Description
Build a Leave Management System where employees can apply for leave and managers/admins can approve or reject leave requests.

This project demonstrates:

Frontend (HTML + CSS + JavaScript)

Backend (ASP.NET Core Web API)

Database (SQL Server)

Authentication (JWT)

Authorization (Role-Based Access)

🏢 Real-World Scenario
A company wants a simple leave management portal where:

Employees submit leave requests.

Managers review requests.

Admin manages all employees.

👥 System Roles
Role	Permissions
Admin	Manage employees
Manager	Approve/Reject leaves
Employee	Apply for leave
🗄 Database Tables
1️⃣ Users Table
Column	Type
Id	int
Username	nvarchar
Password	nvarchar
Role	nvarchar
Example Roles:

Admin
Manager
Employee
2️⃣ LeaveRequests Table
Column	Type
Id	int
EmployeeId	int
LeaveType	nvarchar
StartDate	date
EndDate	date
Reason	nvarchar
Status	nvarchar
Status Values:
Pending
Approved
Rejected
🌐 Web API Endpoints
🔐 Authentication APIs
Register User
POST /api/auth/register
Example:

{
 "username":"john",
 "password":"123",
 "role":"Employee"
}
Login
POST /api/auth/login
Response:

{
 "token":"JWT_TOKEN"
}
👤 Employee APIs
Apply Leave
POST /api/leave/apply
Body:

{
 "leaveType":"Sick Leave",
 "startDate":"2026-04-01",
 "endDate":"2026-04-02",
 "reason":"Fever"
}
View My Leave Requests
GET /api/leave/my-leaves
👨‍💼 Manager APIs
View All Leave Requests
GET /api/leave/all
Approve Leave
PUT /api/leave/approve/{id}
Reject Leave
PUT /api/leave/reject/{id}
👑 Admin APIs
Get All Employees
GET /api/admin/employees
Delete Employee
DELETE /api/admin/delete/{id}
💻 Frontend Tasks (HTML + CSS + JS)
Students must create pages:

Page	Purpose
Login Page	User login
Register Page	Create account
Dashboard	Role based dashboard
Apply Leave Page	Employee leave request
Leave List Page	View leave requests
🎨 UI Components
Students should implement:

✔ Login Form
✔ Register Form
✔ Leave Request Form
✔ Leave List Table
✔ Approve / Reject Buttons

⚙ JavaScript Tasks
Students must implement:

Feature	Concept
Login API Call	Fetch API
Store JWT Token	LocalStorage
Apply Leave	POST API
Load Leave Requests	GET API
Approve Leave	PUT API
Example:

fetch("https://localhost:5001/api/leave/apply", {
 method: "POST",
 headers: {
   "Content-Type": "application/json",
   "Authorization": "Bearer " + localStorage.getItem("token")
 },
 body: JSON.stringify(data)
});