-- ============================================================================
-- Enterprise HRMS & Payroll Platform — Database Initialization Script
-- PostgreSQL 16 compatible DDL with Multi-Tenant Schema and Partitioning
-- ============================================================================

-- Create Extension for UUID generation if needed (though gen_random_uuid is native in pg 13+)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. BASE TABLES (Unpartitioned)
-- ============================================================================

-- Departments Table
CREATE TABLE Departments (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IX_Departments_TenantId ON Departments(TenantId);

-- Designations Table
CREATE TABLE Designations (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Level INT,
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IX_Designations_TenantId ON Designations(TenantId);

-- Employees Table
CREATE TABLE Employees (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    EmployeeCode VARCHAR(30) NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(20),
    DepartmentId UUID REFERENCES Departments(Id) ON DELETE SET NULL,
    DesignationId UUID REFERENCES Designations(Id) ON DELETE SET NULL,
    ManagerId UUID REFERENCES Employees(Id) ON DELETE SET NULL,
    DateOfJoining DATE NOT NULL,
    DateOfBirth DATE,
    EmploymentType VARCHAR(30) NOT NULL, -- e.g., 'FullTime', 'Contractor', 'PartTime'
    Status VARCHAR(30) DEFAULT 'active', -- e.g., 'active', 'suspended', 'terminated'
    ProfilePhotoUrl VARCHAR(500),
    IsDeleted BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMPTZ DEFAULT NOW(),
    UpdatedAt TIMESTAMPTZ,
    UNIQUE(TenantId, EmployeeCode),
    UNIQUE(TenantId, Email)
);
CREATE INDEX IX_Employees_TenantId ON Employees(TenantId);
CREATE INDEX IX_Employees_Email ON Employees(Email);

-- Shifts Table
CREATE TABLE Shifts (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    Name VARCHAR(100) NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    IsNightShift BOOLEAN DEFAULT FALSE,
    GraceMinutes INT DEFAULT 15,
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IX_Shifts_TenantId ON Shifts(TenantId);

-- Attendance Punches Table
CREATE TABLE AttendancePunches (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    EmployeeId UUID NOT NULL REFERENCES Employees(Id) ON DELETE CASCADE,
    PunchTime TIMESTAMPTZ NOT NULL,
    PunchType VARCHAR(20) NOT NULL, -- 'IN' or 'OUT'
    DeviceId VARCHAR(100),
    RawPayload JSONB,
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IX_AttendancePunches_TenantId ON AttendancePunches(TenantId);
CREATE INDEX IX_AttendancePunches_EmployeeId_PunchTime ON AttendancePunches(EmployeeId, PunchTime);

-- Leave Types Table
CREATE TABLE LeaveTypes (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    Name VARCHAR(100) NOT NULL,
    MaxDays INT NOT NULL,
    AllowNegativeBalance BOOLEAN DEFAULT FALSE,
    IsCarryForward BOOLEAN DEFAULT TRUE,
    IsLWP BOOLEAN DEFAULT FALSE
);
CREATE INDEX IX_LeaveTypes_TenantId ON LeaveTypes(TenantId);

-- Leave Requests Table
CREATE TABLE LeaveRequests (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    EmployeeId UUID NOT NULL REFERENCES Employees(Id) ON DELETE CASCADE,
    LeaveTypeId UUID NOT NULL REFERENCES LeaveTypes(Id),
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    TotalDays DECIMAL(6,2) NOT NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
    WorkflowInstanceId VARCHAR(100),
    Reason TEXT,
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IX_LeaveRequests_TenantId ON LeaveRequests(TenantId);
CREATE INDEX IX_LeaveRequests_EmployeeId ON LeaveRequests(EmployeeId);

-- Salary Revisions Table
CREATE TABLE SalaryRevisions (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    EmployeeId UUID NOT NULL REFERENCES Employees(Id) ON DELETE CASCADE,
    EffectiveDate DATE NOT NULL,
    OldSalary NUMERIC(19,6) NOT NULL,
    NewSalary NUMERIC(19,6) NOT NULL,
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IX_SalaryRevisions_TenantId ON SalaryRevisions(TenantId);
CREATE INDEX IX_SalaryRevisions_EmployeeId ON SalaryRevisions(EmployeeId);

-- Assets Table
CREATE TABLE Assets (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    AssetCode VARCHAR(50) NOT NULL,
    AssetName VARCHAR(200) NOT NULL,
    Category VARCHAR(100),
    SerialNumber VARCHAR(100),
    Status VARCHAR(30) NOT NULL DEFAULT 'Available', -- 'Available', 'Assigned', 'UnderRepair', 'Scrapped'
    AssignedTo UUID REFERENCES Employees(Id) ON DELETE SET NULL,
    PurchaseDate DATE,
    PurchaseCost NUMERIC(19,6),
    CurrentValue NUMERIC(19,6),
    CreatedAt TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(TenantId, AssetCode)
);
CREATE INDEX IX_Assets_TenantId ON Assets(TenantId);
CREATE INDEX IX_Assets_AssignedTo ON Assets(AssignedTo);

-- Idempotency Keys Table
CREATE TABLE IdempotencyKeys (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    Key VARCHAR(255) NOT NULL,
    RequestHash TEXT,
    Response JSONB,
    CreatedAt TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(TenantId, Key)
);
CREATE INDEX IX_IdempotencyKeys_TenantId_Key ON IdempotencyKeys(TenantId, Key);

-- Outbox Messages Table (Event-Driven Outbox Pattern)
CREATE TABLE OutboxMessages (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    TenantId UUID NOT NULL,
    EventType VARCHAR(255) NOT NULL,
    Payload JSONB NOT NULL,
    ProcessedAt TIMESTAMPTZ,
    Error TEXT,
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IX_OutboxMessages_ProcessedAt ON OutboxMessages(ProcessedAt) WHERE ProcessedAt IS NULL;

-- ============================================================================
-- 2. PARTITIONED TABLES
-- ============================================================================

-- Attendance Records (Partitioned by Range on BusinessDate)
CREATE TABLE AttendanceRecords (
    Id UUID NOT NULL,
    TenantId UUID NOT NULL,
    EmployeeId UUID NOT NULL REFERENCES Employees(Id) ON DELETE CASCADE,
    ShiftId UUID REFERENCES Shifts(Id) ON DELETE SET NULL,
    BusinessDate DATE NOT NULL,
    CheckIn TIMESTAMPTZ,
    CheckOut TIMESTAMPTZ,
    WorkedMinutes INT DEFAULT 0,
    OvertimeMinutes INT DEFAULT 0,
    Status VARCHAR(30), -- 'Present', 'Absent', 'OnLeave', 'HalfDay'
    Source VARCHAR(30), -- 'Biometric', 'Web', 'Mobile'
    TimezoneId VARCHAR(100) DEFAULT 'UTC',
    AutoCheckout BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (Id, BusinessDate)
) PARTITION BY RANGE (BusinessDate);

CREATE INDEX IX_AttendanceRecords_TenantId_BusinessDate ON AttendanceRecords(TenantId, BusinessDate);

-- Payroll Records (Partitioned by Range on PayPeriodStart)
CREATE TABLE PayrollRecords (
    Id UUID NOT NULL,
    TenantId UUID NOT NULL,
    EmployeeId UUID NOT NULL REFERENCES Employees(Id) ON DELETE CASCADE,
    PayPeriodStart DATE NOT NULL,
    PayPeriodEnd DATE NOT NULL,
    CurrencyCode VARCHAR(10) NOT NULL DEFAULT 'INR',
    BasicSalary NUMERIC(19,6) NOT NULL,
    GrossSalary NUMERIC(19,6) NOT NULL,
    TotalDeductions NUMERIC(19,6) NOT NULL,
    NetSalary NUMERIC(19,6) NOT NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Draft', -- 'Draft', 'Approved', 'Paid'
    LockVersion INT DEFAULT 0,
    PayslipUrl VARCHAR(500),
    CreatedAt TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (Id, PayPeriodStart)
) PARTITION BY RANGE (PayPeriodStart);

CREATE INDEX IX_PayrollRecords_TenantId_PayPeriodStart ON PayrollRecords(TenantId, PayPeriodStart);

-- Audit Logs (Partitioned by Range on CreatedAt)
CREATE TABLE AuditLogs (
    Id UUID NOT NULL,
    TenantId UUID NOT NULL,
    UserId UUID,
    Action VARCHAR(100) NOT NULL,
    EntityType VARCHAR(100) NOT NULL,
    EntityId UUID NOT NULL,
    OldValues JSONB,
    NewValues JSONB,
    CorrelationId UUID,
    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (Id, CreatedAt)
) PARTITION BY RANGE (CreatedAt);

CREATE INDEX IX_AuditLogs_TenantId_CreatedAt ON AuditLogs(TenantId, CreatedAt);

-- ============================================================================
-- 3. PARTITION DEFS (Default + Monthly Ranges for Q2/Q3 2026)
-- ============================================================================

-- Attendance Records Partitions
CREATE TABLE AttendanceRecords_Default PARTITION OF AttendanceRecords DEFAULT;
CREATE TABLE AttendanceRecords_2026_04 PARTITION OF AttendanceRecords FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE AttendanceRecords_2026_05 PARTITION OF AttendanceRecords FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
CREATE TABLE AttendanceRecords_2026_06 PARTITION OF AttendanceRecords FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE TABLE AttendanceRecords_2026_07 PARTITION OF AttendanceRecords FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');

-- Payroll Records Partitions
CREATE TABLE PayrollRecords_Default PARTITION OF PayrollRecords DEFAULT;
CREATE TABLE PayrollRecords_2026_04 PARTITION OF PayrollRecords FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE PayrollRecords_2026_05 PARTITION OF PayrollRecords FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
CREATE TABLE PayrollRecords_2026_06 PARTITION OF PayrollRecords FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE TABLE PayrollRecords_2026_07 PARTITION OF PayrollRecords FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');

-- Audit Logs Partitions
CREATE TABLE AuditLogs_Default PARTITION OF AuditLogs DEFAULT;
CREATE TABLE AuditLogs_2026_04 PARTITION OF AuditLogs FOR VALUES FROM ('2026-04-01 00:00:00+00') TO ('2026-05-01 00:00:00+00');
CREATE TABLE AuditLogs_2026_05 PARTITION OF AuditLogs FOR VALUES FROM ('2026-05-01 00:00:00+00') TO ('2026-06-01 00:00:00+00');
CREATE TABLE AuditLogs_2026_06 PARTITION OF AuditLogs FOR VALUES FROM ('2026-06-01 00:00:00+00') TO ('2026-07-01 00:00:00+00');
CREATE TABLE AuditLogs_2026_07 PARTITION OF AuditLogs FOR VALUES FROM ('2026-07-01 00:00:00+00') TO ('2026-08-01 00:00:00+00');

-- ============================================================================
-- 4. SEED DATA
-- ============================================================================

-- Establish Tenant UUIDs:
-- Tenant 1: e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6 (Capgemini India - IN)
-- Tenant 2: 7f04c0cf-031e-450f-a189-e1fca9473fa7 (Capgemini USA - US)

-- Seed Departments
INSERT INTO Departments (Id, TenantId, Name, Description) VALUES
('6b2b2b1a-9694-4d89-9a74-b5861b585321', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'Engineering', 'Software Development and IT Operations'),
('d5d71c84-9c8b-4b14-998f-0d944e82df4b', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'Human Resources', 'Talent acquisition, benefits, employee care'),
('707c7c34-eb17-48f1-8f52-87053ff8479a', '7f04c0cf-031e-450f-a189-e1fca9473fa7', 'Engineering', 'US Software Dev Center'),
('c3c3a078-4357-41ec-b82b-8a56b509ef48', '7f04c0cf-031e-450f-a189-e1fca9473fa7', 'Sales', 'North America Sales Operations');

-- Seed Designations
INSERT INTO Designations (Id, TenantId, Name, Level) VALUES
('b2707248-ff35-4cb2-83b6-79750058b8ff', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'Software Engineer', 1),
('2d04a6fc-6e47-497f-a607-b2eb995f9d14', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'Lead Engineer', 2),
('649f3e49-8c46-4cb4-8a47-efb1297e6118', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'HR Manager', 3),
('955ca0d8-04fe-4c6e-bb8b-d7d8a6b31c19', '7f04c0cf-031e-450f-a189-e1fca9473fa7', 'Senior Principal Engineer', 4),
('8fa82b79-c290-482a-a9a7-96a935fa78fe', '7f04c0cf-031e-450f-a189-e1fca9473fa7', 'Sales Executive', 1);

-- Seed Shifts
INSERT INTO Shifts (Id, TenantId, Name, StartTime, EndTime, IsNightShift, GraceMinutes) VALUES
('8a123f11-9a74-4b58-9a74-0f321481b49f', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'General Shift', '09:00:00', '18:00:00', FALSE, 15),
('5f153f22-9a74-4b58-9a74-0f321481b49a', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'Night Shift', '22:00:00', '07:00:00', TRUE, 15),
('d2955ca1-04fe-4c6e-bb8b-d7d8a6b31c10', '7f04c0cf-031e-450f-a189-e1fca9473fa7', 'Standard US Eastern', '08:30:00', '17:30:00', FALSE, 15);

-- Seed Leave Types
INSERT INTO LeaveTypes (Id, TenantId, Name, MaxDays, AllowNegativeBalance, IsCarryForward, IsLWP) VALUES
('a2b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'Casual Leave', 12, FALSE, FALSE, FALSE),
('3a7b97b0-3a7b-4df2-bdcb-a032de2a1bf6', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'Sick Leave', 10, FALSE, FALSE, FALSE),
('4df27b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'Earned Leave', 18, FALSE, TRUE, FALSE),
('bdcb7b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'Leave Without Pay', 365, TRUE, FALSE, TRUE),
('7f04c0cf-031e-450f-a189-e1fca9473fa0', '7f04c0cf-031e-450f-a189-e1fca9473fa7', 'Paid Time Off', 25, FALSE, TRUE, FALSE);

-- Seed Employees
-- SuperAdmin and HR Managers
INSERT INTO Employees (Id, TenantId, EmployeeCode, FirstName, LastName, Email, PhoneNumber, DepartmentId, DesignationId, DateOfJoining, EmploymentType, Status) VALUES
('fe082fb1-4ca3-4a17-8e68-fb9e2d63428f', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'EMP-IN-001', 'Rajesh', 'Kumar', 'rajesh.kumar@capgemini-in.com', '+919876543210', 'd5d71c84-9c8b-4b14-998f-0d944e82df4b', '649f3e49-8c46-4cb4-8a47-efb1297e6118', '2022-01-15', 'FullTime', 'active'),
('ae082fb1-4ca3-4a17-8e68-fb9e2d63428a', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'EMP-IN-002', 'Amit', 'Sharma', 'amit.sharma@capgemini-in.com', '+919876543211', '6b2b2b1a-9694-4d89-9a74-b5861b585321', '2d04a6fc-6e47-497f-a607-b2eb995f9d14', '2023-04-10', 'FullTime', 'active'),
('ce082fb1-4ca3-4a17-8e68-fb9e2d63428c', 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', 'EMP-IN-003', 'Priya', 'Patel', 'priya.patel@capgemini-in.com', '+919876543212', '6b2b2b1a-9694-4d89-9a74-b5861b585321', 'b2707248-ff35-4cb2-83b6-79750058b8ff', '2024-06-01', 'FullTime', 'active');

INSERT INTO Employees (Id, TenantId, EmployeeCode, FirstName, LastName, Email, PhoneNumber, DepartmentId, DesignationId, DateOfJoining, EmploymentType, Status) VALUES
('be082fb1-4ca3-4a17-8e68-fb9e2d63428b', '7f04c0cf-031e-450f-a189-e1fca9473fa7', 'EMP-US-001', 'Sarah', 'Connor', 'sarah.connor@capgemini-us.com', '+1555019921', '707c7c34-eb17-48f1-8f52-87053ff8479a', '955ca0d8-04fe-4c6e-bb8b-d7d8a6b31c19', '2020-03-20', 'FullTime', 'active'),
('de082fb1-4ca3-4a17-8e68-fb9e2d63428d', '7f04c0cf-031e-450f-a189-e1fca9473fa7', 'EMP-US-002', 'John', 'Doe', 'john.doe@capgemini-us.com', '+1555019922', 'c3c3a078-4357-41ec-b82b-8a56b509ef48', '8fa82b79-c290-482a-a9a7-96a935fa78fe', '2025-01-10', 'FullTime', 'active');

-- Update Priyas Manager to Amit, Amits Manager to Rajesh
UPDATE Employees SET ManagerId = 'ae082fb1-4ca3-4a17-8e68-fb9e2d63428a' WHERE Id = 'ce082fb1-4ca3-4a17-8e68-fb9e2d63428c';
UPDATE Employees SET ManagerId = 'fe082fb1-4ca3-4a17-8e68-fb9e2d63428f' WHERE Id = 'ae082fb1-4ca3-4a17-8e68-fb9e2d63428a';
UPDATE Employees SET ManagerId = 'be082fb1-4ca3-4a17-8e68-fb9e2d63428b' WHERE Id = 'de082fb1-4ca3-4a17-8e68-fb9e2d63428d';
