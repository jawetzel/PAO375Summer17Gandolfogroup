using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ProjectOxford.Face.Contract;

namespace AccessiVendApi.ViewModels
{
    public class IdentifyUserResult
    {
        public bool UserDetected { get; set; }

        public IdentifyResult IdentifyResult { get; set; }

        public IdentifyUserResult(bool userDetected, IdentifyResult identifyResult)
        {
            UserDetected = userDetected;
            IdentifyResult = identifyResult;
        }
    }
}
