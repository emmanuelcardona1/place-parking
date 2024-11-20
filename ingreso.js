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
    let horaEntrada = ingresos[index].horaEntrada;

    // Calcular la diferencia de tiempo en horas
    const tiempoTotalHoras = (horaSalida - horaEntrada) / (1000 * 60 * 60);

    if (tiempoTotalHoras <= 0) {
      alert("La fecha y hora de salida debe ser posterior a la de entrada.");
      return;
    }

    // Calcular el precio base
    const precioPorHora = 5000;
    let precioTotal = Math.ceil(tiempoTotalHoras) * precioPorHora;

    // Aplicar descuento si el tipo es "HÍBRIDO"
    if (ingresos[index].tipo === "HIBRIDO") {
      precioTotal *= 0.9; // Aplica un descuento del 10%
      Swal.fire({
        icon: "info",
        title: "Vehículo Híbrido",
        text: " Gracias por contribuir con el medio ambiente y se aplicó un descuento del 10% para el vehículo híbrido con placa " + placa,
      });
    }

    if (ingresos[index].tipo === "MOTO") {
      precioTotal *= 0.60 ; // Aplica un descuento del 10%
    
    }
    // Mostrar el precio total
    document.getElementById("total").innerText = "$" + precioTotal.toFixed(0);

    // Eliminar el objeto del array
    ingresos.splice(index, 1);
    console.log(ingresos);

    // Eliminar la fila correspondiente en la tabla
    let tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
    let filas = tabla.getElementsByTagName("tr");

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
    });
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



 
