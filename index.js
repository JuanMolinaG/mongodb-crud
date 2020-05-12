const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const SwaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// Import routes
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/posts');

dotenv.config();

// Connet to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    },
    (error) => {
        if (error) return console.log('error :>> ', error);

        console.log('DB connected!');
    }
);
// Middlewares
app.use(express.json());
// Route middlewares
app.use('/api/users', authRoutes);
app.use('/api/posts', productsRoutes);
app.use('/api/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server up and running'));
