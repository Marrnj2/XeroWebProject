using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NJXManagement.Data;
using NJXManagement.Models;
using System;
using System.Linq;

namespace NJXManagement.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DatabaseContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<DatabaseContext>>()))
            {
                // Look for any students
                if (context.Student.Any())
                {
                    return;   // DB has been seeded
                }

                context.Student.AddRange(
                    new Student
                    {
                        LastName = "Horrell",
                        FirstName = "Jamie",
                        EnrolmentDate = DateTime.Parse("2018-2-12")
                    }
                );

                Console.WriteLine("made it to here");

                context.SaveChanges();
            }
        }
    }
}