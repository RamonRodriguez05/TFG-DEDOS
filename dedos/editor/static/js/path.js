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
    console.log("Numero de path", paths)

    // Por cada path
    for (let i = 0; i < paths.length; i++) {

      if (paths[i].classList.contains(canvas)) {
        console.log("path", paths[i])
        var lastID = parseInt(paths[i].id.substr(paths[i].id.length - 1))

        var padre = document.getElementById("pathIdPadre_" + lastID)
        var hijo = document.getElementById("pathIdHijo_" + lastID)

        console.log("El padre", padre.id)
        console.log("El hijo", hijo.id)
        hijo.innerHTML = "";
        console.log("lista de elementos clonados", listElementoCaminosClonados)

        // Añadir elementos a todos los path
        for (let j = 0; j < listPath.length; j++) {

          console.log("Numero de caminos", listPath[j])
          var el = listPath[j].elementos.slice(0, -1)

          var elementos = el.split(";")
          for (let k = 0; k < elementos.length; k++) {
            //	console.log("elementos hallados", elementos[k])
            const resultado = listElementoCaminosClonados.find(ElementoCamino => ElementoCamino.identificador == elementos[k]);
            //	console.log("el resultado es",resultado.elemento)´
            var clone = resultado.elemento.cloneNode(true)
            clone.id += "_" + lastID

            console.log("ELEMENTO A AÑADIR", clone)
            $(clone).draggable();
            console.log("El canvas es", canvas)
            console.log("el canvas elemento es", resultado.canvas)
            if (resultado.canvas === canvas) {
              hijo.appendChild(clone)
            }

          }
        }
      }

    }
  }