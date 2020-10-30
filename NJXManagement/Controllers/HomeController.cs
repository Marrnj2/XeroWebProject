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
        static private TokenResponse _accessToken;
        static private BearerModel _bearerModel;
        private readonly XeroRequest _client;
        public  HomeController(XeroRequest client)
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
        public void Method()
        {

            var url = UriHelper.GetEncodedUrl(HttpContext.Request);
            Uri u = new Uri(url);
            string code = HttpUtility.ParseQueryString(u.Query).Get("code");

            _accessToken = _client.SendRequestAsync(code).GetAwaiter().GetResult();
            _bearerModel = _client.BearerToken(_accessToken);
        }
        [Route("GetData")]
        public IActionResult TestData()
        {

            var recall = _client.CallAPI(_accessToken, _bearerModel, "Accounts");

            return Content(recall);

        }
    }
}