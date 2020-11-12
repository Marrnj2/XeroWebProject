using IdentityModel.Client;
using NJXManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NJXManagement.Controllers
{
    public class AuthModel
    {
        public TokenResponse AccessToken { get; set; }
        public BearerModel BearerModel { get; set; }
    }
}
