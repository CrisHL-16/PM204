function agregarPedido(idProducto) {
    const producto = buscarProducto(idProducto);
    if (producto) {
        listaPedidos.push(producto);
        return true;
    }
    return false;
}

function calcularTotal() {
    const subtotal = listaPedidos.reduce((acumulador, { precio }) => acumulador + precio, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    
    return { subtotal, iva, total };
}