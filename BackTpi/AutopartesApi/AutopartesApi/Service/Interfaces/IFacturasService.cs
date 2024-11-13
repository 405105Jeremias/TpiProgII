using AutopartesApi.Entities;

namespace AutopartesApi.Service.Interfaces
{
    public interface IFacturasService
    {
        bool CreateFactura(Factura facturas);
        bool DeleteFactura(int nro, string? motivo);
        List<Factura> GetFacturas();
    }
}
