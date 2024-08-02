# PROJECT BREAK - 13Books

Para este proyecto Inés y Laura han decidido embarcarse en crear su propia tienda de libros **13Books**. 
La web cuenta en su página inicial con una sección de destacados _el top 3 de ventas_ y con un menú superior donde se permite consultar los libros filtrando por _título, autor o isbn_ o directamente por _género_. 
En el detalle de cada libro podrás encontrar la portada y la información relevante como es el título, autor, año de publicación, stock disponible, sinopsis y precio. 
También se muestra un acceso para poder hacer _login_ como cliente, o _registrarse_ si aun no lo eres, y de esta forma poder comprar (acceso al carrito) y visualizar tus pedidos.
En el caso de ser _administrador_ de la web podrás realizar la gestión de los libros _creando, modificando y eliminando_ y la gestión de los pedidos _eliminando_ o cambiandolos de estado a _entregado_.


## Instalación
1. Descargar el respositorio
2. Instalarse las dependencias para el backend y el frontend.
   Abre dos terminales, una para ir al directorio 13Books_front y otra para ir al directorio 13Books_back e instalar dependencias con el comando
```bash
  cd 13Books_front
  npm install -E
```
```bash
  cd 13Books_back
  npm install -E
```
3. Para el **backend** crear un fichero .env en la carpeta 13Books_back
// .env
POSTGRESSQL_URI=<conexion_bbdd_postgreSQL>
PORT=8080
SECRET_KEY=<palabra_secreta>

4. Para el **frontend** no se dispone de fichero .env y hay que modificar la ruta para que apunte a localhost.
   En los dos hooks creados para las llamadas al back hay que modificar:

   En  _useRequest.jsx_ cambiar
```   
  let urlBase = `${urlBackend}/books`;
  let urlBaseOrder = `${urlBackend}/orders`;
```
por estas dos
```
  let urlBase = `${urlBackenddev}/books`;
  let urlBaseOrder = `${urlBackenddev}/orders`;
```

En  _useRequestUser.jsx cambiar
```   
  const urlBase = `${urlBackend}/users`;
```
por esta
```
   const urlBase = `${urlBackenddev}/users`;
```

5. Arranca el servidor del backend y la aplicación para el frontend.

```bash
  cd 13Books_front
  npm run dev
```
```bash
  cd 13Books_back
  npm stard
```

## Info técnica

* **Lenguajes:** Javascript, css, html
* **Tecnologías:** Node, Express, React
* **BBDD:**  Base de datos PostgresSQL en Render

El esquema de bade de datos es un modelo relacional que consta de las tablas
- BOOKS: Almacena los libros
- CLIENTES: Almacena los clientes, tanto los de rol ususario _user_ como los rol administrador _admin_
- GENRES: Almacena los tipos de género de los libros 
- ORDERS: Almacena los datos generales del pedido
- ORDERS_DETAILS: Almacena los líneas de un pedido
- BOOKINGS: Almacea las reservas de libros de clientes

En el siguiente modelo se pueden ver las relaciones, claves primarias y claves foráneas:

![Modelo entidad relacion 13Books](/MODELO_ER_13Books.jpg)

La autenticación se ha realizado con JSON Web Token y se ha utilizado bcrypt para almacenar las contraseñas de usuario encriptadas.

* **Despliegue**
El proyecto está desplegado en Render. Estas son las urls de producción:

     - [Url del back-end](https://one3books.onrender.com/books)
     - [Url del front-end](https://one3books-front.onrender.com/)


## API Reference

Se lista a continuación los endpoints de los que disponemos para la tienda. 
Las respuestas se obtendrán en formato json.

### Métodos públicos

#### Obtener todos los libros

```http
  GET /books
```

#### Obtener el detalle de un libro

```http
  GET /books/:bookid
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `bookid`  | `int`      | **Required**.  Id del libro       |


#### Obtener el listado de libros por título, isbn, género o autor

```http
  GET /books/search/:searchtext
```

| Parameter   | Type       | Description                            |
| :---------- | :--------- | :------------------------------------- |
| `searchtext`| `sting`    | **Required**. cadena de texto a buscar |


#### Crear un libro

```http
  POST /books
```
Body JSON con los datos del libro a crear
{
  "title": "string",
  "author": "string",
  "isbn": "string",
  "editorial": "string",
  "language": "string",
  "publication_date": date,
  "price": float,
  "genreid": integer,
  "stock" : integer,
  "image": "string",
  "summary": "string"
}

   
#### Modificar un libro ya existente

```http
  POST /books/:bookid
```
Body JSON con los datos del libro a modificar
{
  "title": "string",
  "author": "string",
  "isbn": "string",
  "editorial": "string",
  "language": "string",
  "publication_date": date,
  "price": float,
  "genreid": integer,
  "stock" : integer,
  "image": "string",
  "summary": "string"
}


#### Eliminar un producto por Id

```http
  DELETE /books/:bookid
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `bookid`  | `integer`  | **Required**. Id del libro        |


#### Obtener el listado de libros por género 

```http
  GET /books/genre/:genre
```

| Parameter   | Type       | Description                   |
| :---------- | :--------- | :---------------------------- |
| `genre`     | `sting`    | **Required**. género a buscar |

### Métodos con usuario registrado

#### Obtener todos los pedidos

```http
  GET /orders
```

#### Obtener el detalle de un pedido

```http
  GET /orders/:orderId
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `orderId` | `int`      | **Required**.  Id del pedido      |


#### Obtener el listado de pedidos por cliente

```http
  GET /orders/client/:clientId
```

| Parameter   | Type       | Description                            |
| :---------- | :--------- | :------------------------------------- |
| `clientId`  | `int`      | **Required**.  Id del cliente          |

#### Crear un pedido

```http
  POST /orders
```
Body JSON con los datos del libro a crear
{
    userId: integer,
    total: float,
    order: [
            bookid: integer,
            amount: integer,
            price:float]
}


### Métodos con usuario administrador registrado

#### Modificar un pedido a estado entregado

```http
  PUT /orders/:orderId
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `orderid`  | `integer`  | **Required**. Id del pedido      |

Body JSON con los datos del libro a modificar
{
  "status": "string",
}


#### Eliminar un pedido por Id

```http
  DELETE /orders/:orderid
```

| Parameter | Type       | Description                       |
| :-------- | :-------   | :-------------------------------- |
| `orderid`  | `integer`  | **Required**. Id del pedido      |


### Métodos de acceso de usuario

#### Registrarse

```http
  POST /register
```
Body JSON con los datos del cliente
{
    name:  "string",
    surname:  "string",
    city:  "string",
    username:  "string",
    email:  "string",
    password:  "string"
}

#### Login

```http
  POST /Login
```
Body JSON con los datos del cliente
{
    email: "string",
    password:  "string"
}

#### Logout

```http
  GET /Logout
```

