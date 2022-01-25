const express = require('express');
const productosRouter = require('./routes');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productosRouter);
app.use('/static', express.static('public'))

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto 8080 http://localhost:${PORT}/api/productos`)
}).on('error', (err) => console.log(err))