using AutopartesApi.Entities;

namespace AutopartesApi.Data.Interfaces
{
    public interface IFacturasRepository
    {
        bool CreateFactura(Factura facturas);
        bool DeleteFactura(int nro, string? motivo);
        List<Factura> GetFacturas();
    }
}
