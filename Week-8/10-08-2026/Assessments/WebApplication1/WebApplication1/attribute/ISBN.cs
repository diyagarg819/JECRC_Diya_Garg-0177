using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

namespace WebApplication1.attribute
{
    public class ISBN : ValidationAttribute
    {
        private readonly string value;
        public ISBN(string value) {
            this.value = value;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is string isbn)
            {
                if (isbn.Length == 10 || isbn.Length == 13)
                {
                    return ValidationResult.Success;
                }
            }
            return new ValidationResult("ISBN must be either 10 or 13 characters long.");
        }
     
    }

}
