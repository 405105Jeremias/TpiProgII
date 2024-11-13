using AutopartesApi.Entities;

namespace AutopartesApi.Service.Interfaces
{
    public interface IAutopartesService
    {
        bool Create(Autoparte oAutoparte);
        bool Update(int id, Autoparte? oAutoparte);
        bool Delete(int id, string? motivo);
        List<Autoparte> GetAllAutopartes();
    }
}
