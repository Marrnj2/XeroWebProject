using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NJXManagement.Models
{
    public class TokenModel
    {
        public String Grant_type { get; set; }
        public String Code { get; set; }
        public String RedirectUri { get; set; }
    }
}
