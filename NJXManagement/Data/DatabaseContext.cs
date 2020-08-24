using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NJXManagement.Models;

namespace NJXManagement.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(
            DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Student { get; set; }
    }
}
