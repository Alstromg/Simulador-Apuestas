let cajas = document.getElementById('bots');
let carta;

function obtenerJugadores() {
  const jugadorJson = "../json/jugadores.json";
  fetch(jugadorJson)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      let botjugadores = datos.jugadores;
      botjugadores.forEach((bot) => { 
        carta = document.createElement('div');
        carta.className = 'card';
        carta.innerHTML += `
          <div class="card">
            <img src=${bot.imagen} class="card-img-top" alt="jugador">
            <div class="card-body">
              <h5>${bot.nombre}</h5>
              <p>dificultad ${bot.dificultad}</p>
              <p>edad ${bot.edad}</p>
              <p>${bot.descripcion}</p>
              <p>Ganas el ${bot.ganancia}</p>
              <button href="" class="botonS" id="botonS${bot.id}">Seleccionar </button>
            </div>
          </div>
        `;
        cajas.appendChild(carta);
      })
      botjugadores.forEach((jugador) => {
        document.getElementById(`botonS${jugador.id}`).addEventListener(`click`, () => {
          personajeSeleccionado(jugador);
        });
      });
    })
} 
 console.log(obtenerJugadores());
let seleccionado = null;
let cartaB = document.getElementById("cartaBot")
function personajeSelccionado(eleccion){
    seleccionado = eleccion;
    cartaB.innerHTML = `
    <div class ="cartaBot">
    <img src=${seleccionado.imagen} class="card-img-top" alt="jugador">    
        <h5>${seleccionado.nombre}</h5>
          <p>dificultad ${seleccionado.dificultad}</p>
          <p>edad ${seleccionado.edad}</p>
          <p>${seleccionado.descripcion}</p>
          <p>Ganas el ${seleccionado.ganancia}</p><button id="jugar" clas="" onclick="apostarSeccion()">Jugar</button></div>
          
    `
}

window.addEventListener('load', function() {
  if (localStorage.getItem('saldo')) {
    saldo = Number(localStorage.getItem('saldo'));
  } else {
    saldo = 0;
  }
  saldoActual.innerHTML = `<p> Saldo <br> ${saldo} <p>`;
});

let saldoActual = document.getElementById("saldoActual");

function sumar() {
  let monto = Number(document.getElementById("monto").value);
  saldo += monto;
  localStorage.setItem('saldo', saldo);
  saldoActual.innerHTML = `<p> Saldo <br> ${saldo} <p>`
}

let apostar = document.getElementById("apuesta")

function apostarSeccion (){
  Swal.fire({
    title: '¡Vamos!',
    text: `Jugaras contra ${seleccionado.nombre}`,
    imageUrl: seleccionado.imagen,
    imageWidth: 300,
    imageHeight: 250,
    imageAlt: '',
  })
cajas.innerHTML = ``
apostar.innerHTML = `<h4>Si adivinas el numero en que piensas ${seleccionado.nombre} Ganadoras el ${seleccionado.ganancia} de tu apuesta</h3><form id="form-saldo">
<label for="valor">Apuesta Rey</label>
<br>
<input type="number" id="valorApuesta" name="valor">
<br>
<label for="valor">Elige un numero de 1 a ${seleccionado.dificultad}</label>
<br>
<input type="number" id="numeroAletorio" name="valor">
<br>
<button type="button" onclick="botonDeApostar()">Apostar</button>
</form>
<br>
<br>
`

}

let apuestaRealizada = 0;
let resulatados = document.getElementById("resultados") 
function apostando(){
  let valorApuesta = Number(document.getElementById("valorApuesta").value);
  apuestaRealizada = valorApuesta;
}
function numeroAletorio (dificultad){
  let numero = Math.floor(Math.random() * dificultad) + 1;
  return numero;
}
let numeroAletorioJugador = 0; 
function numeroJugador(){
  let valorApuesta = Number(document.getElementById("numeroAletorio").value);
  numeroAletorioJugador = valorApuesta;
}
let resultado = document.getElementById("resultado")
function botonApostar(){
  if(saldo >= apuestaRealizada && numeroAletorioJugador > 0 && seleccionado.dificultad >= numeroAletorioJugador  ){
    if(numeroAletorioJugador === numeroAletorio(seleccionado.dificultad)){
      saldo += apuestaRealizada*seleccionado.ganancia
      localStorage.setItem('saldo', saldo);
      saldoActual.innerHTML =  `<p> Saldo <br> ${saldo} <p>`
      resultado.innerHTML = ` <div> <h3>Ganaste $ ${apuestaRealizada*seleccionado.ganancia}</h3></div>
      `

    }else {
      saldo -= apuestaRealizada
      localStorage.setItem('saldo', saldo);
      saldoActual.innerHTML =  `<p> Saldo <br> ${saldo} <p>`
      resultado.innerHTML = ` <div> <h3>Perdiste $ ${apuestaRealizada}</h3></div>
      `
    }
  }
  else{
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Saldo o numero fuera de los parametros',
      showConfirmButton: false,
      timer: 1500
    })
  }  
}

function botonDeApostar (){
  apostando()
  numeroJugador()
  botonApostar()
}
