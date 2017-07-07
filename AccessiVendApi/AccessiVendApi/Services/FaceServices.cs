using AccessiVendApi.Dtos;
using Microsoft.Extensions.Options;
using Microsoft.ProjectOxford.Face;
using Microsoft.ProjectOxford.Face.Contract;
using MoreLinq;
using RestSharp;
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AccessiVendApi.Services
{
    public class FaceServices
    {
        private readonly string AccessKey;
        private readonly string BaseUrl;

        public FaceServices(IOptions<FaceApiSettings> apiSettings)
        {
            AccessKey = apiSettings.Value.AccessKey;
            BaseUrl = apiSettings.Value.BaseUrl;
        }

        public async Task<Face> DetectPrimaryFace(string base64EncodedImage)
        {
            var client = new FaceServiceClient(AccessKey, BaseUrl);
            var imageByteArray = Convert.FromBase64String(base64EncodedImage);

            using (var stream = new MemoryStream(imageByteArray))
            {
                var faces = await client.DetectAsync(stream);
                if (faces.Any())
                {
                    return faces.MaxBy(x => x.FaceRectangle.Height * x.FaceRectangle.Width);
                }

                return null;
            }
        }
    }
}
