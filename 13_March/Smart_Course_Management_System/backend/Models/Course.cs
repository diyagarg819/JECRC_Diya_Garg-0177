namespace backend.Models
{
    public class Course
    {
        public int CourseId { get; set; }

        public string? CourseName { get; set; }

        public int DepartmentId { get; set; }

        public int Credits { get; set; }

        public bool SeatsAvailable { get; set; }

        public Department? Department { get; set; }
    }
}