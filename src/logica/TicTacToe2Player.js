var celdas = document.querySelectorAll(".celda");
var cuentaVictoria = document.getElementById("cuentaVictoria");
var cuentaDerrota = document.getElementById("cuentaDerrota");
var iconoActual = document.getElementById("iconoActual");
let simbolo = "!"
let simboloO = "2"
let jugadorActual = simbolo;
let contadorV = 0;
let contadorD = 0;
let gritoMario = document.createElement("audio");
gritoMario.src = "src/audio/mario-scream Sound effect.mp3"
let UP = document.createElement("audio");
UP.src = "src/audio/Super Mario Bros. 1-Up Sound Effect.mp3"


//<-------------------------------Funcion-para-vaciar-celdas---------------------------------->
function celdasReset() {
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].innerHTML = "";
    }
}

//<-----------------------------Funcion-para-validar-empates------------------------------------>
function validarEmpate() {
    for (let i = 0; i < celdas.length; i++) {
        if (celdas[i].innerHTML == "") {
            return false;
        }
    }
    return true;
}

//<------------------------Funcion-Para-Validar-Victorias------------------------------------->
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


//<----------------Logica-principal-y-verificaciones---------------------------->
for (let i = 0; i < 9; i++) {
    celdas[i].addEventListener("click", function () {
        if (celdas[i].textContent == "" && !validarVictorias(simbolo) && !validarVictorias(simboloO) && simbolo == jugadorActual) {
            celdas[i].innerHTML = jugadorActual
            jugadorActual = simboloO;
            iconoActual.innerHTML = jugadorActual;
        }else if(jugadorActual==simboloO){
            celdas[i].innerHTML = jugadorActual
            jugadorActual = simbolo;
            iconoActual.innerHTML = jugadorActual;
        }
            if (validarVictorias(simbolo)) {
                UP.play();
                jugadorActual = simbolo;
                iconoActual.innerHTML = jugadorActual;
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
            } else {
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
            }

        
    })
}



