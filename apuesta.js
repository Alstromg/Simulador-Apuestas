//simulador de apuestas 

let saldoConsola = 500; 
let nombre = prompt("Hola ¿Como te llamas?")
let saldoInicial = parseInt(prompt(nombre + "Cuanto deseas recargar"));
function numeroAletorio (){
    let numero = Math.floor(Math.random() * 3) + 1;
    return numero;
} 
alert( nombre + " el saldo de la consola es " + saldoConsola + " ya puedes jugar")
while(saldoConsola > 0 && saldoInicial > 0 ) {
let apuesta = parseFloat(prompt(nombre + " tienes un saldo de " +  saldoInicial + "  ¿cual es tu apuesta?"))
if (apuesta <= saldoInicial && apuesta <= saldoConsola){
    let numeroAzar = parseFloat(prompt(nombre + " elige un numero de 1 a 3"))
    if (numeroAzar <= 3 && numeroAzar >= 1){
        if (numeroAzar == numeroAletorio()){
            saldoConsola = saldoConsola + apuesta ; 
            saldoInicial = saldoInicial - apuesta; 
            alert("Perdite " + nombre + " tu nuevo sueldo es de " + saldoInicial)
        }
        else{
            saldoInicial = saldoInicial + apuesta ;
            saldoConsola = saldoConsola - apuesta;
            alert("Ganaste " + nombre + " tu nuevo sueldo es de " + saldoInicial)      
        }
    } else{
        alert("Tu numero debe estar entre 1 y 3")
    }
}
else{
    alert ("No tienes o no tiene la consola suficiente saldo para esta apuesta Saldo Consola: " + saldoConsola +" Tu saldo " + saldoInicial )
}
}
if (saldoInicial > saldoConsola){
alert("Le ganaste a la consola felicidades")
} 
else {
    alert("Perdiste Vuelve a intentar")
}