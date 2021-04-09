CREATE TABLE usuarios (
id INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(20) NOT NULL UNIQUE,
pass VARCHAR(40) NOT NULL,
secret VARCHAR(40)
);

CREATE TABLE favoritos (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(50) NOT NULL,
resumen VARCHAR(200) NOT NULL,
url VARCHAR(300) NOT NULL,
idUsuario INT,
FOREIGN KEY(idUsuario) REFERENCES usuarios(id)
);

INSERT INTO favoritos (titulo, resumen, url, idUsuario) VALUES ('Primera oferta', 'Esta es la primera oferta de prueba', 'url.url.url', 1);