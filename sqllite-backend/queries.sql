SELECT * FROM productos

UPDATE productos
SET precio = 99
WHERE id = 4

CREATE TABLE miembros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID único para cada miembro
  nombre TEXT NOT NULL,                  -- Nombre del miembro
  email TEXT UNIQUE NOT NULL,            -- Correo electrónico único
  telefono TEXT,                         -- Número de teléfono
  fecha_registro DATE NOT NULL,          -- Fecha de registro del miembro
  tipo_membresia TEXT NOT NULL,          -- Tipo de membresía (Ej: Mensual, Anual)
  fecha_expiracion DATE,                 -- Fecha de expiración de la membresía
  ultima_asistencia DATE,                -- Fecha de la última vez que asistió al gimnasio
  activo BOOLEAN NOT NULL DEFAULT 1      -- Estado si el miembro está activo (1 = activo, 0 = inactivo)
);

PRAGMA table_info(miembros)

--DROP TABLE miembros

SELECT * FROM miembros

-- Ejemplo 1
INSERT INTO miembros 
(nombre, email, telefono, fecha_registro, tipo_membresia, fecha_expiracion, ultima_asistencia, activo)
VALUES 
('Ana García', 'ana.garcia@email.com', '5551001', '2024-03-15', 'Anual', '2025-03-15', '2025-05-01', 1);

-- Ejemplo 2
INSERT INTO miembros 
(nombre, email, telefono, fecha_registro, tipo_membresia, fecha_expiracion, ultima_asistencia, activo)
VALUES 
('Juan López', 'juan.lopez@email.com', '5551002', '2024-11-01', 'Mensual', '2024-12-01', '2024-11-20', 1);

-- Ejemplo 3
INSERT INTO miembros 
(nombre, email, telefono, fecha_registro, tipo_membresia, fecha_expiracion, ultima_asistencia, activo)
VALUES 
('María Rodríguez', 'maria.rodriguez@email.com', '5551003', '2023-01-20', 'Vitalicia', NULL, '2025-04-25', 1);

-- Ejemplo 4
INSERT INTO miembros 
(nombre, email, telefono, fecha_registro, tipo_membresia, fecha_expiracion, ultima_asistencia, activo)
VALUES 
('Pedro Martínez', 'pedro.martinez@email.com', '5551004', '2025-05-05', 'Mensual', '2025-06-05', '2025-05-05', 1);

-- Ejemplo 5 (Miembro inactivo, expirado)
INSERT INTO miembros 
(nombre, email, telefono, fecha_registro, tipo_membresia, fecha_expiracion, ultima_asistencia, activo)
VALUES 
('Laura Fernández', 'laura.fernandez@email.com', '5551005', '2024-01-01', 'Anual', '2025-01-01', '2024-12-15', 0);

-- Ejemplo 6
INSERT INTO miembros 
(nombre, email, telefono, fecha_registro, tipo_membresia, fecha_expiracion, ultima_asistencia, activo)
VALUES 
('David Sánchez', 'david.sanchez@email.com', '5551006', '2024-07-10', 'Trimestral', '2024-10-10', '2024-09-28', 1);

-- Ejemplo 7 (Membresía de prueba)
INSERT INTO miembros 
(nombre, email, telefono, fecha_registro, tipo_membresia, fecha_expiracion, ultima_asistencia, activo)
VALUES 
('Sofía Gómez', 'sofia.gomez@email.com', '5551007', '2025-04-20', 'Prueba', '2025-05-20', '2025-04-22', 1);

-- Ejemplo 8
INSERT INTO miembros 
(nombre, email, telefono, fecha_registro, tipo_membresia, fecha_expiracion, ultima_asistencia, activo)
VALUES 
('Pablo Ruiz', 'pablo.ruiz@email.com', '5551008', '2023-09-01', 'Anual', '2024-09-01', '2024-08-30', 0);

-- Ejemplo 9
INSERT INTO miembros 
(nombre, email, telefono, fecha_registro, tipo_membresia, fecha_expiracion, ultima_asistencia, activo)
VALUES 
('Elena Díez', 'elena.diez@email.com', '5551009', '2025-01-01', 'Anual', '2026-01-01', '2025-05-08', 1);

-- Ejemplo 10
INSERT INTO miembros 
(nombre, email, telefono, fecha_registro, tipo_membresia, fecha_expiracion, ultima_asistencia, activo)
VALUES 
('Miguel Blanco', 'miguel.blanco@email.com', '5551010', '2024-02-14', 'Mensual', '2024-03-14', '2024-03-10', 0);



CREATE TABLE IF NOT EXISTS logs (
id INTEGER PRIMARY KEY AUTOINCREMENT,
doorId TEXT,
user_Id NUMBER,
fecha_In DATE,
fecha_Out DATE        
);

INSERT INTO logs (doorId, user_Id, fecha_In, fecha_Out)
VALUES 
('A1', 1, '2025-05-01', '2025-05-01'),
('B2', 2, '2024-11-20', '2024-11-20'),
('C3', 3, '2025-04-25', NULL),
('D4', 4, '2025-05-05', '2025-05-05'),
('E5', 5, '2024-12-15', '2024-12-15'),
('F6', 6, '2024-09-28', '2024-09-28'),
('G7', 7, '2025-04-22', '2025-04-22'),
('H8', 8, '2024-08-30', '2024-08-30'),
('I9', 9, '2025-05-08', '2025-05-08'),
('J10', 10, '2024-03-10', '2024-03-10');

SELECT * FROM logs

DROP TABLE logs

CREATE TABLE IF NOT EXISTS logs 
        (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doorId TEXT,
        userId NUMBER,
        status TEXT,
        fecha_In DATE,
        fecha_Out DATE        
        )

INSERT INTO logs (doorId, userId, status, fecha_In, fecha_Out) VALUES 
('A1', 1, 'approved','2025-05-01', '2025-05-01');

select * FROM logs