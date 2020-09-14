using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using JavaScriptEngineSwitcher.V8;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using NJXManagement.Controllers;
using NJXManagement.Extensions;
using React.AspNet;
using System;
using System.Threading.Tasks;
using Xero.NetStandard.OAuth2.Api;
using Xero.NetStandard.OAuth2.Client;
using Xero.NetStandard.OAuth2.Config;
using Xero.NetStandard.OAuth2.Token;
using Microsoft.EntityFrameworkCore;
using NJXManagement.Data;
namespace NJXManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration,IWebHostEnvironment env)
        {
            Environment = env;
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient();
            services.TryAddSingleton(new XeroConfiguration
            {
                ClientId = Configuration["Xero:ClientId"],
                ClientSecret = Configuration["Xero:ClientSecret"]
            });
            services.TryAddSingleton<IXeroClient, XeroClient>();
            services.TryAddSingleton<IAccountingApi, AccountingApi>();
            services.TryAddSingleton<MemoryTokenStore>();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = "XeroSignIn";
            })
                .AddCookie(options =>
            {
                options.Cookie.Name = "XeroIdentity";
            }).AddOpenIdConnect("XeroSignIn", options =>
            {
                options.Authority = "https://identity.xero.com";

                options.ClientId = Configuration["Xero:ClientId"];
                options.ClientSecret = Configuration["Xero:ClientSecret"];

                options.ResponseType = "code";

                options.Scope.Clear();
                options.Scope.Add("openid");
                options.Scope.Add("profile");
                options.Scope.Add("email");
                options.CallbackPath = "/signin-oidc";

                options.Events = new OpenIdConnectEvents
                {
                    OnTokenValidated = OnTokenValidated()
                };
                })
                .AddOpenIdConnect("XeroSignUp", options =>
                {
                    options.Authority = "https://identity.xero.com";

                    options.ClientId = Configuration["Xero:ClientId"];
                    options.ClientSecret = Configuration["Xero:ClientSecret"];

                    options.ResponseType = "code";

                    options.Scope.Clear();
                    options.Scope.Add("offline_access");
                    options.Scope.Add("openid");
                    options.Scope.Add("profile");
                    options.Scope.Add("email");
                    options.Scope.Add("accounting.settings");
                    options.Scope.Add("accounting.transactions");

                    options.CallbackPath = "/signup-oidc";

                    options.Events = new OpenIdConnectEvents
                    {
                        OnTokenValidated = OnTokenValidated()
                    };
                });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddReact();

            // Make sure a JS engine is registered, or you will get an error!
            services.AddJsEngineSwitcher(options => options.DefaultEngineName = V8JsEngine.EngineName)
              .AddV8();

            services.AddControllersWithViews();
          
            if (Environment.IsDevelopment())
            {
              services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlite(
                Configuration.GetConnectionString("LocalContext")));
            }

            else{
                services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DatabaseContext")));
            }
        }
        private static Func<TokenValidatedContext, Task> OnTokenValidated()
        {
            return context =>
            {
                var tokenStore = context.HttpContext.RequestServices.GetService<MemoryTokenStore>();

                var token = new XeroOAuth2Token
                {
                    AccessToken = context.TokenEndpointResponse.AccessToken,
                    RefreshToken = context.TokenEndpointResponse.RefreshToken,
                    ExpiresAtUtc = DateTime.UtcNow.AddSeconds(Convert.ToDouble(context.TokenEndpointResponse.ExpiresIn))
                };

                tokenStore.SetToken(context.Principal.XeroUserId(), token);

                return Task.CompletedTask;
            };
        }




        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();

            // Initialise ReactJS.NET. Must be before static files.
            app.UseReact(config =>
            {
                // If you want to use server-side rendering of React components,
                // add all the necessary JavaScript files here. This includes
                // your components as well as all of their dependencies.
                // See http://reactjs.net/ for more information. Example:
                //config
                // .AddScript("~/js/First.jsx")
                //  .AddScript("~/js/Second.jsx");

                // If you use an external build too (for example, Babel, Webpack,
                // Browserify or Gulp), you can improve performance by disabling
                // ReactJS.NET's version of Babel and loading the pre-transpiled
                // scripts. Example:
                //config
                //  .SetLoadBabel(false)
                //  .AddScriptWithoutTransform("~/js/bundle.server.js");
            });

            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
