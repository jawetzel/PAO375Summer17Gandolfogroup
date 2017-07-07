using AccessiVendApi.Services;
using AccessiVendApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AccessiVendApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Drink")]
    public class DrinkController : Controller
    {
        private readonly DrinkServices _drinkServ;

        public DrinkController(DrinkServices drinkServ)
        {
            _drinkServ = drinkServ;
        }

        [Route("listAllDrinkOrders")]
        [HttpGet]
        public JsonResult ListAllDrinkOrders()
        {
            return Json(new { Success = true, Orders = _drinkServ.ListAllDrinkOrders() });
        }
        [Route("listUnpaidDrinkOrders")]
        [HttpGet]
        public JsonResult UnpaidDrinkOrders()
        {
            return Json(new { Success = true, Orders = _drinkServ.ListOfUnpaidDrinkOrders() });
        }
        [Route("drinkOrdersByType")]
        [HttpPost]
        public JsonResult DrinkOrdersByType([FromBody]string type)
        {
            return Json(new { Success = true, Orders =_drinkServ.ListDrinkOrdersByDrinkTypeName(type) });
        }

        [Route("drinkOrdersByUserName")]
        [HttpPost]
        public JsonResult DrinkOrdersByUserName([FromBody]string name)
        {
            return Json(new { Success = true, Orders = _drinkServ.ListDrinkOrdersByUserName(name) });
        }

        [Route("unpaidDrinkOrdersByUserName")]
        [HttpPost]
        public JsonResult UnpaidDrinkOrdersByUserName([FromBody]string name)
        {
            return Json(new { Success = true, Orders = _drinkServ.ListOfUnpaidDrinkOrdersByName(name) });
        }
        [Route("buyDrink")]
        [HttpPost]
        public JsonResult OrderDrink([FromBody]BuyDrink order)
        {
            return _drinkServ.BuyDrink(order) == null ? Json(new {Success = false}) : Json(new {Success = true});
        }


    }
}