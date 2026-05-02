FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# ✅ FIXED LINE (no EMSAPI/ prefix)
COPY ["EMSAPI.csproj", "."]
RUN dotnet restore "EMSAPI.csproj"

COPY . .
RUN dotnet publish "EMSAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "EMSAPI.dll"]