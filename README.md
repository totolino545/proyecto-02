# Proyecto-02

- Este proyecto Node.js + Express.js + MongoDB es una pequeña aplicación backend para gestionar una colección de discos de música, 
construida en base a la clase_13 realizada en el Curso de Programación BackEnd - UNTREF. 

## Requerimientos:

- Node.js v18.16.0 
- GIT v2.40.1
- IDE - Visual Studio Code v1.78.2 o superior
- Express.js
- MongoDB
- Extención Thunder Client

### Funcionamiento:

- Describiremos el funcionamiento de cada endpoint utilizado para realizar peticiones de información: 


* /discos

- Método get: este método nos permite listar todos los discos de la colección, solo podemos aplicar un filtro "artista" que nos mostrará todos 
los discos del artista seleccionado.
- Método post: nos permite agregar un nuevo disco a la colección através del Body Form-encode de la Extención Thunder Client o Postman, el campo id: se genera automáticamente y la API solo grabará el documento en la colección si todos los campos son validados.


* /discos/:id
- Método get: este método nos permite listar un disco en partitular enviando el params id, podemos hacerlo por la extensión o directamente 
desde el navegador.
- Método put: este método nos permite modificar los datos de un disco en particular, para ello debemos enviar el id del disco como Query Parameters en la Extención Thunder Client para acceder a su documento y por Body Form-encode completaremos los datos de cada campo a modificar, recordemos que el método put sirve tanto para agregar y modificar datos en el documento, por lo tanto debemos enviar todos los campos en el Body para que la colección sea actualizada. 
- Método patch: este método nos permite modificar un dato específico de un disco, accedemos al documento por el Query Parameters id y por el Body modificamos el o los campos necesasarios, no es necesario completar todos los campos del documento seleccionado.
- Método delete: este método nos permite eliminar un disco en particular, para ello debemos enviar el id del documento en Query Parameters de la Extención Thunder Client para poder realizar la petición.


Juan Adolfo Herrera


