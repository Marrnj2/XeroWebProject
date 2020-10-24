using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using NJXManagement.HttpModel;
using NJXManagement.Models;

namespace NJXManagement.Controllers
{
    public class HomeController : Controller
    {

        private readonly RequestToken _client;
        public  HomeController(RequestToken client)
        {
            _client = client;
        }
        [Route("Path")]
        [HttpGet]
        public IActionResult Path()
        {
            var url = "https://login.xero.com/identity/connect/authorize?response_type=code&client_id=F68F5B3DC51D422BA4A9CEBF499247CB&redirect_uri=https://localhost:5001/signin-oidc&scope=openid profile email accounting.transactions";
            return Redirect(url);
        }
        [Route("signin-oidc")]
        public async Task<IActionResult> MethodAsync()
        {
            var url = UriHelper.GetEncodedUrl(HttpContext.Request);
            Uri u = new Uri(url);
            string code = HttpUtility.ParseQueryString(u.Query).Get("code");

            var token =  await _client.SendRequestAsync(code);
            var otherThing = await _client.BearerTokenAsync(token);
            var recall = await _client.CallAPIAsync(token, otherThing);
            return Content(recall);
        }
    }
}