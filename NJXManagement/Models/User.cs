using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace NJXManagement.Models
{
    public class User
    {
        public int userID { get; set; }
        public string fullName { get; set; }
        public string email { get; set; }
        public string pwd { get; set; }

    }
}
