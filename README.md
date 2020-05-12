# Basic MongoDB CRUD

NodeJs API with a basic CRUD to MongoDB and user registration/authentication.

Published on: May 11, 2020.

## Installation

Clone the repo and cd into the folder:

```bash
git clone https://github.com/JuanMolinaG/mongodb-crud.git
cd mongodb-crud
```

Install the dependencies:

```bash
npm install
```

Next create an environment variable called DB_CONNECT with the MongoDB connection URI and another environment varible called TOKEN_SECRET with the secret string to use to sign the JWT token. This environment variables can be created using [dotenv](https://www.npmjs.com/package/dotenv) module.

## Start and Watch

```bash
npm start
```

After start the server go to http://your-domain/api/docs to see the API documentation

## Language and Tools

-   [NodeJs](https://nodejs.org/)
-   [JWT](https://jwt.io/) - Auth web tokens
-   [MongoDB](https://www.mongodb.com/) - Database
-   [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables
-   [bcrypt](https://www.npmjs.com/package/dotenv) - Passwords encrypt
-   [@hapi/joi](https://www.npmjs.com/package/@hapi/joi) - Data validation
-   [Express](https://expressjs.com/) - API routing
-   [Mongoose](https://mongoosejs.com/) - MongoDB ODM
-   [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) - API documentation

## Wish list

-   Implement unit testing
-   Deploy in functional server

## Credits

This is a learning proyect based on:

-   [Build A Restful Api With Node.js Express & MongoDB | Rest Api Tutorial](https://www.youtube.com/watch?v=vjf774RKrLc)
-   [Build A Node.js API Authentication With JWT Tutorial](https://www.youtube.com/watch?v=2jqok-WgelI)

## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
