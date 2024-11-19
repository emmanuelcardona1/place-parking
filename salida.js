function calcularPrecio() {
  const fechaEntrada = new Date(
    document.getElementById("fecha_entrada").value +
      "T" +
      document.getElementById("hora_entrada").value
  );
  const fechaSalida = new Date(
    document.getElementById("fecha_salida").value +
      "T" +
      document.getElementById("hora_salida").value
  );

  if (!fechaEntrada || !fechaSalida) {
    alert("Por favor ingresa la fecha y hora de entrada y salida.");
    return;
  }

  const tiempoTotalHoras = (fechaSalida - fechaEntrada) / (1000 * 60 * 60); // Diferencia en horas
  if (tiempoTotalHoras <= 0) {
    alert("La fecha y hora de salida debe ser posterior a la de entrada.");
    return;
  }

  const precioPorHora = 5000; // Precio por hora en COP
  const precioTotal = Math.ceil(tiempoTotalHoras) * precioPorHora; // Redondear hacia arriba

  document.getElementById("precio_total").value = precioTotal.toLocaleString(
    "es-CO",
    { style: "currency", currency: "COP" }
  );
}

