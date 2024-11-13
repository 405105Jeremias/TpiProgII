using AutopartesApi.Entities;
using AutopartesApi.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AutopartesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly IClientesService _service;
        public ClientesController(IClientesService service)
        {
            _service = service;
        }
        [HttpGet("Clientes")]
        public IActionResult Get()
        {
            return Ok(_service.GetClientes());
        }
        [HttpPost]
        public IActionResult Post([FromBody] Cliente? cliente)
        {
            try
            {
                if (cliente == null)
                {
                    return BadRequest("Se esperaban los datos del cliente completos");
                }
                if (_service.CreateCliente(cliente))
                    return Ok("Cliente registrado con exito");
                else
                    return StatusCode(500, "No se pudo registrar el cliente");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }
    }
}
