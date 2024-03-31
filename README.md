# Seven Sins - juego de estrategia espacial a tiempo real

## Descripción general:

El proyecto completo es un juego de estrategia a tiempo real basado en la colonización y expansión de civilizaciones en un espacio exterior simulado. Cada galaxia representa un "subservidor" dentro de la estructura del proyecto y cada galaxia puede albergar hasta 10.000 sistemas estelares, suficientes para un número razonable de posibles jugadores.

Para realizar el proyecto completo tendré que utilizar un stack de tecnologías completo ya que realizaré el desarrollo íntegro del servidor y la API y además todo el servicio en el lado del cliente. Para ello, he escogido el stack MERN, compuesto por MongoDB para la base de datos, ExpressJS y NodeJS para la estructura e instancia del servidor principal y React para todo el desarrollo del lado cliente. Además, en el lado servidor se añaden las dependencias de Socket.io para el manejo de la experiencia a tiempo real, TypeScript debido a la envergadura del proyecto final y Jest para todo el testeo de la aplicación.

En el lado del cliente las dependencias serán NextJS como framework React, también Socket.io para el manejo del uso a tiempo real, TailwindCSS como framework CSS y ThreeJS y sus añadidos para las representaciones tridimensionales de las escenas.

**LOS ARCHIVOS .ENV DE LAS VARIABLES DE ENTORNO SE HAN AÑADIDO AL REPOSITORIO DEBIDO A QUE ESTE ES SOLO UN SHOWCASE DEL PROYECTO Y PARA FACILITAR SU REPRODUCCIÓN EN UN ESTADO LOCAL.**

**TYPESCRIPT LANZARÁ VARIOS WARNINGS DE TIPADO QUE AÚN NO HE CORREGIDO POR MOTIVOS DE PRIORIDAD PERO QUE NO AFECTAN AL TESTEO DE LA APLICACIÓN.**

## Arquitectura del proyecto:

![Diagrama de flujo](/img/flow-diagram.jpg)

**Frontend:** En el lado del cliente usaré NextJS como framework React ya que implementa muchas funcionalidades útiles y necesarios en el proyecto, como el ruteo interno, el renderizado desde el lado de servidor de componentes (muy útil en específico para las vistas de simulación, que manejan un volumen de datos muy grande). Además usaré TailwindCSS para los estilos y ThreeJS para las propias escenas de las simulaciones.
La interfaz de usuario incluirá todo lo clásico en los juegos de este estilo: barras de estado de recursos, paneles de información detallada de entidades que posea el jugador, vistas de detalle de flotas, naves, tripulaciones, etc, una sección de tienda donde adquirir productos del juego como mejores naves, tripulantes, recursos, etc y más paneles del estilo. Además la app incluirá 2 vistas de simulación 3D y 1 2D. Las 3D son la vista de galaxia (la única implementada hasta ahora), que permitirá al usuario ver la vista de todos los sistemas de su galaxia (subservidor) e interactuar con los diferentes objetos de la vista. Al hacer click en uno en específico se lanzará la segunda vista 3D: la vista de sistema. En ella el usuario verá la/s estrella/s del sistema en el centro y los diferentes planetas, sus lunas y los asteroides orbitando alrededor (como en la típica imagen del sistema solar donde los planetas orbitan alrededor del sol). Al interactuar con los diferentes objetos de la escena, el usuario irá recibiendo "tooltips" de información respectiva al objeto que está investigando. Si hace click sobre alguna entidad, se lanzará la vista 2D que será el detalle del objeto con el que se ha interactuado. En caso de ser un planeta o luna, se mostrará toda la información respectiva a espacios de construcción, recursos, etc, en formato "mapa".

**Backend:** En el lado del servidor usaré ExpressJS y NodeJS para crear toda la infraestructura, además de desarrollar la API de conexión entre usuario y base de datos. El backend debe encargarse de validar los datos (si existe alguno) de las peticiones de los usuarios previo a realizar ningún paso. Si no se cumplen las validaciones debe retornar un error de validación inmediatamente, si se cumplen, debe seguir con el flujo normal de la petición.
También debe incluir todo el sistema de manejo de errores para que el servidor no caiga en ningún momento y pueda manejar excepciones inesperadas. Si todo funciona correctamente en la petición, el servidor será el puente de conexión entre el usuario y su petición y la base de datos, encargándose de realizar las "queries" pertinentes y devolver la información al cliente.

**Base de datos:** Para la base de datos he optado por un modelo no relacional como MongoDB, usándolo mediante su dependencia mongoose para NodeJS. La base de datos se encarga de todas las operaciones de lectura y escritura de datos registrados mediante peticiones que vienen del backend. La estructura de la base de datos es la típica de MongoDB, separada por documentos que representan entidades lógicas dentro del proyecto como usuarios, estrellas, sistemas, planetas, naves, etc.

## Instalación y configuración:

Para poder reproducir el proyecto en tu entorno local necesitarás las siguientes tecnologías instaladas en tu ordenador:

- NodeJS v18.18.2+
- MongoDB service
- npm v9.2.0+

Pasos una vez instaladas las tecnologías:

- Lanza el script "npm run install" en ambos directorios del proyecto (cliente y servidor). Esto instalará las dependencias de ambos ámbitos.
- Prueba que todo funcione correctamente abriendo dos terminales en tu IDE. Lanza el script "npm run dev" en cada una estando dentro del directorio correspondiente y observa si la salida por consola es correcta.
- En la carpeta /server/src/procedurals/routes/procedural.routes.ts encontrarás la ruta storeProceduralToDatabase y en ella la ejecución del proceso principal del procedural. Aquí podrás elegir el nombre de la galaxia y el número de sistemas a generar (por defecto "Milky Way" y 2.000 respectivamente).
- En el navegador visita la ruta [http://localhost:8080/storeProcedural](http://localhost:8080/storeProcedural) y espera a que el proceso termine por completo.
- En el navegador visita la ruta [http://localhost:3000/](http://localhost:3000/) y espera a que el contenido se cargue. Verás la escena 3D de la galaxia que has creado.
- Si quieres replicar el proceso en el mismo entorno local, en el archivo .env de la carpeta server cambia la variable de entorno DB_URI por el valor que quieras y repite el proceso de visitar las rutas, asegúrate de reiniciar el servidor después de cambiar el valor de la variable de entorno para que los cambios surjan efecto.

## Funcionalidades principales:

Las siguientes imágenes muestran algunos puntos clave del proyecto y el estado en que se encuentran los diferentes procesos de desarrollo dentro de ellos.

### Frontend

![Estado frontend](/img/frontend-status.jpg)

Nótese que algunos puntos clave como el consumo de la API del backend o la interactividad del usuario se dan por sobreentendidas y en progreso constante.

### Backend

![Estado backend](/img/backend-status.jpg)

### Base de datos

![Estado base de datos](/img/database-status.jpg)

## Estructura del proyecto:

Por motivos de escalabilidad y modularización he dividido el proyecto en sub directorios que representan cada entidad lógica de la aplicación. Estas pueden ser usuarios, procedurales, naves, edificios, etc.
Cada módulo contiene a su vez varias sus carpetas que contienen las diferentes partes del desarrollo de esa entidad. Todos los módulos tienen las mismas carpetas pero el contenido de los archivos es totalmente diferente, ya que se destina a ese módulo en sí. Las carpetas se dividen en funcionalidades como pueden ser el modelo de la base de datos pertinente, el controlador que se encarga de ejecutar la lógica en caso del lado servidor o la carpeta de tests para testear las funcionalidades del módulo.

## Contribuciones futuras:

La lista en este punto comparada con lo que hay desarrollado hasta ahora es infinita. El proyecto ahora mismo es un representador de simulaciones de galaxias creadas mediante funciones procedurales pero el objetivo final es que sea un juego totalmente disfrutable por los usuarios y que, además, incluye funciones a tiempo real para una mejor experiencia de los usuarios, por lo tanto, es difícil listar todos los puntos que quedan por desarrollar aún.
