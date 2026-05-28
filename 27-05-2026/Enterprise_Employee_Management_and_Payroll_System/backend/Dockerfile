# Multi-stage Dockerfile for ASP.NET Core 8 API
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY src/HRMS.Core/HRMS.Core.csproj src/HRMS.Core/
COPY src/HRMS.Application/HRMS.Application.csproj src/HRMS.Application/
COPY src/HRMS.Infrastructure/HRMS.Infrastructure.csproj src/HRMS.Infrastructure/
COPY src/HRMS.API/HRMS.API.csproj src/HRMS.API/
RUN dotnet restore src/HRMS.API/HRMS.API.csproj

# Copy remaining source code and publish
COPY src/ src/
RUN dotnet publish src/HRMS.API/HRMS.API.csproj -c Release -o /app/publish /p:UseAppHost=false

# Runtime Image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
EXPOSE 5001
ENTRYPOINT ["dotnet", "HRMS.API.dll"]
