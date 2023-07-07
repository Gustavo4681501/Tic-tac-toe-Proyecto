
//<-------------------Validacion de variables------------------------------------------->
var celdas = document.querySelectorAll(".celda");
var cuentaVictoria = document.getElementById("cuentaVictoria");
var cuentaDerrota = document.getElementById("cuentaDerrota");
var iconoActual = document.getElementById("iconoActual");
console.log(celdas);
let simbolo = "⭐"
let simboloO = "🍄"
let jugadorActual = simbolo;
let contadorV = 0;
let contadorD = 0;
let gritoMario= document.createElement("audio");
gritoMario.src="src/audio/mario-scream Sound effect.mp3"
let UP= document.createElement("audio");
UP.src="src/audio/Super Mario Bros. 1-Up Sound Effect.mp3"


//<---------------Arreglo auxiliar para determinar que espacios esta en blanco------------------>
function arregloAuxiliar() {
    let arregloEspaciosVacios = []
    for (let i = 0; i < 9; i++) {
        if (celdas[i].textContent != simbolo && celdas[i].textContent != simboloO) {
            arregloEspaciosVacios.push(i)
        }
    }
    let aleat = Math.floor(Math.random() * arregloEspaciosVacios.length)
    return arregloEspaciosVacios[aleat];
}

//<------------------------------Validar victorias--------------------------------------------->
function validarVictorias(jugador) {
    gana = false;
    let combinacionVictorias = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let combi of combinacionVictorias) {
        if (celdas[combi[0]].textContent === jugador && celdas[combi[1]].textContent === jugador && celdas[combi[2]].textContent === jugador) {
            gana = true;
            break;
        }
    }
    return gana;
}

//<-------------------------------Validar el empate------------------------------------------>
function validarEmpate() {
    for (let i = 0; i < celdas.length; i++) {
        if (celdas[i].innerHTML == "") {
            return false;
        }
    }
    return true;
}

//<-------------------------------Funcion para vaciar todas la celdas-------------------------->
function celdasReset() {
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].innerHTML = "";
    }
}


//<-----------------------------Logica principal de programa y validaciones---------------------->
for (let i = 0; i < 9; i++) {
    celdas[i].addEventListener("click", function () {
        if (celdas[i].textContent == "" && !validarVictorias(simbolo) && !validarVictorias(simboloO) && simbolo==jugadorActual) {
            celdas[i].innerHTML = simbolo
            jugadorActual=simboloO;
            iconoActual.innerHTML=jugadorActual;
            if (validarVictorias(simbolo)) {
                UP.play();
                jugadorActual=simbolo;
                iconoActual.innerHTML=jugadorActual;
                Swal.fire({
                    title: 'Victoria!',
                    text: 'Felicidades has ganado',
                    imageUrl: 'src/imagenes/mario-victoria-gif.gif',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    background: 'none',
                    color: 'white',
                    confirmButtonColor: "#eb00006b",
                    confirmButtonText: "volver a jugar",
                })

                contadorV++;
                cuentaVictoria.textContent = contadorV;
            }else{
                setTimeout(() => {
                    if (!validarVictorias(simbolo) && !validarVictorias(simboloO) && !validarEmpate()) {
                        let valorJ2 = arregloAuxiliar()
                        jugadorActual=simbolo;
                        iconoActual.innerHTML=jugadorActual;
                        celdas[valorJ2].innerHTML = simboloO;

                    }
                    if (validarVictorias(simboloO)) {
                        gritoMario.play();
                        Swal.fire({
                            title: 'Derrota!',
                            text: 'Has perdido',
                            imageUrl: 'src/imagenes/marioCayendo.gif',
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                            background: 'none',
                            color: 'white',
                            confirmButtonColor: "#eb00006b",
                            confirmButtonText: "volver a jugar",
                        })
                        contadorD++;
                        cuentaDerrota.textContent = contadorD
                    } else if (validarEmpate()) {
                        Swal.fire({
                            title: 'Empate!',
                            text: 'Ningun jugador ha ganado',
                            imageUrl: 'src/imagenes/giphy.gif',
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                            background: 'none',
                            color: 'white',
                            confirmButtonColor: "#eb00006b",
                            confirmButtonText: "volver a jugar",
                        })
                    }
                }, 1000);
            }

        }
    })
}

//<--------------------------Funcion-minimax------------------------------------------>
// function arregloAuxiliar() {
//     let mejorPuntaje = -Infinity;
//     let mejorMovimiento;

//     for (let i = 0; i < 9; i++) {
//         if (celdas[i].textContent !== simbolo && celdas[i].textContent !== simboloO) {
//             celdas[i].textContent = simboloO;
//             let puntaje = minimax(celdas, 0, false);
//             celdas[i].textContent = "";

//             if (puntaje > mejorPuntaje) {
//                 mejorPuntaje = puntaje;
//                 mejorMovimiento = i;
//             }
//         }
//     }

//     return mejorMovimiento;
// }

// function minimax(tablero, profundidad, esMaximizador) {
//     if (validarVictorias(simbolo)) {
//         return -1;
//     }

//     if (validarVictorias(simboloO)) {
//         return 1;
//     }

//     if (validarEmpate()) {
//         return 0;
//     }

//     if (esMaximizador) {
//         let mejorPuntaje = -Infinity;
//         for (let i = 0; i < 9; i++) {
//             if (tablero[i].textContent !== simbolo && tablero[i].textContent !== simboloO) {
//                 tablero[i].textContent = simboloO;
//                 let puntaje = minimax(tablero, profundidad + 1, false);
//                 tablero[i].textContent = "";
//                 mejorPuntaje = Math.max(mejorPuntaje, puntaje);
//             }
//         }
//         return mejorPuntaje;
//     } else {
//         let mejorPuntaje = Infinity;
//         for (let i = 0; i < 9; i++) {
//             if (tablero[i].textContent !== simbolo && tablero[i].textContent !== simboloO) {
//                 tablero[i].textContent = simbolo;
//                 let puntaje = minimax(tablero, profundidad + 1, true);
//                 tablero[i].textContent = "";
//                 mejorPuntaje = Math.min(mejorPuntaje, puntaje);
//             }
//         }
//         return mejorPuntaje;
//     }
// }




