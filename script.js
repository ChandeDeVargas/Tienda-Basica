const productos = [
    {
        id: 1,
        nombre: "Laptop",
        precio: 999.99,
        imagen: "./images/images.png"
    },
    {
        id: 2,
        nombre: "Smartphone",
        precio: 499.99,
        imagen: "./images/samsung.png"
    },
    {
        id: 3,
        nombre: "Auriculares",
        precio: 99.99,
        imagen: "./images/auriculares.png"
    },
    {
        id: 4,
        nombre: "Tablet",
        precio: 299.99,
        imagen: "./images/tablet.png"
    }
];

// Estado del carrito
let carrito = [];

// Función para mostrar productos
function mostrarProductos() {
    const productosContainer = document.querySelector('.productos');
    productosContainer.innerHTML = '';

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto';
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(productoElement);
    });
}

// Función para agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

// Función para eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';

    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrito-item';
        itemElement.innerHTML = `
            <span>${item.nombre} x${item.cantidad}</span>
            <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            <button class="eliminar" onclick="eliminarDelCarrito(${item.id})">×</button>
        `;
        carritoItems.appendChild(itemElement);
    });

    actualizarTotal();
}

// Función para actualizar el total
function actualizarTotal() {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Función para realizar la compra
function realizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('mensajeConfirmacion').style.display = 'block';
    
    // Limpiar el carrito
    carrito = [];
    actualizarCarrito();
}

// Función para cerrar el mensaje de confirmación
function cerrarMensaje() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('mensajeConfirmacion').style.display = 'none';
}

// Inicializar la tienda
mostrarProductos();