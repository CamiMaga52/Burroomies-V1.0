-- ============================================================
-- MySQL dump 10.13 Distrib 8.0.42, for Win64 (x86_64)
-- Database: dbRentIPN → railway
-- Fecha: 2026-05-24
-- ============================================================

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;

USE dbRentIPN;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

-- ============================================================
-- 1. CATÁLOGOS BASE (Sin dependencias FK)
-- ============================================================

INSERT INTO `unidad_academica` (`unidadAcademicaNombre`, `unidadAcademicaClave`) VALUES
('Escuela Superior de Cómputo', 'ESCOM'),
('Escuela Superior de Ingeniería Mecánica y Eléctrica', 'ESIME'),
('Unidad Profesional Interdisciplinaria de Ingeniería y Ciencias Sociales y Administrativas', 'UPIICSA'),
('Unidad Profesional Interdisciplinaria de Biotecnología', 'UPIBI'),
('Escuela Superior de Turismo', 'EST'),
('Escuela Superior de Comercio y Administración', 'ESCA'),
('Escuela Superior de Economía', 'ESE'),
('Escuela Superior de Ingeniería Química e Industrias Extractivas', 'ESIQIE'),
('Escuela Superior de Medicina', 'ESM'),
('Escuela Superior de Enfermería y Obstetricia', 'ESEO'),
('Escuela Superior de Física y Matemáticas', 'ESFM');

INSERT INTO `carrera` (`carreraNombre`, `carreraClave`, `idUnidadAcademica`) VALUES
('Ingeniería en Sistemas Computacionales', 'ISC', 1),
('Ingeniería en Inteligencia Artificial', 'IIA', 1),
('Licenciatura en Ciencia de Datos', 'LCD', 1),
('Ingeniería en Comunicaciones y Electrónica', 'ICE', 2),
('Ingeniería en Control y Automatización', 'ICA', 2),
('Ingeniería en Computación', 'ICO', 2),
('Ingeniería Eléctrica', 'IE', 2),
('Ingeniería Mecánica', 'IM', 2),
('Ingeniería Robótica Industrial', 'IRI', 2),
('Ingeniería en Transporte', 'IT', 3),
('Ingeniería en Informática', 'II', 3),
('Ingeniería Industrial', 'IInd', 3),
('Licenciatura en Administración Industrial', 'LAI', 3),
('Licenciatura en Contaduría Pública', 'LCP', 3),
('Ingeniería Biotecnológica', 'IBT', 4),
('Ingeniería en Sistemas Biológicos', 'ISB', 4),
('Ingeniería en Alimentos', 'IA', 4),
('Ingeniería Biomédica', 'IBM', 4),
('Licenciatura en Turismo', 'LT', 5),
('Licenciatura en Administración Turística', 'LAT', 5),
('Licenciatura en Administración', 'LA', 6),
('Licenciatura en Contaduría y Finanzas Públicas', 'LCFP', 6),
('Licenciatura en Negocios Internacionales', 'LNI', 6),
('Licenciatura en Informática Administrativa', 'LIA', 6),
('Licenciatura en Administración y Desarrollo Empresarial', 'LADE', 6),
('Licenciatura en Relaciones Comerciales', 'LRC', 6),
('Licenciatura en Economía', 'LE', 7),
('Ingeniería Química', 'IQ', 8),
('Ingeniería Química Industrial', 'IQI', 8),
('Ingeniería en Metalurgia y Materiales', 'IMM', 8),
('Ingeniería Química Petrolera', 'IQP', 8),
('Médico Cirujano y Partero', 'MCP', 9),
('Licenciatura en Enfermería', 'LEF', 10),
('Licenciatura en Enfermería y Obstetricia', 'LEO', 10),
('Ingeniería en Física Aplicada', 'IFA', 11),
('Ingeniería en Matemáticas Aplicadas', 'IMA', 11),
('Licenciatura en Física y Matemáticas', 'LFM', 11);

INSERT INTO `servicio` (`servicioNombre`, `servicioCategoria`) VALUES
('Agua potable', 'Basico'),
('Electricidad', 'Basico'),
('Gas natural', 'Basico'),
('Wi-Fi', 'Basico'),
('Calefacción', 'Basico'),
('Aire acondicionado', 'Basico'),
('Cocina individual', 'Basico'),
('Cocina compartida', 'Basico'),
('Refrigerador', 'Basico'),
('Microondas', 'Basico'),
('Cafetera', 'Basico'),
('Utensilios de cocina', 'Basico'),
('Vajilla y cubiertos', 'Basico'),
('Televisión', 'Entretenimiento'),
('Televisión por cable', 'Entretenimiento'),
('Servicios de streaming', 'Entretenimiento'),
('Estacionamiento', 'Adicional'),
('Lavadora', 'Adicional'),
('Secadora', 'Adicional'),
('Lavandería en el edificio', 'Adicional'),
('Escritorio o espacio de trabajo', 'Adicional'),
('Balcón', 'Adicional'),
('Patio', 'Adicional'),
('Terraza', 'Adicional'),
('Jardín o áreas verdes', 'Adicional'),
('Gimnasio', 'Adicional'),
('Lavavajillas', 'Adicional'),
('Lavandería cercana', 'Adicional'),
('Se permiten mascotas', 'Adicional'),
('Acceso para silla de ruedas', 'Adicional'),
('Ascensor', 'Adicional'),
('Servicio de limpieza incluido', 'Adicional'),
('Cámaras de seguridad', 'Adicional'),
('Alarma contra incendios', 'Adicional'),
('Alarma anti-robo', 'Adicional'),
('Vigilancia 24/7', 'Adicional'),
('Control de acceso', 'Adicional');

-- ============================================================
-- 2. DIRECCIONES (20 direcciones)
-- ============================================================

INSERT INTO `direccion` (`idDireccion`, `direccionCalle`, `direccionNumExt`, `direccionNumInt`, `CP_idCP`) VALUES
(1, 'Av. Instituto Politécnico Nacional', '1234', NULL, 661),   -- 07700
(2, 'Calle de las Ciencias', '45', '101', 664),                 -- 07720
(3, 'Av. Ingeniería', '789', 'B', 672),                         -- 07755
(4, 'Calle Programadores', '12', NULL, 665),                    -- 07730
(5, 'Av. Desarrollo', '56', '2A', 668),                         -- 07739
(6, 'Calle Innovación', '90', NULL, 614),                       -- 07300
(7, 'Av. Tecnología', '234', '302', 620),                       -- 07340
(8, 'Calle Robótica', '67', 'C', 619),                          -- 07330
(9, 'Av. Inteligencia Artificial', '891', NULL, 617),           -- 07320
(10, 'Calle Datos', '34', '405', 663),                          -- 07708
(11, 'Av. Algoritmos', '678', NULL, 671),                       -- 07754
(12, 'Calle Estructuras', '23', '7B', 669),                     -- 07740
(13, 'Av. Sistemas', '456', NULL, 670),                         -- 07750
(14, 'Calle Redes', '89', '12', 626),                           -- 07369
(15, 'Av. Seguridad', '567', NULL, 615),                        -- 07300
(16, 'Calle Bases de Datos', '345', '8A', 618),                 -- 07320
(17, 'Av. Computación', '901', NULL, 621),                      -- 07340
(18, 'Calle Electrónica', '678', '15', 666),                    -- 07730
(19, 'Av. Telecomunicaciones', '234', NULL, 667),               -- 07730
(20, 'Calle Software', '789', '3C', 617);                       

-- ============================================================
-- 3. USUARIOS (80 usuarios)
-- TODAS LAS CONTRASEÑAS: password123
-- Hash bcrypt: $2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi
-- ============================================================
-- 
-- CASOS DE PRUEBA:
-- ┌─────────┬─────────────────────┬──────────────────┬────────────────┐
-- │ CASO    │ Correo verificado   │ Identidad verif   │ IDs usuarios   │
-- ├─────────┼─────────────────────┼──────────────────┼────────────────┤
-- │ CASO 1  │ NO (con tiempo)     │ NO (con tiempo)  │ 1, 2, 3        │
-- │ CASO 2  │ NO (expirados)      │ NO (expirados)   │ 4, 5, 6        │
-- │ CASO 3  │ NO                  │ SÍ               │ 7, 8, 9        │
-- │ CASO 4  │ SÍ                  │ NO               │ 10, 11, 12     │
-- │ CASO 5  │ SÍ                  │ SÍ (expirada)    │ 13-20          │
-- │ CASO 6  │ Arrendadores correo verificado          │ 25-40          │
-- │ CASO 7  │ Arrendadores correo NO verificado       │ 21-24          │
-- │ CASO 8  │ Nuevos arrendatarios (verificados)      │ 41-70          │
-- │ CASO 9  │ Nuevos arrendadores (verificados)       │ 71-80          │
-- └─────────┴─────────────────────┴──────────────────┴────────────────┘
-- ============================================================

INSERT INTO `usuario` (`idUsuario`, `usuarioNom`, `usuarioApePat`, `usuarioApeMat`, `usuarioCorreo`, `usuarioTel`, `usuarioCurp`, `usuarioContra`, `usuarioFechaNac`, `usuarioFechaRegis`, `usuarioFechaUIS`, `usuarioCodigo`, `usuarioCorreoVerificado`, `usuarioCodigoFecha`) VALUES

-- ============================================================
-- CASO 1: Correo NO verificado, Identidad NO (con tiempo válido)
-- ============================================================
(1, 'Juan Carlos', 'Hernández', 'López', 'juan.hernandez@gmail.com', '5512345678', 'HELJ950101HDFRRN01', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1996-05-05', '2026-04-15 10:00:00', '2025-01-15 15:30:00', 'ABC12345', 0, '2024-01-15 10:05:00'),
(2, 'María Fernanda', 'García', 'Martínez', 'maria.garcia@hotmail.com', '5523456789', 'GAMM980222MDFRRN02', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2002-04-05', '2026-04-20 09:15:00', '2025-02-20 11:20:00', 'DEF67890', 0, '2024-02-20 09:20:00'),
(3, 'Carlos Alberto', 'Rodríguez', 'Sánchez', 'carlos.rodriguez@gmail.com', '5534567890', 'ROSC931103HDFRRN03', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1999-02-01', '2026-05-01 14:30:00', '2026-04-01 16:45:00', 'GHI12345', 0, '2026-04-01 14:35:00'),

-- ============================================================
-- CASO 2: Correo NO verificado, Identidad NO (códigos expirados)
-- ============================================================
(4, 'Ana Sofía', 'López', 'Díaz', 'ana.lopez@outlook.com', '5545678901', 'LODA000404MDFRRN04', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-04-04', '2024-04-05 11:00:00', '2025-04-05 13:15:00', 'JKL67890', 0, '2024-04-05 11:05:00'),
(5, 'Diego Alejandro', 'Martínez', 'Ramírez', 'diego.martinez@gmail.com', '5556789012', 'MARD960505HDFRRN05', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1996-05-05', '2024-05-01 16:20:00', '2024-05-01 18:30:00', 'MNO12345', 0, '2024-05-01 16:25:00'),
(6, 'Valentina', 'Sánchez', 'Torres', 'valentina.sanchez@hotmail.com', '5567890123', 'SATV990606MDFRRN06', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1999-06-06', '2024-06-10 12:45:00', '2025-06-10 14:50:00', 'PQR67890', 0, '2024-06-10 12:50:00'),

-- ============================================================
-- CASO 3: Correo NO verificado, Identidad SÍ verificada
-- ============================================================
(7, 'Santiago', 'Pérez', 'Cruz', 'santiago.perez@gmail.com', '5578901234', 'PECS940707HDFRRN07', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1994-07-07', '2026-05-05 09:30:00', '2025-07-15 11:40:00', 'STU12345', 0, '2024-07-15 09:35:00'),
(8, 'Renata', 'Flores', 'Morales', 'renata.flores@outlook.com', '5589012345', 'FOMR970808MDFRRN08', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1997-08-08', '2026-04-20 13:15:00', '2025-08-20 15:25:00', 'VWX67890', 0, '2024-08-20 13:20:00'),
(9, 'Luis Miguel', 'Torres', 'Vega', 'luis.torres@gmail.com', '5590123456', 'TOVL920909HDFRRN09', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1992-09-09', '2026-05-01 10:00:00', '2025-09-01 12:10:00', 'YZA12345', 0, '2024-09-01 10:05:00'),

-- ============================================================
-- CASO 4: Correo SÍ verificado, Identidad NO
-- ============================================================
(10, 'Anonimo', 'RentIPN', 'Usuario', 'rent.ipn.contacto@gmail.com', '5500000000', 'RIPN000000HDFRRN10', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1990-01-01', '2026-04-10 15:00:00', '2025-01-10 17:00:00', 'XYZ67890', 1, '2024-01-10 15:05:00'),
(82, 'Camila', 'Rojas', 'Mendoza', 'camila.rojas@hotmail.com', '5501234567', 'ROMC011010MDFRRN10', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-10-10', '2026-04-10 15:30:00', '2025-10-10 17:40:00', 'BCD67890', 1, '2024-10-10 15:35:00'),
(11, 'Andrés', 'Gómez', 'Silva', 'andres.gomez@gmail.com', '5511111111', 'GOSA971111HDFRRN11', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1997-11-11', '2026-04-15 08:45:00', '2026-04-15 10:55:00', 'EFG12345', 1, '2026-04-15 08:50:00'),
(12, 'Isabella', 'Orozco', 'Pineda', 'isabella.orozco@outlook.com', '5522222222', 'ORPI981212MDFRRN12', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1998-12-12', '2026-04-12 17:00:00', '2025-12-12 19:10:00', 'HIJ67890', 1, '2024-12-12 17:05:00'),

-- ============================================================
-- CASO 5: Correo SÍ verificado, Identidad SÍ (fecha expirada - 6 meses)
-- ============================================================
(13, 'Alejandro', 'Ramírez', 'Díaz', 'alejandro.ramirez@hotmail.com', '5533333333', 'RADA940101HDFRRN13', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1994-01-01', '2025-01-15 11:30:00', '2025-01-15 13:40:00', 'KLM12345', 1, '2025-01-15 11:35:00'),
(14, 'Fernanda', 'Delgado', 'Castro', 'fernanda.delgado@gmail.com', '5544444444', 'DECF960202MDFRRN14', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1996-02-02', '2025-02-20 14:15:00', '2025-02-20 16:25:00', 'NOP67890', 1, '2025-02-20 14:20:00'),
(15, 'Ricardo', 'Mendoza', 'Reyes', 'ricardo.mendoza@outlook.com', '5555555555', 'MERI930303HDFRRN15', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1993-03-03', '2025-03-10 09:00:00', '2025-03-10 11:10:00', 'QRS12345', 1, '2025-03-10 09:05:00'),
(16, 'Daniela', 'Cruz', 'Aguilar', 'daniela.cruz@gmail.com', '5566666666', 'CUAD000404MDFRRN16', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-04-04', '2025-04-05 12:30:00', '2025-04-05 14:40:00', 'TUV67890', 1, '2025-04-05 12:35:00'),
(17, 'Javier', 'Núñez', 'Soto', 'javier.nunez@hotmail.com', '5577777777', 'NUSJ950505HDFRRN17', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1995-05-05', '2025-05-01 16:45:00', '2025-05-01 18:55:00', 'WXA12345', 1, '2025-05-01 16:50:00'),
(18, 'Paulina', 'Vargas', 'León', 'paulina.vargas@gmail.com', '5588888888', 'VALP980606MDFRRN18', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1998-06-06', '2025-06-10 10:15:00', '2025-06-10 12:25:00', 'BCD12345', 1, '2025-06-10 10:20:00'),
(19, 'Oscar', 'Guerrero', 'Serrano', 'oscar.guerrero@outlook.com', '5599999999', 'GUSO920707HDFRRN19', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1992-07-07', '2025-07-15 15:00:00', '2025-07-15 17:10:00', 'EFG12345', 1, '2025-07-15 15:05:00'),
(20, 'Regina', 'Molina', 'Ríos', 'regina.molina@gmail.com', '5500000000', 'MORR011010MDFRRN20', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-10-10', '2025-10-10 13:30:00', '2025-10-10 15:40:00', 'HIJ12345', 1, '2025-10-10 13:35:00'),

-- ============================================================
-- CASO 7: ARRENDADORES - Correo NO verificado (IDs 21-24)
-- ============================================================
(21, 'Roberto', 'Mendoza', 'Flores', 'roberto.mendoza@gmail.com', '5612345678', 'MEFR950101HDFRN21', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1975-01-15', '2024-01-20 10:00:00', '2024-01-20 10:00:00', 'VER001', 0, '2024-01-20 10:05:00'),
(22, 'Laura', 'Sánchez', 'García', 'laura.sanchez@gmail.com', '5623456789', 'SAGL780202MDFRN22', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1978-02-20', '2024-01-25 11:00:00', '2024-01-25 11:00:00', 'VER002', 0, '2024-01-25 11:05:00'),
(23, 'Miguel Ángel', 'Torres', 'López', 'miguel.torres@hotmail.com', '5634567890', 'TOLM800303HDFRN23', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1980-03-25', '2024-02-01 09:30:00', '2024-02-01 09:30:00', 'VER003', 0, '2024-02-01 09:35:00'),
(24, 'Patricia', 'Ramírez', 'Martínez', 'patricia.ramirez@outlook.com', '5645678901', 'RAMP750404MDFRN24', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1975-04-10', '2024-02-10 14:00:00', '2024-02-10 14:00:00', 'VER004', 0, '2024-02-10 14:05:00'),

-- ============================================================
-- CASO 6: ARRENDADORES - Correo SÍ verificado (IDs 25-40)
-- ============================================================
(25, 'Fernando', 'Díaz', 'Hernández', 'fernando.diaz@gmail.com', '5656789012', 'DIHF820505HDFRN25', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1982-05-15', '2024-02-20 12:00:00', '2024-02-20 12:00:00', 'VER005', 1, '2024-02-20 12:05:00'),
(26, 'Carmen', 'Cruz', 'Reyes', 'carmen.cruz@hotmail.com', '5667890123', 'CRRC770606MDFRN26', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1977-06-30', '2024-03-01 10:30:00', '2024-03-01 10:30:00', 'VER006', 1, '2024-03-01 10:35:00'),
(27, 'Jorge', 'Vega', 'Ortiz', 'jorge.vega@gmail.com', '5678901234', 'VEOJ790707HDFRN27', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1979-07-12', '2024-03-10 15:00:00', '2024-03-10 15:00:00', 'VER007', 1, '2024-03-10 15:05:00'),
(28, 'Martha', 'Ríos', 'Silva', 'martha.rios@outlook.com', '5689012345', 'RISM810808MDFRN28', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1981-08-22', '2024-03-20 09:00:00', '2024-03-20 09:00:00', 'VER008', 1, '2024-03-20 09:05:00'),
(29, 'Alberto', 'Silva', 'Morales', 'alberto.silva@gmail.com', '5690123456', 'SIMA760909HDFRN29', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1976-09-05', '2024-04-01 13:30:00', '2024-04-01 13:30:00', 'VER009', 1, '2024-04-01 13:35:00'),
(30, 'Guadalupe', 'Rojas', 'Castro', 'guadalupe.rojas@hotmail.com', '5501234568', 'ROCG741010MDFRN30', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1974-10-18', '2024-04-10 11:00:00', '2024-04-10 11:00:00', 'VER010', 1, '2024-04-10 11:05:00'),
(31, 'Antonio', 'Molina', 'Aguilar', 'antonio.molina@gmail.com', '5512345670', 'MOAA771111HDFRN31', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1977-11-28', '2024-04-20 16:00:00', '2024-04-20 16:00:00', 'VER011', 1, '2024-04-20 16:05:00'),
(32, 'Teresa', 'Ortiz', 'Gómez', 'teresa.ortiz@outlook.com', '5523456781', 'ORGT801212MDFRN32', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1980-12-15', '2024-05-01 08:30:00', '2024-05-01 08:30:00', 'VER012', 1, '2024-05-01 08:35:00'),
(33, 'Francisco', 'Núñez', 'Díaz', 'francisco.nunez@gmail.com', '5534567892', 'NUDF781101HDFRN33', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1978-01-20', '2024-05-10 14:30:00', '2024-05-10 14:30:00', 'VER013', 1, '2024-05-10 14:35:00'),
(34, 'Sofía', 'Méndez', 'Romero', 'sofia.mendez@hotmail.com', '5545678903', 'MERS820202MDFRN34', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1982-02-28', '2024-05-20 10:00:00', '2024-05-20 10:00:00', 'VER014', 1, '2024-05-20 10:05:00'),
(35, 'Raúl', 'Bautista', 'Serrano', 'raul.bautista@gmail.com', '5556789014', 'BASR750303HDFRN35', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1975-03-25', '2024-06-01 12:30:00', '2024-06-01 12:30:00', 'VER015', 1, '2024-06-01 12:35:00'),
(36, 'Elena', 'Fuentes', 'Cárdenas', 'elena.fuentes@gmail.com', '5567890125', 'FUCE780404MDFRN36', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1978-04-04', '2024-06-10 11:00:00', '2024-06-10 11:00:00', 'VER016', 1, '2024-06-10 11:05:00'),
(37, 'Héctor', 'Pineda', 'Salazar', 'hector.pineda@hotmail.com', '5578901236', 'PISH750505HDFRN37', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1975-05-05', '2024-06-20 14:30:00', '2024-06-20 14:30:00', 'VER017', 1, '2024-06-20 14:35:00'),
(38, 'Leticia', 'Navarro', 'Jiménez', 'leticia.navarro@outlook.com', '5589012347', 'NAJL760606MDFRN38', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1976-06-15', '2024-07-01 09:00:00', '2024-07-01 09:00:00', 'VER018', 1, '2024-07-01 09:05:00'),
(39, 'Salvador', 'Vázquez', 'Mora', 'salvador.vazquez@gmail.com', '5590123458', 'VAMS770707HDFRN39', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1977-07-20', '2024-07-10 16:00:00', '2024-07-10 16:00:00', 'VER019', 1, '2024-07-10 16:05:00'),
(40, 'Gloria', 'Luna', 'Espinoza', 'gloria.luna@hotmail.com', '5501234569', 'LUEG780808MDFRN40', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1978-08-08', '2024-07-20 12:30:00', '2024-07-20 12:30:00', 'VER020', 1, '2024-07-20 12:35:00'),

-- ============================================================
-- CASO 8: NUEVOS ARRENDATARIOS - Verificados (IDs 41-70)
-- ============================================================
(41, 'Emilio', 'Castillo', 'Herrera', 'emilio.castillo@gmail.com', '5511112201', 'CAHE010101HDFRRN41', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-01-15', '2025-08-01 10:00:00', '2025-08-01 10:00:00', 'NEW041', 1, '2025-08-01 10:05:00'),
(42, 'Mariana', 'Espinoza', 'Lara', 'mariana.espinoza@hotmail.com', '5511112202', 'ESLM020202MDFRRN42', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2002-02-20', '2025-08-05 11:00:00', '2025-08-05 11:00:00', 'NEW042', 1, '2025-08-05 11:05:00'),
(43, 'Rodrigo', 'Ponce', 'Medina', 'rodrigo.ponce@gmail.com', '5511112203', 'POMR001203HDFRRN43', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-12-03', '2025-08-10 09:30:00', '2025-08-10 09:30:00', 'NEW043', 1, '2025-08-10 09:35:00'),
(44, 'Natalia', 'Bravo', 'Campos', 'natalia.bravo@outlook.com', '5511112204', 'BACN030404MDFRRN44', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2003-04-04', '2025-08-12 14:00:00', '2025-08-12 14:00:00', 'NEW044', 1, '2025-08-12 14:05:00'),
(45, 'Iván', 'Serrano', 'Juárez', 'ivan.serrano@gmail.com', '5511112205', 'SEJI990505HDFRRN45', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1999-05-05', '2025-08-15 16:00:00', '2025-08-15 16:00:00', 'NEW045', 1, '2025-08-15 16:05:00'),
(46, 'Sofía', 'Cisneros', 'Paredes', 'sofia.cisneros@gmail.com', '5511112206', 'CIPS020606MDFRRN46', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2002-06-06', '2025-09-01 10:00:00', '2025-09-01 10:00:00', 'NEW046', 1, '2025-09-01 10:05:00'),
(47, 'Tomás', 'Acosta', 'Ibáñez', 'tomas.acosta@hotmail.com', '5511112207', 'ACIT010707HDFRRN47', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-07-07', '2025-09-05 11:30:00', '2025-09-05 11:30:00', 'NEW047', 1, '2025-09-05 11:35:00'),
(48, 'Lucía', 'Domínguez', 'Reyna', 'lucia.dominguez@gmail.com', '5511112208', 'DORL030808MDFRRN48', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2003-08-08', '2025-09-10 08:00:00', '2025-09-10 08:00:00', 'NEW048', 1, '2025-09-10 08:05:00'),
(49, 'Marco', 'Villanueva', 'Estrada', 'marco.villanueva@outlook.com', '5511112209', 'VIEM000909HDFRRN49', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-09-09', '2025-09-15 13:00:00', '2025-09-15 13:00:00', 'NEW049', 1, '2025-09-15 13:05:00'),
(50, 'Paola', 'Montes', 'Gutiérrez', 'paola.montes@gmail.com', '5511112210', 'MOGP021010MDFRRN50', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2002-10-10', '2025-09-20 15:00:00', '2025-09-20 15:00:00', 'NEW050', 1, '2025-09-20 15:05:00'),
(51, 'Sergio', 'Ávila', 'Corona', 'sergio.avila@gmail.com', '5511112211', 'AVCS991111HDFRRN51', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1999-11-11', '2025-10-01 09:00:00', '2025-10-01 09:00:00', 'NEW051', 1, '2025-10-01 09:05:00'),
(52, 'Verónica', 'Palma', 'Trujillo', 'veronica.palma@hotmail.com', '5511112212', 'PATV011212MDFRRN52', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-12-12', '2025-10-05 12:00:00', '2025-10-05 12:00:00', 'NEW052', 1, '2025-10-05 12:05:00'),
(53, 'Arturo', 'Cabrera', 'Espinosa', 'arturo.cabrera@gmail.com', '5511112213', 'CAEA000113HDFRRN53', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-01-13', '2025-10-10 14:00:00', '2025-10-10 14:00:00', 'NEW053', 1, '2025-10-10 14:05:00'),
(54, 'Gabriela', 'Ojeda', 'Fuentes', 'gabriela.ojeda@outlook.com', '5511112214', 'OEFG030214MDFRRN54', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2003-02-14', '2025-10-15 10:30:00', '2025-10-15 10:30:00', 'NEW054', 1, '2025-10-15 10:35:00'),
(55, 'Adrián', 'Lozano', 'Ríos', 'adrian.lozano@gmail.com', '5511112215', 'LORA010315HDFRRN55', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-03-15', '2025-10-20 16:00:00', '2025-10-20 16:00:00', 'NEW055', 1, '2025-10-20 16:05:00'),
(56, 'Diana', 'Salinas', 'Becerra', 'diana.salinas@gmail.com', '5511112216', 'SABD020416MDFRRN56', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2002-04-16', '2025-11-01 09:00:00', '2025-11-01 09:00:00', 'NEW056', 1, '2025-11-01 09:05:00'),
(57, 'Enrique', 'Miranda', 'Padilla', 'enrique.miranda@hotmail.com', '5511112217', 'MIPE001217HDFRRN57', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-12-17', '2025-11-05 11:00:00', '2025-11-05 11:00:00', 'NEW057', 1, '2025-11-05 11:05:00'),
(58, 'Katia', 'Rueda', 'Vásquez', 'katia.rueda@gmail.com', '5511112218', 'RUVK030618MDFRRN58', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2003-06-18', '2025-11-10 13:30:00', '2025-11-10 13:30:00', 'NEW058', 1, '2025-11-10 13:35:00'),
(59, 'Ulises', 'Barrera', 'Guzmán', 'ulises.barrera@outlook.com', '5511112219', 'BAGU010719HDFRRN59', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-07-19', '2025-11-15 08:00:00', '2025-11-15 08:00:00', 'NEW059', 1, '2025-11-15 08:05:00'),
(60, 'Ximena', 'Franco', 'Blanco', 'ximena.franco@gmail.com', '5511112220', 'FRBX020820MDFRRN60', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2002-08-20', '2025-11-20 10:00:00', '2025-11-20 10:00:00', 'NEW060', 1, '2025-11-20 10:05:00'),
(61, 'Bruno', 'Peñaloza', 'Sandoval', 'bruno.penaloza@gmail.com', '5511112221', 'PESB000921HDFRRN61', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-09-21', '2025-12-01 09:00:00', '2025-12-01 09:00:00', 'NEW061', 1, '2025-12-01 09:05:00'),
(62, 'Alicia', 'Guevara', 'Téllez', 'alicia.guevara@hotmail.com', '5511112222', 'GUTA031022MDFRRN62', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2003-10-22', '2025-12-05 11:00:00', '2025-12-05 11:00:00', 'NEW062', 1, '2025-12-05 11:05:00'),
(63, 'Héctor', 'Zamora', 'Peña', 'hector.zamora@gmail.com', '5511112223', 'ZAPH011123HDFRRN63', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-11-23', '2025-12-10 14:00:00', '2025-12-10 14:00:00', 'NEW063', 1, '2025-12-10 14:05:00'),
(64, 'Ivonne', 'Cortés', 'Varela', 'ivonne.cortes@outlook.com', '5511112224', 'COVI001224MDFRRN64', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-12-24', '2025-12-15 10:00:00', '2025-12-15 10:00:00', 'NEW064', 1, '2025-12-15 10:05:00'),
(65, 'Nicolás', 'Alvarado', 'Pedroza', 'nicolas.alvarado@gmail.com', '5511112225', 'ALPN020125HDFRRN65', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2002-01-25', '2026-01-05 09:00:00', '2026-01-05 09:00:00', 'NEW065', 1, '2026-01-05 09:05:00'),
(66, 'Miriam', 'Téllez', 'Nava', 'miriam.tellez@gmail.com', '5511112226', 'TENM030226MDFRRN66', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2003-02-26', '2026-01-10 11:00:00', '2026-01-10 11:00:00', 'NEW066', 1, '2026-01-10 11:05:00'),
(67, 'Omar', 'Quintero', 'Alcántara', 'omar.quintero@hotmail.com', '5511112227', 'QUAO010327HDFRRN67', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-03-27', '2026-01-15 13:00:00', '2026-01-15 13:00:00', 'NEW067', 1, '2026-01-15 13:05:00'),
(68, 'Rebeca', 'Ibarra', 'Solís', 'rebeca.ibarra@gmail.com', '5511112228', 'IBSR020428MDFRRN68', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2002-04-28', '2026-01-20 15:00:00', '2026-01-20 15:00:00', 'NEW068', 1, '2026-01-20 15:05:00'),
(69, 'Patricio', 'Escobedo', 'Meza', 'patricio.escobedo@outlook.com', '5511112229', 'ESMP000529HDFRRN69', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-05-29', '2026-02-01 08:00:00', '2026-02-01 08:00:00', 'NEW069', 1, '2026-02-01 08:05:00'),
(70, 'Cecilia', 'Aragón', 'Duarte', 'cecilia.aragon@gmail.com', '5511112230', 'ARDC030630MDFRRN70', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2003-06-30', '2026-02-05 10:00:00', '2026-02-05 10:00:00', 'NEW070', 1, '2026-02-05 10:05:00'),

-- ============================================================
-- CASO 9: NUEVOS ARRENDADORES - Verificados (IDs 71-80)
-- ============================================================
(71, 'Ramón', 'Esquivel', 'Pedraza', 'ramon.esquivel@gmail.com', '5621234501', 'ESPR700115HDFRN71', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1970-01-15', '2024-08-01 09:00:00', '2024-08-01 09:00:00', 'VER021', 1, '2024-08-01 09:05:00'),
(72, 'Hortensia', 'Cuellar', 'Montoya', 'hortensia.cuellar@hotmail.com', '5622234502', 'CUMH720220MDFRN72', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1972-02-20', '2024-08-05 10:00:00', '2024-08-05 10:00:00', 'VER022', 1, '2024-08-05 10:05:00'),
(73, 'Gonzalo', 'Vergara', 'Noriega', 'gonzalo.vergara@gmail.com', '5623234503', 'VENG680310HDFRN73', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1968-03-10', '2024-08-10 11:00:00', '2024-08-10 11:00:00', 'VER023', 1, '2024-08-10 11:05:00'),
(74, 'Amparo', 'Solano', 'Hidalgo', 'amparo.solano@outlook.com', '5624234504', 'SOHA740425MDFRN74', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1974-04-25', '2024-08-15 12:30:00', '2024-08-15 12:30:00', 'VER024', 1, '2024-08-15 12:35:00'),
(75, 'Ernesto', 'Pacheco', 'Rosales', 'ernesto.pacheco@gmail.com', '5625234505', 'PARE710505HDFRN75', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1971-05-05', '2024-08-20 14:00:00', '2024-08-20 14:00:00', 'VER025', 1, '2024-08-20 14:05:00'),
(76, 'Irma', 'Delgadillo', 'Arce', 'irma.delgadillo@hotmail.com', '5626234506', 'DEAI730615MDFRN76', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1973-06-15', '2024-09-01 09:00:00', '2024-09-01 09:00:00', 'VER026', 1, '2024-09-01 09:05:00'),
(77, 'Víctor', 'Bustamante', 'Gallegos', 'victor.bustamante@gmail.com', '5627234507', 'BUGV690720HDFRN77', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1969-07-20', '2024-09-05 10:00:00', '2024-09-05 10:00:00', 'VER027', 1, '2024-09-05 10:05:00'),
(78, 'Beatriz', 'Herrera', 'Quiñones', 'beatriz.herrera@outlook.com', '5628234508', 'HEQB720808MDFRN78', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1972-08-08', '2024-09-10 11:30:00', '2024-09-10 11:30:00', 'VER028', 1, '2024-09-10 11:35:00'),
(79, 'Leandro', 'Cabello', 'Zamudio', 'leandro.cabello@gmail.com', '5629234509', 'CAZL750915HDFRN79', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1975-09-15', '2024-09-15 13:00:00', '2024-09-15 13:00:00', 'VER029', 1, '2024-09-15 13:05:00'),
(80, 'Consuelo', 'Meléndez', 'Arroyo', 'consuelo.melendez@hotmail.com', '5630234510', 'MEAC781010MDFRN80', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1978-10-10', '2024-09-20 14:30:00', '2024-09-20 14:30:00', 'VER030', 1, '2024-09-20 14:35:00');

-- ============================================================
-- 4. ARRENDATARIOS (IDs 1-50)
-- ============================================================

INSERT INTO `arrendatario` (`idArrendatario`, `arrendatarioBoleta`, `arrendatarioVerificado`, `arrendatarioFechaVerificación`, `arrendatarioUser`, `usuario_idUsuario`, `carrera_idCarrera`) VALUES

-- Arrendatarios originales (IDs 1-20)
(1, '2024030001', 0, NULL, 'juan_hdz', 1, 1),
(2, '2024030002', 0, NULL, 'maria_garcia', 2, 4),
(3, '2023030003', 0, NULL, 'carlos_rod', 3, 7),
(4, '2024020004', 0, NULL, 'ana_lopez', 4, 10),
(5, '2024010005', 0, NULL, 'diego_mtz', 5, 2),
(6, '2024030006', 0, NULL, 'vale_sanchez', 6, 5),
(7, '2023020007', 1, '2024-09-01 14:45:00', 'santi_perez', 7, 8),
(8, '2024040008', 1, '2024-11-05 12:00:00', 'renata_flores', 8, 11),
(9, '2023010009', 1, '2024-08-01 09:00:00', 'luis_torres', 9, 3),
(10, '2026010010',  1, '2026-03-01 08:00:00', 'RentIPN', 10, 6),
(11, '2024020011', 0, NULL, 'andres_gomez', 11, 1),
(12, '2024010012', 0, NULL, 'isabella_orozco', 12, 4),
(13, '2024030013', 1, '2025-02-20 11:00:00', 'alejandro_ram', 13, 7),
(14, '2024040014', 1, '2025-03-01 09:30:00', 'fer_delgado', 14, 10),
(15, '2023010015', 1, '2025-04-01 10:00:00', 'ricardo_mendoza', 15, 2),
(16, '2024030016', 1, '2026-04-10 13:15:00', 'daniela_cruz', 16, 5),
(17, '2024020017', 1, '2026-05-01 14:00:00', 'javier_nunez', 17, 8),
(18, '2024010018', 1, '2026-05-05 15:45:00', 'paulina_vargas', 18, 11),
(19, '2024030019', 1, '2026-03-01 08:00:00', 'oscar_guerrero', 19, 3),
(20, '2024040020', 1, '2026-02-01 09:00:00', 'regina_molina', 20, 6),

-- Nuevos arrendatarios (IDs 21-50)
(21, '2025010041', 1, '2025-08-05 10:00:00', 'emilio_cast', 41, 1),
(22, '2025020042', 1, '2025-08-10 11:00:00', 'mari_espinoza', 42, 4),
(23, '2024040043', 1, '2025-08-15 09:00:00', 'rodrigo_ponce', 43, 7),
(24, '2025010044', 1, '2025-08-20 12:00:00', 'nata_bravo', 44, 2),
(25, '2024030045', 1, '2025-08-25 14:00:00', 'ivan_serrano', 45, 10),
(26, '2025020046', 1, '2025-09-05 09:00:00', 'sofi_cisne', 46, 5),
(27, '2024010047', 1, '2025-09-10 11:00:00', 'tomas_acosta', 47, 8),
(28, '2025030048', 1, '2025-09-15 13:00:00', 'luci_dom', 48, 11),
(29, '2024020049', 1, '2025-09-20 10:00:00', 'marco_villa', 49, 3),
(30, '2025040050', 1, '2025-09-25 15:00:00', 'paola_mont', 50, 6),
(31, '2024030051', 1, '2025-10-05 09:00:00', 'sergio_avila', 51, 9),
(32, '2025010052', 1, '2025-10-10 11:00:00', 'vero_palma', 52, 12),
(33, '2024020053', 1, '2025-10-15 14:00:00', 'arturo_cab', 53, 15),
(34, '2025030054', 1, '2025-10-20 10:00:00', 'gabi_ojeda', 54, 18),
(35, '2024040055', 1, '2025-10-25 12:00:00', 'adrian_loz', 55, 21),
(36, '2025020056', 1, '2025-11-05 09:00:00', 'diana_sal', 56, 24),
(37, '2024010057', 1, '2025-11-10 11:00:00', 'enri_mir', 57, 27),
(38, '2025030058', 1, '2025-11-15 14:00:00', 'katia_rue', 58, 30),
(39, '2024020059', 1, '2025-11-20 10:00:00', 'ulises_bar', 59, 33),
(40, '2025040060', 1, '2025-11-25 12:00:00', 'xime_fran', 60, 36),
(41, '2024030061', 1, '2025-12-05 09:00:00', 'bruno_pen', 61, 1),
(42, '2025010062', 1, '2025-12-10 11:00:00', 'alicia_gue', 62, 4),
(43, '2024020063', 1, '2025-12-15 14:00:00', 'hector_zam', 63, 7),
(44, '2025030064', 1, '2025-12-20 10:00:00', 'ivo_cor', 64, 10),
(45, '2024040065', 1, '2026-01-10 09:00:00', 'nico_alv', 65, 2),
(46, '2025020066', 1, '2026-01-15 11:00:00', 'miriam_tel', 66, 5),
(47, '2024010067', 1, '2026-01-20 14:00:00', 'omar_qui', 67, 8),
(48, '2025030068', 1, '2026-01-25 10:00:00', 'rebe_iba', 68, 11),
(49, '2024020069', 1, '2026-02-05 09:00:00', 'patri_esc', 69, 3),
(50, '2025040070', 1, '2026-02-10 11:00:00', 'ceci_ara', 70, 6),
(51, '2022020011', 0, NULL, 'camila_rojas', 82, 1);

-- ============================================================
-- 5. ARRENDADORES (IDs 1-30)
-- ============================================================

INSERT INTO `arrendador` (`idArrendador`, `arrendadorRFC`, `usuario_idUsuario`, `direccion_idDireccion`) VALUES

-- Arrendadores originales (IDs 1-20)
(1, 'MEFR950101XXX', 21, 1),
(2, 'SAGL780202XXX', 22, 2),
(3, 'TOLM800303XXX', 23, 3),
(4, 'RAMP750404XXX', 24, 4),
(5, 'DIHF820505XXX', 25, 5),
(6, 'CRRC770606XXX', 26, 6),
(7, 'VEOJ790707XXX', 27, 7),
(8, 'RISM810808XXX', 28, 8),
(9, 'SIMA760909XXX', 29, 9),
(10, 'ROCG741010XXX', 30, 10),
(11, 'MOAA771111XXX', 31, 11),
(12, 'ORGT801212XXX', 32, 12),
(13, 'NUDF781101XXX', 33, 13),
(14, 'MERS820202XXX', 34, 14),
(15, 'BASR750303XXX', 35, 15),
(16, 'FUCE780404XXX', 36, 16),
(17, 'PISH750505XXX', 37, 17),
(18, 'NAJL760606XXX', 38, 18),
(19, 'VAMS770707XXX', 39, 19),
(20, 'LUEG780808XXX', 40, 20),

-- Nuevos arrendadores (IDs 21-30)
(21, 'ESPR700115XXX', 71, 1),
(22, 'CUMH720220XXX', 72, 2),
(23, 'VENG680310XXX', 73, 3),
(24, 'SOHA740425XXX', 74, 4),
(25, 'PARE710505XXX', 75, 5),
(26, 'DEAI730615XXX', 76, 6),
(27, 'BUGV690720XXX', 77, 7),
(28, 'HEQB720808XXX', 78, 8),
(29, 'CAZL750915XXX', 79, 9),
(30, 'MEAC781010XXX', 80, 10);

-- ============================================================
-- 6. PROPIEDADES (IDs 1-45) - CORREGIDAS
-- ============================================================

-- ============================================================
-- 6. PROPIEDADES (IDs 1-45) - TÍTULOS ACORTADOS
-- ============================================================

INSERT INTO `propiedad` (`idPropiedad`, `propiedadTitulo`, `propiedadDescripcion`, `propiedadTipo`, `propiedadLugares`, `propiedadPrecio`, `propiedadPrecioPor`, `propiedadEstatus`, `propiedadFechaRegis`, `direccion_idDireccion`, `arrendador_idArrendador`) VALUES

-- PROPIEDADES ORIGINALES (IDs 1-20)
(1, 'Cuarto económico frente a ESCOM', 'Habitación individual amueblada a 2 min de ESCOM. Incluye cama, escritorio, clóset y acceso a baño compartido. Cocina equipada disponible. Ideal para estudiante foráneo de primer semestre.', 'Habitación', 1, 2800.00, 'Habitación', 'Disponible', '2024-12-01 10:00:00', 1, 1),
(2, 'Depto compartido en Lindavista', 'Departamento de 2 recámaras para compartir entre estudiantes. Sala, cocina equipada, 1 baño. A 10 min del Metro Lindavista. Gastos de agua y luz incluidos.', 'Departamento', 2, 5500.00, 'Propiedad', 'Disponible', '2024-12-15 11:30:00', 2, 2),
(3, 'Habitación en Nueva Industrial Vallejo', 'Cuarto individual con cama, escritorio y clóset. Baño compartido. Cocina con refrigerador y microondas. A 5 min del Metrobús. Ambiente tranquilo para estudiar.', 'Habitación', 1, 2500.00, 'Habitación', 'Sin Disponibilidad', '2024-11-01 09:00:00', 3, 3),
(4, 'Cuarto familiar en Lindavista Vallejo', 'Habitación en casa de familia numerosa. Baño compartido con otro estudiante. Cocina de uso libre. Ambiente de respeto. A 15 min caminando de ESCOM.', 'Habitación', 1, 2600.00, 'Habitación', 'Disponible', '2024-10-10 14:00:00', 4, 4),
(5, 'Estudio económico Metro Politécnico', 'Estudio privado con baño propio y kitchenette. Cama individual, escritorio amplio. Entrada independiente. A 5 min del Metro Politécnico. Servicios incluidos.', 'Estudio', 1, 3800.00, 'Persona', 'Disponible', '2025-01-05 16:30:00', 5, 5),
(6, 'Depto 3 estudiantes Lindavista Norte', 'Departamento con 3 recámaras individuales. Sala, comedor, cocina completa y 1 baño. Lavadora en el edificio. Contrato por semestre. A 12 min de ESCOM.', 'Departamento', 3, 7500.00, 'Propiedad', 'Desactivada', '2024-09-20 12:00:00', 6, 6),
(7, 'Habitación tranquila La Laguna Ticomán', 'Cuarto individual en planta alta. Escritorio, cama y clóset. Baño compartido limpio. Cocina equipada. Zona silenciosa ideal para estudiar. A 8 min de transporte.', 'Habitación', 1, 2400.00, 'Habitación', 'Disponible', '2025-01-10 08:45:00', 7, 7),
(8, 'Casa para 5 en San José Ticomán', 'Casa amplia con 5 recámaras. 2 baños, cocina equipada, patio y lavadero. Excelente para grupo de amigos. A 15 min de ESCOM en transporte. Sin depósito.', 'Casa', 5, 11000.00, 'Propiedad', 'Disponible', '2024-08-01 10:00:00', 8, 8),
(9, 'Loft económico Santa María Ticomán', 'Loft pequeño con cama, escritorio y cocina básica. Baño propio. Entrada independiente. A 10 min del Metro. Perfecto para estudiante que busca privacidad.', 'Loft', 1, 3500.00, 'Propiedad', 'Sin Disponibilidad', '2024-07-15 09:30:00', 9, 9),
(10, 'Depto en Residencial Zacatenco', 'Departamento de 2 recámaras en planta baja. Cocina equipada, sala y baño. Ambiente familiar tranquilo. A 5 min de ESIME Zacatenco. Ideal para 2 estudiantes.', 'Departamento', 2, 6000.00, 'Propiedad', 'Disponible', '2025-01-20 15:00:00', 10, 10),
(11, 'Habitación luminosa en Torres Lindavista', 'Cuarto individual con ventana grande. Escritorio amplio, cama, clóset. Baño compartido. Cocina equipada. Internet incluido. A 7 min del Metro Politécnico.', 'Habitación', 1, 3000.00, 'Habitación', 'Disponible', '2024-11-25 11:00:00', 11, 11),
(12, 'Casa para 4 en Valle del Tepeyac', 'Casa de 4 recámaras con jardín pequeño. Cocina grande, 2 baños, sala TV. Contrato por semestre. Todos los servicios incluidos. A 12 min de ESCOM.', 'Casa', 4, 9500.00, 'Propiedad', 'Disponible', '2024-10-05 14:30:00', 12, 12),
(13, 'Estudio independiente en Nueva Vallejo', 'Estudio privado con baño propio y cocineta. Cama matrimonial y escritorio. Entrada independiente. Servicios incluidos. A 10 min del Metrobús.', 'Estudio', 2, 4500.00, 'Persona', 'Disponible', '2025-01-01 12:00:00', 13, 13),
(14, 'Depto compartido Lindavista Vallejo III', 'Departamento 3 recámaras para compartir. Cocina, sala y baño. Cada estudiante con su propio cuarto. A 15 min de ESCOM. Precio por persona.', 'Departamento', 3, 3200.00, 'Persona', 'Desactivada', '2024-08-20 10:00:00', 14, 14),
(15, 'Cuarto amueblado Residencial la Escalera', 'Habitación individual con baño compartido. Cama, escritorio, clóset. Cocina equipada. Ambiente estudiantil. A 10 min del Metro Indios Verdes. Sin depósito.', 'Habitación', 1, 2700.00, 'Habitación', 'Disponible', '2025-01-15 09:00:00', 15, 15),
(16, 'Depto 2 recámaras San Bartolo Atepehuacan', 'Departamento en segundo piso con 2 recámaras. Cocina equipada, baño, sala. Zona tranquila. A 20 min de ESCOM en transporte. Precio accesible para 2 estudiantes.', 'Departamento', 2, 5000.00, 'Propiedad', 'Disponible', '2024-09-10 11:30:00', 16, 16),
(17, 'Loft estudiantil en Montevideo', 'Loft pequeño con área de estudio, cama y baño propio. Kitchenette con microondas. Internet incluido. A 12 min del Metro. Para estudiante independiente.', 'Loft', 1, 3600.00, 'Propiedad', 'Sin Disponibilidad', '2024-10-30 15:45:00', 17, 17),
(18, 'Habitación económica La Purísima Ticomán', 'Cuarto individual básico. Cama, escritorio y espacio para ropa. Baño compartido. Cocina de uso libre. Ambiente de estudiantes del IPN. Muy económico.', 'Habitación', 1, 2200.00, 'Habitación', 'Disponible', '2025-01-25 08:00:00', 18, 18),
(19, 'Estudio cerca del Planetario Lindavista', 'Estudio con baño propio y cocineta básica. Cama individual y escritorio. Entrada independiente. A 5 min del Metro. Zona segura con comercios cerca.', 'Estudio', 1, 4000.00, 'Persona', 'Disponible', '2024-12-20 14:15:00', 19, 19),
(20, 'Habitación amplia Churubusco Tepeyac', 'Cuarto grande con cama matrimonial, escritorio y sillón de estudio. Baño compartido con 1 persona. Cocina equipada. A 10 min del Metrobús. Ambiente estudiantil.', 'Habitación', 1, 3000.00, 'Habitación', 'Disponible', '2024-11-11 10:30:00', 20, 20),

-- NUEVAS PROPIEDADES (IDs 21-45)
(21, 'Habitación amueblada frente al IPN', 'Habitación individual completamente amueblada a 2 minutos caminando de ESCOM. Incluye cama individual, escritorio con silla ergonómica, clóset y acceso a baño compartido. Cocina equipada para uso de inquilinos.', 'Habitación', 1, 3200.00, 'Habitación', 'Disponible', '2025-01-15 09:00:00', 1, 21),
(22, 'Cuarto en casa compartida Zona IPN', 'Habitación en casa compartida con otros 3 estudiantes del IPN. Baño compartido, cocina equipada con refrigerador, microondas y utensilios. Transporte cercano: Metro Politécnico a 8 min a pie.', 'Habitación', 1, 2800.00, 'Habitación', 'Disponible', '2025-01-20 10:30:00', 2, 22),
(23, 'Estudio independiente cerca de UPIICSA', 'Pequeño estudio privado con baño propio, kitchenette, cama matrimonial y área de trabajo. Edificio con acceso controlado y cámaras de seguridad. A 10 min en transporte de UPIICSA.', 'Estudio', 1, 4200.00, 'Persona', 'Disponible', '2025-02-01 11:00:00', 3, 23),
(24, 'Depto para 2 estudiantes en Lindavista', 'Departamento de 2 recámaras para compartir entre 2 estudiantes. Sala-comedor, cocina equipada, 1 baño completo, balcón. Edificio seguro con vigilancia. A 15 min de ESCOM y ESIME.', 'Departamento', 2, 6500.00, 'Propiedad', 'Disponible', '2025-02-10 09:00:00', 4, 24),
(25, 'Habitación con baño privado en GAM', 'Habitación amplia con baño privado en planta baja de casa familiar. Escritorio, silla, clóset grande y buena iluminación natural. Acceso a cocina compartida. A 5 min del Metro Indios Verdes.', 'Habitación', 1, 3800.00, 'Habitación', 'Disponible', '2025-02-15 14:00:00', 5, 25),
(26, 'Depto estudiantil 3 recámaras', 'Departamento espacioso para 3 estudiantes, cada uno con su recámara individual. 2 baños, sala, comedor y cocina completa. Lavadora en el piso. A 10 min de ESIQIE. Contrato desde 6 meses.', 'Departamento', 3, 8500.00, 'Propiedad', 'Disponible', '2025-02-20 16:00:00', 6, 26),
(27, 'Cuarto sencillo económico estudiante', 'Habitación sencilla amueblada (cama, escritorio, silla) en casa de familia. Baño compartido solo con 1 persona más. Cocina de uso compartido. A 12 min de ESCOM en transporte público.', 'Habitación', 1, 2500.00, 'Habitación', 'Disponible', '2025-03-01 08:00:00', 7, 27),
(28, 'Loft moderno para estudiantes avanzados', 'Loft de 2 plantas para 2 personas. Planta baja: sala-comedor y cocina abierta. Planta alta: 2 áreas de descanso con escritorios. Baño completo. Wi-Fi de alta velocidad.', 'Loft', 2, 7000.00, 'Propiedad', 'Disponible', '2025-03-05 10:00:00', 8, 28),
(29, 'Habitación en depto estudiantil ESIME', 'Habitación en departamento ya habitado por 2 estudiantes de ESIME. Baño compartido, cocina con todos los servicios. Cerca de papelerías, tiendas y transporte público.', 'Habitación', 1, 2800.00, 'Habitación', 'Disponible', '2025-03-10 11:30:00', 9, 29),
(30, 'Depto amueblado con acceso a Metro', 'Departamento de 2 recámaras totalmente amueblado. Camas individuales, escritorios, sala TV, cocina equipada y baño. Edificio con cámaras. A 5 min del Metro.', 'Departamento', 2, 7000.00, 'Propiedad', 'Disponible', '2025-03-15 09:00:00', 10, 30),
(31, 'Casa para grupo de 4 estudiantes', 'Casa de 4 recámaras lista para grupo de estudiantes del IPN. 2 baños, sala, comedor, cocina equipada, patio y cochera. A 20 min de ESCOM en camión.', 'Casa', 4, 10000.00, 'Propiedad', 'Disponible', '2025-03-20 14:00:00', 11, 21),
(32, 'Habitación luminosa cerca de UPIBI', 'Habitación con ventana grande, muy iluminada. Cama matrimonial, escritorio amplio, clóset empotrado. Baño compartido limpio. Cocina equipada. A 10 min de UPIBI.', 'Habitación', 1, 3000.00, 'Habitación', 'Disponible', '2025-03-25 10:00:00', 12, 22),
(33, 'Estudio loft para pareja de estudiantes', 'Estudio en planta alta con entrada independiente. Cama doble, sala-estudio con 2 escritorios, kitchenette y baño propio. Ideal para pareja de estudiantes. Wi-Fi incluido.', 'Estudio', 2, 5200.00, 'Persona', 'Disponible', '2025-04-01 09:00:00', 13, 23),
(34, 'Depto cerca del Casco de Santo Tomás', 'Departamento de 3 recámaras bien ubicado. Sala, comedor, cocina completa, 1.5 baños. Piso 3 con vista. A 5 min del Metro. Contrato por semestre.', 'Departamento', 3, 8000.00, 'Propiedad', 'Disponible', '2025-04-05 11:00:00', 14, 24),
(35, 'Habitación económica con todo incluido', 'Habitación con escritorio, cama y clóset. Precio incluye: agua, luz, gas e internet. Cocina compartida, baño a compartir con 1 persona. A 8 min del metro. Sin depósito.', 'Habitación', 1, 2800.00, 'Habitación', 'Disponible', '2025-04-10 08:00:00', 15, 25),
(36, 'Depto moderno con servicios incluidos', 'Departamento de 2 recámaras con servicios incluidos (agua, luz, gas, Wi-Fi). Cocina equipada, sala amueblada, baño remodelado. Edificio con cámaras. Ideal para 2 estudiantes.', 'Departamento', 2, 7200.00, 'Propiedad', 'Disponible', '2025-04-15 10:00:00', 16, 26),
(37, 'Loft cerca del Metro Politécnico', 'Loft de diseño industrial. Cocina abierta con barra, sala-estudio integrada, recámara en planta alta. Baño con regadera. A 3 min del Metro Politécnico.', 'Loft', 1, 4800.00, 'Propiedad', 'Disponible', '2025-04-20 09:00:00', 17, 27),
(38, 'Habitación en planta alta con vista', 'Habitación en segundo piso. Vista panorámica, iluminada y ventilada. Baño compartido, cocina equipada. Cerca de papelerías y transporte. A 10 min de ESCOM.', 'Habitación', 1, 2900.00, 'Habitación', 'Disponible', '2025-04-25 11:00:00', 18, 28),
(39, 'Casa para 5 estudiantes todo incluido', 'Casa amplia de 5 recámaras. Cada cuarto amueblado (cama, escritorio, silla, clóset). 2 baños, sala TV, comedor y cocina equipada. Servicios incluidos. Sin depósito.', 'Casa', 5, 12000.00, 'Propiedad', 'Disponible', '2025-05-01 09:00:00', 19, 29),
(40, 'Depto planta baja con acceso directo', 'Departamento en planta baja con entrada independiente. 2 recámaras, baño, cocina y sala. Patio privado. Tranquilo y seguro. A 10 min de ESIME Zacatenco.', 'Departamento', 2, 6200.00, 'Propiedad', 'Disponible', '2025-05-05 10:00:00', 20, 30),
(41, 'Habitación solo mujeres estudiantes', 'Habitación en departamento solo para mujeres estudiantes del IPN. Baño compartido entre 3, cocina equipada. Acceso controlado. A 7 min del Metro y 15 de ESCOM.', 'Habitación', 1, 3000.00, 'Habitación', 'Disponible', '2025-05-10 08:00:00', 1, 21),
(42, 'Estudio con kitchenette privacidad total', 'Estudio independiente en planta baja. Entrada propia, baño privado, kitchenette con estufa, refri y microondas. Cama y escritorio doble. Ideal para posgrado.', 'Estudio', 1, 4000.00, 'Persona', 'Disponible', '2025-05-15 09:30:00', 2, 22),
(43, 'Cuarto amueblado en casa de 3 pisos', 'Habitación en segundo piso. Clóset, cama individual nueva, escritorio con cajones. Baño compartido entre 2. Cocina amplia. A 5 min del Metro Politécnico.', 'Habitación', 1, 2700.00, 'Habitación', 'Disponible', '2025-05-20 11:00:00', 3, 23),
(44, 'Depto 4 recámaras para amigos IPN', 'Departamento de 4 recámaras para grupo de amigos. Sala grande, comedor, cocina completa, 2 baños. Cada habitación con escritorio. A 20 min de unidades IPN.', 'Departamento', 4, 11000.00, 'Propiedad', 'Disponible', '2025-05-25 14:00:00', 4, 24),
(45, 'Habitación tranquila cerca de biblioteca', 'Habitación en casa familiar, ambiente de respeto. Ideal para concentrarse. Escritorio amplio, cama individual. Cocina compartida. A 3 min de biblioteca y 12 de ESCOM.', 'Habitación', 1, 2900.00, 'Habitación', 'Sin Disponibilidad', '2025-06-01 10:00:00', 5, 25);

-- ============================================================
-- 7. FOTOS (IDs 1-69)
-- ============================================================
-- ============================================================
-- SCRIPT DE FOTOS - Mínimo 3 fotos por propiedad
-- ============================================================
INSERT INTO `fotos` (`idFotos`, `fotosURL`, `propiedad_idPropiedad`) VALUES

-- Propiedad 1 (3 fotos)
(1, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 1),
(2, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 1),
(3, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 1),

-- Propiedad 2 (3 fotos)
(4, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 2),
(5, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 2),
(6, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 2),

-- Propiedad 3 (3 fotos)
(7, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 3),
(8, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 3),
(9, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 3),

-- Propiedad 4 (3 fotos)
(10, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 4),
(11, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 4),
(12, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 4),

-- Propiedad 5 (3 fotos)
(13, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 5),
(14, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 5),
(15, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 5),

-- Propiedad 6 (3 fotos)
(16, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 6),
(17, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 6),
(18, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 6),

-- Propiedad 7 (3 fotos)
(19, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 7),
(20, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 7),
(21, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 7),

-- Propiedad 8 (3 fotos)
(22, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 8),
(23, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 8),
(24, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 8),

-- Propiedad 9 (3 fotos)
(25, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 9),
(26, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 9),
(27, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 9),

-- Propiedad 10 (3 fotos)
(28, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 10),
(29, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 10),
(30, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 10),

-- Propiedad 11 (3 fotos)
(31, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 11),
(32, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 11),
(33, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 11),

-- Propiedad 12 (3 fotos)
(34, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 12),
(35, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 12),
(36, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 12),

-- Propiedad 13 (3 fotos)
(37, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 13),
(38, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 13),
(39, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 13),

-- Propiedad 14 (3 fotos)
(40, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 14),
(41, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 14),
(42, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 14),

-- Propiedad 15 (3 fotos)
(43, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 15),
(44, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 15),
(45, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 15),

-- Propiedad 16 (3 fotos)
(46, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 16),
(47, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 16),
(48, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 16),

-- Propiedad 17 (3 fotos)
(49, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 17),
(50, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 17),
(51, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 17),

-- Propiedad 18 (3 fotos)
(52, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 18),
(53, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 18),
(54, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 18),

-- Propiedad 19 (3 fotos)
(55, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 19),
(56, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 19),
(57, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 19),

-- Propiedad 20 (3 fotos)
(58, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 20),
(59, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 20),
(60, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 20),

-- Propiedad 21 (3 fotos)
(61, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 21),
(62, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 21),
(63, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 21),

-- Propiedad 22 (3 fotos)
(64, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 22),
(65, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 22),
(66, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 22),

-- Propiedad 23 (3 fotos)
(67, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 23),
(68, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 23),
(69, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 23),

-- Propiedad 24 (3 fotos)
(70, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 24),
(71, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 24),
(72, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 24),

-- Propiedad 25 (3 fotos)
(73, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 25),
(74, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 25),
(75, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 25),

-- Propiedad 26 (3 fotos)
(76, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 26),
(77, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 26),
(78, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 26),

-- Propiedad 27 (3 fotos)
(79, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 27),
(80, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 27),
(81, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 27),

-- Propiedad 28 (3 fotos)
(82, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 28),
(83, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 28),
(84, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 28),

-- Propiedad 29 (3 fotos)
(85, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 29),
(86, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 29),
(87, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 29),

-- Propiedad 30 (3 fotos)
(88, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 30),
(89, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 30),
(90, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 30),

-- Propiedad 31 (3 fotos)
(91, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 31),
(92, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 31),
(93, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 31),

-- Propiedad 32 (3 fotos)
(94, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 32),
(95, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 32),
(96, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 32),

-- Propiedad 33 (3 fotos)
(97, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 33),
(98, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 33),
(99, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 33),

-- Propiedad 34 (3 fotos)
(100, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 34),
(101, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 34),
(102, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 34),

-- Propiedad 35 (3 fotos)
(103, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 35),
(104, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 35),
(105, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 35),

-- Propiedad 36 (3 fotos)
(106, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 36),
(107, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 36),
(108, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 36),

-- Propiedad 37 (3 fotos)
(109, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 37),
(110, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 37),
(111, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 37),

-- Propiedad 38 (3 fotos)
(112, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 38),
(113, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 38),
(114, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 38),

-- Propiedad 39 (3 fotos)
(115, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 39),
(116, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 39),
(117, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 39),

-- Propiedad 40 (3 fotos)
(118, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 40),
(119, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 40),
(120, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 40),

-- Propiedad 41 (3 fotos)
(121, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 41),
(122, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 41),
(123, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 41),

-- Propiedad 42 (3 fotos)
(124, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 42),
(125, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 42),
(126, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689975/rentipn/fotos/arrendador_temp_1779689971198_6.webp', 42),

-- Propiedad 43 (3 fotos)
(127, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_7.webp', 43),
(128, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689976/rentipn/fotos/arrendador_temp_1779689971198_8.webp', 43),
(129, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_9.webp', 43),

-- Propiedad 44 (3 fotos)
(130, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689978/rentipn/fotos/arrendador_temp_1779689971198_10.webp', 44),
(131, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_1.webp', 44),
(132, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689972/rentipn/fotos/arrendador_temp_1779689971198_2.webp', 44),

-- Propiedad 45 (3 fotos)
(133, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689973/rentipn/fotos/arrendador_temp_1779689971198_3.webp', 45),
(134, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_4.webp', 45),
(135, 'https://res.cloudinary.com/dewgq8mti/image/upload/v1779689974/rentipn/fotos/arrendador_temp_1779689971198_5.webp', 45);

-- ============================================================
-- 8. ARRENDAMIENTOS (IDs 1-40)
-- ============================================================

INSERT INTO `arrendamiento` (`idArrendamiento`, `arrendamientoFechaInicio`, `arrendamientoRenta`, `arrendamientoDescrip`, `arrendamientoValEstudiante`, `arrendamientoValArrendador`, `arrendatario_idArrendatario`, `propiedad_idPropiedad`) VALUES
-- Arrendamientos originales (IDs 1-18)
(1, '2024-12-01 00:00:00', 8500, 'Contrato anual - estudiante responsable', 1, 0, 1, 1),
(2, '2024-11-15 00:00:00', 12000, 'Renta con depósito', 0, 1, 2, 2),
(3, '2024-10-01 00:00:00', 6500, 'Contrato renovable', 1, 0, 3, 3),
(4, '2024-12-20 00:00:00', 7500, 'Estudiante foráneo', 0, 1, 5, 5),
(5, '2024-08-01 00:00:00', 15000, 'Contrato temporal', 0, 1, 6, 6),
(6, '2024-07-15 00:00:00', 3500, 'Económico', 0, 0, 7, 7),
(7, '2024-10-10 00:00:00', 18000, 'Ejecutivo', 0, 0, 9, 9),
(8, '2024-09-05 00:00:00', 13500, 'Con amenities', 0, 1, 10, 10),
(9, '2024-12-15 00:00:00', 4000, 'Contrato semestral', 1, 0, 11, 11),
(10, '2024-11-20 00:00:00', 35000, 'Contrato lujoso', 1, 0, 12, 12),
(11, '2024-10-25 00:00:00', 9000, 'Para estudiantes', 0, 1, 13, 13),
(12, '2024-08-30 00:00:00', 8000, 'Céntrico', 0, 1, 14, 14),
(13, '2024-12-10 00:00:00', 3800, 'Económico amueblado', 1, 0, 15, 15),
(14, '2024-09-15 00:00:00', 40000, 'Contrato premium', 0, 0, 16, 16),
(15, '2024-10-05 00:00:00', 11000, 'Industrial', 0, 0, 17, 17),
(16, '2024-11-25 00:00:00', 9500, 'Vista al lago', 0, 0, 18, 18),
(17, '2024-12-30 00:00:00', 5500, 'Zona turística', 0, 0, 19, 19),
(18, '2024-11-10 00:00:00', 32000, 'Seguridad alta', 0, 1, 20, 20),

-- Nuevos arrendamientos (IDs 19-40)
(19, '2025-09-01 00:00:00', 3200, 'Habitación cerca del IPN, contrato semestral', 1, 0, 21, 21),
(20, '2025-09-01 00:00:00', 2800, 'Cuarto compartido con otros estudiantes', 0, 0, 22, 22),
(21, '2025-09-01 00:00:00', 5500, 'Estudio independiente UPIICSA, contrato anual', 0, 1, 23, 23),
(22, '2025-09-01 00:00:00', 9500, 'Departamento 2 recámaras Lindavista', 1, 0, 24, 24),
(23, '2025-08-15 00:00:00', 3800, 'Habitación con baño privado GAM', 0, 0, 25, 25),
(24, '2025-08-15 00:00:00', 13500, 'Departamento 3 recámaras para 3 compañeros', 0, 1, 26, 26),
(25, '2025-09-01 00:00:00', 2500, 'Cuarto económico ambiente familiar', 1, 0, 27, 27),
(26, '2025-09-01 00:00:00', 10500, 'Loft moderno para 2 estudiantes avanzados', 0, 0, 28, 28),
(27, '2025-09-15 00:00:00', 3400, 'Habitación en depa estudiantil ESIME', 1, 0, 29, 29),
(28, '2025-09-15 00:00:00', 10800, 'Departamento amueblado cerca del Metro', 0, 1, 30, 30),
(29, '2025-10-01 00:00:00', 18000, 'Casa entera para 4 estudiantes', 0, 0, 31, 31),
(30, '2025-10-01 00:00:00', 3600, 'Habitación luminosa cerca de UPIBI', 1, 0, 32, 32),
(31, '2025-10-01 00:00:00', 6800, 'Estudio loft para pareja de estudiantes', 0, 0, 33, 33),
(32, '2025-10-15 00:00:00', 12500, 'Departamento 3 recámaras Casco Santo Tomás', 0, 1, 34, 34),
(33, '2025-10-15 00:00:00', 3000, 'Habitación económica todo incluido', 1, 0, 35, 35),
(34, '2025-11-01 00:00:00', 11200, 'Departamento moderno servicios incluidos', 0, 0, 36, 36),
(35, '2025-11-01 00:00:00', 7200, 'Loft cerca Metro Politécnico', 0, 1, 37, 37),
(36, '2025-11-15 00:00:00', 3100, 'Habitación planta alta vista a la calle', 1, 0, 38, 38),
(37, '2025-12-01 00:00:00', 22000, 'Casa 5 recámaras todo incluido', 0, 0, 39, 39),
(38, '2025-12-01 00:00:00', 9800, 'Departamento planta baja acceso directo', 0, 1, 40, 40),
(39, '2025-12-15 00:00:00', 3300, 'Habitación solo mujeres, ambiente seguro', 1, 0, 41, 41),
(40, '2026-01-01 00:00:00', 5200, 'Estudio con kitchenette, privacidad total', 0, 0, 42, 42);

-- ============================================================
-- 9. RESEÑAS (IDs 1-95)
-- Incluye reseñas originales (1-20) + nuevas (21-95)
-- ============================================================

INSERT INTO `resena` (`idResena`, `resenaFechaCreacion`, `resenaDuracionRenta`, `resenaDescrip`, `resenaCalSerBasic`, `resenaCalSerComEnt`, `resenaCalSerAdicio`, `resenaCalGen`, `resenaSentimiento`, `propiedad_idPropiedad`, `arrendatario_idArrendatario`) VALUES
-- Reseñas originales (IDs 1-20)
(1, '2025-01-15 10:00:00', 6, 'Excelente loft, todo muy limpio', 5.0, 4.5, 4.0, 4.8, 'Positivo', 1, 1),
(2, '2025-01-14 11:30:00', 8, 'Departamento amplio y bien ubicado', 5.0, 5.0, 4.5, 5.0, 'Positivo', 2, 2),
(3, '2025-01-13 09:15:00', 5, 'Habitación algo pequeña pero cómoda', 4.0, 4.0, 3.5, 4.0, 'Neutro', 3, 3),
(4, '2025-01-12 14:00:00', 10, 'Casa increíble, volvería', 5.0, 5.0, 5.0, 5.0, 'Positivo', 4, 5),
(5, '2025-01-11 16:30:00', 3, 'Estudio perfecto para estudiar', 4.5, 4.0, 4.0, 4.3, 'Positivo', 5, 5),
(6, '2025-01-10 08:45:00', 12, 'Mala experiencia, ruidoso', 2.0, 2.5, 3.0, 2.5, 'Negativo', 6, 6),
(7, '2025-01-09 10:00:00', 15, 'Excelente para el precio', 4.0, 4.0, 3.5, 4.0, 'Positivo', 7, 7),
(8, '2025-01-08 13:20:00', 8, 'Casa hermosa, jardín precioso', 5.0, 5.0, 5.0, 5.0, 'Positivo', 8, 9),
(9, '2025-01-07 12:00:00', 6, 'Loft de lujo, recomendado', 5.0, 4.5, 5.0, 4.9, 'Positivo', 9, 9),
(10, '2025-01-06 15:30:00', 7, 'Departamento cómodo y seguro', 4.5, 4.0, 4.5, 4.5, 'Positivo', 10, 10),
(11, '2025-01-05 09:00:00', 4, 'Habitación básica pero funcional', 3.5, 3.0, 3.0, 3.5, 'Neutro', 11, 11),
(12, '2025-01-04 11:45:00', 9, 'Casa espectacular', 5.0, 5.0, 5.0, 5.0, 'Positivo', 12, 12),
(13, '2025-01-03 14:15:00', 15, 'Muy caro para lo que ofrece', 3.0, 2.5, 4.0, 3.2, 'Negativo', 13, 13),
(14, '2025-01-02 10:30:00', 5, 'Muy céntrico y económico', 4.0, 4.0, 3.0, 4.0, 'Positivo', 14, 14),
(15, '2025-01-01 12:00:00', 6, 'Habitación amueblada, todo bien', 4.5, 4.0, 4.0, 4.2, 'Positivo', 15, 15),
(16, '2024-12-31 13:30:00', 10, 'Excelente para familias', 5.0, 5.0, 5.0, 5.0, 'Positivo', 16, 16),
(17, '2024-12-30 15:00:00', 11, 'Loft con estilo industrial', 4.5, 4.5, 4.0, 4.5, 'Positivo', 17, 17),
(18, '2024-12-29 08:30:00', 4, 'Vista increíble', 4.0, 5.0, 4.5, 4.5, 'Positivo', 18, 18),
(19, '2024-12-28 10:45:00', 7, 'Zona turística, ruido nocturno', 3.5, 3.0, 4.0, 3.5, 'Neutro', 19, 19),
(20, '2024-12-27 14:00:00', 12, 'Casa muy segura', 5.0, 4.5, 5.0, 4.8, 'Positivo', 20, 20),

-- Nuevas reseñas (IDs 21-95) - Propiedades 21-45
-- Propiedad 21: Habitación frente al IPN
(21, '2026-01-10 10:00:00', 4, 'Habitación muy cómoda y bien ubicada frente al IPN. El escritorio es perfecto para estudiar. Recomendada.', 4.5, NULL, 4.0, 4.3, 'Neutro', 21, 21),
(22, '2026-01-12 11:00:00', 3, 'Buen lugar para primer año, cerca de todo. El arrendador muy atento. Baño compartido limpio.', 4.0, NULL, 3.5, 4.0, 'Neutro', 21, 22),
(23, '2026-01-15 09:00:00', 5, 'Excelente opción para empezar la carrera. Wi-Fi rápido y luz incluida. Sin quejas.', 5.0, NULL, 4.0, 4.7, 'Positivo', 21, 23),

-- Propiedad 22: Cuarto en casa compartida
(24, '2026-01-20 10:00:00', 6, 'Casa compartida muy tranquila. Compañeros responsables y respetuosos. Cocina siempre ordenada.', 4.0, NULL, NULL, 3.8, 'Neutro', 22, 24),
(25, '2026-01-22 11:00:00', 4, 'Buen precio para la zona. El baño compartido a veces tiene fila en las mañanas, pero nada grave.', 3.5, NULL, NULL, 3.4, 'Negativo', 22, 25),
(26, '2026-01-25 09:00:00', 5, 'Me gustó vivir ahí, buena convivencia con los demás inquilinos. Cerca del metro.', 4.0, NULL, NULL, 4.0, 'Neutro', 22, 26),

-- Propiedad 23: Estudio independiente UPIICSA
(27, '2026-02-01 10:00:00', 8, 'Estudio totalmente privado, ideal para concentrarse. El baño propio hace toda la diferencia.', 5.0, NULL, 4.5, 4.8, 'Positivo', 23, 27),
(28, '2026-02-03 11:00:00', 6, 'Muy buena ubicación para ir a UPIICSA. El precio es justo considerando que incluye servicios.', 4.5, NULL, 4.0, 4.3, 'Neutro', 23, 28),
(29, '2026-02-05 12:00:00', 5, 'Limpio, seguro y con acceso controlado. Me sentí muy a gusto. Lo recomiendo ampliamente.', 5.0, NULL, 4.5, 4.9, 'Positivo', 23, 29),

-- Propiedad 24: Departamento 2 recámaras Lindavista
(30, '2026-02-10 09:00:00', 5, 'Departamento cómodo para 2. Mi compañera y yo vivimos muy bien. Buena distribución de espacios.', 4.5, 4.5, 4.0, 4.4, 'Positivo', 24, 30),
(31, '2026-02-12 10:00:00', 4, 'Zona residencial tranquila. Edificio seguro. El precio es razonable para 2 personas.', 4.0, 4.0, 4.5, 4.2, 'Neutro', 24, 31),
(32, '2026-02-15 11:00:00', 6, 'Bien ubicado para ir a ESCOM. El balcón es muy agradable para descansar después de clases.', 4.5, 4.0, 4.0, 4.3, 'Neutro', 24, 32),

-- Propiedad 25: Habitación con baño privado GAM
(33, '2026-02-20 10:00:00', 7, 'Habitación muy cómoda con baño privado. Casa limpia y bien mantenida. Arrendador amable.', 4.5, NULL, 4.0, 4.2, 'Neutro', 25, 33),
(34, '2026-02-22 11:00:00', 5, 'Buen espacio para estudiar. El baño privado vale la diferencia de precio. Muy recomendable.', 4.0, NULL, 4.5, 4.2, 'Neutro', 25, 34),
(35, '2026-02-25 09:00:00', 4, 'A veces el vecindario es algo ruidoso por las noches, pero la habitación en sí está bien.', 3.5, NULL, 3.5, 3.4, 'Negativo', 25, 35),

-- Propiedad 26: Departamento 3 recámaras
(36, '2026-03-01 10:00:00', 8, 'Departamento ideal para 3 amigos de la misma carrera. Espacioso y bien equipado.', 5.0, NULL, 4.5, 4.8, 'Positivo', 26, 36),
(37, '2026-03-03 11:00:00', 6, 'La lavadora en el piso es una gran ventaja. Cocina completa con todo lo necesario.', 4.5, NULL, 4.5, 4.4, 'Positivo', 26, 37),
(38, '2026-03-05 12:00:00', 5, 'Un poco lejos de algunas unidades, pero el precio y la comodidad lo compensan.', 4.0, NULL, 4.0, 3.9, 'Neutro', 26, 38),

-- Propiedad 27: Cuarto económico
(39, '2026-03-10 09:00:00', 3, 'Muy económico y en casa familiar tranquila. Lo básico pero bien mantenido. Buen trato.', 3.5, NULL, 3.0, 3.3, 'Negativo', 27, 39),
(40, '2026-03-12 10:00:00', 4, 'El precio es lo mejor de este lugar. Ambiente tranquilo, cocina limpia. Recomendado para ahorrar.', 3.5, NULL, 3.0, 3.5, 'Neutro', 27, 40),
(41, '2026-03-15 11:00:00', 5, 'Perfecto para estudiante con presupuesto ajustado. Arrendador muy comprensivo con los pagos.', 4.0, NULL, 3.5, 3.8, 'Neutro', 27, 41),

-- Propiedad 28: Loft moderno
(42, '2026-03-20 10:00:00', 6, 'Loft muy bien diseñado. Las 2 plantas dan privacidad a cada persona. Wi-Fi excelente para tareas.', 5.0, 4.5, 4.5, 4.8, 'Positivo', 28, 42),
(43, '2026-03-22 11:00:00', 5, 'Moderno y funcional. La cocina abierta es muy práctica. Buena elección para compañeros de tesis.', 4.5, 4.5, 4.0, 4.4, 'Positivo', 28, 43),
(44, '2026-03-25 09:00:00', 4, 'Buen loft aunque el precio es un poco elevado. La distribución de 2 plantas es muy cómoda.', 4.0, 4.0, 4.0, 4.0, 'Neutro', 28, 44),

-- Propiedad 29: Habitación en depa ESIME
(45, '2026-04-01 10:00:00', 5, 'Buena habitación en departamento de estudiantes de ESIME. Me sentí en comunidad desde el primer día.', 4.0, NULL, NULL, 4.0, 'Neutro', 29, 45),
(46, '2026-04-03 11:00:00', 4, 'Precio accesible y compañeros agradables. El baño compartido es el único inconveniente menor.', 3.5, NULL, NULL, 3.5, 'Neutro', 29, 46),
(47, '2026-04-05 12:00:00', 6, 'Gran ambiente estudiantil. Cocina siempre limpia. Cerca de papelerías y tiendas. Muy recomendado.', 4.5, NULL, NULL, 4.2, 'Neutro', 29, 47),

-- Propiedad 30: Departamento amueblado Metro
(48, '2026-04-10 09:00:00', 7, 'Departamento totalmente amueblado, llegamos y listo para habitar. A 5 min del metro, muy conveniente.', 5.0, 4.5, 4.5, 4.8, 'Positivo', 30, 48),
(49, '2026-04-12 10:00:00', 5, 'Bien equipado y en excelente ubicación. El intercomunicador y las cámaras dan mucha seguridad.', 4.5, 4.0, 4.5, 4.4, 'Positivo', 30, 49),
(50, '2026-04-15 11:00:00', 6, 'Muy cómodo para 2 personas. La televisión de la sala y la cocina equipada hacen la vida más fácil.', 4.5, 4.5, 4.0, 4.4, 'Positivo', 30, 50),

-- Propiedad 31: Casa entera grupo
(51, '2026-04-20 10:00:00', 8, 'Casa perfecta para 4 amigos. Cada quien en su recámara, patio para convivir. Muy buena experiencia.', 5.0, NULL, 5.0, 4.9, 'Positivo', 31, 21),
(52, '2026-04-22 11:00:00', 6, 'Un poco lejos de ESCOM pero el precio y el espacio lo justifican. Cochera útil para quien tiene moto.', 4.0, NULL, 4.5, 4.2, 'Neutro', 31, 22),
(53, '2026-04-25 09:00:00', 5, 'Buena casa para grupo. El patio trasero es excelente para relajarse después de exámenes.', 4.5, NULL, 4.5, 4.4, 'Positivo', 31, 23),

-- Propiedad 32: Habitación luminosa UPIBI
(54, '2026-05-01 10:00:00', 4, 'Habitación luminosa y fresca. El clóset empotrado tiene mucho espacio. Muy buena opción.', 4.5, NULL, 4.0, 4.2, 'Neutro', 32, 24),
(55, '2026-05-03 11:00:00', 5, 'Me encantó la iluminación natural. Cocina limpia y bien equipada. Arrendador muy responsable.', 5.0, NULL, 4.0, 4.7, 'Positivo', 32, 25),
(56, '2026-05-05 12:00:00', 3, 'Buena habitación, aunque la ventana da a la calle y en las mañanas hay algo de ruido de tráfico.', 4.0, NULL, 3.5, 3.8, 'Neutro', 32, 26),

-- Propiedad 33: Estudio loft pareja
(57, '2026-05-10 09:00:00', 6, 'Estudio muy privado e independiente. Los 2 escritorios son perfectos para estudiar en pareja.', 5.0, NULL, NULL, 4.8, 'Positivo', 33, 27),
(58, '2026-05-12 10:00:00', 5, 'Buena kitchenette para preparar comida rápida. Baño propio es lo mejor. Vale cada peso.', 4.5, NULL, NULL, 4.4, 'Positivo', 33, 28),
(59, '2026-05-15 11:00:00', 4, 'Entrada independiente da mucha libertad. Wi-Fi bueno para videollamadas de clase. Recomendado.', 4.5, NULL, NULL, 4.4, 'Positivo', 33, 29),

-- Propiedad 34: Departamento Casco Santo Tomás
(60, '2026-05-20 10:00:00', 7, 'Excelente ubicación en el Casco de Santo Tomás. A pasos del metro. Departamento amplio y cómodo.', 5.0, 4.5, 4.5, 4.8, 'Positivo', 34, 30),
(61, '2026-05-22 11:00:00', 5, 'Muy bueno para 3 personas. La vista desde el tercer piso es agradable. Precio competitivo para la zona.', 4.5, 4.0, 4.0, 4.3, 'Neutro', 34, 31),
(62, '2026-05-24 09:00:00', 4, 'El departamento está bien pero el elevador del edificio falla ocasionalmente. Lo demás muy bien.', 3.5, 3.5, 3.5, 3.7, 'Neutro', 34, 32),

-- Propiedad 35: Habitación económica todo incluido
(63, '2026-05-01 10:00:00', 5, 'El precio con servicios incluidos es lo mejor. Sin sorpresas al final del mes. Muy recomendado.', 4.5, NULL, NULL, 4.2, 'Neutro', 35, 33),
(64, '2026-05-03 11:00:00', 4, 'Habitación básica pero todo funciona bien. Sin depósito fue una gran ventaja para mí como foráneo.', 4.0, NULL, NULL, 3.8, 'Neutro', 35, 34),
(65, '2026-05-05 12:00:00', 6, 'Buena habitación para quien busca economizar. El compañero de baño es respetuoso. Sin problemas.', 4.0, NULL, NULL, 3.9, 'Neutro', 35, 35),

-- Propiedad 36: Departamento moderno servicios incluidos
(66, '2026-04-05 10:00:00', 7, 'Departamento moderno y muy bien equipado. El acceso con llave eléctrica da mucha seguridad.', 5.0, NULL, 5.0, 4.9, 'Positivo', 36, 36),
(67, '2026-04-07 11:00:00', 5, 'Todos los servicios incluidos es un gran ahorro. Edificio limpio y bien mantenido.', 4.5, NULL, 4.5, 4.5, 'Positivo', 36, 37),
(68, '2026-04-10 09:00:00', 6, 'Excelente para 2 estudiantes. Baño remodelado y cocina completa. Sin ninguna queja.', 5.0, NULL, 4.5, 4.8, 'Positivo', 36, 38),

-- Propiedad 37: Loft Metro Politécnico
(69, '2026-03-05 10:00:00', 5, 'Loft con diseño industrial muy cool. A 3 min del metro es imbatible. Perfecto para estudiante solo.', 5.0, 4.5, NULL, 4.8, 'Positivo', 37, 39),
(70, '2026-03-07 11:00:00', 4, 'Me encantó el estilo del loft. La barra de la cocina es muy práctica. Wi-Fi incluido y rápido.', 4.5, 4.5, NULL, 4.4, 'Positivo', 37, 40),
(71, '2026-03-10 09:00:00', 6, 'Muy buen lugar aunque el espacio es limitado para 1 persona. Ubicación inmejorable.', 4.0, 4.0, NULL, 4.0, 'Neutro', 37, 41),

-- Propiedad 38: Habitación planta alta
(72, '2026-02-10 10:00:00', 4, 'La vista desde la planta alta es muy bonita. Habitación fresca y bien iluminada. Recomendada.', 4.0, NULL, NULL, 3.8, 'Neutro', 38, 42),
(73, '2026-02-12 11:00:00', 5, 'Casa bien conservada y muy limpia. La arrendadora es muy atenta ante cualquier problema.', 4.5, NULL, NULL, 4.2, 'Neutro', 38, 43),
(74, '2026-02-15 09:00:00', 3, 'Habitación correcta. Cocina bien equipada. El precio es razonable para la zona. Sin quejas mayores.', 3.5, NULL, NULL, 3.5, 'Neutro', 38, 44),

-- Propiedad 39: Casa 5 estudiantes
(75, '2026-01-20 10:00:00', 6, 'Casa perfecta para 5 amigos de la carrera. Todo incluido sin preocupaciones. Experiencia inmejorable.', 5.0, 5.0, 5.0, 5.0, 'Positivo', 39, 45),
(76, '2026-01-22 11:00:00', 5, 'Cada recámara amueblada, comodísimas. La cocina es la mejor que he visto en renta estudiantil.', 5.0, 4.5, 5.0, 4.9, 'Positivo', 39, 46),
(77, '2026-01-25 09:00:00', 4, 'Sin depósito y contrato por semestre fue decisivo para elegirla. Muy buena experiencia grupal.', 4.5, 4.5, 4.5, 4.5, 'Positivo', 39, 47),

-- Propiedad 40: Departamento planta baja
(78, '2026-01-10 10:00:00', 7, 'Departamento en planta baja con patio propio, increíble para descansar. Muy tranquilo y seguro.', 4.5, NULL, 4.5, 4.5, 'Positivo', 40, 48),
(79, '2026-01-12 11:00:00', 5, 'Entrada independiente da libertad de horarios. Cerca de ESIME Zacatenco. Muy recomendado.', 4.5, NULL, 4.0, 4.2, 'Neutro', 40, 49),
(80, '2026-01-15 09:00:00', 4, 'Bien ubicado y accesible. El patio es pequeño pero sirve para guardar la bici. Departamento funcional.', 4.0, NULL, 3.5, 3.9, 'Neutro', 40, 50),

-- Propiedad 41: Habitación solo mujeres
(81, '2025-12-10 10:00:00', 5, 'Excelente opción para mujeres que buscan seguridad. Ambiente de confianza entre las inquilinas.', 5.0, NULL, 4.5, 4.8, 'Positivo', 41, 21),
(82, '2025-12-12 11:00:00', 4, 'Casa solo para mujeres, muy tranquila. Las reglas son claras y se respetan. Me sentí muy segura.', 5.0, NULL, 4.5, 4.6, 'Positivo', 41, 22),
(83, '2025-12-15 09:00:00', 6, 'Buen ambiente femenino. Acceso controlado da mucha tranquilidad. Lo recomiendo para compañeras.', 4.5, NULL, 4.0, 4.4, 'Positivo', 41, 23),

-- Propiedad 42: Estudio con kitchenette
(84, '2025-11-10 10:00:00', 8, 'Estudio completamente independiente, ideal para posgrado. Silencioso y muy privado. Sin quejas.', 5.0, NULL, NULL, 5.0, 'Positivo', 42, 24),
(85, '2025-11-12 11:00:00', 6, 'La kitchenette con todo lo necesario evita tener que salir a comer. Wi-Fi rápido. Perfecto.', 5.0, NULL, NULL, 4.8, 'Positivo', 42, 25),
(86, '2025-11-15 09:00:00', 5, 'Baño propio y entrada independiente son lo mejor. Vale el precio para quien busca privacidad total.', 4.5, NULL, NULL, 4.5, 'Positivo', 42, 26),

-- Propiedad 43: Cuarto amueblado casa 3 pisos
(87, '2025-10-10 10:00:00', 5, 'Cuarto bien amueblado, cama nueva y escritorio con cajones. Muy cómodo para estudiar largas horas.', 4.5, NULL, NULL, 4.1, 'Neutro', 43, 27),
(88, '2025-10-12 11:00:00', 4, 'Precio muy accesible, a 5 min del metro. El baño compartido entre 2 es manejable. Buena opción.', 4.0, NULL, NULL, 3.8, 'Neutro', 43, 28),
(89, '2025-10-15 09:00:00', 6, 'Casa de 3 pisos bien conservada. Mi habitación en el segundo piso tiene buena ventilación.', 4.0, NULL, NULL, 4.0, 'Neutro', 43, 29),

-- Propiedad 44: Departamento 4 recámaras
(90, '2025-09-10 10:00:00', 7, 'Departamento ideal para grupo de 4. Cada quien con su cuarto, sala amplia y 2 baños son suficientes.', 5.0, NULL, 4.5, 4.8, 'Positivo', 44, 30),
(91, '2025-09-12 11:00:00', 6, 'Todos los electrodomésticos funcionando. Escritorio en cada recámara es fundamental para estudiar.', 4.5, NULL, 4.5, 4.5, 'Positivo', 44, 31),
(92, '2025-09-15 09:00:00', 5, 'Bien ubicado, a 20 min de cualquier unidad. El estacionamiento es un plus si tienes coche.', 4.0, NULL, 4.5, 4.2, 'Neutro', 44, 32),

-- Propiedad 45: Habitación tranquila
(93, '2025-08-10 10:00:00', 6, 'Habitación perfecta para quien necesita concentrarse. Ambiente muy tranquilo. Cerca de biblioteca.', 5.0, NULL, NULL, 4.7, 'Positivo', 45, 33),
(94, '2025-08-12 11:00:00', 4, 'Sin mucho ruido, familia respetuosa de inquilinos. Cocina compartida siempre limpia.', 4.5, NULL, NULL, 4.2, 'Neutro', 45, 34),
(95, '2025-08-15 09:00:00', 5, 'Servicios incluidos y ambiente familiar. A 12 min de ESCOM. Muy recomendado para estudiantes nuevos.', 4.5, NULL, NULL, 4.4, 'Positivo', 45, 35);

-- ============================================================
-- 10. SERVICIOS POR PROPIEDAD (servicio_has_propiedad)
-- ============================================================

INSERT INTO `servicio_has_propiedad` (`servicio_idServicio`, `propiedad_idPropiedad`) VALUES
-- Propiedad 1: Loft cerca de ESCOM
(1,1), (2,1), (4,1), (11,1), (13,1),
-- Propiedad 2: Departamento Lindavista
(1,2), (2,2), (3,2), (4,2), (11,2), (14,2),
-- Propiedad 3: Habitación Polanco
(1,3), (2,3), (4,3), (11,3),
-- Propiedad 4: Casa Condesa
(1,4), (2,4), (3,4), (4,4), (5,4), (11,4), (15,4), (17,4),
-- Propiedad 5: Estudio Roma
(1,5), (2,5), (4,5), (6,5), (11,5),
-- Propiedad 6: Departamento Del Valle
(1,6), (2,6), (3,6), (4,6), (12,6),
-- Propiedad 7: Habitación Iztapalapa
(1,7), (3,7), (4,7),
-- Propiedad 8: Casa Coyoacán
(1,8), (2,8), (4,8), (5,8), (11,8), (13,8), (16,8),
-- Propiedad 9: Loft Santa Fe
(1,9), (2,9), (4,9), (11,9), (13,9), (14,9),
-- Propiedad 10: Departamento Escandón
(1,10), (2,10), (3,10), (4,10), (11,10),
-- Propiedad 11: Habitación Tacubaya
(1,11), (2,11), (4,11),
-- Propiedad 12: Casa San Ángel
(1,12), (2,12), (3,12), (4,12), (5,12), (17,12),
-- Propiedad 13: Estudio Narvarte
(1,13), (2,13), (4,13), (11,13),
-- Propiedad 14: Departamento Tlatelolco
(1,14), (2,14), (3,14), (4,14), (12,14),
-- Propiedad 15: Habitación Azcapotzalco
(1,15), (3,15), (4,15), (7,15),
-- Propiedad 16: Casa Tlalpan
(1,16), (2,16), (3,16), (4,16), (5,16), (13,16), (15,16),
-- Propiedad 17: Loft Juárez
(1,17), (2,17), (4,17), (11,17),
-- Propiedad 18: Departamento Xochimilco
(1,18), (2,18), (3,18), (4,18), (12,18),
-- Propiedad 19: Habitación Cuauhtémoc
(1,19), (2,19), (4,19), (6,19),
-- Propiedad 20: Casa Miguel Hidalgo
(1,20), (2,20), (3,20), (4,20), (5,20), (15,20), (17,20),

-- Propiedad 21: Habitación amueblada frente al IPN
(1,21), (2,21), (4,21), (9,21), (10,21), (21,21),
-- Propiedad 22: Cuarto en casa compartida
(1,22), (2,22), (4,22), (8,22), (9,22), (10,22),
-- Propiedad 23: Estudio independiente UPIICSA
(1,23), (2,23), (3,23), (4,23), (7,23), (9,23), (33,23), (37,23),
-- Propiedad 24: Departamento 2 recámaras Lindavista
(1,24), (2,24), (3,24), (4,24), (9,24), (14,24), (33,24), (36,24),
-- Propiedad 25: Habitación con baño privado GAM
(1,25), (2,25), (4,25), (9,25), (21,25),
-- Propiedad 26: Departamento 3 recámaras
(1,26), (2,26), (3,26), (4,26), (9,26), (18,26), (17,26), (33,26),
-- Propiedad 27: Cuarto sencillo económico
(1,27), (3,27), (4,27), (9,27), (28,27),
-- Propiedad 28: Loft moderno
(1,28), (2,28), (4,28), (7,28), (9,28), (14,28), (21,28),
-- Propiedad 29: Habitación en depa ESIME
(1,29), (2,29), (4,29), (8,29), (9,29), (10,29),
-- Propiedad 30: Departamento amueblado Metro
(1,30), (2,30), (3,30), (4,30), (9,30), (14,30), (33,30), (36,30),
-- Propiedad 31: Casa entera grupo
(1,31), (2,31), (3,31), (4,31), (9,31), (17,31), (22,31), (25,31),
-- Propiedad 32: Habitación luminosa UPIBI
(1,32), (2,32), (4,32), (9,32), (21,32),
-- Propiedad 33: Estudio loft pareja
(1,33), (2,33), (3,33), (4,33), (7,33), (9,33),
-- Propiedad 34: Departamento Casco Santo Tomás
(1,34), (2,34), (3,34), (4,34), (9,34), (14,34), (33,34),
-- Propiedad 35: Habitación económica todo incluido
(1,35), (2,35), (3,35), (4,35), (9,35),
-- Propiedad 36: Departamento moderno servicios incluidos
(1,36), (2,36), (3,36), (4,36), (9,36), (33,36), (36,36), (37,36),
-- Propiedad 37: Loft Metro Politécnico
(1,37), (2,37), (4,37), (7,37), (9,37), (14,37),
-- Propiedad 38: Habitación planta alta
(1,38), (2,38), (4,38), (9,38), (8,38),
-- Propiedad 39: Casa 5 estudiantes todo incluido
(1,39), (2,39), (3,39), (4,39), (5,39), (9,39), (14,39), (17,39), (25,39),
-- Propiedad 40: Departamento planta baja
(1,40), (2,40), (3,40), (4,40), (9,40), (33,40),
-- Propiedad 41: Habitación solo mujeres
(1,41), (2,41), (4,41), (9,41), (33,41), (37,41),
-- Propiedad 42: Estudio kitchenette privacidad
(1,42), (2,42), (3,42), (4,42), (7,42), (9,42), (10,42),
-- Propiedad 43: Cuarto amueblado casa 3 pisos
(1,43), (2,43), (4,43), (8,43), (9,43),
-- Propiedad 44: Departamento 4 recámaras
(1,44), (2,44), (3,44), (4,44), (9,44), (17,44), (27,44), (33,44),
-- Propiedad 45: Habitación tranquila
(1,45), (2,45), (3,45), (4,45), (9,45);

-- ============================================================
-- 11. ADMINISTRADORES (5 administradores)
-- Contraseñas reales:
--   admin_root          → admin123
--   super_admin         → super456
--   moderador1          → mod789
--   gestor_propiedades  → gestor321
--   soporte_tec         → soporte555
-- ============================================================

INSERT INTO `administrador` (`adminUser`, `adminContra`, `adminFechaInicioSesion`) VALUES
('admin_root', '$2b$10$NOE24EM26f396LgiuByuCCUtS5h4hKHRCaLj6WCWe1eNVnNCge', '2025-01-15 09:00:00'),
('super_admin', '$2b$10$1/ibU5ntc0kfManjyQAbg.3wJTmuuhZOczsnKrwJmmQrDaoZG9HGu', '2025-01-15 10:30:00'),
('moderador1', '$2b$10$2eV9MPlBmaQAhgVbw7aeV.crQI9akMKSzx4pW4SX5JeaFVbPhHIe.', '2025-01-14 14:00:00'),
('gestor_propiedades', '$2b$10$QfPKejVcdiAhw4t/.2ogJuWoK07WrpzZA4YdmkvMFXoLBAp8cpGqm', '2025-01-13 11:15:00'),
('soporte_tec', '$2b$10$1Z37SuuqMGq3WUtOghUv7OH3IQFG2uQrSvlVDoJRxR.J4MpJCX4ke', '2025-01-12 16:45:00');

-- ============================================================
-- 12. ACTUALIZAR CÓDIGOS POSTALES ACEPTADOS
-- ============================================================

UPDATE cp 
SET cpAceptadoSistema = 1 
WHERE d_codigo IN ('07700', '07720', '07755', '07730', '07739', '07300', '07340', '07330', '07320', '07708', '07754', '07740', '07750', '07369', '07710');

-- ============================================================
-- RESTAURAR CONFIGURACIONES
-- ============================================================

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- ============================================================
-- FIN DEL SCRIPT
-- ============================================================
-- Resumen de datos insertados:
--   - 11 unidades académicas
--   - 37 carreras
--   - 37 servicios
--   - 20 direcciones
--   - 80 usuarios (40 arrendatarios + 40 arrendadores)
--   - 50 arrendatarios
--   - 30 arrendadores
--   - 45 propiedades
--   - 69 fotos
--   - 40 arrendamientos
--   - 95 reseñas
--   - 207 servicios en propiedades
--   - 5 administradores
--   - 14 códigos postales actualizados
-- ============================================================

-- ============================================================
-- EXTENSIÓN DE DATOS PARA PRESENTACIÓN CON SINODALES
-- Agrega usuarios faltantes por caso y más reseñas
-- IDs de usuario nuevos: 81-106
-- IDs de arrendatario nuevos: 51-68
-- IDs de reseña nuevos: 96-155
-- ============================================================

USE dbRentIPN;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

-- ============================================================
-- NUEVOS USUARIOS (IDs 81-106)
-- CONTRASEÑA: password123
-- Hash: $2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi
-- ============================================================

INSERT INTO `usuario` (`idUsuario`, `usuarioNom`, `usuarioApePat`, `usuarioApeMat`, `usuarioCorreo`, `usuarioTel`, `usuarioCurp`, `usuarioContra`, `usuarioFechaNac`, `usuarioFechaRegis`, `usuarioFechaUIS`, `usuarioCodigo`, `usuarioCorreoVerificado`, `usuarioCodigoFecha`) VALUES

-- ============================================================
-- CASO 1 extra: Correo NO verificado, Identidad NO (con tiempo válido)
-- IDs 81-83
-- ============================================================
(81, 'Fernanda Isabel', 'Guerrero', 'Nava',    'fernanda.guerrero@gmail.com',  '5511223344', 'GUNF010115MDFRRN81', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-01-15', '2026-05-10 09:00:00', '2026-05-10 09:00:00', 'C1X0081', 0, '2026-05-10 09:05:00'),
(98, 'Rodrigo Emilio',  'Serrano',  'Ibáñez',  'rodrigo.serrano@hotmail.com',  '5522334455', 'SEIR000220HDFRRN82', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-02-20', '2026-05-12 10:00:00', '2026-05-12 10:00:00', 'C1X0082', 0, '2026-05-12 10:05:00'),
(83, 'Valeria Sofía',   'Medina',   'Ríos',    'valeria.medina@outlook.com',   '5533445566', 'MERV030310MDFRRN83', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2003-03-10', '2026-05-14 11:00:00', '2026-05-14 11:00:00', 'C1X0083', 0, '2026-05-14 11:05:00'),

-- ============================================================
-- CASO 2 extra: Correo NO verificado, Identidad NO (códigos expirados)
-- IDs 84-86
-- ============================================================
(84, 'Tomás Enrique',   'Pedroza',  'Salinas', 'tomas.pedroza@gmail.com',      '5544556677', 'PEST010415HDFRRN84', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-04-15', '2024-04-20 10:00:00', '2025-04-20 12:00:00', 'C2X0084', 0, '2024-04-20 10:05:00'),
(85, 'Diana Lucía',     'Fuentes',  'Carmona', 'diana.fuentes@hotmail.com',    '5555667788', 'FUCD020520MDFRRN85', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2002-05-20', '2024-05-15 11:00:00', '2024-05-15 13:00:00', 'C2X0085', 0, '2024-05-15 11:05:00'),
(86, 'Óscar Manuel',    'Bravo',    'Téllez',  'oscar.bravo@outlook.com',      '5566778899', 'BATO000625HDFRRN86', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-06-25', '2024-06-20 12:00:00', '2024-06-20 14:00:00', 'C2X0086', 0, '2024-06-20 12:05:00'),

-- ============================================================
-- CASO 3 extra: Correo NO verificado, Identidad SÍ verificada
-- IDs 87-89
-- ============================================================
(87, 'Karla Beatriz',   'Alvarado', 'Peña',    'karla.alvarado@gmail.com',     '5577889900', 'ALPK010730MDFRRN87', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-07-30', '2026-05-01 09:00:00', '2025-07-20 10:00:00', 'C3X0087', 0, '2026-04-28 09:05:00'),
(88, 'Sebastián',       'Vargas',   'Delgado', 'sebastian.vargas@hotmail.com', '5588990011', 'VADS990828HDFRRN88', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1999-08-28', '2026-04-28 14:00:00', '2025-08-15 11:00:00', 'C3X0088', 0, '2026-04-25 14:05:00'),
(89, 'Paola Alejandra', 'Cisneros', 'Vega',    'paola.cisneros@outlook.com',   '5599001122', 'CIVP020920MDFRRN89', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2002-09-20', '2026-05-03 10:00:00', '2025-09-10 13:00:00', 'C3X0089', 0, '2026-05-01 10:05:00'),

-- ============================================================
-- CASO 4 extra: Correo SÍ verificado, Identidad NO
-- IDs 90-92
-- ============================================================
(90, 'Ignacio',         'Ríos',     'Castellanos', 'ignacio.rios@gmail.com',   '5500112233', 'ROCI001012HDFRRN90', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-10-12', '2026-04-08 15:00:00', '2026-04-08 15:00:00', 'C4X0090', 1, '2026-04-08 15:05:00'),
(91, 'Melissa',         'Zavala',   'Quiroz',     'melissa.zavala@hotmail.com','5511223345', 'ZAQM031115MDFRRN91', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2003-11-15', '2026-04-11 09:30:00', '2026-04-11 09:30:00', 'C4X0091', 1, '2026-04-11 09:35:00'),
(92, 'Ernesto',         'Palma',    'Ibarra',     'ernesto.palma@outlook.com', '5522334456', 'PAIE011220HDFRRN92', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-12-20', '2026-04-14 11:00:00', '2026-04-14 11:00:00', 'C4X0092', 1, '2026-04-14 11:05:00'),

-- ============================================================
-- CASO 5 extra: Correo SÍ verificado, Identidad SÍ (fecha expirada)
-- IDs 93-95
-- ============================================================
(93, 'Adriana',         'Montes',   'Gutiérrez', 'adriana.montes@gmail.com',  '5533445567', 'MOGA000115MDFRRN93', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2000-01-15', '2025-01-20 08:00:00', '2025-01-20 08:00:00', 'C5X0093', 1, '2025-01-20 08:05:00'),
(94, 'Mauricio',        'Reyes',    'Sandoval',  'mauricio.reyes@hotmail.com','5544556678', 'RESM980218HDFRRN94', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1998-02-18', '2025-02-25 12:00:00', '2025-02-25 12:00:00', 'C5X0094', 1, '2025-02-25 12:05:00'),
(95, 'Gabriela',        'Téllez',   'Romero',    'gabriela.tellez@outlook.com','5555667789','TERG010320MDFRRN95', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '2001-03-20', '2025-03-15 10:00:00', '2025-03-15 10:00:00', 'C5X0095', 1, '2025-03-15 10:05:00'),

-- ============================================================
-- CASO 7 extra: ARRENDADORES - Correo NO verificado
-- IDs 96-97
-- ============================================================
(96, 'Héctor',         'Zavala',   'Campos',    'hector.zavala@gmail.com',   '5566778890', 'ZACH720415HDFRN96', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1972-04-15', '2024-02-15 08:00:00', '2024-02-15 08:00:00', 'VER096', 0, '2024-02-15 08:05:00'),
(97, 'Lorena',          'Castañeda','Moreno',    'lorena.castaneda@hotmail.com','5577889901','CAML760520MDFRN97', '$2b$10$/tQlbx1TZgQMQ7Vt4LWwJOzqk66L0OaZ3Oh9a8odhLTZ/L.1i3Ibi', '1976-05-20', '2024-02-20 10:00:00', '2024-02-20 10:00:00', 'VER097', 0, '2024-02-20 10:05:00');

-- ============================================================
-- NUEVOS ARRENDATARIOS (IDs 51-65)
-- ============================================================

INSERT INTO `arrendatario` (`idArrendatario`, `arrendatarioBoleta`, `arrendatarioVerificado`, `arrendatarioFechaVerificación`, `arrendatarioUser`, `usuario_idUsuario`, `carrera_idCarrera`) VALUES

-- CASO 1 extra (IDs 51-53)
(66, '2026010081', 0, NULL, 'fer_guerrero',   81, 2),
(52, '2026020082', 0, NULL, 'rodri_serrano',  82, 5),
(53, '2026010083', 0, NULL, 'vale_medina',    83, 9),

-- CASO 2 extra (IDs 54-56)
(54, '2024010084', 0, NULL, 'tomas_ped',      84, 12),
(55, '2024020085', 0, NULL, 'diana_fue',      85, 3),
(56, '2024030086', 0, NULL, 'oscar_bra',      86, 6),

-- CASO 3 extra (IDs 57-59)
(57, '2024030087', 1, '2024-10-15 11:00:00', 'karla_alv',   87, 1),
(58, '2023020088', 1, '2024-12-20 09:00:00', 'seba_vargas', 88, 4),
(59, '2024040089', 1, '2025-01-10 14:00:00', 'paola_cis',   89, 7),

-- CASO 4 extra (IDs 60-62)
(60, '2026010090', 0, NULL, 'ignacio_rios',   90, 10),
(61, '2026020091', 0, NULL, 'melissa_zav',    91, 13),
(62, '2026010092', 0, NULL, 'ernes_pal',      92, 16),

-- CASO 5 extra (IDs 63-65) — verificados con fecha expirada
(63, '2025010093', 1, '2025-02-10 09:00:00', 'adri_mon',    93, 19),
(64, '2025020094', 1, '2025-03-15 10:00:00', 'mauri_rey',   94, 22),
(65, '2025030095', 1, '2025-04-20 11:00:00', 'gaby_tel',    95, 25);

-- ============================================================
-- NUEVOS ARRENDADORES (IDs 31-32) — CASO 7 extra
-- ============================================================

INSERT INTO `arrendador` (`idArrendador`, `arrendadorRFC`, `usuario_idUsuario`, `direccion_idDireccion`) VALUES
(31, 'ZACH720415XXX', 96, 11),
(32, 'CAML760520XXX', 97, 12);

-- ============================================================
-- NUEVAS RESEÑAS (IDs 96-155)
-- Más reseñas distribuidas en propiedades 1-20 y 21-45
-- ============================================================

INSERT INTO `resena` (`idResena`, `resenaFechaCreacion`, `resenaDuracionRenta`, `resenaDescrip`, `resenaCalSerBasic`, `resenaCalSerComEnt`, `resenaCalSerAdicio`, `resenaCalGen`, `resenaSentimiento`, `propiedad_idPropiedad`, `arrendatario_idArrendatario`) VALUES

-- Propiedad 1: Cuarto económico frente a ESCOM (+3 reseñas)
(96,  '2025-03-10 09:00:00', 4, 'Habitación cómoda y muy bien ubicada. No hay pretexto para llegar tarde a clase estando tan cerca de ESCOM.', 4.5, NULL, 3.5, 4.2, 'Neutro',   1, 51),
(97,  '2025-04-15 11:00:00', 5, 'Excelente relación precio-calidad. El escritorio y la silla son cómodos para estudiar largas horas. Recomendado.', 5.0, NULL, 4.0, 4.7, 'Positivo', 1, 52),
(98,  '2025-05-20 10:00:00', 3, 'Limpísima y tranquila. El arrendador resuelve cualquier problema en menos de un día. Muy satisfecho.', 4.5, NULL, 4.0, 4.4, 'Positivo', 1, 53),

-- Propiedad 2: Depto compartido en Lindavista (+3 reseñas)
(99,  '2025-03-05 14:00:00', 6, 'Departamento espacioso y bien ubicado. Los gastos de agua y luz incluidos ayudan mucho a controlar el presupuesto.', 5.0, 4.5, 4.0, 4.7, 'Positivo', 2, 54),
(100, '2025-04-10 10:30:00', 7, 'Sala amplia y cocina completa. Mi compañero de cuarto y yo nos organizamos muy bien. Sin quejas.', 4.5, 4.0, 4.0, 4.4, 'Neutro',   2, 55),
(101, '2025-05-18 09:00:00', 4, 'Buena opción para 2 estudiantes. El Metro Lindavista a 10 min es una gran ventaja para moverse.', 4.5, 4.5, 3.5, 4.3, 'Neutro',   2, 56),

-- Propiedad 5: Estudio económico Metro Politécnico (+3 reseñas)
(102, '2025-04-01 11:00:00', 5, 'Estudio privado con entrada independiente, ideal para quien quiere concentrarse. A 5 min del metro es perfecto.', 5.0, NULL, 4.5, 4.8, 'Positivo', 5, 57),
(103, '2025-05-05 13:00:00', 4, 'Baño propio y kitchenette funcional. Sin sorpresas en el recibo porque los servicios ya están incluidos.', 4.5, NULL, 4.0, 4.4, 'Positivo', 5, 58),
(104, '2025-06-10 10:00:00', 6, 'El precio es lo que más me convenció. Estudio pequeño pero bien aprovechado. Arrendador muy accesible.', 4.0, NULL, 4.0, 4.1, 'Neutro',   5, 59),

-- Propiedad 8: Casa para 5 en San José Ticomán (+3 reseñas)
(105, '2025-02-20 09:00:00', 9, 'Casa grande con patio, ideal para 5 compañeros. Sin depósito fue decisivo. La experiencia de vivir en grupo es increíble.', 5.0, 5.0, 5.0, 5.0, 'Positivo', 8, 60),
(106, '2025-03-25 14:00:00', 6, 'Buena casa para grupo. Los 2 baños evitan colas en las mañanas. Lavadero muy útil para la ropa.', 4.5, 4.5, 4.5, 4.6, 'Positivo', 8, 61),
(107, '2025-04-30 10:00:00', 5, 'A 15 min de ESCOM en camión, distancia manejable. El patio es perfecto para estudiar los fines de semana.', 4.0, 4.0, 4.5, 4.2, 'Neutro',   8, 62),

-- Propiedad 10: Depto en Residencial Zacatenco (+3 reseñas)
(108, '2025-03-15 12:00:00', 5, 'Muy conveniente para estudiantes de ESIME. Planta baja y zona familiar tranquila. Cocina bien equipada.', 4.5, NULL, 4.0, 4.3, 'Neutro',   10, 63),
(109, '2025-04-20 09:30:00', 7, 'Departamento en excelente estado. El arrendador hace mantenimiento puntual. Ideal para 2 compañeros.', 4.5, NULL, 4.5, 4.5, 'Positivo', 10, 64),
(110, '2025-05-25 11:00:00', 4, 'A 5 min de ESIME, imposible estar más cerca. Sala y comedor amplios para trabajar en equipo.', 5.0, NULL, 4.0, 4.6, 'Positivo', 10, 65),

-- Propiedad 12: Casa para 4 en Valle del Tepeyac (+3 reseñas)
(111, '2025-02-10 10:00:00', 8, 'Casa hermosa con jardín. Los 4 nos organizamos por semestres y nunca tuvimos problemas entre compañeros.', 5.0, 5.0, 5.0, 5.0, 'Positivo', 12, 51),
(112, '2025-03-20 14:30:00', 6, 'La sala TV hace que los fines de semana sean muy agradables. Cocina grande, caben todos cocinando a la vez.', 4.5, 5.0, 4.5, 4.7, 'Positivo', 12, 52),
(113, '2025-04-25 09:00:00', 5, 'A 12 min de ESCOM en transporte, muy accesible. El jardín es único en renta estudiantil. Vale el precio.', 4.5, 4.5, 5.0, 4.7, 'Positivo', 12, 53),

-- Propiedad 15: Cuarto amueblado Residencial la Escalera (+3 reseñas)
(114, '2025-03-01 11:00:00', 4, 'Habitación sencilla pero muy funcional. Sin depósito facilita mucho la llegada a la Ciudad de México.', 4.0, NULL, 3.5, 3.9, 'Neutro',   15, 54),
(115, '2025-04-05 13:00:00', 5, 'El ambiente estudiantil de la zona es motivador. Cocina limpia y compañeros respetuosos del espacio.', 4.0, NULL, 4.0, 4.0, 'Neutro',   15, 55),
(116, '2025-05-10 10:00:00', 3, 'Precio muy justo para la zona. El Metro Indios Verdes cerca hace fácil moverse a cualquier unidad del IPN.', 4.0, NULL, 3.5, 3.8, 'Neutro',   15, 56),

-- Propiedad 18: Habitación económica La Purísima Ticomán (+3 reseñas)
(117, '2025-03-12 09:00:00', 4, 'La habitación más económica que encontré. Básica pero limpia. El ambiente de estudiantes del IPN es lo mejor.', 3.5, NULL, 3.0, 3.5, 'Neutro',   18, 57),
(118, '2025-04-18 11:00:00', 5, 'Muy económico para estar en la zona del politécnico. Sin lujos pero todo en orden y con buena onda.', 3.5, NULL, 3.0, 3.4, 'Neutro',   18, 58),
(119, '2025-05-22 14:00:00', 3, 'Lo esperado para el precio. Cocina de uso libre es un gran plus. No volvería pero cumplió su función.', 3.0, NULL, 2.5, 2.9, 'Negativo', 18, 59),

-- Propiedad 21: Habitación frente al IPN (+3 reseñas)
(120, '2026-02-20 10:00:00', 6, 'La mejor habitación que he tenido. El arrendador es muy profesional y siempre disponible ante cualquier falla.', 5.0, NULL, 4.5, 4.9, 'Positivo', 21, 60),
(121, '2026-03-05 11:00:00', 4, 'Cocina muy bien equipada, compartir no es problema cuando todos son responsables. Internet muy rápido.', 4.5, NULL, 4.0, 4.3, 'Neutro',   21, 61),
(122, '2026-04-10 09:30:00', 5, 'Escritorio cómodo para jornadas largas de estudio. La ubicación frente al IPN no tiene competencia.', 4.5, NULL, 4.0, 4.4, 'Positivo', 21, 62),

-- Propiedad 24: Departamento 2 recámaras Lindavista (+3 reseñas)
(123, '2026-03-10 09:00:00', 5, 'Departamento muy bien distribuido para 2. El balcón es el mejor lugar para repasar antes de examen.', 4.5, 4.5, 4.5, 4.5, 'Positivo', 24, 63),
(124, '2026-04-01 11:00:00', 4, 'Edificio con vigilancia da mucha tranquilidad. A 15 min de ESCOM y ESIME, accesible para ambas unidades.', 4.5, 4.0, 4.0, 4.3, 'Neutro',   24, 64),
(125, '2026-05-05 10:00:00', 6, 'El precio dividido entre 2 es muy accesible para lo que ofrece. Sala cómoda para trabajar en proyectos.', 4.0, 4.0, 4.5, 4.2, 'Neutro',   24, 65),

-- Propiedad 26: Departamento 3 recámaras (+3 reseñas)
(126, '2026-04-05 10:00:00', 7, 'El mejor departamento para grupo. Cada quien en su cuarto y todos compartiendo 2 baños sin problema.', 5.0, NULL, 5.0, 4.9, 'Positivo', 26, 51),
(127, '2026-04-20 14:00:00', 5, 'Lavadora en el piso evita salir a lavandería. Cocina completa con espacio para los 3. Muy organizado.', 4.5, NULL, 4.5, 4.5, 'Positivo', 26, 52),
(128, '2026-05-10 09:00:00', 4, 'Precio distribuido en 3 hace que sea muy rentable. Arrendador flexible en fechas de pago. Recomendado.', 4.0, NULL, 4.0, 4.1, 'Neutro',   26, 53),

-- Propiedad 30: Departamento amueblado Metro (+3 reseñas)
(129, '2026-05-01 09:00:00', 5, 'Departamento listo para habitar desde el primer día. A 5 min del metro es una ventaja enorme para moverse.', 5.0, 4.5, 4.5, 4.8, 'Positivo', 30, 54),
(130, '2026-05-08 11:00:00', 4, 'Las cámaras del edificio dan tranquilidad. Cocina equipada con todo lo necesario. Sin quejas en 4 meses.', 4.5, 4.0, 4.0, 4.3, 'Neutro',   30, 55),
(131, '2026-05-15 10:00:00', 6, 'TV en la sala hace los fines de semana más llevaderos. Bien amueblado y el intercomunicador funciona perfecto.', 4.5, 5.0, 4.5, 4.6, 'Positivo', 30, 56),

-- Propiedad 33: Estudio loft pareja (+3 reseñas)
(132, '2026-05-20 09:00:00', 5, 'Los 2 escritorios son perfectos para proyectos conjuntos. Kitchenette evita salir en noches de desvelo.', 5.0, NULL, NULL, 4.8, 'Positivo', 33, 57),
(133, '2026-05-22 14:00:00', 4, 'Entrada independiente da libertad total de horarios. Wi-Fi muy estable para clases en línea.', 4.5, NULL, NULL, 4.4, 'Positivo', 33, 58),
(134, '2026-05-24 10:00:00', 6, 'Estudio bien aprovechado para 2 personas. La planta alta brinda privacidad necesaria para concentrarse.', 4.5, NULL, NULL, 4.5, 'Positivo', 33, 59),

-- Propiedad 36: Departamento moderno servicios incluidos (+3 reseñas)
(135, '2026-05-01 10:00:00', 5, 'Servicios incluidos sin sorpresas al final de mes. Baño remodelado y cocina moderna. Muy satisfecho.', 5.0, NULL, 5.0, 4.9, 'Positivo', 36, 60),
(136, '2026-05-08 11:00:00', 4, 'Edificio limpio con acceso controlado. El Wi-Fi incluido es de alta velocidad. Perfecto para estudiantes.', 4.5, NULL, 4.5, 4.5, 'Positivo', 36, 61),
(137, '2026-05-15 09:00:00', 6, 'Departamento moderno y funcional. A 2 estudiantes el precio nos resulta muy accesible. Lo recomendamos.', 5.0, NULL, 5.0, 4.8, 'Positivo', 36, 62),

-- Propiedad 39: Casa 5 estudiantes todo incluido (+3 reseñas)
(138, '2026-02-10 10:00:00', 7, 'Casa ideal para grupo de amigos del mismo semestre. Cada cuarto amueblado y los servicios sin contratiempos.', 5.0, 5.0, 5.0, 5.0, 'Positivo', 39, 63),
(139, '2026-03-01 11:00:00', 5, 'Sin depósito fue el factor decisivo para elegirla. Convivencia grupal muy buena. La cocina es amplia.', 4.5, 5.0, 4.5, 4.7, 'Positivo', 39, 64),
(140, '2026-04-05 09:00:00', 6, 'La sala TV es el punto de reunión del grupo. Los 2 baños evitan filas matutinas. Experiencia excelente.', 5.0, 5.0, 5.0, 4.9, 'Positivo', 39, 65),

-- Propiedad 41: Habitación solo mujeres (+3 reseñas)
(141, '2026-01-10 10:00:00', 4, 'Sentirme segura como mujer en la Ciudad de México fue mi prioridad y aquí lo logré. Muy recomendado.', 5.0, NULL, 4.5, 4.8, 'Positivo', 41, 51),
(142, '2026-01-20 11:00:00', 5, 'Ambiente de hermandad entre las inquilinas. El acceso controlado da tranquilidad a mis papás también.', 4.5, NULL, 5.0, 4.7, 'Positivo', 41, 52),
(143, '2026-02-05 09:00:00', 3, 'Espacio para mujeres en el que te puedes desenvolver con libertad. Reglas claras y respetadas por todas.', 5.0, NULL, 4.5, 4.8, 'Positivo', 41, 53),

-- Propiedad 44: Departamento 4 recámaras (+3 reseñas)
(144, '2025-10-20 10:00:00', 6, 'Los 4 llegamos de distintas unidades del IPN y el depto nos quedó perfecto a todos. Gran ubicación central.', 5.0, NULL, 4.5, 4.8, 'Positivo', 44, 54),
(145, '2025-11-01 11:00:00', 5, 'Sala grande ideal para hacer tareas grupales. Los 2 baños para 4 personas funcionan muy bien.', 4.5, NULL, 4.5, 4.5, 'Positivo', 44, 55),
(146, '2025-11-15 09:00:00', 4, 'Escritorio en cada habitación fue el factor clave para elegirlo. Arrendador muy accesible ante cualquier aviso.', 4.0, NULL, 4.5, 4.3, 'Neutro',   44, 56),

-- Propiedad 7: Habitación tranquila La Laguna Ticomán (+3 reseñas)
(147, '2025-06-10 09:00:00', 5, 'Zona muy silenciosa, perfecta para quien necesita concentrarse en épocas de exámenes. Cocina en buen estado.', 4.0, NULL, 3.5, 3.9, 'Neutro',   7, 57),
(148, '2025-07-15 11:00:00', 6, 'Habitación con escritorio amplio. El ambiente tranquilo hace la diferencia cuando estás en semestre pesado.', 4.0, NULL, 4.0, 4.0, 'Neutro',   7, 58),
(149, '2025-08-20 10:00:00', 4, 'Precio accesible y baño compartido limpio. A 8 min del transporte, sin problema para ir al IPN.', 4.0, NULL, 3.5, 3.8, 'Neutro',   7, 59),

-- Propiedad 11: Habitación luminosa Torres Lindavista (+3 reseñas)
(150, '2025-06-05 10:00:00', 5, 'Ventana grande que ilumina toda la habitación. Muy agradable para estudiar durante el día con luz natural.', 4.0, NULL, 3.5, 4.0, 'Neutro',   11, 60),
(151, '2025-07-10 14:00:00', 4, 'Internet incluido y rápido, esencial para tareas y proyectos. Baño compartido siempre limpio. Recomendado.', 4.0, NULL, 3.5, 3.9, 'Neutro',   11, 61),
(152, '2025-08-15 09:00:00', 6, 'A 7 min del Metro Politécnico es muy conveniente. Escritorio amplio y habitación funcional. Sin quejas.', 3.5, NULL, 3.5, 3.7, 'Neutro',   11, 62),

-- Propiedad 20: Habitación amplia Churubusco Tepeyac (+3 reseñas)
(153, '2025-07-01 10:00:00', 5, 'Habitación grande con cama matrimonial, un lujo para renta estudiantil. El sillón de estudio es muy cómodo.', 4.5, NULL, 4.0, 4.3, 'Neutro',   20, 63),
(154, '2025-08-05 11:00:00', 4, 'Cocina equipada y baño compartido con solo una persona más. Ambiente estudiantil positivo en la casa.', 4.0, NULL, 4.0, 4.1, 'Neutro',   20, 64),
(155, '2025-09-10 09:00:00', 6, 'A 10 min del Metrobús facilita moverse a cualquier unidad. Arrendador atento y respetuoso. Recomendado.', 4.5, NULL, 4.0, 4.2, 'Neutro',   20, 65);

-- ============================================================
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- ============================================================
-- RESUMEN
-- ============================================================
-- Nuevos usuarios:        17 (IDs 81-97)
-- Nuevos arrendatarios:   15 (IDs 51-65)
-- Nuevos arrendadores:     2 (IDs 31-32) — Caso 7
-- Nuevas reseñas:         60 (IDs 96-155)
-- ============================================================
-- CONTEO FINAL POR CASO:
--   Caso 1 (correo NO, identidad NO con tiempo):     6 arrendatarios (1-3, 51-53)
--   Caso 2 (correo NO, identidad NO expirado):       6 arrendatarios (4-6, 54-56)
--   Caso 3 (correo NO, identidad SÍ):                6 arrendatarios (7-9, 57-59)
--   Caso 4 (correo SÍ, identidad NO):                6 arrendatarios (10-12, 60-62)
--   Caso 5 (correo SÍ, identidad SÍ expirada):      11 arrendatarios (13-20, 63-65)
--   Caso 6 (arrendadores correo SÍ verificado):     16 arrendadores  (ya tenía suficientes)
--   Caso 7 (arrendadores correo NO verificado):       6 arrendadores  (21-24, 31-32)
--   Caso 8 (nuevos arrendatarios verificados):       30 arrendatarios (ya tenía suficientes)
--   Caso 9 (nuevos arrendadores verificados):        10 arrendadores  (ya tenía suficientes)
-- ============================================================