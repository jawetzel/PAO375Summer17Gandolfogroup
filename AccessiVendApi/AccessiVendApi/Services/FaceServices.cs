using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AccessiVendApi.Configuration;
using AccessiVendApi.ViewModels;
using Microsoft.Extensions.Options;
using Microsoft.ProjectOxford.Face;
using Microsoft.ProjectOxford.Face.Contract;
using MoreLinq;

namespace AccessiVendApi.Services
{
    public class FaceServices
    {
        private readonly FaceServiceClient _client;
        private readonly string _personGroupId;

        public FaceServices(IOptions<FaceApiSettings> apiSettings)
        {
            _client = new FaceServiceClient(apiSettings.Value.SubscriptionKey, apiSettings.Value.BaseUrl);
            _personGroupId = apiSettings.Value.PersonGroupId;
        }

        public async Task<Face> DetectPrimaryFace(string base64EncodedImage)
        {
            var imageByteArray = Convert.FromBase64String(base64EncodedImage);

            using (var stream = new MemoryStream(imageByteArray))
            {
                var faces = await _client.DetectAsync(stream);
                if (faces.Any())
                {
                    return faces.MaxBy(x => x.FaceRectangle.Height * x.FaceRectangle.Width);
                }

                return null;
            }
        }

        public async Task<IdentifyUserResult> IdentifyFace(string base64EncodedImage)
        {
            var face = await DetectPrimaryFace(base64EncodedImage);
            if (face != null)
            {
                var result = await _client.IdentifyAsync(_personGroupId, new[] { face.FaceId });
                return new IdentifyUserResult(true, result[0]);
            }

            return new IdentifyUserResult(false, new IdentifyResult());
        }

        public async Task<IdentifyUserResult> IdentifyFace(Guid faceId)
        {
            var result = await _client.IdentifyAsync(_personGroupId, new[] {faceId});
            return new IdentifyUserResult(true, result[0]);
        }

        public async Task<Guid> AddFaceToPerson(string base64EncodedImage, string personId)
        {
            var imageByteArray = Convert.FromBase64String(base64EncodedImage);
            var result = await AddFaceToPerson(imageByteArray, personId);

            return result;
        }

        public async Task<Guid> AddFaceToPerson(byte[] imageByteArray, string personId)
        {
            var personIdGuid = Guid.Parse(personId);

            using (var stream = new MemoryStream(imageByteArray))
            {
                var result = await _client.AddPersonFaceAsync(_personGroupId, personIdGuid, stream);
                return result.PersistedFaceId;
            }
        }
    }
}
