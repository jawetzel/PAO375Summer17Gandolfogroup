using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccessiVendApi.DB.Tables;

namespace AccessiVendApi.ViewModels
{
    public class DrinkOrderReturnModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int DrinkTypeId { get; set; }
        public string DrinkTypeDescr { get; set; }
    }
}
