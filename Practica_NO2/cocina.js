
const catalogo = [];

function crearProducto(id, nombre, precio) {
    catalogo.push({ id: id, nombre: nombre, precio: precio });
}

function actualizarPrecio(idProducto, nuevoPrecio) {
    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].id === idProducto) {
            catalogo[i].precio = nuevoPrecio;
        }
    }
}