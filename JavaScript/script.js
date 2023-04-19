
const jugadores = [
    {
      id: 1,
      nombre: "Andres",
      edad: 25,
      dificultad: 3,
      descripcion: "Andres es nuevo en esto de las apuestas, pero no te confies",
      ganancia: 0.5,
      imagen:"./img/andres.jpeg"
    },
    {
      id: 2,  
      nombre: "Camila",
      edad: 40,
      dificultad: 5,
      descripcion: "Camila juega por diversion aun asi no sera facil ganarle",
      ganancia: 1,
      imagen:"./img/camila.jpg"
    },
    {
        id: 3,  
      nombre: "Felipe",
      edad: 31,
      dificultad: 7,
      descripcion: "Felipe lleva un tiempo en las apuestas conocido por tener algo de suerte, Cuidado de desfalca",
      ganancia: 1.5,
      imagen:"./img/felipe.jpg"
    },
  ];
  
  let cajas = document.getElementById('bots');
  function eleccionPersonaje (){
  for (const jugador of jugadores) {
    let carta = document.createElement('div');
    carta.className = 'card';
    carta.innerHTML = `
      <div class="card">
        <img src=${jugador.imagen} class="card-img-top" alt="jugador">
        <div class="card-body">
          <h5>${jugador.nombre}</h5>
          <p>dificultad ${jugador.dificultad}</p>
          <p>edad ${jugador.edad}</p>
          <p>${jugador.descripcion}</p>
          <p>Ganas el ${jugador.ganancia}</p>
          <button href="" class="botonS" id="botonS${jugador.id}">Seleccionar </button>
        </div>
      </div>
    `;
    cajas.appendChild(carta);
  }

  jugadores.forEach((jugador)=>{
    document.getElementById(`botonS${jugador.id}`).addEventListener(`click`,()=>{
        personajeSelccionado(jugador);
    });
  });
  };
  
eleccionPersonaje();
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
  alert("Seleccionaste a = " + JSON.stringify(seleccionado, function (img,valor){
    if(img === "imagen" ){
      return undefined;
    }
    return valor;
  }, ","))
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
function botonApostar(){
if ( saldo>0){
  if(saldo > apuestaRealizada && numeroAletorioJugador > 0 && seleccionado.dificultad >= numeroAletorioJugador  ){
    if(numeroAletorioJugador === numeroAletorio(seleccionado.dificultad)){
      saldo += apuestaRealizada*seleccionado.ganancia
      localStorage.setItem('saldo', saldo);
      saldoActual.innerHTML =  `<p> Saldo <br> ${saldo} <p>`

    }else {
      saldo -= apuestaRealizada
      localStorage.setItem('saldo', saldo);
      saldoActual.innerHTML =  `<p> Saldo <br> ${saldo} <p>`
    }
  }
  else{
    alert("2Saldo Insuficiente o numero elegido fuera de los parametros")
  }  
}
else{
  alert("1Saldo Insuficiente o numero elegido fuera de los parametros")
}
}
function botonDeApostar (){
  apostando()
  numeroJugador()
  botonApostar()
}
