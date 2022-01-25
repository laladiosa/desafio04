const fs = require('fs')
class Contenedor {
    constructor() {

    }
    save(producto) {
        producto.id = Date.now()
        const data = this.getAll()
        data.push(producto)
        try {
            fs.writeFileSync('productos.txt', JSON.stringify(data, null, 4))
            return producto.id
        } catch (error) {
            throw new Error('No pude guardar el producto')
        }
    }

    getById(id) {
        const data = this.getAll()
        return data.find(producto => producto.id === id) || null
    }
    getAll() {
        try {
            const data = fs.readFileSync('productos.txt', 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            throw new Error('No pude leer el archivo')
        }
    }
    deleteById(id) {
        const data = this.getAll()
        const deleted = data.filter(producto => producto.id !== id)
        try {
            fs.writeFileSync('productos.txt', JSON.stringify(deleted, null, 4))
        } catch (error) {
            throw new Error('No pude eliminar el producto')
        }
    }
    update(id, body) {
        const data = this.getAll()
        const producto = data.find(producto => producto.id === id)
        if (producto) {
            data.forEach(element => {
                if (element.id === id) {
                    element.price = body.price
                    element.thumbnail = body.thumbnail
                    element.title = body.title
                }
            })
            try {
                fs.writeFileSync('productos.txt', JSON.stringify(data, null, 4))
                return producto
            } catch (error) {
                throw new Error('No se pudo actualizar el producto')
            }
        } else {
            return false
        }
    }
    deleteAll() {
        const data = []
        try {
            fs.writeFileSync('productos.txt', JSON.stringify(data, null, 4))
        } catch (error) {
            throw new Error('No pude eliminar el producto')
        }
    }
    getRandom() {
        const data = this.getAll()
        return data[Math.floor(Math.random() * data.length)]
    }
}
module.exports = Contenedor