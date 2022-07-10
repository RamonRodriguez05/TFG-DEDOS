'use strict'

// Caminos	
function Camino(pathid, elemento, color) {
  this.caminoID = pathid;
  this.elementos = elemento + ";"
  this.color = color
}

function ElementoCamino(id, elemento, canv) {
  this.identificador = id;
  this.elemento = elemento
  this.canvas = canv
}

function getElementPath() {
  var paths = document.getElementsByClassName("originalPath")
  var unic = 0

  // Por cada path
  for (let i = 0; i < paths.length; i++) {

    if (paths[i].classList.contains(canvas)) {
      var lastID = parseInt(paths[i].id.substr(paths[i].id.length - 1))
      var padre = document.getElementById("pathIdPadre_" + lastID)
      var hijo = document.getElementById("pathIdHijo_" + lastID)
      hijo.innerHTML = "";

      // Añadir elementos a todos los path
      for (let j = 0; j < listPath.length; j++) {
        var el = listPath[j].elementos.slice(0, -1)
        var elementos = el.split(";")
        for (let k = 0; k < elementos.length; k++) {
          const resultado = listElementoCaminosClonados.find(ElementoCamino => ElementoCamino.identificador == elementos[k]);
          var clone = resultado.elemento.cloneNode(true)
          clone.id += "_" + lastID
          $(clone).draggable();

          if (resultado.canvas === canvas) {
            hijo.appendChild(clone)
          }
        }
      }
    }
  }
}