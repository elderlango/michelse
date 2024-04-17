require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/db');

connectDB()
    .then(() => {
        app.listen( '44.226.145.213', () => {
            console.log('La aplicación está escuchando en el puerto gs');
        });
    })
    .catch((err) => {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1);
    });
