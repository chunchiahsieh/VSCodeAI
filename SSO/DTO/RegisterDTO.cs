using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSO.DTO
{
    public class RegisterDTO
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string SystemName { get; set; }
        public string Password { get; set; }
    }
}