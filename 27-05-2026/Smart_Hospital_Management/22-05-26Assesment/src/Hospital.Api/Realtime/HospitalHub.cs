using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Hospital.Api.Realtime;

[Authorize]
public sealed class HospitalHub : Hub
{
    public Task JoinBranch(string branchId) =>
        Groups.AddToGroupAsync(Context.ConnectionId, $"branch:{branchId}");

    public Task JoinPatient(string patientId) =>
        Groups.AddToGroupAsync(Context.ConnectionId, $"patient:{patientId}");
}
