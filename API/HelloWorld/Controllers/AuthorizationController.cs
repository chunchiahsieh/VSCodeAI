using Microsoft.AspNetCore.Mvc;

namespace API.HelloWorld.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("helloworld");
        }
    }
}
