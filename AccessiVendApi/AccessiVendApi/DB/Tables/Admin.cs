using System.ComponentModel.DataAnnotations;

namespace AccessiVendApi.DB.Tables
{
    public class Admin
    {
        [Key]
        public int Id { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }
        public byte[] Salt { get; set; }
    }
}
