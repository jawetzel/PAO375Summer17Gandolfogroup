using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccessiVendApi.DB.Tables;
using Microsoft.EntityFrameworkCore;

namespace AccessiVendApi.DB
{
    public class CoreContext : DbContext
    {
        public CoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<DrinkOrder> DrinkOrders { get; set; }
        public DbSet<DrinkType> DrinkTypes { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Session> Sessions { get; set; }

    }
}
