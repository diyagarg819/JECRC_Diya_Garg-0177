namespace StudentAttendenceSystem.Model
{
    public class Attendence
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public DateTime Date { get; set; }
        public bool isPresent { get; set; }

    }
}
