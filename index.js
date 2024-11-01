function ingresar() {
  let usuario = document.getElementById("usuario").value;
  let contraseña = document.getElementById("contraseña").value;
  let verificacionusuario1 = "admin1";
  let verificacioncontraseña1 = "123456";
  let verificacionusuario2 = "admin";
  let verificacioncontraseña2 = "admin1234";

  // Verificación de usuario y contraseña
  if (
    (usuario === verificacionusuario1 &&
      contraseña === verificacioncontraseña1) ||
    (usuario === verificacionusuario2 && contraseña === verificacioncontraseña2)
  ) {
    // Redirige a otra página si las credenciales son correctas
    window.location.href = "./ingreso.html";
  } else {
    // Muestra alerta si las credenciales son incorrectas
    
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:"Usuario o contraseña inválidos"
    })
  }
}
