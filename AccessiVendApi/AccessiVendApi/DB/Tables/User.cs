using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccessiVendApi.DB.Tables
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string PreviousOrder { get; set; }

        // face info here for lookup

        public ICollection<DrinkOrder> DrinkOrders { get; set; }
    }
}
