using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NJXManagement.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace NJXManagement.HttpModel
{
    public class XeroRequest
    {
        public HttpClient Client { get; }

        public XeroRequest(HttpClient client)
        {
           
            Client = client;

        }
        [HttpPost]
        public TokenResponse SendRequest(String code)
        {

            TokenResponse accessToken = Client.RequestAuthorizationCodeTokenAsync(new AuthorizationCodeTokenRequest
            {
                Address = "https://identity.xero.com/connect/token",
                GrantType = "code",
                Code = code,
                ClientId = "F68F5B3DC51D422BA4A9CEBF499247CB",
                ClientSecret = "luTOFed4_aUl6c40c2ftH5fW_TL0ETybDfMq-faA1Z6Ht_j4",
                RedirectUri = "https://localhost:5001/signin-oidc",
                Parameters ={
                { "scope", "openid profile email accounting.transactions accounting.contacts accounting.settingsoffline_access"}
                }
            }).GetAwaiter().GetResult();
            return accessToken;
        }
        public BearerModel BearerToken(TokenResponse accessToken)
        {

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get,
                "https://api.xero.com/connections");
            request.Headers.Add("Authorization", "Bearer " + accessToken.AccessToken);

            var response = Client.SendAsync(request).GetAwaiter().GetResult();
            var responseStream = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

            var dict = JsonConvert.DeserializeObject<List<BearerModel>>(responseStream);

            return dict[0];
        }
        public HttpStatusCode RefreshToken(TokenResponse accessToken)
        {

            RefreshModel refreshModel = new RefreshModel
            {
                grant_type = "refresh_token",
                client_id = "F68F5B3DC51D422BA4A9CEBF499247CB",
                refresh_token = accessToken.RefreshToken
            };
            var jsonString = System.Text.Json.JsonSerializer.Serialize(refreshModel);
            StringContent bodyContent = new StringContent(jsonString);
            
            TokenResponse refreshToken = Client.RequestRefreshTokenAsync(new RefreshTokenRequest
            {
                Address = "https://identity.xero.com/connect/token",
                ClientId = "F68F5B3DC51D422BA4A9CEBF499247CB",
                ClientSecret = "luTOFed4_aUl6c40c2ftH5fW_TL0ETybDfMq-faA1Z6Ht_j4",
                GrantType = "refresh_token",
                RefreshToken = accessToken.RefreshToken
            }).GetAwaiter().GetResult();
            accessToken = refreshToken;
            return refreshToken.HttpStatusCode;
        }
        public string PayrollCall(TokenResponse accessToken, BearerModel bearerModel, string endPoint)
        {

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get,
                              "https://api.xero.com/payroll.xro/2.0/" + endPoint);
            request.Headers.Add("Authorization", "Bearer " + accessToken.AccessToken);
            request.Headers.Add("xero-tenant-id", bearerModel.TenantId);

            var response = Client.SendAsync(request).GetAwaiter().GetResult();

            var responseStream = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

            return responseStream;
        }
        public string AccountsCall(TokenResponse accessToken, BearerModel bearerModel, string endPoint)
        {

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get,
                    "https://api.xero.com/api.xro/2.0/" + endPoint);
            request.Headers.Add("Authorization", "Bearer " + accessToken.AccessToken);
            request.Headers.Add("xero-tenant-id", bearerModel.TenantId);

            var response = Client.SendAsync(request).GetAwaiter().GetResult();

            var responseStream = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

            return responseStream;
        }
    }
}
 