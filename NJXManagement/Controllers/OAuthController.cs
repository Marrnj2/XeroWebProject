using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NJXManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OAuthController : ControllerBase
    {
        private string clientId = "C97671C0BEA94AC0A8EE2E8F23238E56";
        private string clientSecret = "Sy5X3uxnqKJOexwYznvH_LdYLC10GIgxVPfLjIqz7I0TYWHn";


        [HttpGet]
        public ContentResult Get()
        {
            var xeroAuthorizeUri = new RequestUrl("https://login.xero.com/identity/connect/authorize");
            var url = xeroAuthorizeUri.CreateAuthorizeUrl(
             clientId: clientId,
             responseType: "code", //hardcoded authorisation code for now.
             redirectUri: "https://localhost:5001/oauth",
             state: "your state",
             scope: "openid profile email files accounting.transactions accounting.transactions.read accounting.reports.read accounting.journals.read accounting.settings accounting.settings.read accounting.contacts accounting.contacts.read accounting.attachments accounting.attachments.read offline_access"
         );
            return new ContentResult
            {
                ContentType = "text/html",
                StatusCode = (int)HttpStatusCode.OK,
                Content = String.Format("<html><head></head><body><a href ='{0}'>Connect to Xero</a></body></html>", url)
            };
        }

    }
}
