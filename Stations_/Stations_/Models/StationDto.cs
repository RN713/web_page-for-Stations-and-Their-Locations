using System.ComponentModel.DataAnnotations;

namespace Stations_.Models
{
    public class StationDto
    {
       

        [Required]
        public string Code { get; set; } = "";

        [Required]
        public decimal Lat { get; set; }

        [Required]
        public decimal Lon { get; set; }

        [Required]
        public string RegionName { get; set; } = "";
    }
}
