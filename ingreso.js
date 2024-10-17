let ingreso = [];

function entrada() {
  let placa = document.getElementById("placa").value;
  let carro = document.getElementById("carro").value;
  let moto = document.getElementById("moto").value;
  let hibrido = document.getElementById("hibrido").value;
  let hora = new Date();
  let horaActual = hora.toLocaleTimeString();
  let datos = {
    placa: placa,
    carro: carro,
    moto: moto,
    hibrido: hibrido,
    hora: horaActual,
  };

  ingreso.push(datos);
  console.log(ingreso);
}
 



