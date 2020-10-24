using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NJXManagement.Models
{
    public class BearerModel
    {
        public string PropertyType {get;set;}
        public string ID {get;set;}
        public string AuthEventId {get; set;}
        public string TenantId {get; set;}
        public string TenantType {get;set;}
        public string TenantName {get;set;}
        public string CreatedDateUtc {get;set;}
        public string UpdatedDateUtc {get;set;}

    }
}
