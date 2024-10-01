create  database place_parking;
use place_parking;



CREATE TABLE tipo (
 id_tipo INT NOT NULL IDENTITY (1,1),
 tipo VARCHAR(55) NOT NULL,
 CONSTRAINT pk_tipo PRIMARY KEY (id_tipo)
);

CREATE TABLE espacio_de_parqueadero (
 id_espacio_de_parqueadero INT NOT NULL IDENTITY (1,1),
 numero_espacio INT NOT NULL,
 tipo_espacio VARCHAR(55) NOT NULL,
 ubicacion INT NOT NULL,
 CONSTRAINT pk_espacio_de_parqueadero PRIMARY KEY (id_espacio_de_parqueadero)
);

CREATE TABLE costos (
 id_costos INT NOT NULL IDENTITY (1,1),
 subtotal INT NOT NULL,
 total DECIMAL NOT NULL,
 CONSTRAINT pk_costos PRIMARY KEY (id_costos)
);

CREATE TABLE vehiculo (
 id_vehiculo INT NOT NULL IDENTITY (1,1),
 tipo INT NOT NULL,
 placa VARCHAR(10) NOT NULL,
 modelo VARCHAR(55) NOT NULL,
 CONSTRAINT pk_vehiculo PRIMARY KEY (id_vehiculo),
 CONSTRAINT fk_tipo_vehiculo FOREIGN KEY (tipo)
 REFERENCES tipo(id_tipo)
);

CREATE TABLE registro (
 id_registro INT NOT NULL IDENTITY (1,1),
 vehiculo INT NOT NULL,
 fecha_hora_ingreso DATE NOT NULL,
 fecha_hora_salida DATE NOT NULL,
 CONSTRAINT pk_registro PRIMARY KEY (id_registro),
 CONSTRAINT fk_vehiculo_registro FOREIGN KEY (vehiculo)
 REFERENCES vehiculo(id_vehiculo)
);

CREATE TABLE factura (
 id_factura INT NOT NULL IDENTITY (1,1),
 vehiculo INT NOT NULL,
 espacio_de_parqueadero INT NOT NULL,
 registro INT NOT NULL,
 costos INT NOT NULL,
 CONSTRAINT pk_factura PRIMARY KEY (id_factura),
 CONSTRAINT fk_vehiculo_factura FOREIGN KEY (vehiculo)
 REFERENCES vehiculo(id_vehiculo),
 CONSTRAINT fk_espacio_factura FOREIGN KEY (espacio_de_parqueadero)
 REFERENCES espacio_de_parqueadero(id_espacio_de_parqueadero),
 CONSTRAINT fk_registro_factura FOREIGN KEY (registro)
 REFERENCES registro(id_registro),
 CONSTRAINT fk_costos_factura FOREIGN KEY (costos)
 REFERENCES costos(id_costos)
);





