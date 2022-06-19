'use strict'

// function flecha(id) {

// 	document.getElementById(id).addEventListener('mousemove', e => {
		
// 	//	console.clear()
// 		var elems = document.elementsFromPoint(e.clientX, e.clientY)
// 		//console.log("elementos",elems)
// 		for (let i = 0; i < elems.length; i++) {

// 			if (elems[i].id.includes("area_")) {
// 				console.log("POSICION AREA",elems[i].id)
// 				let elem = document.getElementById(elems[i].id);
// 				let rect = elem.getBoundingClientRect();
				
// 				// console.log("x: "+ rect.x);
// 				// console.log("y: "+ rect.y);
// 				console.log("")
// 				console.log("x:", e.clientX, "mouse", "y", e.clientY)
				
// 				console.log("right: "+ rect.right,"bottom:", rect.bottom);
// 				console.log("left: "+ rect.left,"top: " +  rect.top);
// 				var x = (rect.left + rect.right) / 2
// 				var y = rect.top
// 				posLeft = e.clientX - rect.left;;
// 				posRight = e.clientY - rect.top;
// 				dibujar(x, y, posLeft, posRight, "Unir_1")
// 			}

			
// 		}
		
// 	}, { passive: true })
// }

// function dibujarFlecha(id) {
// 	onmousemove = function (e) {
// 		document.onmousemove = function (event) {
// 			var item = document.getElementById(id)
// 			// item.style.width = -1 * event.clientX + 'px';
// 			// item.style.height = -1 * event.clientY + 'px';
// 			item.style = "position: absolute; left: 0px; top: 55px;"


// 		}

// 		const target = e.target;

// 		// Get the bounding rectangle of target
// 		const rect = target.getBoundingClientRect();

// 		// Mouse position
// 		posLeft = e.clientX - rect.left;;
// 		posRight = e.clientY - rect.top;
// 		dibujar(500, 0, posLeft, posRight, idUnir)



// 	}
// }´


function getPositionElement(elementoID){
    console.log("Entro en el getpositionElement con el elemento", elementoID)

    document.getElementById(elementoID).classList.add("emparejado")

    // document.getElementById("pairing_1").addEventListener('mousemove', e => {
    //       var x = e.offsetX;
    //       var y = e.offsetY;
    //       console.log("Offset X:", x, "offset Y:", y)
        
    //   });
    //   document.getElementById("pairing_1").addEventListener('mousedown', e => {
    //     console.log("entro en el mousedown")
    //       var x = e.offsetX;
    //       var y = e.offsetY;
    //       console.log("Offset X:", x, "offset Y:", y)
        
    //   });
     
}

function eliminarElementoEmparejado(idEliminar){
    console.log("BORROOOOOO ELEMENTOOOOO")
    document.getElementById(idEliminar).remove()
    captura(activity, canvas)
}