using AutopartesApi.Data.Interfaces;
using AutopartesApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutopartesApi.Data.Repositorys
{
    public class FacturasRepository : IFacturasRepository
    {
        private AutopartesTpiiContext _context;
        public FacturasRepository(AutopartesTpiiContext context) 
        {
            _context = context;
        }
        public bool CreateFactura(Factura facturas)
        {
            _context.Facturas.Add(facturas);
            return _context.SaveChanges() > 0;
        }

        public bool DeleteFactura(int nro, string? motivo)
        {
            Factura? f = _context.Facturas.Find(nro);
            if (f != null && f.Estado.ToLower() == "alta")
            {
                f.Estado = "Baja";
                f.MotivoBaja = motivo;
                _context.Facturas.Update(f);
            }
            return _context.SaveChanges() > 0;
        }

        public List<Factura> GetFacturas()
        {
            return _context.Facturas
                   .Include(x => x.DetallesFacturas)
                   .ToList();
        }
    }
}
