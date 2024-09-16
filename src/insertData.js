const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/ProductModel');

// Configurar variables de entorno
dotenv.config();

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conectado a MongoDB');
})
.catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
});

// Crear un nuevo producto
const newProduct = new Product({
    nombre: 'Producto de prueba3',
    precio: 20000,
    color: 'Negro',
    talla: 'L',
    descripcion: 'Descripcion de prueba',
    categoria: 'Camisas',
    stock: 50
});

// Guardar el producto en la base de datos
newProduct.save()
    .then(() => {
        console.log('Producto creado exitosamente');
        mongoose.connection.close(); // Cerrar la conexión una vez insertado el producto
    })
    .catch((err) => {
        console.error('Error al crear el producto:', err);
        mongoose.connection.close(); // Cerrar la conexión en caso de error
    });
