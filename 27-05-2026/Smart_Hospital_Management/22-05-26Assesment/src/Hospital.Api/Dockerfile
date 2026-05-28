FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY src/Hospital.Api/Hospital.Api.csproj src/Hospital.Api/
RUN dotnet restore src/Hospital.Api/Hospital.Api.csproj
COPY src/Hospital.Api src/Hospital.Api
RUN dotnet publish src/Hospital.Api/Hospital.Api.csproj -c Release -o /app/publish --no-restore

FROM runtime AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Hospital.Api.dll"]
