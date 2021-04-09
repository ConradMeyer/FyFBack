-- CREAR TABLAS
CREATE TABLE usuarios (
id INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(20) NOT NULL UNIQUE,
pass VARCHAR(40) NOT NULL,
secret VARCHAR(40)
)

CREATE TABLE favoritos (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(50) NOT NULL,
resumen VARCHAR(200) NOT NULL,
url VARCHAR(300) NOT NULL,
idUsuario INT,
FOREIGN KEY(idUsuario) REFERENCES usuarios(id)
)

--CONSULTAR USUARIO
SELECT * FROM usuarios;

-- ESCRIBIR
INSERT INTO usuarios (email, pass) VALUES
('chape@gmail.com', 'chapelas93');

-- BORRAR TABLA
DROP TABLE usuarios;

-- AÑADIR CONTENIDO A UNA TABLA
INSERT INTO favoritos (titulo,resumen, url, idUsuario)
VALUES('', '', '', '');

-- BORRAR CONTENIDO DE UNA TABLA
DELETE FROM favoritos WHERE id='3';

-- MODIFICAR 
ALTER TABLE favoritos ADD UNIQUE INDEX(url, idUsuario);
INSERT IGNORE INTO favoritos(...) VALUES (...)
