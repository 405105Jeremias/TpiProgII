using AutopartesApi.Data.Interfaces;
using AutopartesApi.Entities;
using AutopartesApi.Service.Interfaces;

namespace AutopartesApi.Service.Repositorys
{
    public class ClientesService : IClientesService
    {
        private readonly IClientesRepository _repo;
        public ClientesService(IClientesRepository repo)
        {
            _repo = repo;
        }
        public bool CreateCliente(Cliente? clientes)
        {
            return _repo.CreateCliente(clientes);
        }

        public List<Cliente> GetClientes()
        {
            return _repo.GetClientes();
        }
    }
}
