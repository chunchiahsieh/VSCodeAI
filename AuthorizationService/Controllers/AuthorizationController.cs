using Microsoft.AspNetCore.Mvc;

namespace AuthorizationService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Authorization API is working");
        }

        /// <summary>
        /// Sample authorization endpoint
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /api/authorization
        ///     {
        ///        "username": "test",
        ///        "password": "test123"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        public IActionResult Authorize([FromBody] LoginRequest request)
        {
            // TODO: Implement actual authorization logic
            return Ok(new { message = "Authorization successful", token = "sample-token" });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
