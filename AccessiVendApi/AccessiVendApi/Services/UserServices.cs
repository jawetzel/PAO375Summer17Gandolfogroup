using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccessiVendApi.DB;
using AccessiVendApi.DB.Tables;

namespace AccessiVendApi.Services
{
    public class UserServices
    {
        private readonly CoreContext _context;

        public UserServices(CoreContext context)
        {
            _context = context;
        }

        public List<User> GetListOfAllUsers()
        {
            return _context.Users.Where(user => user != null).ToList();
        }

        public User GetUserByName(string name)
        {
            try
            {
                return _context.Users.First(user => user.Name.Contains(name));
            }
            catch (Exception)
            {
                return null;
            }
        }

        public User GetUserByFaceId(string id)
        {
            try
            {
                return _context.Users.First(user => user.FaceId.Equals(id));
            }
            catch (Exception)
            {
                return null;
            }
        }
        public User GetUserById(int id)
        {
            try
            {
                return _context.Users.First(user => user.Id == id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public User CreateUser(User user)
        {
            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public User UpdateUser(User user)
        {
            try
            {
                _context.Users.Update(user);
                _context.SaveChanges();
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool DeleteUser(User user)
        {
            try
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
