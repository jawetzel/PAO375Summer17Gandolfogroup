using AccessiVendApi.Configuration;
using AccessiVendApi.DB;
using AccessiVendApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace AccessiVendApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<CoreContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<CoreContext>(options => options.UseSqlServer(Configuration.GetConnectionString("LiveConnection")));

            services.AddScoped<UserServices>();
            services.AddScoped<DrinkServices>();
            services.AddScoped<AdminServices>();
            services.AddScoped<FaceServices>();

            services.Configure<FaceApiSettings>(Configuration.GetSection("Api").GetSection("Face"));

            services.AddMvc();
            services.AddCors(o => o.AddPolicy("localHost3000", builder =>
            {
                builder.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            }));
            services.AddCors(o => o.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            }));
            services.AddCors(o => o.AddPolicy("localHost19001", builder =>
            {
                builder.WithOrigins("http://localhost:19001")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, CoreContext DbContext, AdminServices adminServ)
        {
            app.UseCors("AllowAll");
            app.UseCors("localHost3000");
            app.UseCors("localHost19001");
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseMvc();

            DbInitialize.Initialize(DbContext, adminServ);
        }
    }
}
