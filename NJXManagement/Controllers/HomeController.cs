using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
using Xero.NetStandard.OAuth2.Client;
using Xero.NetStandard.OAuth2.Config;

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
            XeroConfiguration xconfig = new XeroConfiguration
            {
                ClientId = "F68F5B3DC51D422BA4A9CEBF499247CB",
                ClientSecret = "luTOFed4_aUl6c40c2ftH5fW_TL0ETybDfMq-faA1Z6Ht_j4",
                CallbackUri = new Uri("https://localhost:5001/signin-oidc"),
                Scope = "openid profile email files accounting.transactions accounting.contacts payroll.employees offline_access"
            };
            var XRequest = new XeroClient(xconfig);

            var url = XRequest.BuildLoginUri();

            return Redirect(url);
        }
        [Route("Refresh")]
        public HttpStatusCode TestRefresh()
        {
            var response =_client.RefreshToken(_accessToken);
            return response;
        }

        [Route("signin-oidc")]
        public void Method()
        {
            var url = UriHelper.GetEncodedUrl(HttpContext.Request);
            Uri u = new Uri(url);
            string code = HttpUtility.ParseQueryString(u.Query).Get("code");

            _accessToken = _client.SendRequest(code);
            _bearerModel = _client.BearerToken(_accessToken);
        }
        [Route("Payroll/{endPoint}")]
        public IActionResult FetchPayroll(string endPoint)
        {
            var recall = _client.PayrollCall(_accessToken, _bearerModel, endPoint);
            return Content(recall);
        }
        [Route("Xero/{endPoint}")]
        public IActionResult FetchXero(string endPoint)
        {
            var recall = _client.AccountsCall(_accessToken, _bearerModel, endPoint);
            return Content(recall);
        }
    }
}