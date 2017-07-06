using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccessiVendApi.DB;

namespace AccessiVendApi.Services
{
    public class DrinkServices
    {
        private readonly CoreContext _context;

        public DrinkServices(CoreContext context)
        {
            _context = context;
        }
    }
}
