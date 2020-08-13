using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NJXManagement.Models
{
    public class OutstandingInvoicesViewModel
    {
        public string Name { get; set; }
        public Dictionary<string, int> Data { get; set; }
    }
}
