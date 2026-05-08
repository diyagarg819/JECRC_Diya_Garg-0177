using System;
using System.Threading.Tasks;

class AsyncService
{
    public int requestCount { get; set; }
    public long lastResponseTime { get; set; }

    public virtual async Task<string> FetchDataAsync(string endpoint)
    {
        await Task.Delay(2000);
        return "Base Service Data";
    }

    public virtual async Task<string> GetStatusAsync()
    {
        await Task.Delay(100);
        return "Service Status";
    }
}

class WeatherService : AsyncService
{
    public string city { get; set; }
    public int temperature { get; set; }

    public WeatherService(string city, int temperature)
    {
        this.city = city;
        this.temperature = temperature;
    }

    public override async Task<string> FetchDataAsync(string endpoint)
    {
        requestCount++;

        Console.WriteLine("Weather Fetch Started," + city);

        await Task.Delay(2000);

        string result = "Weather Data Received," +
                        city + "," +
                        temperature + "°C";

        Console.WriteLine(result);

        return result;
    }

    public override async Task<string> GetStatusAsync()
    {
        await Task.Delay(100);

        string status = "Weather Service Status,Requests:" + requestCount;

        Console.WriteLine(status);

        return status;
    }
}

class StockService : AsyncService
{
    public string symbol { get; set; }
    public double currentPrice { get; set; }

    public StockService(string symbol, double currentPrice)
    {
        this.symbol = symbol;
        this.currentPrice = currentPrice;
    }

    public override async Task<string> FetchDataAsync(string endpoint)
    {
        requestCount++;

        Console.WriteLine("Stock Fetch Started," + symbol);

        await Task.Delay(2000);

        string result = "Stock Price Update," +
                        symbol + ",$" +
                        currentPrice;

        Console.WriteLine(result);

        return result;
    }

    public override async Task<string> GetStatusAsync()
    {
        await Task.Delay(100);

        string status = "Stock Service Status,Requests:" + requestCount;

        Console.WriteLine(status);

        return status;
    }
}

class Program
{
    static async Task Main()
    {
        string serviceType = Console.ReadLine();

        string identifier = Console.ReadLine();

        string command = Console.ReadLine();

        if (serviceType == "Weather")
        {
            WeatherService service = new WeatherService(identifier, 22);

            if (command == "FetchDataAsync")
            {
                await service.FetchDataAsync(identifier);
            }
            else if (command == "GetStatusAsync")
            {
                await service.GetStatusAsync();
            }
        }
        else if (serviceType == "Stock")
        {
            StockService service = new StockService(identifier, 2450.75);

            if (command == "FetchDataAsync")
            {
                await service.FetchDataAsync(identifier);
            }
            else if (command == "GetStatusAsync")
            {
                await service.GetStatusAsync();
            }
        }
    }
}
