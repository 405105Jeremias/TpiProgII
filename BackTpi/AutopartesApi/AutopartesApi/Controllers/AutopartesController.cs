using AutopartesApi.Entities;
using AutopartesApi.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AutopartesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutopartesController : ControllerBase
    {
        private readonly IAutopartesService _service;
        public AutopartesController(IAutopartesService service)
        {
            _service = service;   
        }
        [HttpGet("TodasLasAutopartes")]
        public IActionResult Get()
        {
            try
            {
                return Ok(_service.GetAllAutopartes());
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }
        [HttpPost]
        public IActionResult Post([FromBody] Autoparte value)
        {
            try
            {
                if (value == null)
                {
                    return BadRequest("Se esperaba una autoparte completa");
                }
                if (_service.Create(value))
                {
                    return Ok("Autoparte Ingresada");
                }
                return StatusCode(400, "Datos del componente incorrectos");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Autoparte? value)
        {
            try
            {
                if (_service.Update(id,value))
                {
                    return Ok("Autoparte Actualizada");
                }
                return StatusCode(400, "Datos del componente incorrectos");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromQuery] string? motivo)
        {
            try
            {
                if (_service.Delete(id, motivo))
                {
                    return Ok("Autoparte dada de baja");
                }
                return StatusCode(400, "Error interno");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }
    }
}
