require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/db');

const port = process.env.PORT || 3000;
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log('La aplicación está escuchando en el puerto 3000');
        });
    })
    .catch((err) => {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1);
    });
