let ingresos = [];

function entrada() {
  let placa = document.getElementById("placaingreso").value;
  let tipo = document.getElementById("tipo").value;
  let hora = new Date(); // Guardamos la hora como objeto Date
  let datos = {
    placa: placa,
    tipo: tipo,
    horaEntrada: hora, // Guardamos la hora completa
  };

  ingresos.push(datos);
  console.log(ingresos);

  let tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
  let fila = tabla.insertRow();
  fila.setAttribute("data-placa", placa); // Se asigna un atributo para identificar la fila

  let celdaPlaca = fila.insertCell();
  let celdaTipo = fila.insertCell();
  let celdaHora = fila.insertCell();

  // Asignar los valores a las celdas
  celdaPlaca.textContent = datos.placa;
  celdaTipo.textContent = datos.tipo;
  celdaHora.textContent = datos.horaEntrada.toLocaleTimeString();
}

function salida() {
  let placa = document.getElementById("placasalida").value;
  let horaSalida = new Date();
  
  // Buscar el índice del objeto con la placa específica en el array
  let index = ingresos.findIndex((ingreso) => ingreso.placa === placa);
  if (index !== -1) {
    // Obtener la hora de entrada almacenada
    let horaEntrada = ingresos[index].horaEntrada;

    // Calcular la diferencia de tiempo en horas
    const tiempoTotalHoras = (horaSalida - horaEntrada) / (1000 * 60 * 60); // Diferencia en horas

    // Validar si la hora de salida es posterior a la de entrada
    if (tiempoTotalHoras <= 0) {
      alert("La fecha y hora de salida debe ser posterior a la de entrada.");
      return;
    }

    // Calcular el precio total
    const precioPorHora = 5000; // Precio por hora en COP
    const precioTotal = Math.ceil(tiempoTotalHoras) * precioPorHora; // Redondear hacia arriba

    // Mostrar el precio total en un elemento adecuado

    document.getElementById("total").innerText = "$" + precioTotal;

    // Eliminar el objeto del array basado en el índice encontrado    
    ingresos.splice(index, 1);
    console.log(ingresos);

    // Eliminar la fila correspondiente en la tabla
    let tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
    let filas = tabla.getElementsByTagName("tr");

    // Recorrer las filas de la tabla y eliminar la fila que tenga el atributo data-placa igual a la placa ingresada
    for (let i = 0; i < filas.length; i++) {
      if (filas[i].getAttribute("data-placa") === placa) {
        tabla.deleteRow(i);
        break;
      }
    }
  } else {
    
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Placa no encontrada en los registros",
      footer: '<a href="#">Why do I have this issue?</a>'
    })
  }
}
