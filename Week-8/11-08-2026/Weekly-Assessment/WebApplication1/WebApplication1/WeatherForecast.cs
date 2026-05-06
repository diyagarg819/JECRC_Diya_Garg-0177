namespace WebApplication1
{
    /// <summary>
    /// Represents a sample weather forecast entry.
    /// </summary>
    public class WeatherForecast
    {
        /// <summary>
        /// Forecast date.
        /// </summary>
        public DateOnly Date { get; set; }

        /// <summary>
        /// Temperature in Celsius.
        /// </summary>
        public int TemperatureC { get; set; }

        /// <summary>
        /// Temperature converted to Fahrenheit.
        /// </summary>
        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        /// <summary>
        /// Human-readable summary of the weather.
        /// </summary>
        public string? Summary { get; set; }
    }
}
