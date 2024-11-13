using AutopartesApi.Data.Interfaces;
using AutopartesApi.Entities;

namespace AutopartesApi.Data.Repositorys
{
    public class ClientesRepository : IClientesRepository
    { 
        private AutopartesTpiiContext _context;
        public ClientesRepository(AutopartesTpiiContext context)
        {
            _context = context;
        }
        public bool CreateCliente(Cliente clientes)
        {
            _context.Clientes.Add(clientes);
            return _context.SaveChanges() > 0;
        }

        public List<Cliente> GetClientes()
        {
            return _context.Clientes
                  .ToList();
        }
    }
}
