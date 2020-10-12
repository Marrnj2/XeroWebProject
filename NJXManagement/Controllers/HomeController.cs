using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace NJXManagement.Controllers
{
    public class HomeController : Controller
    {

        private readonly IHttpClientFactory _clientFactory;
        public  HomeController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }
        [Route("Path")]
        [HttpGet]
        public IActionResult Path()
        {
            var url = "https://login.xero.com/identity/connect/authorize?response_type=code&client_id=F68F5B3DC51D422BA4A9CEBF499247CB&redirect_uri=https://localhost:5001/signin-oidc&scope=openid profile email accounting.transactions";

            return Redirect(url);
        }
        [Route("signin-oidc")]
        public IActionResult Next()
        {
            
            var text = HttpContext.Response;
            var url = UriHelper.GetEncodedUrl(HttpContext.Request);
            Uri u = new Uri(url);
            string code = HttpUtility.ParseQueryString(u.Query).Get("code");


            return Content("Hey");
        }
    }
}