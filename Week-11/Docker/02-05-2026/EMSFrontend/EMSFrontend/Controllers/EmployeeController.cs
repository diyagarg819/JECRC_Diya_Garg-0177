using EMSFrontend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace EMSFrontend.Controllerscd 
{
    public class EmployeeController : Controller
    {
        private readonly HttpClient _httpClient;

        public EmployeeController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("EmployeeApi");
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var employees = new List<Employee>();
            try 
            {
                var response = await _httpClient.GetAsync("api/employee"); 

                if (response.IsSuccessStatusCode)
                {
                    employees = await response.Content.ReadFromJsonAsync<List<Employee>>() ?? new List<Employee>();
                }
                else
                {
                    ModelState.AddModelError(string.Empty, $"Backend API returned an error: {response.StatusCode}. Please check the backend logs.");
                }
            }
            catch (HttpRequestException)
            {
                // The backend API is down or unreachable
                ModelState.AddModelError(string.Empty, "Cannot connect to the backend API. Please make sure it is running.");
            }

            return View(employees);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return View(employee);
            }

            try 
            {
                var response = await _httpClient.PostAsJsonAsync("api/employee", employee);

                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
                ModelState.AddModelError(string.Empty, "Error sending request to backend.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Cannot connect to the backend API. Please make sure it is running.");
            }

            return View(employee);
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"api/employee/{id}");
                if (response.IsSuccessStatusCode)
                {
                    var employee = await response.Content.ReadFromJsonAsync<Employee>();
                    if (employee == null) return NotFound();
                    return View(employee);
                }
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Cannot connect to the backend API. Please make sure it is running.");
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"api/employee/{id}");
                if (response.IsSuccessStatusCode)
                {
                    var employee = await response.Content.ReadFromJsonAsync<Employee>();
                    if (employee == null) return NotFound();
                    return View(employee);
                }
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Cannot connect to the backend API. Please make sure it is running.");
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, Employee employee)
        {
            if (id != employee.Id) return BadRequest();
            if (!ModelState.IsValid) return View(employee);

            try
            {
                var response = await _httpClient.PutAsJsonAsync($"api/employee/{id}", employee);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
                ModelState.AddModelError(string.Empty, "Error sending update request to backend.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Cannot connect to the backend API. Please make sure it is running.");
            }

            return View(employee);
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"api/employee/{id}");
                if (response.IsSuccessStatusCode)
                {
                    var employee = await response.Content.ReadFromJsonAsync<Employee>();
                    if (employee == null) return NotFound();
                    return View(employee);
                }
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Cannot connect to the backend API. Please make sure it is running.");
            }
            return NotFound();
        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            try
            {
                var response = await _httpClient.DeleteAsync($"api/employee/{id}");
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
                ModelState.AddModelError(string.Empty, "Error deleting from backend.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Cannot connect to the backend API. Please make sure it is running.");
            }

            return RedirectToAction(nameof(Delete), new { id });
        }
    }
}
