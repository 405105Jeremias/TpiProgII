using AutopartesApi.Entities;

namespace AutopartesApi.Data.Interfaces
{
    public interface IEmpleadoRepository
    {
        List<Empleado> GetEmpleado();
        bool CreateEmpleado(Empleado empleado);        
        bool UpdateEmpleado(string id, Empleado empleado);
    }
}
