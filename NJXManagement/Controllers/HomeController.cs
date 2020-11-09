using System;
using System.IO;
using System.Net;
using System.Web;
using IdentityModel.Client;
using Microsoft.AspNetCore.Http;
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
        [Route("/SignIn")]
        [HttpGet]
        public RedirectResult SignIn()
        {
            if(_accessToken == null)
            {
                XeroConfiguration xconfig = new XeroConfiguration
                {
                    ClientId = "F68F5B3DC51D422BA4A9CEBF499247CB",
                    ClientSecret = "luTOFed4_aUl6c40c2ftH5fW_TL0ETybDfMq-faA1Z6Ht_j4",
                    CallbackUri = new Uri("https://localhost:5001/signin-oidc"),
                    Scope = "openid profile email files accounting.transactions accounting.contacts payroll.employees offline_access"
                };
                XeroClient XRequest = new XeroClient(xconfig);

                string url = XRequest.BuildLoginUri();

                return Redirect(url);
            }
            return Redirect("/");
          
        }
        public void TestRefresh()
        {
            if(_client.CheckTokenStatus(_bearerModel).StatusCode == HttpStatusCode.Unauthorized)
            {
               _accessToken = _client.RefreshToken();
            }
        }

        [Route("signin-oidc")]
        public RedirectResult Method()
        {
            string url = UriHelper.GetEncodedUrl(HttpContext.Request);
            Uri u = new Uri(url);
            string code = HttpUtility.ParseQueryString(u.Query).Get("code");

            _accessToken = _client.SendRequest(code);
            _bearerModel = _client.BearerToken();
            return Redirect("/");
        }
        [Route("Payroll/{endPoint}")]
        public IActionResult FetchPayroll(string endPoint)
        {
            TestRefresh();
            string recall = _client.PayrollCall(_bearerModel, endPoint);
            return Content(recall);
        }
        [Route("Xero/{endPoint}")]
        public IActionResult FetchXero(string endPoint)
        {
            TestRefresh();
            string recall = _client.AccountsCall(_bearerModel, endPoint);
            return Content(recall);
        }
        [Route("Employee/Add/")]
        public HttpStatusCode AddEmployee()
        {

            string bodystr = "";
            using (StreamReader reader = new StreamReader(Request.Body))
            { 
                bodystr = reader.ReadToEndAsync().GetAwaiter().GetResult();
            }

            var recall = _client.AddEmployee(_accessToken, _bearerModel, bodystr);

            return recall;
        }
        [Route("Employee/Edit/{employeeID}")]
        public HttpStatusCode EditEmployee(string employeeID)
        {
            string bContent = "";

            using (StreamReader reader = new StreamReader(Request.Body))
            {
                bContent = reader.ReadToEndAsync().GetAwaiter().GetResult();
            }

            var recall = _client.EditEmployee(_accessToken, _bearerModel, bContent, employeeID);

            return recall;
        }
    }
}