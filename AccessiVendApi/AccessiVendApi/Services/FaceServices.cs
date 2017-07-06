using AccessiVendApi.DB;
using AccessiVendApi.Dtos;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccessiVendApi.Services
{
    public class FaceServices
    {
        private readonly IOptions<FaceApiSettings> _apiSettings;
        private readonly string baseUrl;

        public FaceServices(IOptions<FaceApiSettings> apiSettings)
        {
            _apiSettings = apiSettings;
            baseUrl = apiSettings.Value.BaseUrl;
        }

        public async Task<bool> DetectFace(byte[] encodedImage)
        {
            
        }



    }
}
