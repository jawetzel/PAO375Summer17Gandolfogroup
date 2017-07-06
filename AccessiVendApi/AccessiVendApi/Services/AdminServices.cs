using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using AccessiVendApi.DB;
using AccessiVendApi.DB.Tables;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace AccessiVendApi.Services
{
    public class AdminServices
    {
        private readonly CoreContext _context;

        public AdminServices(CoreContext context)
        {
            _context = context;
        }

        public bool CreateAdmin(Admin admin)
        {
            var newAdmin = CreateCrtyptoPassword(admin);
            try
            {
                _context.Admins.Add(newAdmin);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public Session LoginAdmin(Admin admin)
        {
            try
            {
                var foundAdmin = _context.Admins.First(found => found.Username.Equals(admin.Username));
                admin.Salt = foundAdmin.Salt;
                if (GetCrypotdPassword(admin).Equals(foundAdmin.Password))
                {
                    var session = new Session
                    {
                        Admin = foundAdmin,
                        AdminId = foundAdmin.Id,
                        ExpireDateTime = DateTime.UtcNow.AddHours(8),
                        Token = DateTime.UtcNow + " " + Guid.NewGuid() + Guid.NewGuid()
                    };
                    _context.Sessions.Add(session);
                    _context.SaveChanges();
                    return session;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
            
        }

        public bool CheckSession(string token)
        {
            try
            {
                var session = _context.Sessions.First(sess => sess.Token.Equals(token) && sess.ExpireDateTime > DateTime.UtcNow);
                session.ExpireDateTime = DateTime.UtcNow.AddHours(8);
                _context.Sessions.Update(session);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static string GetCrypotdPassword(Admin user)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: user.Password,
                salt: user.Salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
        }

        public static Admin CreateCrtyptoPassword(Admin user)
        {
            var salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");

            user.Salt = salt;
            user.Password = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: user.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return user;
        }
    }
}
