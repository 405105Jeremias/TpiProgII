using AutopartesApi.Entities;

namespace AutopartesApi.Data.Interfaces
{
    public interface IAutopartesRepository
    {
        bool Create(Autoparte oAutoparte);        
        bool Update(int id,Autoparte? oAutoparte);
        bool Delete(int id, string? motivo);
        List<Autoparte> GetAllAutopartes();
    }
}
