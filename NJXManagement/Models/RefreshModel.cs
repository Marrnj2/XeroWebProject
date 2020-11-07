using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NJXManagement.Models
{
    public class RefreshModel
    {
        public string grant_type { get; set; }
        public string client_id { get; set; }
        public string refresh_token { get; set; }
    }
}
