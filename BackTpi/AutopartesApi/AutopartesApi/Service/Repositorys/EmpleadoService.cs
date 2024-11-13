using AutopartesApi.Data.Interfaces;
using AutopartesApi.Entities;
using AutopartesApi.Service.Interfaces;

namespace AutopartesApi.Service.Repositorys
{
    public class EmpleadoService : IEmpleadosService
    {
        private readonly IEmpleadoRepository _repo;

        public EmpleadoService(IEmpleadoRepository repo)
        {
            _repo = repo;
        }
        public bool CreateEmpleado(Empleado empleado)
        {
            return _repo.CreateEmpleado(empleado);
        }

        public List<Empleado> GetEmpleado()
        {
            return _repo.GetEmpleado();
        }

        public bool UpdateEmpleado(int id, Empleado? empleado)
        {
            return _repo.UpdateEmpleado(id,empleado);
        }
    }
}
