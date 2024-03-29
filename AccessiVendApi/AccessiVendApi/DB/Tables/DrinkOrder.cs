﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessiVendApi.DB.Tables
{
    public class DrinkOrder
    {
        [Key]
        public int Id { get; set; }
        public DateTime OrderTime { get; set; }
        public bool Paid { get; set; }
    
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }
        [ForeignKey("DrinkType")]
        public int DrinkTypeId { get; set; }
        public DrinkType DrinkType { get; set; }
    }
}
