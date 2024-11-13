using AutopartesApi.Data.Interfaces;
using AutopartesApi.Entities;

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

        public bool Update(Autoparte? oAutoparte)
        {
            _context.Autopartes.Update(oAutoparte);
            return _context.SaveChanges() > 0;
        }
    }
}
