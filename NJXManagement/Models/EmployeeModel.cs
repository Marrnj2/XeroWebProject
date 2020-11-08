using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NJXManagement.Models
{
    public class EmployeeModel
    {
        public string title { get; set; }
        public string firstName {get; set;}
        public string lastName {get; set;}
        public string dateOfBirth {get; set;}
        public string gender { get; set; }
        public string email {get; set;}
        public string phoneNumber {get; set;}
        public AddressModel address { get; set; }

    }
}
