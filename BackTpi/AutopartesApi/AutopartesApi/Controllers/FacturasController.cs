using AutopartesApi.Entities;
using AutopartesApi.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AutopartesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturasController : ControllerBase
    {
        private readonly IFacturasService _service;
        public FacturasController(IFacturasService service)
        {
            _service = service;
        }
        [HttpGet("TodasLasFacturas")]
        public IActionResult Get()
        {
            return Ok(_service.GetFacturas());
        }        
        [HttpDelete("ordenes/{nro}")]
        public IActionResult Delete(int nro, [FromQuery] string? motivo)
        {
            try
            {
                if (_service.DeleteFactura(nro, motivo))
                {
                    return Ok("Factura dada de baja");
                }
                return StatusCode(400, "Error interno");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }


        [HttpPost]
        public IActionResult Post([FromBody] Factura facturas)
        {
            try
            {
                if (facturas == null)
                {
                    return BadRequest("Se esperaban los datos de la factura completos");
                }
                if (_service.CreateFactura(facturas))
                    return Ok("factura registrada con exito");
                else
                    return StatusCode(500, "No se pudo registrar la factura");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }
    }
}
