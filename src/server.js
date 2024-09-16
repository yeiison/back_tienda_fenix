const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Importar dotenv
const app = express();

// Configurar dotenv
dotenv.config();
const port = process.env.PORT || 5000;
const conexionBd = process.env.MONGO_URI;

console.log('Conexión BD:', conexionBd);


// Middleware
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(conexionBd, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Schema y modelo de producto
const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number
});
const Producto = mongoose.model('product', productoSchema);

// Rutas
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
