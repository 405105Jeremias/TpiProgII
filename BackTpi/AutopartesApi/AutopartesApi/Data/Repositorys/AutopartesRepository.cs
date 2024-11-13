using AutopartesApi.Data.Interfaces;
using AutopartesApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutopartesApi.Data.Repositorys
{
    public class AutopartesRepository : IAutopartesRepository
    {
        private AutopartesTpiiContext _context;
        public AutopartesRepository(AutopartesTpiiContext context)
        {
            _context = context;
        }
        public bool Create(Autoparte oAutoparte)
        {
            _context.Autopartes.Add(oAutoparte);
            return _context.SaveChanges() > 0;
        }

        public bool Delete(int id, string? motivo)
        {
            Autoparte? a = _context.Autopartes.Find(id);
            if (a != null && a.Estado.ToLower() == "alta")
            {
                a.Estado = "Baja";
                a.MotivoBaja = motivo;
                a.FechaBaja = DateOnly.FromDateTime(DateTime.Now);
                _context.Autopartes.Update(a);
            }
            return _context.SaveChanges() > 0;
        }

        public List<Autoparte> GetAllAutopartes()
        {
            return _context.Autopartes
                   .ToList();
        }

        public bool Update(int id,Autoparte? oAutoparte)
        {
            if (oAutoparte == null)
                return false;

            // Busca la autoparte en la base de datos utilizando el id proporcionado
            var autoparte = _context.Autopartes.Find(id);
            if (autoparte != null)
            {
                // Actualiza los valores de la entidad existente sin cambiar su referencia
                autoparte.MotivoBaja = oAutoparte.MotivoBaja;
                autoparte.FechaBaja = oAutoparte.FechaBaja;
                autoparte.Estado = oAutoparte.Estado;
                autoparte.Stock = oAutoparte.Stock;
                autoparte.Precio = oAutoparte.Precio;
                autoparte.Descripcion = oAutoparte.Descripcion;
                autoparte.IdCategoria = oAutoparte.IdCategoria;

                // Marca la entidad como modificada
                _context.Entry(autoparte).State = EntityState.Modified;
                return _context.SaveChanges() > 0;
            }
            return false;
        }
    }
}
