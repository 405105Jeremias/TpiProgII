using AutopartesApi.Entities;

namespace AutopartesApi.Data.Interfaces
{
    public interface IClientesRepository
    {
        bool CreateCliente(Cliente? clientes);
        List<Cliente> GetClientes();
    }
}
