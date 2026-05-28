using System;
using HRMS.Core.Entities;

namespace HRMS.Application.Payroll
{
    public record PayrollTaxResult(
        decimal GrossSalary,
        decimal TaxAmount,
        decimal TotalDeductions,
        decimal NetSalary,
        string Details
    );

    public interface IPayrollTaxStrategy
    {
        string CountryCode { get; }
        PayrollTaxResult Calculate(Employee employee, decimal baseSalary);
    }

    public class IndiaTaxStrategy : IPayrollTaxStrategy
    {
        public string CountryCode => "IN";

        public PayrollTaxResult Calculate(Employee employee, decimal baseSalary)
        {
            // India tax calculation (e.g. Standard deduction, slabs, cess, PF)
            decimal standardDeduction = 50000m;
            decimal taxableIncome = Math.Max(0, baseSalary - standardDeduction);
            
            decimal tax = 0;
            if (taxableIncome > 1500000m)
                tax = (taxableIncome - 1500000m) * 0.30m + 150000m;
            else if (taxableIncome > 1200000m)
                tax = (taxableIncome - 1200000m) * 0.20m + 90000m;
            else if (taxableIncome > 900000m)
                tax = (taxableIncome - 900000m) * 0.15m + 45000m;
            else if (taxableIncome > 600000m)
                tax = (taxableIncome - 600000m) * 0.10m + 15000m;
            else if (taxableIncome > 300000m)
                tax = (taxableIncome - 300000m) * 0.05m;

            // Professional Tax (PT) & Provident Fund (PF) (Standard PF = 12% of basic)
            decimal pfContribution = baseSalary * 0.12m;
            decimal professionalTax = 2500m; // annual Professional Tax in India
            
            decimal totalDeductions = tax + pfContribution + professionalTax;
            decimal netSalary = Math.Max(0, baseSalary - totalDeductions);

            return new PayrollTaxResult(
                baseSalary,
                tax,
                totalDeductions,
                netSalary,
                $"India Tax Rules applied: Standard Deduction = ₹{standardDeduction:F2}, PF Contribution = ₹{pfContribution:F2}, Professional Tax = ₹{professionalTax:F2}, Calculated Tax = ₹{tax:F2}"
            );
        }
    }

    public class USTaxStrategy : IPayrollTaxStrategy
    {
        public string CountryCode => "US";

        public PayrollTaxResult Calculate(Employee employee, decimal baseSalary)
        {
            // US tax calculation (Federal Tax + FICA)
            decimal standardDeduction = 13850m; // Single standard deduction for US
            decimal taxableIncome = Math.Max(0, baseSalary - standardDeduction);

            // Simple US Federal Tax Brackets
            decimal tax = 0;
            if (taxableIncome > 100000m)
                tax = (taxableIncome - 100000m) * 0.24m + 15000m;
            else if (taxableIncome > 50000m)
                tax = (taxableIncome - 50000m) * 0.22m + 4000m;
            else if (taxableIncome > 11000m)
                tax = (taxableIncome - 11000m) * 0.12m + 1100m;
            else if (taxableIncome > 0m)
                tax = taxableIncome * 0.10m;

            // FICA: Social Security (6.2%) and Medicare (1.45%)
            decimal socialSecurity = baseSalary * 0.062m;
            decimal medicare = baseSalary * 0.0145m;
            decimal fica = socialSecurity + medicare;

            decimal totalDeductions = tax + fica;
            decimal netSalary = Math.Max(0, baseSalary - totalDeductions);

            return new PayrollTaxResult(
                baseSalary,
                tax,
                totalDeductions,
                netSalary,
                $"US Tax Rules applied: Standard Deduction = ${standardDeduction:F2}, FICA (Soc Sec + Medicare) = ${fica:F2}, Federal Tax = ${tax:F2}"
            );
        }
    }

    public class UKTaxStrategy : IPayrollTaxStrategy
    {
        public string CountryCode => "UK";

        public PayrollTaxResult Calculate(Employee employee, decimal baseSalary)
        {
            // UK Tax (Personal Allowance + Income Tax + National Insurance)
            decimal personalAllowance = 12570m;
            decimal taxableIncome = Math.Max(0, baseSalary - personalAllowance);

            // Income Tax brackets (Basic, Higher, Additional)
            decimal tax = 0;
            if (taxableIncome > 125140m)
                tax = (taxableIncome - 125140m) * 0.45m + 37500m;
            else if (taxableIncome > 37700m)
                tax = (taxableIncome - 37700m) * 0.40m + 7540m;
            else if (taxableIncome > 0m)
                tax = taxableIncome * 0.20m;

            // National Insurance (Class 1) - Approx 8% on earnings above primary threshold
            decimal primaryThreshold = 12570m;
            decimal niContribution = 0;
            if (baseSalary > primaryThreshold)
            {
                niContribution = (baseSalary - primaryThreshold) * 0.08m;
            }

            decimal totalDeductions = tax + niContribution;
            decimal netSalary = Math.Max(0, baseSalary - totalDeductions);

            return new PayrollTaxResult(
                baseSalary,
                tax,
                totalDeductions,
                netSalary,
                $"UK Tax Rules applied: Personal Allowance = £{personalAllowance:F2}, National Insurance = £{niContribution:F2}, Income Tax = £{tax:F2}"
            );
        }
    }

    public class UAETaxStrategy : IPayrollTaxStrategy
    {
        public string CountryCode => "UAE";

        public PayrollTaxResult Calculate(Employee employee, decimal baseSalary)
        {
            // UAE is tax-free for individual income. Only social security applies for citizens, otherwise 0 tax.
            // Let's assume a small social security or pension contribution (e.g. 5% of base)
            decimal socialSecurity = baseSalary * 0.05m;
            
            decimal totalDeductions = socialSecurity;
            decimal netSalary = Math.Max(0, baseSalary - totalDeductions);

            return new PayrollTaxResult(
                baseSalary,
                0m,
                totalDeductions,
                netSalary,
                $"UAE Tax Rules applied: 0% Personal Income Tax, Social Security/Pension Contribution (5%) = {socialSecurity:F2} AED"
            );
        }
    }
}
