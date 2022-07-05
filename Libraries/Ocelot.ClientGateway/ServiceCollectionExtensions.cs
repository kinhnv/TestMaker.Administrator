using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ocelot.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ocelot.ClientGateway
{
    public static class ServiceCollectionExtensions
    {
        public static IOcelotBuilder AddClientGatewayOcelot(this IServiceCollection services)
        {
            var configuration = services.BuildServiceProvider()
                .GetRequiredService<IConfiguration>();

            return new ClientGatewayOcelotBuilder(services, configuration);
        }
    }
}
