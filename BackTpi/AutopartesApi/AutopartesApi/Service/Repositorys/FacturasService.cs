using AutopartesApi.Data.Interfaces;
using AutopartesApi.Entities;
using AutopartesApi.Service.Interfaces;

namespace AutopartesApi.Service.Repositorys
{
    public class FacturasService : IFacturasService
    {
        private readonly IFacturasRepository _repo;
        public FacturasService(IFacturasRepository repo)
        {
            _repo = repo;
        }
        public bool CreateFactura(Factura facturas)
        {
            return _repo.CreateFactura(facturas);
        }

        public bool DeleteFactura(int nro, string? motivo)
        {
            return _repo.DeleteFactura(nro, motivo);
        }

        public List<Factura> GetFacturas()
        {
            return _repo.GetFacturas();
        }
    }
}
