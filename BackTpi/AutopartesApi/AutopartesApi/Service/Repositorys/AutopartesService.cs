using AutopartesApi.Data.Interfaces;
using AutopartesApi.Entities;
using AutopartesApi.Service.Interfaces;

namespace AutopartesApi.Service.Repositorys
{
    public class AutopartesService : IAutopartesService
    {
        private readonly IAutopartesRepository _repo;
        public AutopartesService(IAutopartesRepository repo)
        {
            _repo = repo;   
        }
        public bool Create(Autoparte oAutoparte)
        {
            return _repo.Create(oAutoparte);
        }

        public bool Delete(int id, string? motivo)
        {
            return _repo.Delete(id, motivo);
        }

        public List<Autoparte> GetAllAutopartes()
        {
            return _repo.GetAllAutopartes();
        }

        public bool Update(int id, Autoparte? oAutoparte)
        {
            return _repo.Update(id,oAutoparte);
        }
    }
}
