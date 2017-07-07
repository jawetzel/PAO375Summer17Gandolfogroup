using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessiVendApi.DB.Tables
{
    public class Session
    {
        [Key]
        public int Id { get; set; }
        public string Token { get; set; }
        public DateTime ExpireDateTime { get; set; }

        [ForeignKey("Admin")]
        public int AdminId { get; set; }
        public Admin Admin { get; set; }
    }
}
