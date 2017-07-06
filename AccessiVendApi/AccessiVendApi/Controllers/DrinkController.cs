using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccessiVendApi.DB;
using AccessiVendApi.DB.Tables;
using AccessiVendApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccessiVendApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Drink")]
    public class DrinkController : Controller
    {
        private readonly CoreContext _context;

        public DrinkController(CoreContext context)
        {
            _context = context;
        }


        [Route("buyDrink")]
        [HttpPost]
        public JsonResult OrderDrink([FromBody]BuyDrink order)
        {
            try
            {
                var user = _context.Users.First(currUser => currUser.Name.Contains(order.Name));
                var drinkType = _context.DrinkTypes.First(type => type.Description.Contains(order.DrinkType));
                _context.DrinkOrders.Add(new DrinkOrder()
                {
                    DrinkType = drinkType,
                    DrinkTypeId = drinkType.Id,
                    OrderTime = DateTime.UtcNow,
                    User = user,
                    UserId = user.Id
                });
                _context.SaveChanges();
                return Json(new { Success = true });
            }
            catch (Exception)
            {
                return Json(new { Success = false });

            }
        }

    }
}