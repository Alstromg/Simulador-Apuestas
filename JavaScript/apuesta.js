//simulador de apuestas 

let saldoConsola = 500; 
let nombre = prompt("Hola ¿Como te llamas?")
let saldoInicial = parseInt(prompt(nombre + " Cuanto deseas recargar"));
let consolaJugador;
const jugadores = [
    {
      nombre: "Andres",
      edad: 25,
      dificultad: 3,
      descripccion:
        "Andres lleva un tiempo en las apuestas conocido por tener algo de suerte, Cuidado de desfalca",
      ganancia: 0.5,
    },
    {
      nombre: "Camila",
      edad: 40,
      dificultad: 5,
      descripccion:
        "Camila juega por diversion aun asi no sera facil ganarle",
      ganancia: 1,
    },
    {
      nombre: "Felipe",
      edad: 31,
      dificultad: 7,
      descripccion:
        "Felipe es nuevo en esto de las apuestas, pero no te confies",
      ganancia: 1.5,
    },
  ];
  function numeroAletorio (dificultad){
    let numero = Math.floor(Math.random() * dificultad) + 1;
    return numero;
}

  let decision = "no"
  while(decision === "no"){ 
    let decisionJugador = prompt("Con quien deseas Jugar Andres Camila o Felipe, Escribe uno de estos nombres para continuar" )
    let jugadorEncontrado = jugadores.find(jugador => jugador.nombre === decisionJugador);
    if(jugadorEncontrado){
        consolaJugador = jugadorEncontrado;
        decision = prompt(JSON.stringify(consolaJugador, null, ",") + "Deseas continuar con este personaje Si, no?")
    }
    else{
        alert("Elige un jugador valido, Jugador no encontrado")
    }  
} 
alert( nombre + " el saldo de la consola es " + saldoConsola + " ya puedes jugar")
while(saldoConsola > 0 && saldoInicial > 0 ) {
let apuesta = parseFloat(prompt(nombre + " tienes un saldo de " +  saldoInicial + "  ¿cual es tu apuesta?" ))
if (apuesta <= saldoInicial && apuesta <= saldoConsola){
    let numeroAzar = parseFloat(prompt(nombre + " elige un numero de 1 a " + consolaJugador.dificultad))
    if (numeroAzar <= consolaJugador.dificultad && numeroAzar >= 1){
        if (numeroAzar !== numeroAletorio(consolaJugador.dificultad)){
            saldoConsola = saldoConsola + apuesta ; 
            saldoInicial = saldoInicial - apuesta; 
            alert("Perdite " + nombre + " tu nuevo sueldo es de " + saldoInicial)
        }
        else{
            saldoInicial = saldoInicial + (apuesta * consolaJugador.ganancia) ;
            saldoConsola = saldoConsola - apuesta;
            alert("Ganaste " + nombre + " tu nuevo sueldo es de " + saldoInicial)      
        }
    } else{
        alert("Tu numero debe estar entre 1 y " + consolaJugador.dificultad)
    }
}
else{
    alert ("No tienes o no tiene la consola suficiente saldo para esta apuesta Saldo Consola: " + saldoConsola +" Tu saldo " + saldoInicial )
}
}
if (saldoInicial > saldoConsola){
alert("Le ganaste a la consola felicidades con un saldo de " )
} 
else {
    alert("Perdiste Vuelve a intentar " )
}




