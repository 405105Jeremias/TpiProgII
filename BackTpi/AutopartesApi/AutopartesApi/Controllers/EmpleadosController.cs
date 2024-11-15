using AutopartesApi.Entities;
using AutopartesApi.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AutopartesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        private readonly IEmpleadosService _service;
        public EmpleadosController(IEmpleadosService service)
        {
            _service = service;
        }
        [HttpGet("TodosLosEmpleados")]
        public IActionResult Get()
        {
            try
            {
                return Ok(_service.GetEmpleado());
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }
        [HttpPost]
        public IActionResult Post([FromBody] Empleado value)
        {
            try
            {
                if (value == null)
                {
                    return BadRequest("Se esperaba una empleado completa");
                }
                if (_service.CreateEmpleado(value))
                {
                    return Ok("empleado Ingresada");
                }
                return StatusCode(400, "Datos del empleado incorrectos");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Empleado? value)
        {
            try
            {
                if (_service.UpdateEmpleado(id, value))
                {
                    return Ok("empleado Actualizada");
                }
                return StatusCode(400, "Datos del empleado incorrectos");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }
        
    }
}
