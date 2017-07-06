using AccessiVendApi.Dtos;
using Microsoft.Extensions.Options;
using RestSharp;
using System;
using System.Diagnostics;

namespace AccessiVendApi.Services
{
    public class FaceServices
    {
        private readonly IOptions<FaceApiSettings> _apiSettings;

        public FaceServices(IOptions<FaceApiSettings> apiSettings)
        {
            _apiSettings = apiSettings;
        }

        public void DetectFace(string encodedImage, Action<string> userDetectedCallback, Action<string> noUserDetectedCallback)
        {
            var client = new RestClient(_apiSettings.Value.BaseUrl);
            var request = new RestRequest("detect?");

            request.Method = Method.POST;
            request.AddHeader("Content-Type", "application/octet-stream");
            request.AddHeader("Ocp-Apim-Subscription-Key", _apiSettings.Value.AccessKey);
            request.AddParameter("application/octet-stream", Convert.FromBase64String(encodedImage), ParameterType.RequestBody);

            client.ExecuteAsync(request, response =>
            {
                var userDetected = response.Content.TrimStart('[').TrimEnd(']').Length > 0;

                if (userDetected)
                {
                    userDetectedCallback(response.Content);
                } else
                {
                    noUserDetectedCallback(response.Content);
                }
            });
        }
    }
}
