Create Database AutopartesTpii
go
use AutopartesTpii
go

Create table Cargos(
id_cargo int PRIMARY KEY,
descripcion varchar(100)
)

Create table Empleados(
id_empleado int Primary key,
contraseña varchar(100),
nombre varchar(100),
apellido varchar(100),
mail varchar(100),
id_cargo int
FOREIGN KEY (id_cargo) REFERENCES Cargos(id_cargo),
)

CREATE TABLE Clientes (
    id_cliente INT identity(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    numero INT,
    mail VARCHAR(100)
);

CREATE TABLE Facturas (
    id_factura INT identity(1,1) PRIMARY KEY,
    fecha DATE NOT NULL,
    id_cliente INT,
	id_empleado int,
    estado VARCHAR(100),
    motivoBaja VARCHAR(100),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
	foreign key (id_empleado) references empleados(id_empleado)
);

CREATE TABLE Categorias (
    id_categoria INT identity(1,1) PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE Autopartes (
    id_autoparte INT identity(1,1) PRIMARY KEY,
    motivoBaja VARCHAR(100),
    fecha_baja DATE,
    estado VARCHAR(100),
    stock INT,
    precio DECIMAL(15,2),
    descripcion VARCHAR(100),
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

CREATE TABLE DetallesFacturas (
    id_detalle INT identity(1,1) PRIMARY KEY,
    id_factura INT,
    id_autoparte INT,
    cantidad VARCHAR(100),
    precio_u DECIMAL(15,2),
    FOREIGN KEY (id_factura) REFERENCES Facturas(id_factura),
    FOREIGN KEY (id_autoparte) REFERENCES Autopartes(id_autoparte)
);

go

-- Datos para la tabla Clientes
INSERT INTO Clientes ( nombre, apellido, numero, mail)
VALUES 
    ( 'Juan', 'Pérez', 123456, 'juan.perez@example.com'),
    ( 'María', 'González', 654321, 'maria.gonzalez@example.com'),
    ( 'Carlos', 'López', 789012, 'carlos.lopez@example.com');

-- Datos para la tabla Categorias
INSERT INTO Categorias ( descripcion)
VALUES 
    ( 'Motor'),
    ( 'Suspensión'),
    ( 'Electrónica');

-- Datos para la tabla Autopartes
INSERT INTO Autopartes ( motivoBaja, fecha_baja, estado, stock, precio, descripcion, id_categoria)
VALUES 
    ( 'Fin de vida útil', '2024-01-01', 'Baja', 0, 2500.00, 'Filtro de aire', 1),
    ( NULL, NULL, 'Alta', 50, 5000.00, 'Amortiguador delantero', 2),
    ( 'Obsoleto', '2023-05-15', 'Baja', 0, 1200.00, 'Bujía', 3),
    ( NULL, NULL, 'Alta', 100, 7500.00, 'Batería', 3);

-- Datos para la tabla Facturas
INSERT INTO Facturas ( fecha, id_cliente, estado, motivoBaja)
VALUES 
    ( '2024-10-01', 1, 'Alta', NULL),
    ( '2024-10-15', 2, 'Baja', 'Factura anulada'),
    ('2024-11-01', 3, 'Alta', NULL);

-- Datos para la tabla DetallesFacturas
INSERT INTO DetallesFacturas ( id_factura, id_autoparte, cantidad, precio_u)
VALUES 
    ( 1, 2, '2', 5000.00),
    (1, 4, '1', 7500.00),
    (3, 1, '3', 2500.00),
    (3, 3, '1', 1200.00);

INSERT INTO CARGOS(id_cargo,descripcion) VALUES(1,'Admin')
INSERT INTO CARGOS(id_cargo,descripcion) VALUES(2,'User')

INSERT INTO Empleados (id_empleado, contraseña, nombre, apellido, mail, id_cargo) VALUES
(1, '111', 'Juan', 'Perez', 'juan.perez@example.com', 1),
(2, 'securepass456', 'Maria', 'Lopez', 'maria.lopez@example.com', 2),
(3, 'admin', 'Carlos', 'Garcia', 'carlos.garcia@example.com', 1);

