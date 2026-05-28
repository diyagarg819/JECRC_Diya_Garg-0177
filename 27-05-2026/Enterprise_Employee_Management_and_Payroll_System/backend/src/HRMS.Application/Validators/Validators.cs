using System;
using FluentValidation;
using HRMS.Core.Entities;

namespace HRMS.Application.Validators
{
    public class EmployeeValidator : AbstractValidator<Employee>
    {
        public EmployeeValidator()
        {
            RuleFor(x => x.EmployeeCode)
                .NotEmpty().WithMessage("Employee Code is required.")
                .MaximumLength(30).WithMessage("Employee Code must not exceed 30 characters.");

            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("First Name is required.")
                .MaximumLength(100).WithMessage("First Name must not exceed 100 characters.");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Last Name is required.")
                .MaximumLength(100).WithMessage("Last Name must not exceed 100 characters.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("A valid email address is required.")
                .MaximumLength(255).WithMessage("Email must not exceed 255 characters.");

            RuleFor(x => x.DateOfJoining)
                .NotEmpty().WithMessage("Date of Joining is required.");

            RuleFor(x => x.EmploymentType)
                .NotEmpty().WithMessage("Employment Type is required.")
                .Must(x => x == "FullTime" || x == "Contractor" || x == "PartTime")
                .WithMessage("Employment Type must be 'FullTime', 'Contractor', or 'PartTime'.");
        }
    }

    public class LeaveRequestValidator : AbstractValidator<LeaveRequest>
    {
        public LeaveRequestValidator()
        {
            RuleFor(x => x.EmployeeId)
                .NotEmpty().WithMessage("Employee ID is required.");

            RuleFor(x => x.LeaveTypeId)
                .NotEmpty().WithMessage("Leave Type ID is required.");

            RuleFor(x => x.StartDate)
                .NotEmpty().WithMessage("Start Date is required.");

            RuleFor(x => x.EndDate)
                .NotEmpty().WithMessage("End Date is required.")
                .GreaterThanOrEqualTo(x => x.StartDate).WithMessage("End Date must be greater than or equal to Start Date.");

            RuleFor(x => x.TotalDays)
                .GreaterThan(0).WithMessage("Total Days must be greater than 0.");
        }
    }
}
