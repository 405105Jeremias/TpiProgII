using AutopartesApi.Data.Interfaces;
using AutopartesApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace AutopartesApi.Data.Repositorys
{
    public class EmpleadosRepository : IEmpleadoRepository
    {
        private AutopartesTpiiContext _context;
        public EmpleadosRepository(AutopartesTpiiContext context)
        {
            _context = context;
        }
        public bool CreateEmpleado(Empleado empleado)
        {
            _context.Empleados.Add(empleado);
            return _context.SaveChanges() > 0;
        }        
        public List<Empleado> GetEmpleado()
        {
            return _context.Empleados
                    .Include(e=>e.IdCargoNavigation)
                    .ToList();
        }
        public bool UpdateEmpleado(string id, Empleado empleado)
        {
            if (empleado == null)
                return false;
            
            var empleadoExistente = _context.Empleados.Find(id);

            if (empleadoExistente != null)
            {               
                empleadoExistente.Contraseña = empleado.Contraseña;
                empleadoExistente.Nombre = empleado.Nombre;
                empleadoExistente.Apellido = empleado.Apellido;
                empleadoExistente.Mail = empleado.Mail;
                empleadoExistente.IdCargo = empleado.IdCargo;
                
                _context.Entry(empleadoExistente).State = EntityState.Modified;
                return _context.SaveChanges() > 0;
            }
            return false;
        }
    }
}
