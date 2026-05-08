using System;
using System.Collections.Generic;
using System.Linq;

class Query
{
    public List<int> dataSource { get; set; }
    public bool isExecuted { get; set; }

    public Query(List<int> data)
    {
        dataSource = data;
        isExecuted = false;
    }

    public virtual IEnumerable<int> Apply()
    {
        return dataSource;
    }

    public virtual List<int> Execute()
    {
        isExecuted = true;
        return Apply().ToList();
    }

    public virtual string GetQueryType()
    {
        return "Base Query";
    }
}

class FilterQuery : Query
{
    public string predicate { get; set; }
    public int filteredCount { get; set; }

    public FilterQuery(List<int> data, string predicate)
        : base(data)
    {
        this.predicate = predicate;
    }

    public override IEnumerable<int> Apply()
    {
        if (predicate == "even")
        {
            return dataSource.Where(x => x % 2 == 0);
        }
        else if (predicate.StartsWith(">"))
        {
            int value = int.Parse(predicate.Substring(1));
            return dataSource.Where(x => x > value);
        }
        else if (predicate.StartsWith("<"))
        {
            int value = int.Parse(predicate.Substring(1));
            return dataSource.Where(x => x < value);
        }

        return dataSource;
    }

    public override List<int> Execute()
    {
        List<int> result = Apply().ToList();

        filteredCount = result.Count;
        isExecuted = true;

        Console.WriteLine("Filter Executed,Predicate:" +
                          predicate +
                          ",Result Count:" +
                          filteredCount);

        return result;
    }

    public override string GetQueryType()
    {
        return "Filter Query";
    }
}

class AggregateQuery : Query
{
    public string operation { get; set; }
    public double result { get; set; }

    public AggregateQuery(List<int> data, string operation)
        : base(data)
    {
        this.operation = operation;
    }

    public override IEnumerable<int> Apply()
    {
        return dataSource;
    }

    public override List<int> Execute()
    {
        isExecuted = true;

        if (operation == "Sum")
        {
            result = dataSource.Sum();
        }
        else if (operation == "Average")
        {
            result = dataSource.Average();
        }
        else if (operation == "Max")
        {
            result = dataSource.Max();
        }
        else if (operation == "Min")
        {
            result = dataSource.Min();
        }

        Console.WriteLine("Aggregation Executed,Operation:" +
                          operation +
                          ",Result:" +
                          result);

        return dataSource;
    }

    public override string GetQueryType()
    {
        return "Aggregate Query";
    }
}

class Program
{
    static void Main()
    {
        string queryType = Console.ReadLine()!;

        List<int> data = Console.ReadLine()!
            .Split(' ')
            .Select(int.Parse)
            .ToList();

        string input = Console.ReadLine()!;

        if (queryType == "Filter")
        {
            FilterQuery query = new FilterQuery(data, input);
            query.Execute();
        }
        else if (queryType == "Aggregate")
        {
            AggregateQuery query = new AggregateQuery(data, input);
            query.Execute();
        }
    }
}