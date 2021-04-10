CREATE TABLE usuarios (
id INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(20) NOT NULL,
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





mysql> SELECT a.tutorial_id, a.tutorial_author, b.tutorial_count
   -> FROM tutorials_tbl a, tcount_tbl b
   -> WHERE a.tutorial_author = b.tutorial_author;



   insert into favoritos (titulo, resumen, url, idUsuario) values ("modulo clientes", "ofertas", "http//google.com", "1");

   INSERT INTO usuarios(nombre,email,pass,secret) VALUES ("Luis","luis@correo.es","Adimin2341","df%ufssi$");
   INSERT INTO usuarios(nombre,email,pass,secret) VALUES ("Roberto","roberto@correo.es","Adimin4356","df%uASssi$");

   INSERT INTO favoritos(titulo,descripcion,remuneracion,enlace,usuario)
VALUES (
	"Programador Frontend ","*Buscamos únicamente Programador de Tiempo Completo 100% Online*
Unlok es una plataforma de Contenido Exclusivo que cuenta con miles de creadores de contenido y
cientos de miles de usuarios, actualmente tenemos 3 años de desarrollo web y un año en operación.
 Nuestra sede principal está en Miami y la mayoría de nuestro personal está ubicada en Colombia.
 Ofrecemos pagos quincenales en US Dollars y la oportunidad de ser parte de una compañía que está creciendo muy rápido.",
    "10","https://www.workana.com/job/programador-frontend-16?ref=projects_1",1
    );
INSERT INTO favoritos(titulo,descripcion,remuneracion,enlace,usuario)
VALUES (
	"Add textures and materials to blender octane  ","Add textures and materials to blender octane 6 days left  VERIFIED
I have a .obj model and i want someone to take it into blender octane and make the materials and textures. send me a message if you are interested*",
    "93","https://www.freelancer.com/projects/3d-modelling/add-textures-materials-blender-octane/?ngsw-bypass=&w=f",2
    );