using System.ComponentModel.DataAnnotations;

namespace LibraryManagement.Validation
{
    /// <summary>
    /// Validates ISBN-10 and ISBN-13 values, allowing spaces and hyphens in the input.
    /// </summary>
    public sealed class IsbnAttribute : ValidationAttribute
    {
        /// <summary>
        /// Validates the supplied ISBN string against ISBN-10 and ISBN-13 checksum rules.
        /// </summary>
        /// <param name="value">Incoming property value.</param>
        /// <param name="validationContext">Context for the current validation request.</param>
        /// <returns>A success result when the ISBN is valid; otherwise a validation error.</returns>
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is not string isbn || string.IsNullOrWhiteSpace(isbn))
            {
                return new ValidationResult("ISBN is required.");
            }

            var normalizedIsbn = Normalize(isbn);

            if (IsValidIsbn10(normalizedIsbn) || IsValidIsbn13(normalizedIsbn))
            {
                return ValidationResult.Success;
            }

            return new ValidationResult("ISBN must be a valid ISBN-10 or ISBN-13 value.");
        }

        private static string Normalize(string isbn) => isbn.Replace("-", string.Empty).Replace(" ", string.Empty);

        private static bool IsValidIsbn10(string isbn)
        {
            if (isbn.Length != 10)
            {
                return false;
            }

            var checksum = 0;

            for (var index = 0; index < 9; index++)
            {
                if (!char.IsDigit(isbn[index]))
                {
                    return false;
                }

                checksum += (10 - index) * (isbn[index] - '0');
            }

            var checkCharacter = isbn[9];
            if (char.IsDigit(checkCharacter))
            {
                checksum += checkCharacter - '0';
            }
            else if (checkCharacter is 'X' or 'x')
            {
                checksum += 10;
            }
            else
            {
                return false;
            }

            return checksum % 11 == 0;
        }

        private static bool IsValidIsbn13(string isbn)
        {
            if (isbn.Length != 13 || isbn.Any(character => !char.IsDigit(character)))
            {
                return false;
            }

            var checksum = 0;

            for (var index = 0; index < isbn.Length; index++)
            {
                var digit = isbn[index] - '0';
                checksum += index % 2 == 0 ? digit : digit * 3;
            }

            return checksum % 10 == 0;
        }
    }
}
