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
    public class DetailsModel : PageModel
    {
        private readonly NJXManagement.Data.DatabaseContext _context;

        public DetailsModel(NJXManagement.Data.DatabaseContext context)
        {
            _context = context;
        }

        public User User { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            User = await _context.User.FirstOrDefaultAsync(m => m.userID == id);

            if (User == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
