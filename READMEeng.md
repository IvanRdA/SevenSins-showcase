# Seven Sins - real-time space strategy game

## Overview:

The complete project is a real-time strategy game based on the colonization and expansion of civilizations in a simulated outer space. Each galaxy represents a "subserver" within the project's structure, and each galaxy can accommodate up to 10,000 star systems, enough for a reasonable number of potential players.

To complete the entire project, I will need to use a full stack of technologies as I will be developing the entire server and API, as well as all the client-side service. For this, I have chosen the MERN stack, composed of MongoDB for the database, ExpressJS and NodeJS for the main server structure and instance, and React for all client-side development. Additionally, on the server side, dependencies such as Socket.io for handling real-time experience, TypeScript due to the project's scale, and Jest for all application testing are added.
On the client side, dependencies will be NextJS as a React framework, also Socket.io for handling real-time usage, TailwindCSS as a CSS framework, and ThreeJS and its add-ons for three-dimensional representations of scenes.

**The .ENV FILES OF THE ENVIRONMENT VARIABLES HAVE BEEN ADDED TO THE REPOSITORY BECAUSE THIS IS JUST A SHOWCASE OF THE PROJECT AND TO FACILITATE ITS REPRODUCTION IN A LOCAL STATE.**

**TYPESCRIPT WILL THROW SEVERAL TYPING WARNINGS THAT I HAVE NOT YET CORRECTED DUE TO PRIORITY REASONS BUT THEY DO NOT AFFECT THE APPLICATION TESTING.**

## Project Architecture:

![Flow diagram](/img/flow-diagram.jpg)

**Frontend:** On the client side, I will use NextJS as a React framework since it implements many useful and necessary functionalities in the project, such as internal routing, server-side rendering of components (very useful especially for simulation views, which handle a large volume of data). Additionally, I will use TailwindCSS for styles and ThreeJS for the actual scenes of the simulations.
The user interface will include everything classic in games of this style: resource status bars, detailed information panels of entities owned by the player, detailed fleet views, ships, crews, etc., a shop section where game products such as better ships, crew members, resources, etc., can be acquired, and more panels of the style. Additionally, the app will include 2 3D simulation views and 1 2D. The 3D views are the galaxy view (the only one implemented so far), which will allow the user to see the view of all the systems in their galaxy (subserver) and interact with the different objects in the view. By clicking on a specific one, the second 3D view will be launched: the system view. In it, the user will see the star(s) of the system in the center and the different planets, moons, and asteroids orbiting around (as in the typical image of the solar system where the planets orbit around the sun). By interacting with the different objects in the scene, the user will receive information tooltips respective to the object being investigated. If they click on any entity, the 2D view will be launched, which will be the detail of the object with which they have interacted. In the case of a planet or moon, all the respective information on construction spaces, resources, etc., will be shown in "map" format.

**Backend:** On the server side, I will use ExpressJS and NodeJS to create the entire infrastructure, as well as to develop the API for connection between user and database. The backend must validate the data (if any) of the user's requests prior to taking any steps. If the validations are not met, it must return a validation error immediately, if they are met, it must continue with the normal flow of the request.
It must also include the entire error handling system so that the server does not crash at any time and can handle unexpected exceptions. If everything works correctly in the request, the server will be the connection bridge between the user and their request and the database, responsible for making the relevant "queries" and returning the information to the client.

**Database:** For the database, I have opted for a non-relational model like MongoDB, using it through its mongoose dependency for NodeJS. The database handles all data read and write operations registered by requests coming from the backend. The database structure is typical of MongoDB, separated by documents representing logical entities within the project such as users, stars, systems, planets, ships, etc.

## Installation and Configuration:

To reproduce the project in your local environment, you will need the following technologies installed on your computer:

- NodeJS v18.18.2+
- MongoDB service
- npm v9.2.0+

Steps once the technologies are installed:

- Run the "npm run install" script in both project directories (client and server). This will install the dependencies of both scopes.
- Test that everything works correctly by opening two terminals in your IDE. Run the "npm run dev" script in each one being inside the corresponding directory and observe if the console output is correct.
- In the /server/src/procedurals/routes/procedural.routes.ts folder, you will find the storeProceduralToDatabase route and in it the execution of the main procedural process. Here you can choose the name of the galaxy and the number of systems to generate (by default "Milky Way" and 2,000 respectively).
- In the browser, visit the route http://localhost:8080/storeProcedural and wait for the process to complete.
- In the browser, visit the route http://localhost:3000/ and wait for the content to load. You will see the 3D scene of the galaxy you have created.
- If you want to replicate the process in the same local environment, in the .env file of the server folder, change the DB_URI environment variable to the value you want and repeat the process of visiting the routes, make sure to restart the server after changing the value of the environment variable so that the changes take effect.

## Main Features:

The following images show some key points of the project and the status of the different development processes within them.

### Frontend

![Frontend status](/img/frontend-status.jpg)

Note that some key points such as consuming the backend API or user interactivity are taken for granted and in constant progress.

### Backend

![Backend status](/img/backend-status.jpg)

### Database

![Database status](/img/database-status.jpg)

## Project Structure:

For scalability and modularization reasons, I have divided the project into subdirectories that represent each logical entity of the application. These can be users, procedurals, ships, buildings, etc.
Each module contains in turn several folders containing the different parts of the development of that entity. All modules have the same folders but the content of the files is totally different, since it is destined for that module itself. The folders are divided into functionalities such as the relevant database model, the controller that is responsible for executing the logic in case of the server side, or the tests folder to test the module's functionalities.

## Future Contributions:

The list at this point compared to what is developed so far is infinite. The project right now is a representator of galaxy simulations created through procedural functions but the ultimate goal is for it to be a fully enjoyable game for users and also
