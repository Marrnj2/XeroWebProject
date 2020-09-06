using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using NJXManagement.Data;
using NJXManagement.Models;

namespace NJXManagement.Views_User
{
    public class IndexModel : PageModel
    {
        private readonly NJXManagement.Data.DatabaseContext _context;

        public IndexModel(NJXManagement.Data.DatabaseContext context)
        {
            _context = context;
        }

        public IList<User> User { get;set; }

        public async Task OnGetAsync()
        {
            User = await _context.User.ToListAsync();
        }
    }
}
