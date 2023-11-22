
USE trabajo;

CREATE TABLE IF NOT EXISTS oficina (
id BIGINT PRIMARY KEY,
denominacion VARCHAR(255)
);  

CREATE TABLE IF NOT EXISTS persona (
	id BIGINT PRIMARY KEY auto_increment,
	nombre VARCHAR(255),
	email VARCHAR(255),
	id_oficina BIGINT,
	FOREIGN KEY (id_oficina) REFERENCES oficina(id)
);


INSERT INTO oficina (id, denominacion)
VALUE (1, "Abogado");

INSERT INTO persona (nombre, email, id_oficina)
VALUE ("guillermo", "guillermo@gmail.com", 1);
