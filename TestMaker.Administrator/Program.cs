using Ocelot.Middleware;
using Ocelot.ClientGateway;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddClientGatewayOcelot();

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseOcelot().Wait();

app.Run();
