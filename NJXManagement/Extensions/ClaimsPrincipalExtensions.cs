using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NJXManagement.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string XeroUserId(this ClaimsPrincipal claims)
        {
            return claims.FindFirstValue("xero_userid");
        }
    }
}
