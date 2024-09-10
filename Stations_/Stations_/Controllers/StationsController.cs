using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient; // This import seems unnecessary if you're using SqlConnection
using Stations_.Models;
using System.Data.SqlClient;

namespace Stations_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationsController : ControllerBase
    {
        private readonly string connectionString;

        public StationsController(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:SqlServerDb"] ?? ""; // If connection null, use empty string
        }

        [HttpPost]
        public IActionResult CreateStation(StationDto stationDto)
        {
            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    string sql = "INSERT INTO stations (code, lat, lon, regionName) VALUES (@code, @lat, @lon, @regionName)";

                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@code", stationDto.Code); 
                        command.Parameters.AddWithValue("@lat", stationDto.Lat);
                        command.Parameters.AddWithValue("@lon", stationDto.Lon);
                        command.Parameters.AddWithValue("@regionName", stationDto.RegionName);

                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Station_DB", "Sorry, but we have an exception: " + ex.Message);
                return BadRequest(ModelState);
            }
            return Ok();
        }

        [HttpGet]
        public IActionResult GetStation() 
        { 
            List<Station_DB>station2= new List<Station_DB>();

            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    string sql = "SELECT * FROM stations";

                    using (var command = new SqlCommand(sql, connection))
                    {
                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read()) 
                            {
                                Station_DB station_DB = new Station_DB();

                                station_DB.Id = reader.GetInt32(0);
                                station_DB.Code = reader.GetString(1);
                                station_DB.Lat = reader.GetDecimal(2);
                                station_DB.Lon = reader.GetDecimal(3);
                                station_DB.RegionName = reader.GetString(4);

                                station2.Add(station_DB);
                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Station_DB", "Sorry, but we have an exception: " + ex.Message);
                return BadRequest(ModelState);
            }

            return Ok(station2);
        }

        [HttpGet("{id}")]
        public IActionResult GetStation(int id)
        {
            Station_DB station2 =new Station_DB();

            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    string sql = "SELECT * FROM stations WHERE id=@id";

                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);

                        using (var reader = command.ExecuteReader())
                        {
                           if (reader.Read())
                           {

                                station2.Id = reader.GetInt32(0);
                                station2.Code = reader.GetString(1);
                                station2.Lat = reader.GetDecimal(2);
                                station2.Lon = reader.GetDecimal(3);
                                station2.RegionName = reader.GetString(4);

                           }

                           else
                            {
                                return NotFound();
                            }


                        }
                    }
                }

            }
            catch (Exception ex) 
            {
                ModelState.AddModelError("Station_DB", "Sorry, but we have an exception: " + ex.Message);
                return BadRequest(ModelState);

            }


            return Ok(station2);

        }

        [HttpPut("{id}")]
        public IActionResult UpdateStation(int id, StationDto stationDto) 
        {
            try
            {

                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    string sql = "UPDATE stations SET code=@code, lat=@lat, lon=@lon, regionName=@regionName " +
                        "WHERE id=@id";

                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@code", stationDto.Code);
                        command.Parameters.AddWithValue("@lat", stationDto.Lat);
                        command.Parameters.AddWithValue("@lon", stationDto.Lon);
                        command.Parameters.AddWithValue("@regionName", stationDto.RegionName);
                        command.Parameters.AddWithValue("@id",id);

                        command.ExecuteNonQuery();
                    }
                }

            }
            catch (Exception ex) 
            {
                ModelState.AddModelError("Station_DB", "Sorry, but we have an exception: " + ex.Message);
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteStation(int id) 
        {
            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    string sql = "DELETE FROM stations WHERE id=@id";

                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        command.ExecuteNonQuery();
                    }

                }

            }
            catch (Exception ex) 
            {
                ModelState.AddModelError("Station_DB", "Sorry, but we have an exception: " + ex.Message);
                return BadRequest(ModelState);
            }


            return Ok();
        }
    }
}