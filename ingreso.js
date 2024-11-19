let ingresos = [];

function entrada() {
  let placa = document.getElementById("placaingreso").value.toUpperCase();
  let tipo = document.getElementById("tipo").value.toUpperCase();
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
  let placa = document.getElementById("placasalida").value.toUpperCase();
  let horaSalida = new Date();
  
  // Buscar el índice del objeto con la placa específica en el array
  let index = ingresos.findIndex((ingreso) => ingreso.placa === placa);
  if (index !== -1) {
    ingresos[index].horaSalida = horaSalida;
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

function imprimirSalida() {
  let placa = document.getElementById("placasalida").value.toUpperCase();
  let valor = document.getElementById("total").innerText;

  if (!placa || !valor) {
      Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor complete los datos de la salida antes de imprimir."
      });
      return;
  }

  const ventanaImpresion = window.open('', '_blank');
  ventanaImpresion.document.open();
  ventanaImpresion.document.write(`
      <html>
      <head>
          <title>Información de Salida</title>
          <style>
              body {
                  font-family: 'Montserrat', sans-serif;
                  text-align: center;
                  margin: 20px;
              }
              h1 {
                  color: #AF6543;
              }
              p {
                  font-size: 18px;
              }
          </style>
      </head>
      <body>
          <h1>Información de Salida</h1>
          <p><strong>Placa del Vehículo:</strong> ${placa}</p>
          <p><strong>Valor a Pagar:</strong> ${valor}</p>
          <p>¡Gracias por utilizar nuestro servicio!</p>
      </body>
      </html>
  `);
  ventanaImpresion.document.close();
  ventanaImpresion.print();
}
function calcularReporteDiario() {
  const ahora = new Date();
  const fechaActual = ahora.toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
  let totalGanancias = 0;
  let reportes = [];

  // Agrupar los ingresos que tienen salidas registradas para el día actual
  ingresos.forEach((ingreso) => {
      if (ingreso.horaSalida) {
          const fechaSalida = ingreso.horaSalida.toISOString().split('T')[0];
          if (fechaSalida === fechaActual) {
              const tiempoHoras = (ingreso.horaSalida - ingreso.horaEntrada) / (1000 * 60 * 60);
              const precioPorHora = 5000; // Precio por hora
              const precioTotal = Math.ceil(tiempoHoras) * precioPorHora;

              totalGanancias += precioTotal;

              reportes.push({
                  idTicket: ingreso.idTicket,
                  placa: ingreso.placa,
                  tipo: ingreso.tipo,
                  horaEntrada: ingreso.horaEntrada.toLocaleTimeString(),
                  horaSalida: ingreso.horaSalida.toLocaleTimeString(),
                  total: precioTotal,
              });
          }
      }
  });

  // Generar tabla para el reporte
  let contenidoTabla = `
      <table border="1" style="width: 100%; text-align: center;">
          <thead>
              <tr>
                  <th>ID Ticket</th>
                  <th>Placa</th>
                  <th>Tipo</th>
                  <th>Hora Entrada</th>
                  <th>Hora Salida</th>
                  <th>Total (COP)</th>
              </tr>
          </thead>
          <tbody>
  `;

  reportes.forEach((reporte) => {
      contenidoTabla += `
          <tr>
              <td>${reporte.idTicket}</td>
              <td>${reporte.placa}</td>
              <td>${reporte.tipo}</td>
              <td>${reporte.horaEntrada}</td>
              <td>${reporte.horaSalida}</td>
              <td>${reporte.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
          </tr>
      `;
  });

  contenidoTabla += `
          </tbody>
          <tfoot>
              <tr>
                  <td colspan="5" style="font-weight: bold;">Total Ganancias</td>
                  <td style="font-weight: bold;">${totalGanancias.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
              </tr>
          </tfoot>
      </table>
  `;

  // Mostrar el reporte en un modal
  const modal = document.getElementById("modal-imprimir");
  modal.classList.remove("hidden");
  document.getElementById("contenido-impresion").innerHTML = contenidoTabla;
}

