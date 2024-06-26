require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/db');

connectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log('La aplicación está escuchando en el puerto 3000');
        });
    })
    .catch((err) => {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1);
    });
