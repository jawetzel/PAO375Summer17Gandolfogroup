using System.Linq;
using System.Threading.Tasks;
using AccessiVendApi.DB.Tables;
using AccessiVendApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Internal;
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

        [Route("getUserByImage")]
        [HttpPost]
        public async Task<JsonResult> DetectAndIdentifyUser([FromBody]List<string> encodedList)
        {
            var base64EncodedImage = string.Join("", encodedList).Remove(0, 1);
            base64EncodedImage = base64EncodedImage.Remove(base64EncodedImage.Length - 1);

            var result = await _faceService.IdentifyFace(base64EncodedImage);
            var userDetected = result.UserDetected;
            var candidates = result.IdentifyResult.Candidates;
            User user = null;

            if (userDetected && candidates.Any())
            {
                var id = candidates.Select(x => x.PersonId.ToString()).FirstOrDefault();
                user = _userServ.GetUserByFaceId(id);
            }

            return Json(new { Success = user == null, UserDetected = userDetected, MatchingUser = user });
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