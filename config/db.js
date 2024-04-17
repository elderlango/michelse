const mongoose = require('mongoose');

// Asegúrate de que esta es la cadena de conexión correcta para tu base de datos MongoDB Atlas
const MONGO_URL = 'mongodb+srv://admino:CUN36bhC4cT51KMo@cluster0.lqz26qo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Conectado a MongoDB Atlas");
    } catch (err) {
        console.error(err);
        throw err; 
    }
};

module.exports = { connectDB };
