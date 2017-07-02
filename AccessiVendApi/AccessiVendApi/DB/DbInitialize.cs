using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccessiVendApi.DB.Tables;
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
               List<DrinkType> drinkList = new List<DrinkType>();
                drinkList.Add(new DrinkType
                {
                    Description = "Pepsi",
                    Price = 1.25
                });
                drinkList.Add(new DrinkType
                {
                    Description = "Mist Twist",
                    Price = 1
                });
                drinkList.Add(new DrinkType
                {
                    Description = "Mountain Dew",
                    Price = 1.5
                });
                foreach (var type in drinkList)
                {
                    context.DrinkTypes.Add(type);
                }
                context.SaveChanges();
            }
            if (!context.Users.Any())
            {
                //setup users here
                List<User> users = new List<User>
                {
                    new User
                    {
                        Name = "Joshua Wetzel"
                    },
                    new User
                    {
                        Name = "Ryan Craft"
                    },
                    new User
                    {
                        Name = "Patrick Gandolfo"
                    },
                    new User
                    {
                        Name = "Joseph Schenck"
                    }
                };

                foreach (var user in users)
                {
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
            if (!context.DrinkOrders.Any())
            {
                //setup DrinkOrders
            }
        }
    }
}
