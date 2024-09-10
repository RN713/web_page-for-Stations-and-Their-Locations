
namespace Stations_.Models
{
    public class Station_DB
    {
        public int Id { get; set; }

        public string Code { get; set; } = "";

        public decimal Lat { get; set; }

        public decimal Lon { get; set; }

        public string RegionName { get; set; } = "";

        internal static void Add(Station_DB station_DB)
        {
            throw new NotImplementedException();
        }
    }
}
