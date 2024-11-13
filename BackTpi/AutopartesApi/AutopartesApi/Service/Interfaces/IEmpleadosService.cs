using AutopartesApi.Entities;

namespace AutopartesApi.Service.Interfaces
{
    public interface IEmpleadosService
    {
        List<Empleado> GetEmpleado();
        bool CreateEmpleado(Empleado empleado);
        bool UpdateEmpleado(int id, Empleado? empleado);
    }
}
