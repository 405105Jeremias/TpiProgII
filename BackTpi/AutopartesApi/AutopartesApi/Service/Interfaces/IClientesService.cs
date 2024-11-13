using AutopartesApi.Entities;

namespace AutopartesApi.Service.Interfaces
{
    public interface IClientesService
    {
        bool CreateCliente(Cliente? clientes);
        List<Cliente> GetClientes();
    }
}
