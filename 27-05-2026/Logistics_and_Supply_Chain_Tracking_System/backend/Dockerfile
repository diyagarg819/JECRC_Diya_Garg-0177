FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["LogiTrack.API/LogiTrack.API.csproj", "LogiTrack.API/"]
COPY ["LogiTrack.Application/LogiTrack.Application.csproj", "LogiTrack.Application/"]
COPY ["LogiTrack.Core/LogiTrack.Core.csproj", "LogiTrack.Core/"]
COPY ["LogiTrack.Infrastructure/LogiTrack.Infrastructure.csproj", "LogiTrack.Infrastructure/"]
RUN dotnet restore "LogiTrack.API/LogiTrack.API.csproj"
COPY . .
WORKDIR "/src/LogiTrack.API"
RUN dotnet build "LogiTrack.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LogiTrack.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LogiTrack.API.dll"]
