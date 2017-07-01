using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AccessiVendApi.DB
{
    public static class DbInitialize
    {
        public static void Initialize(CoreContext context)
        {
            context.Database.EnsureCreated();
            if (!context.DrinkTypes.Any())
            {
               //setup drink types
            }
            if (!context.Users.Any())
            {
                //setup users here
            }
            if (!context.DrinkOrders.Any())
            {
                //setup DrinkOrders
            }
        }
    }
}
