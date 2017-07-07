using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AccessiVendApi.DB;
using AccessiVendApi.DB.Tables;
using AccessiVendApi.Services;
using AccessiVendApi.ViewModels;
using System.Diagnostics;

namespace AccessiVendApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly UserServices _userServ;
        private readonly FaceServices _faceService;

        public UsersController(UserServices userServ, FaceServices faceService)
        {
            _userServ = userServ;
            _faceService = faceService;
        }

        [Route("testRyan")]
        [HttpPost]
        public async Task<JsonResult> TestRyan([FromBody]string encodedImage)
        {
            var face = await _faceService.DetectPrimaryFace(encodedImage);
            return face == null ? Json(new { Success = false }) : Json(new { Success = true, FaceId = face.FaceId });
        }

        [Route("listUsers")]
        [HttpGet]
        public JsonResult GetUsers()
        {
            var users = _userServ.GetListOfAllUsers();
            return users == null ? Json(new {Success = false}) : Json(new { Success = true, Users = users });
        }

        [Route("getUserName")]
        [HttpPost]
        public JsonResult GetUserByName([FromBody]string name)
        {
            var user = _userServ.GetUserByName(name);
            return user == null ? Json(new {Success = false}) : Json(new {Success = true, Users = user});
        }

        [Route("getUserFaceId")]
        [HttpPost]
        public JsonResult GetUserByFaceId([FromBody]string faceId)
        {
            var user = _userServ.GetUserByFaceId(faceId);
            return user == null ? Json(new { Success = false }) : Json(new { Success = true, Users = user });
        }

        [Route("getUserById")]
        [HttpPost]
        public JsonResult GetUserById([FromBody]int id)
        {
            var user = _userServ.GetUserById(id);
            return user == null ? Json(new { Success = false }) : Json(new { Success = true, Users = user });
        }

        [Route("createUser")]
        [HttpPost]
        public JsonResult CreateUser([FromBody]User user)
        {
            var newUser = _userServ.CreateUser(user);
            return newUser == null ? Json(new { Success = false }) : Json(new { Success = true, Users = newUser });
        }

        [Route("updateUser")]
        [HttpPost]
        public JsonResult UpdateUser([FromBody]User user)
        {
            var newUser = _userServ.UpdateUser(user);
            return newUser == null ? Json(new { Success = false }) : Json(new { Success = true, Users = newUser });
        }

        [Route("deleteUser")]
        [HttpPost]
        public JsonResult DeleteUser([FromBody]User user)
        {
            var success = _userServ.DeleteUser(user);
            return success == false ? Json(new { Success = false }) : Json(new { Success = true });
        }
    }
}