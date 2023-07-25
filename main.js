let carrito = [];
const milisegundosPorDIa = 86400000;

const listaProductos = document.getElementById("lista-productos");

class Prenda {
  constructor(id, nombre, precio, talle) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.talle = talle;
  }

  setTalle(talle) {
    this.talle = talle;
  }

  setFechaCompra() {
    this.fechaDeCompra = new Date();
  }

  getIva() {
    return this.precio * 1.27;
  }

  getFechaDevolucion() {
    const fechaDevolucion = new Date(
      this.fechaDeCompra.getTime() + 30 * milisegundosPorDIa
    );
    return fechaDevolucion.toDateString();
  }
}

const agregarPrenda = (prenda) => {
  if (prenda.talle === "Sin talle") {
    alert("Seleccione el talle para agregar al carrito");
  } else {
    carrito.push(
      new Prenda(prenda.id, prenda.nombre, prenda.precio, prenda.talle)
    );
    alert(`Se agregó al carrito ${prenda.nombre} talle ${prenda.talle}`);
    console.log(carrito);
    actualizarListaProductos();
    actualizarPrecioFinal();
    guardarCarritoEnLocalStorage();
  }
};

const guardarCarritoEnLocalStorage = () => {
  // Guardar el carrito en el localStorage convirtiéndolo a una cadena de texto
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const actualizarListaProductos = () => {
  listaProductos.innerHTML = "";
  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - Talle: ${producto.talle} - Precio: $${producto.precio}`;
    listaProductos.appendChild(li);
  });
};

const actualizarPrecioFinal = () => {
  const precioFinal = carrito.reduce(
    (total, producto) => total + producto.getIva(),
    0
  );
  const precioFinalElement = document.getElementById("precio-final");
  if (precioFinalElement) {
    precioFinalElement.textContent = `Precio final con IVA: $${precioFinal}`;
  } else {
    const nuevoPrecioFinalElement = document.createElement("li");
    nuevoPrecioFinalElement.id = "precio-final";
    nuevoPrecioFinalElement.textContent = `Precio final con IVA: $${precioFinal}`;
    listaProductos.appendChild(nuevoPrecioFinalElement);
  }
};

const eliminarUltimoProducto = () => {
  if (carrito.length > 0) {
    carrito.pop();
    actualizarListaProductos();
    actualizarPrecioFinal();
    guardarCarritoEnLocalStorage();
  }
};

// Obtener el carrito almacenado en el localStorage (si existe)
const carritoGuardado = localStorage.getItem("carrito");

// Si hay un carrito almacenado, cárgalo en la variable carrito
if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);
}
// Remera blanca
const remeraBlanca = new Prenda(1, "Remera Blanca", 5000, "Sin talle");

const selectTalleRemeraBlanca = document.getElementById("talle-remera-blanca");
selectTalleRemeraBlanca.addEventListener("change", function () {
  const talleSeleccionado = selectTalleRemeraBlanca.value;
  remeraBlanca.setTalle(talleSeleccionado);
});

const agregarRemeraBlanca = document.getElementById("agregar-remera-blanca");
agregarRemeraBlanca.onclick = function () {
  agregarPrenda(remeraBlanca);
};

// Remera negra
const remeraNegra = new Prenda(2, "Remera Negra", 4000, "Sin talle");

const selectTalleRemeraNegra = document.getElementById("talle-remera-negra");
selectTalleRemeraNegra.addEventListener("change", function () {
  const talleSeleccionado = selectTalleRemeraNegra.value;
  remeraNegra.setTalle(talleSeleccionado);
});

const agregarRemeraNegra = document.getElementById("agregar-remera-negra");
agregarRemeraNegra.onclick = function () {
  agregarPrenda(remeraNegra);
};

// Remera roja
const remeraRoja = new Prenda(3, "Remera Roja", 3500, "Sin talle");

const selectTalleRemeraRoja = document.getElementById("talle-remera-roja");
selectTalleRemeraRoja.addEventListener("change", function () {
  const talleSeleccionado = selectTalleRemeraRoja.value;
  remeraRoja.setTalle(talleSeleccionado);
});

const agregarRemeraRoja = document.getElementById("agregar-remera-roja");
agregarRemeraRoja.onclick = function () {
  agregarPrenda(remeraRoja);
};

// Eliminar último
const btnEliminar = document.getElementById("eliminar-ultimo");
btnEliminar.onclick = function () {
  eliminarUltimoProducto();
};

// Finalizar compra

const finalizarCompra = document.getElementById("finalizar-compra");
finalizarCompra.onclick = function () {
  let nombre = prompt("Ingrese su nombre");
  let domicilio = prompt("Ingrese su domicilio");
  carrito[0].setFechaCompra();
  alert(
    `Gracias por comprar con nosotros ${nombre}. Usted recibirá su compra en ${domicilio} en los siguientes 30 días. Recuerde que puede devolver el producto hasta ${carrito[0].getFechaDevolucion()}.`
  );
};
