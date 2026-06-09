function buscarProducto(idProducto) {
    return catalogo.find(p => p.id === idProducto);
}
function obtenerProductosBaratos(precioMax) {
    return catalogo.filter(p => p.precio <= precioMax);
}
function obtenerProductosCaros(precioMin) {
    return catalogo.filter(p => p.precio >= precioMin);
}
function obtenerPorCategoria(categoria) {
    return catalogo.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
}
function prepararPedido(opcionSimulacion) {
    return new Promise((resolve, reject) => {
        if (opcionSimulacion === 1) {
            resolve("Cafe preparado con exito");
        } else if (opcionSimulacion === 2) {
            reject("error en cocina");
        } else if (opcionSimulacion === 3) {
            reject("falta ingrediente");
        } else {
            reject("opcion invalida");
        }
    });
}