using System;
using System.Collections.Generic;
using System.Linq;
using AccessiVendApi.DB;
using AccessiVendApi.DB.Tables;
using AccessiVendApi.ViewModels;

namespace AccessiVendApi.Services
{
    public class DrinkServices
    {
        private readonly CoreContext _context;

        public DrinkServices(CoreContext context)
        {
            _context = context;
        }

        public DrinkType NewDrinkType(DrinkType type)
        {
            try
            {
                _context.DrinkTypes.Add(type);
                _context.SaveChanges();
                return type;
            }
            catch (Exception)
            {
                return null;
            }
            
        }

        public DrinkType UpdateDrinkType(DrinkType type)
        {
            try
            {
                _context.DrinkTypes.Update(type);
                _context.SaveChanges();
                return type;
            }
            catch (Exception)
            {
                return null;
            }
           
        }

        public List<DrinkOrder> ListAllDrinkOrders()
        {
            return _context.DrinkOrders.Where(order => order != null).ToList();
        }

        public List<DrinkOrder> ListDrinkOrdersByUserName(string name)
        {
            return _context.DrinkOrders.Where(order => order.User.Name.Contains(name)).ToList();
        }

        public List<DrinkOrder> ListDrinkOrdersByDrinkTypeName(string name)
        {
            return _context.DrinkOrders.Where(order => order.DrinkType.Description.Contains(name)).ToList();
        }

        public List<DrinkOrder> ListOfUnpaidDrinkOrders()
        {
            return _context.DrinkOrders.Where(order => !order.Paid).ToList();
        }
        public List<DrinkOrder> ListOfUnpaidDrinkOrdersByName(string name)
        {
            return _context.DrinkOrders.Where(order => !order.Paid && order.User.Name.Contains(name)).ToList();
        }
        public DrinkOrder BuyDrink(BuyDrink order)
        {
            try
            {
                var user = _context.Users.First(person => person.Name.Contains(order.Name));
                var drinkType = _context.DrinkTypes.First(type => type.Description.Contains(order.DrinkType));
                var drinkOrder = new DrinkOrder()
                {
                    DrinkType = drinkType,
                    DrinkTypeId = drinkType.Id,
                    User = user,
                    UserId = user.Id
                };
                _context.DrinkOrders.Add(drinkOrder);
                _context.SaveChanges();
                return drinkOrder;
            }
            catch (Exception)
            {
                return null;
            }
            
        }
        public DrinkOrder BuyDrinkByUserId(BuyDrink order)
        {
            try
            {
                var user = _context.Users.First(person => person.Id == order.Id);
                var drinkType = _context.DrinkTypes.First(type => type.Description.Contains(order.DrinkType));
                var drinkOrder = new DrinkOrder()
                {
                    DrinkType = drinkType,
                    DrinkTypeId = drinkType.Id,
                    User = user,
                    UserId = user.Id
                };
                _context.DrinkOrders.Add(drinkOrder);
                _context.SaveChanges();
                return drinkOrder;
            }
            catch (Exception)
            {
                return null;
            }

        }
        public DrinkOrder BuyDrink(BuyDrinkFaceAndType order)
        {
            try
            {
                var user = _context.Users.First(person => person.FaceId.Equals(order.FaceId));
                var drinkType = _context.DrinkTypes.First(type => type.Description.Contains(order.DrinkType));
                var drinkOrder = new DrinkOrder()
                {
                    DrinkType = drinkType,
                    DrinkTypeId = drinkType.Id,
                    User = user,
                    UserId = user.Id
                };
                _context.DrinkOrders.Add(drinkOrder);
                _context.SaveChanges();
                return drinkOrder;
            }
            catch (Exception)
            {
                return null;
            }

        }
    }
}
