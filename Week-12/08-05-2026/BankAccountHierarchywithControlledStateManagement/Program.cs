using System;

class BankAccount
{
    public string AccountNumber { get; }
    public double Balance { get; private set; }

    public BankAccount(string accountNumber, double initialDeposit)
    {
        AccountNumber = accountNumber;
        Balance = initialDeposit;
    }

    public virtual bool Deposit(double amount)
    {
        if (amount > 0)
        {
            Balance += amount;
            return true;
        }

        return false;
    }

    public virtual bool Withdraw(double amount)
    {
        if (amount > 0 && amount <= Balance)
        {
            Balance -= amount;
            return true;
        }

        return false;
    }

    public double GetBalance()
    {
        return Balance;
    }

    protected void UpdateBalance(double amount)
    {
        Balance += amount;
    }
}

class SavingsAccount : BankAccount
{
    public double InterestRate { get; set; }
    public double MinimumBalance { get; set; }

    public SavingsAccount(string accountNumber, double initialDeposit,
                          double interestRate = 5.0,
                          double minimumBalance = 1000)
        : base(accountNumber, initialDeposit)
    {
        InterestRate = interestRate;
        MinimumBalance = minimumBalance;
    }

    public override bool Withdraw(double amount)
    {
        if (amount > 0 && GetBalance() - amount >= MinimumBalance)
        {
            UpdateBalance(-amount);
            return true;
        }

        return false;
    }

    public void ApplyInterest()
    {
        double interest = GetBalance() * InterestRate / 100;
        UpdateBalance(interest);

        Console.WriteLine("Interest Applied,Rate:" +
                          InterestRate +
                          ",New Balance:" +
                          GetBalance());
    }
}

class CurrentAccount : BankAccount
{
    public double OverdraftLimit { get; set; }
    public double TransactionFee { get; set; }

    public CurrentAccount(string accountNumber, double initialDeposit,
                          double overdraftLimit = 2000,
                          double transactionFee = 100)
        : base(accountNumber, initialDeposit)
    {
        OverdraftLimit = overdraftLimit;
        TransactionFee = transactionFee;
    }

    public override bool Withdraw(double amount)
    {
        if (amount > 0 && GetBalance() - amount >= -OverdraftLimit)
        {
            UpdateBalance(-amount);
            return true;
        }

        return false;
    }

    public void DeductTransactionFee()
    {
        UpdateBalance(-TransactionFee);

        Console.WriteLine("Fee Deducted,Amount:" +
                          TransactionFee +
                          ",Remaining:" +
                          GetBalance());
    }
}

class Program
{
    static void Main()
    {
        string accountType = Console.ReadLine();

        string accountNumber = Console.ReadLine();

        double initialDeposit = Convert.ToDouble(Console.ReadLine());

        string operation = Console.ReadLine();

        if (accountType == "Savings")
        {
            SavingsAccount account =
                new SavingsAccount(accountNumber, initialDeposit);

            string[] data = operation.Split(' ');

            if (data[0] == "Withdraw")
            {
                double amount = Convert.ToDouble(data[1]);

                bool result = account.Withdraw(amount);

                Console.WriteLine(result
                    ? "Withdrawal Successful"
                    : "Withdrawal Failed");
            }

            Console.WriteLine(account.GetBalance());
        }
        else if (accountType == "Current")
        {
            CurrentAccount account =
                new CurrentAccount(accountNumber, initialDeposit);

            string[] data = operation.Split(' ');

            if (data[0] == "Withdraw")
            {
                double amount = Convert.ToDouble(data[1]);

                bool result = account.Withdraw(amount);

                Console.WriteLine(result
                    ? "Withdrawal Successful"
                    : "Withdrawal Failed");
            }

            Console.WriteLine(account.GetBalance());
        }
    }
}
