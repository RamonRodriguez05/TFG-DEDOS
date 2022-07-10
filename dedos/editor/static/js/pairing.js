'use strict'

function getPositionElement(elementoID) {
    document.getElementById(elementoID).classList.add("emparejado" + canvas)
}

function eliminarElementoEmparejado(idEliminar) {
    var borrarEmparejado = true
    var clases = document.getElementById(idEliminar).classList
    for (var cl = 0; cl < clases.length; cl++) {
        if (clases[cl].includes("pairing_")) {
            for (var m = 0; m < listaFlechas.length; m++) {
                if (listaFlechas[m].elementoFin == clases[cl] || listaFlechas[m].elementoInicio == clases[cl]) {
                    document.getElementById(listaFlechas[m].elementoInicio).classList.remove("emparejadoCon-" + clases[cl])
                    listaFlechas[m].line.remove()
                    listaFlechas = listaFlechas.filter(item => item.elementoFin !== clases[cl])
                }
            }
        }
    }

    var numeroFlechasEliminadas = 0
    for (var m = 0; m < listaFlechas.length; m++) {
        if (listaFlechas[m].elementoFin == idEliminar || listaFlechas[m].elementoInicio == idEliminar) {
            document.getElementById(listaFlechas[m].elementoInicio).classList.remove("emparejadoCon-" + idEliminar)
            listaFlechas[m].line.remove()
            delete listaFlechas[m]
            numeroFlechasEliminadas++
        }
    }
    listaFlechas.length = listaFlechas.length - numeroFlechasEliminadas

    //Evaluar clases emparejado
    var countEmparejado = 0
    var elementosEmparejados = document.getElementsByClassName("emparejado" + canvas)

    for (var emparejado = 0; emparejado < elementosEmparejados.length; emparejado++) {
        for (var k = 0; k < listaFlechas.length; k++) {
            if (listaFlechas[k].elementoInicio == elementosEmparejados[emparejado].id) {
                countEmparejado++
            }
        }

        if (countEmparejado == 1) {
            document.getElementById(elementosEmparejados[emparejado].id).classList.remove("emparejado" + canvas)
        }
    }

    captura(activity, canvas)
}