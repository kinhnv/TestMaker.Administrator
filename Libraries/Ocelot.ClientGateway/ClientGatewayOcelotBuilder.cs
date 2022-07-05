using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ocelot.Configuration.File;
using Ocelot.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ocelot.ClientGateway
{
    public class ClientGatewayOcelotBuilder : OcelotBuilder, IOcelotBuilder
    {
        public ClientGatewayOcelotBuilder(IServiceCollection services, IConfiguration configurationRoot) : base(services, configurationRoot)
        {
            services.Configure<FileConfiguration>(options =>
            {
                var services = configurationRoot.GetSection("Services");

                foreach (var service in services.GetChildren())
                {
                    var prefix = service.GetValue<string>("Prefix");
                    var host = service.GetValue<string>("Host");
                    var portAsString = service.GetValue<string>("Port");
                    var schemeAsString = service.GetValue<string>("Scheme");
                    var port = 80;
                    int.TryParse(portAsString, out port);

                    if (prefix.StartsWith("/api"))
                    {
                        options.Routes.Add(new FileRoute
                        {
                            DownstreamPathTemplate = "/api/{everything}",
                            UpstreamPathTemplate = prefix + "/{everything}",
                            UpstreamHttpMethod = new List<string> { "Get", "Post", "Put", "Delete" },
                            DownstreamScheme = schemeAsString,
                            DownstreamHostAndPorts = new List<FileHostAndPort>
                            {
                                new FileHostAndPort { Host = host, Port = port }
                            }
                        });
                    }
                    else
                    {
                        options.Routes.Add(new FileRoute
                        {
                            DownstreamPathTemplate = prefix,
                            UpstreamPathTemplate = prefix,
                            UpstreamHttpMethod = new List<string> { "Get", "Post", "Put", "Delete" },
                            DownstreamScheme = schemeAsString,
                            DownstreamHostAndPorts = new List<FileHostAndPort>
                            {
                                new FileHostAndPort { Host = host, Port = port }
                            }
                        });
                    }
                }
            });
        }
    }
}
