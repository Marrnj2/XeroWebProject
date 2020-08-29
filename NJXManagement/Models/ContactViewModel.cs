using System.ComponentModel.DataAnnotations;

namespace NJXManagement.Models
{
    public class ContactViewModel
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Please enter a message.")]
        public string Message { get; set; }
    }
}