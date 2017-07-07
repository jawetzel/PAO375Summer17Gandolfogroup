using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AccessiVendApi.DB.Tables
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string PreviousOrder { get; set; }
        public string FaceId { get; set; }

        public ICollection<DrinkOrder> DrinkOrders { get; set; }
    }
}
