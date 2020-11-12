using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NJXManagement.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;

namespace NJXManagement.HttpModel
{
    public class XeroRequest
    {
        public HttpClient Client { get; }
        private static TokenResponse _accessToken;
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
                { "scope", "openid profile email accounting.transactions payroll.employees accounting.contacts accounting.settingsoffline_access"}
                }
            }).GetAwaiter().GetResult();
            _accessToken = accessToken;

            return accessToken;
        }
        public BearerModel BearerToken()
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get,
                "https://api.xero.com/connections");
            request.Headers.Add("Authorization", "Bearer " + _accessToken.AccessToken);

            HttpResponseMessage response = Client.SendAsync(request).GetAwaiter().GetResult();
            string responseStream = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

            List<BearerModel> dict = JsonConvert.DeserializeObject<List<BearerModel>>(responseStream);

            return dict[0];
        }
        public HttpResponseMessage CheckTokenStatus(BearerModel bearerModel)
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get,
                           "https://api.xero.com/payroll.xro/2.0/employees");
            request.Headers.Add("Authorization", "Bearer " + _accessToken.AccessToken);
            request.Headers.Add("xero-tenant-id", bearerModel.TenantId);

            HttpResponseMessage response = Client.SendAsync(request).GetAwaiter().GetResult();

            return response;
        }
        public TokenResponse RefreshToken()
        {

                TokenResponse refreshToken = Client.RequestRefreshTokenAsync(new RefreshTokenRequest
                {
                    Address = "https://identity.xero.com/connect/token",
                    ClientId = "F68F5B3DC51D422BA4A9CEBF499247CB",
                    ClientSecret = "luTOFed4_aUl6c40c2ftH5fW_TL0ETybDfMq-faA1Z6Ht_j4",
                    GrantType = "refresh_token",
                    RefreshToken = _accessToken.RefreshToken
                }).GetAwaiter().GetResult();
                _accessToken = refreshToken;
            

            return _accessToken;
        }
        public string PayrollCall (BearerModel bearerModel, string endPoint)
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get,
                              "https://api.xero.com/payroll.xro/2.0/" + endPoint);
            request.Headers.Add("Authorization", "Bearer " + _accessToken.AccessToken);
            request.Headers.Add("xero-tenant-id", bearerModel.TenantId);

            HttpResponseMessage response = Client.SendAsync(request).GetAwaiter().GetResult();

            string responseStream = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

            return responseStream;
        }
        public string AccountsCall(BearerModel bearerModel, string endPoint)
        {

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get,
                    "https://api.xero.com/api.xro/2.0/" + endPoint);
            request.Headers.Add("Authorization", "Bearer " + _accessToken.AccessToken);

            request.Headers.Add("xero-tenant-id", bearerModel.TenantId);

            HttpResponseMessage response = Client.SendAsync(request).GetAwaiter().GetResult();

            string responseStream = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

            return responseStream;
        }
        public HttpStatusCode AddEmployee(TokenResponse accessToken, BearerModel bearerModel, string employee)
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post,
            "https://api.xero.com/payroll.xro/2.0/employees");
            request.Headers.Add("Authorization", "Bearer " + accessToken.AccessToken);
            request.Headers.Add("xero-tenant-id", bearerModel.TenantId);

            StringContent employeeContent = new StringContent(employee, Encoding.UTF8, "application/json");
            
            request.Content = employeeContent;
            var response = Client.SendAsync(request).GetAwaiter().GetResult();

            return response.StatusCode;
        }
        public HttpStatusCode EditEmployee(TokenResponse accessToken, BearerModel bearerModel, string employee,string employeID)
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Put,
            "https://api.xero.com/payroll.xro/2.0/employees/"+employeID);
            request.Headers.Add("Authorization", "Bearer " + accessToken.AccessToken);
            request.Headers.Add("xero-tenant-id", bearerModel.TenantId);

            StringContent employeeContent = new StringContent(employee, Encoding.UTF8, "application/json");
            request.Content = employeeContent;
            var response = Client.SendAsync(request).GetAwaiter().GetResult();
            return response.StatusCode;
        }
    }
}
 