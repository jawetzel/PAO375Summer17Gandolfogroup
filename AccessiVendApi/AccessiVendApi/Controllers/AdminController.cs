using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccessiVendApi.DB.Tables;
using AccessiVendApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccessiVendApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        private readonly AdminServices _adminServices;

        public AdminController(AdminServices adminServices)
        {
            _adminServices = adminServices;
        }

        [Route("login")]
        [HttpPost]
        public JsonResult AdminLogin([FromBody]Admin admin)
        {
            var session = _adminServices.LoginAdmin(admin);
            return session == null ? Json(new { Success = false }) : Json(new { Success = true, Session = session });
        }
    }
}