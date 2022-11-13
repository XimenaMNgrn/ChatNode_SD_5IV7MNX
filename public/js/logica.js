const PORT = process.env.PORT || 8000;
// https://chatnode-ximena.herokuapp.com/
var socket = io.connect(`http://208.39.138.12:{PORT}`);

var list = document.querySelector(`#not`)
let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let salida = document.getElementById('salida');
let notificaciones = document.getElementById('notificaciones');
let boton = document.getElementById('enviar');

var clientes = [];

boton.addEventListener('click', function () {
  var data = {
    mensaje: mensaje.value,
    usuario: usuario.value,
  };

  if(mensaje.value === '' | usuario.value === ''){
    alert("El mensaje y el usuario son requeridos");
  }else{
    mensaje.value = "";
    socket.emit('chat:mensaje', data);
  }
});

mensaje.addEventListener('keydown', function(){
  socket.emit('chat:escribiendo', usuario.value);
});

socket.on('chat:mensaje', function(data){
  salida.innerHTML += `<b>` + data.usuario + `</b>: ` + data.mensaje + `<br>`
  avisos.innerHTML = ""
  mensaje.focus()
});

socket.on('chat:escribiendo', function(data){
  avisos.innerHTML = `<p><em>` + data + `</em> esta escribiendo ... </p>`
});


socket.on('conectado', function (data) {
  console.log(data);
  
  clientes.push(data);
  document.querySelector('#notificaciones').innerHTML = JSON.stringify(clientes);
});

socket.on('desconectado', function (data) {
  console.log(data);
  
  clientes.push(data);
  document.querySelector('#notificaciones').innerHTML = JSON.stringify(clientes);
});
