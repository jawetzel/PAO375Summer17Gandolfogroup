using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccessiVendApi.DB.Tables
{
    public class DrinkType
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }

        public ICollection<DrinkOrder> DrinkOrders { get; set; }

    }
}
