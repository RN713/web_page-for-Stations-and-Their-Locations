using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace Stations_.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StationsForecastController : ControllerBase
    {
        private static readonly string[] ARegionName = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private static readonly string[] ACode = new[] { "AAAA", "CCCC", "DDDD", "EEEE", "FFFF", "NNNN" };

        private readonly ILogger<StationsForecastController> _logger;

        public StationsForecastController(ILogger<StationsForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetStationsForecast")]
        public IEnumerable<StationData> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new StationData
            {
                Id = Random.Shared.Next(1, 20), // Generates a int between 1 and 20
                Code = ACode[Random.Shared.Next(ACode.Length)],
                Lat = (decimal)(Random.Shared.NextDouble() * (4 - 1) + 1), // Generates a decimal between 1 and 4
                Lon = (decimal)(Random.Shared.NextDouble() * (4 - 1) + 1),
                RegionName = ARegionName[Random.Shared.Next(ARegionName.Length)]
            }).ToArray();
        }
    }


}