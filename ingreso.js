let ingresos = [];

function entrada() {
  let placa = document.getElementById("placa").value;
  let tipo = document.getElementById("tipo").value;
  let hora = new Date();
  let horaActual = hora.toLocaleTimeString();
  let datos = {
    placa: placa,
    tipo:tipo,
    hora: horaActual,
  };

  ingresos.push(datos);
  console.log(ingresos);

  let  tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
  let fila = tabla.insertRow();
  let celdaPlaca = fila.insertCell();
  let celdaTipo = fila.insertCell();
  let celdaHora = fila.insertCell();

  // Asignar los valores a las celdas
  celdaPlaca.textContent = datos.placa;
  celdaTipo.textContent = datos.tipo;
  celdaHora.textContent = datos.hora;

}
 



