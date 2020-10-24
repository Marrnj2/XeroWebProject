using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NJXManagement.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace NJXManagement.HttpModel
{
    public class RequestToken
    {
        public HttpClient Client { get; }

        public RequestToken(HttpClient client)
        {
           
            Client = client;

        }
        [HttpPost]
        public async Task<TokenResponse> SendRequestAsync(String code)
        {
            TokenResponse accessToken = await Client.RequestAuthorizationCodeTokenAsync(new AuthorizationCodeTokenRequest
            {
                Address = "https://identity.xero.com/connect/token",
                GrantType = "code",
                Code = code,
                ClientId = "F68F5B3DC51D422BA4A9CEBF499247CB",
                ClientSecret = "luTOFed4_aUl6c40c2ftH5fW_TL0ETybDfMq-faA1Z6Ht_j4",
                RedirectUri = "https://localhost:5001/signin-oidc",
                Parameters =
                {
                { "scope", "offline_access accounting.transactions openid profile email accounting.contacts accounting.settings"}
                }
            });
            return accessToken;
        }
        public async Task<BearerModel> BearerTokenAsync(TokenResponse accessToken)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = false,
                
            };
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get,
                "https://api.xero.com/connections");
            request.Headers.Add("Authorization", "Bearer " + accessToken.AccessToken);

            var response = await Client.SendAsync(request);
            var responseStream = await response.Content.ReadAsStringAsync();


            var dict = JsonConvert.DeserializeObject<List<BearerModel>>(responseStream);

            return dict[0];
        }
        public async Task<string> CallAPIAsync(TokenResponse accessToken,BearerModel bearerModel)
        {

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get,
                "https://api.xero.com/api.xro/2.0/Invoices");
            request.Headers.Add("Authorization", "Bearer " + accessToken.AccessToken);
            request.Headers.Add("xero-tenant-id", bearerModel.TenantId);

                var response = await Client.SendAsync(request);
                var responseStream = await response.Content.ReadAsStringAsync();
            return responseStream;
        }
    }
}
 