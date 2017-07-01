using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AccessiVendApi.DB;
using AccessiVendApi.DB.Tables;
using AccessiVendApi.ViewModels;

namespace AccessiVendApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly CoreContext _context;

        public UsersController(CoreContext context)
        {
            _context = context;
        }

        [Route("listUsers")]
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }
        [Route("getUser")]
        [HttpGet]
        public JsonResult GetUserByName([FromBody]string name)
        {
            try
            {
                return Json(new { Success = true, User = _context.Users.First(currUser => currUser.Name.Contains(name))});
            }
            catch (Exception)
            {
                return Json(new { Success = false });

            }
        }

        [Route("buyDrink")]
        [HttpGet]
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