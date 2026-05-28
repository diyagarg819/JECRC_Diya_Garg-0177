using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HRMS.Core.Common;
using HRMS.Core.Entities;

namespace HRMS.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        private readonly ITenantProvider _tenantProvider;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ITenantProvider tenantProvider)
            : base(options)
        {
            _tenantProvider = tenantProvider;
        }

        public DbSet<Department> Departments => Set<Department>();
        public DbSet<Designation> Designations => Set<Designation>();
        public DbSet<Employee> Employees => Set<Employee>();
        public DbSet<Shift> Shifts => Set<Shift>();
        public DbSet<AttendanceRecord> AttendanceRecords => Set<AttendanceRecord>();
        public DbSet<AttendancePunch> AttendancePunches => Set<AttendancePunch>();
        public DbSet<LeaveType> LeaveTypes => Set<LeaveType>();
        public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();
        public DbSet<PayrollRecord> PayrollRecords => Set<PayrollRecord>();
        public DbSet<SalaryRevision> SalaryRevisions => Set<SalaryRevision>();
        public DbSet<Asset> Assets => Set<Asset>();
        public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
        public DbSet<IdempotencyKey> IdempotencyKeys => Set<IdempotencyKey>();
        public DbSet<OutboxMessage> OutboxMessages => Set<OutboxMessage>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Table Names to match PostgreSQL schema (case-sensitive if needed, let's keep them matched)
            modelBuilder.Entity<Department>().ToTable("departments");
            modelBuilder.Entity<Designation>().ToTable("designations");
            modelBuilder.Entity<Employee>().ToTable("employees");
            modelBuilder.Entity<Shift>().ToTable("shifts");
            modelBuilder.Entity<AttendanceRecord>().ToTable("attendancerecords");
            modelBuilder.Entity<AttendancePunch>().ToTable("attendancepunches");
            modelBuilder.Entity<LeaveType>().ToTable("leavetypes");
            modelBuilder.Entity<LeaveRequest>().ToTable("leaverequests");
            modelBuilder.Entity<PayrollRecord>().ToTable("payrollrecords");
            modelBuilder.Entity<SalaryRevision>().ToTable("salaryrevisions");
            modelBuilder.Entity<Asset>().ToTable("assets");
            modelBuilder.Entity<AuditLog>().ToTable("auditlogs");
            modelBuilder.Entity<IdempotencyKey>().ToTable("idempotencykeys");
            modelBuilder.Entity<OutboxMessage>().ToTable("outboxmessages");

            // Multi-Tenant Global Query Filters
            modelBuilder.Entity<Department>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<Designation>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<Employee>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId && !e.IsDeleted);
            modelBuilder.Entity<Shift>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<AttendanceRecord>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<AttendancePunch>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<LeaveType>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<LeaveRequest>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<PayrollRecord>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<SalaryRevision>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<Asset>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<AuditLog>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<IdempotencyKey>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);
            modelBuilder.Entity<OutboxMessage>().HasQueryFilter(e => e.TenantId == _tenantProvider.TenantId);

            // Configure Composite Keys for Partitioned Tables
            modelBuilder.Entity<AttendanceRecord>().HasKey(a => new { a.Id, a.BusinessDate });
            modelBuilder.Entity<PayrollRecord>().HasKey(p => new { p.Id, p.PayPeriodStart });
            modelBuilder.Entity<AuditLog>().HasKey(a => new { a.Id, a.CreatedAt });

            // Configure Entity Constraints and Relationships
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Manager)
                .WithMany()
                .HasForeignKey(e => e.ManagerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Department)
                .WithMany()
                .HasForeignKey(e => e.DepartmentId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Designation)
                .WithMany()
                .HasForeignKey(e => e.DesignationId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Asset>()
                .HasOne(a => a.AssignedEmployee)
                .WithMany()
                .HasForeignKey(a => a.AssignedTo)
                .OnDelete(DeleteBehavior.SetNull);

            // Loop to map all table names and column names to lowercase to match PostgreSQL default folding behavior
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                var tableName = entity.GetTableName();
                if (tableName != null)
                {
                    entity.SetTableName(tableName.ToLowerInvariant());
                }

                foreach (var property in entity.GetProperties())
                {
                    property.SetColumnName(property.Name.ToLowerInvariant());
                }
            }
        }

        public override int SaveChanges()
        {
            ApplyTenantId();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            ApplyTenantId();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void ApplyTenantId()
        {
            var currentTenantId = _tenantProvider.TenantId;
            if (currentTenantId == Guid.Empty)
            {
                // In background jobs or migrations, a default system tenant ID might be needed
                // If it is completely unassigned, we skip setting it so that the application does not crash
                return;
            }

            var entries = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                // Proactively set the TenantId on added entities
                var tenantIdProp = entry.Properties.FirstOrDefault(p => p.Metadata.Name == "TenantId");
                if (tenantIdProp != null)
                {
                    if (entry.State == EntityState.Added)
                    {
                        tenantIdProp.CurrentValue = currentTenantId;
                    }
                    else if (entry.State == EntityState.Modified && (Guid?)tenantIdProp.CurrentValue != currentTenantId)
                    {
                        // Prevent changing the tenant ID once created (for security)
                        tenantIdProp.IsModified = false;
                    }
                }

                // Audit Log setup or soft delete handling
                if (entry.Entity is Employee employee && entry.State == EntityState.Deleted)
                {
                    // Intercept hard delete and turn it into a soft delete
                    entry.State = EntityState.Modified;
                    employee.IsDeleted = true;
                    employee.UpdatedAt = DateTimeOffset.UtcNow;
                }
            }
        }
    }
}
