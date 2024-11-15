﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutopartesApi.Entities;

public partial class Factura
{
    
    public int IdFactura { get; set; }

    public DateOnly Fecha { get; set; }

    public int? IdCliente { get; set; }

    public int? IdEmpleado { get; set; }

    public string Estado { get; set; }

    public string MotivoBaja { get; set; }
    
    public virtual ICollection<DetallesFactura> DetallesFacturas { get; set; } = new List<DetallesFactura>();
    [JsonIgnore]
    public virtual Cliente IdClienteNavigation { get; set; }
    [JsonIgnore]
    public virtual Empleado IdEmpleadoNavigation { get; set; }

    public decimal Total => DetallesFacturas.Sum(d => d.Cantidad != null && decimal.TryParse(d.Cantidad, out var cantidad) ? cantidad * (d.PrecioU ?? 0) : 0);

}