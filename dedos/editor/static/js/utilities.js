'use strict'

function fijarTarjeta(input) {
	fix = true
	var parentElement = document.getElementById(input.offsetParent.id)

	document.getElementById(input.id).innerHTML = '<img src="/static/dash/dist/assets/img/pinned.png" width="12px"   />';
	document.getElementById(input.id).style = " margin-left:4px; margin-right:-2px"
	if (parentElement.classList.contains("ui-draggable-disabled")) {
		fix = false
		document.getElementById(input.id).innerHTML = '<img src="/static/dash/dist/assets/img/pinnedout.png" width="12px"   />';
		document.getElementById(input.id).style = " margin-left:2px"
	}
}

function evaluarPosicion($item) {
	var positions = $item.position()
	//	console.log("pp", positions)
	var rect = $item[0].getBoundingClientRect();
	//	console.log("ELEMENTO:", "top:", rect.top, "left:", rect.left, "bottom:", rect.bottom, "right:", rect.right,);

	var elementoX = rect.bottom
	var elementoY = rect.left
	//	console.log("punto elemento", elementoX, elementoY)
	var papelera = document.getElementById("papelera")

	var rect = papelera.getBoundingClientRect();
	//	console.log("PAPELERA:", "top:", rect.top, "left:", rect.left, "bottom:", rect.bottom, "right:", rect.right,);
	var papeleraX = rect.top
	var papeleraY = rect.right
	//	console.log("Papelera", papeleraX, papeleraY)

	if (elementoX - 30 > papeleraX && elementoY + 30 < papeleraY) {
		console.log("HA ENTRADO PAPELERA")
		if ($item[0].id.includes("time")) {
			num_time = 0
			div = document.getElementById("TemporizadorBueno");
			div.classList.remove("ocultar");
			div = document.getElementById("TemporizadorTemp");
			div.classList.add("ocultar");
			itemTemporizador = null
			evaluarMostrarMenu()
		}
		if ($item[0].id.includes("area")) {
			num_area--;
		}
		$($item).remove()
	} else {
		//	lastItem.style ="left:" + posLeft + "; right:"+ posRight;
		if ($item[0].id.includes("time")) {
			//		console.log('Temporizador', $item[0].id)
			var temporizador = document.getElementById($item[0].id)
			// temporizador.style.top = "140px"
			// temporizador.style.left = "5px"
			temporizador.style.position = "fixed"
			temporizador.style.left = "87%"
			temporizador.style.top = "85%"
		}

		// Alinear con padre
		if ($item[0].id.includes("objetive") || $item[0].id.includes("math")) {
			console.log("el id´dddd es", $item[0].id)
			console.log("el item is", $item)
			console.log("el padre del item es", $item.parent()[0].children[0])
			if ($item.parent()[0].id.includes(canvas.replace("#", ""))) {
				if (lastPadreObjetive != null) {
					//	console.log("en el remoooveeee", $item.parent()[0].id)
					lastPadreObjetive.classList.remove("selector")
					lastPadreObjetive = null
				}
				//	$item.remove()
			} else {

				// colocar los elementos para que no se muevan

				if ($item.parent()[0].id.includes("card") || $item.parent()[0].id.includes("picture")) {
					var hijo = document.getElementById($item[0].id)
					hijo.style = " left: 20px; margin-bottom: -15px"
					var parent = document.getElementById($item.parent()[0].children[0].id)

					//	console.log("el padre total es", $item.parent()[0].id)
					// Mira si ya tienen un elemento de ese tipo´

					var padreAbsoluto = document.getElementById($item.parent()[0].id)

					var objetiveEncontrado = padreAbsoluto.classList.contains("selector")
					var padre = document.getElementById($item.parent()[0].id)

					//	console.log("El padre para chequear es", padre)
					var hijos = padre.childNodes
					//	console.log("Los hijos para chequear son", hijos)


					//	console.log("ENCONTRADOO OBJETIVE", objetiveEncontrado)
					if (!objetiveEncontrado) {
						padreAbsoluto.classList.add("selector")
						parent.insertBefore(hijo, parent.children[0]);
						lastPadreObjetive = padreAbsoluto
					} else {
						$item.remove()
					}

				} else if ($item.parent()[0].id.includes("area")) {
					//	console.log("el hijoopadre del item es area ", $item[0].id)
					var hijo = document.getElementById($item[0].id)
						//	var rect = hijo.getBoundingClientRect();
						//	console.log("Las posiciones hijo son",rect.top, rect.right, rect.bottom, rect.left);
						;// =" position: absolute; left: 60px; top: 35px;"
					parent = document.getElementById("area1")
					var rect = parent.getBoundingClientRect();
					//	console.log("Las posiciones padre son", rect.top, rect.right, rect.bottom, rect.left);
					var je = posRight - rect.top - 45
					var jo = posLeft - rect.left - 10
					//	console.log("resta top", je, "resta left", jo)
					hijo.style = "top:" + je + "px; left:" + jo + "px;"
					parent.appendChild(document.getElementById($item[0].id))
				} else {
					$item.remove();
				}


			}
		}

		if ($item[0].id.includes("picture")) {
			if ($item.parent()[0].id.includes("card")) {

				//	console.log("el padre del item es picture ", $item.parent()[0].id)
				//	console.log("el padre del item es picture ", $item)
				var hijo = document.getElementById($item[0].id)
				hijo.style = "  left: 60px;"
				var parent = document.getElementById("card1")
				parent.appendChild(document.getElementById("picture1"))
			}
		}
	}


	captura(activity, canvas)
}

// Evaluar posicion al iniciar
function evaluarPosicionInicio($item) {
	var positions = $item.position()
	var rect = $item[0].getBoundingClientRect();
	var elementoX = rect.bottom
	var elementoY = rect.left
	var papelera = document.getElementById("papelera")
	var rect = papelera.getBoundingClientRect();
	var papeleraX = rect.top
	var papeleraY = rect.right

	if (elementoX > papeleraX && elementoY < papeleraY) {
		console.log("HA ENTRADO PAPELERA")
		if ($item[0].id.includes("time")) {
			num_time = 0
			div = document.getElementById("TemporizadorBueno");
			div.classList.remove("ocultar");
			div = document.getElementById("TemporizadorTemp");
			div.classList.add("ocultar");
			itemTemporizador = null
		}
		if ($item[0].id.includes("area")) {
			num_area--;
		}
		evaluarMostrarMenu()
		$($item).remove()
	} else {
		// Alinear con padre 
		var borrado = false
		if ($item[0].id.includes("objetive") || $item[0].id.includes("math")) {
			console.log("el elemento arrastrado es", $item[0].id)
			var padre = null

			//		console.log("ELEMENTO EN POSICION",pointerElementID)
			if (isPicture) {
				padre = document.getElementById(padrePicture)
			} else if (isCard) {
				padre = document.getElementById(padreCard)
			}
			else {
				$item.remove()
				borrado = true
			}

			if (!borrado) {
				console.log("El padre es", padre.id)
				console.log("el item is", $item.id)

				if (padre.classList.contains("selector")) {
					lastPadreObjetive = null
					console.log("Se ha borrado porque ya tiene un elemento")
					$item.remove()

				} else {

					// colocar los elementos para que no se muevan

					if (padre != null && (padre.id.includes("card") || padre.id.includes("picture"))) {
						var hijo = document.getElementById($item[0].id)
						hijo.style = " left: 20px; margin-bottom: -15px"
						var padreAbsoluto = null
						if (padre.id.includes("card")) {
							padreAbsoluto = document.getElementById(padreCard)
						} else {
							padreAbsoluto = document.getElementById(padrePicture)
						}


						console.log("El hijo", hijo)
						console.log("El padreabsoluto", padreAbsoluto)

						//	console.log("el padre total es", $item.parent()[0].id)
						// Mira si ya tienen un elemento de ese tipo´



						var objetiveEncontrado = padreAbsoluto.classList.contains("selector")
						var padre = document.getElementById($item.parent()[0].id)

						//	console.log("El padre para chequear es", padre)
						var hijos = padre.childNodes
						//	console.log("Los hijos para chequear son", hijos)


						//	console.log("ENCONTRADOO OBJETIVE", objetiveEncontrado)
						if (!objetiveEncontrado) {
							padreAbsoluto.classList.add("selector")
							console.log("El padreabsoluto", padreAbsoluto)
							padreAbsoluto.children[0].insertBefore(hijo, padreAbsoluto.children[0].children[0]);
							lastPadreObjetive = padreAbsoluto
						} else {
							$item.remove()
						}

					} else if ($item.parent()[0].id.includes("area")) {
						//	console.log("el hijoopadre del item es area ", $item[0].id)
						var hijo = document.getElementById($item[0].id)
							//	var rect = hijo.getBoundingClientRect();
							//	console.log("Las posiciones hijo son",rect.top, rect.right, rect.bottom, rect.left);
							;// =" position: absolute; left: 60px; top: 35px;"
						parent = document.getElementById("area1")
						var rect = parent.getBoundingClientRect();
						//	console.log("Las posiciones padre son", rect.top, rect.right, rect.bottom, rect.left);
						var je = posRight - rect.top - 45
						var jo = posLeft - rect.left - 10
						//	console.log("resta top", je, "resta left", jo)
						hijo.style = "top:" + je + "px; left:" + jo + "px;"
						parent.appendChild(document.getElementById($item[0].id))
					} else {
						$item.remove();
					}


				}
			}
		}

		if ($item[0].id.includes("picture")) {
			if ($item.parent()[0].id.includes("card")) {

				//	console.log("el padre del item es picture ", $item.parent()[0].id)
				//	console.log("el padre del item es picture ", $item)
				var hijo = document.getElementById($item[0].id)
				hijo.style = "  left: 60px;"
				var parent = document.getElementById("card1")
				parent.appendChild(document.getElementById("picture1"))
			}
		}
	}


	//		captura(activity, canvas)
}

// Evalua si una tarjeta tiene ya un objetive o math
function actualizarTarjetas(id) {
	var title = "idTitle"
	if (id.includes("picture")) {
		title = "titleImage"
	}
	var cards = document.getElementsByClassName(id)
	for (var i = 0; i < cards.length; i++) {
		var hijos = cards[i].children
		var hasSelector = false
		for (var j = 0; j < hijos.length; j++) {
			if (hijos[j].id.includes(title)) {
				var subhijos = hijos[j].children
				for (var k = 0; k < subhijos.length; k++) {
					if (subhijos[k].id.includes("objetive") || subhijos[k].id.includes("math")) {
						hasSelector = true
						break
					}
				}
			}
		}
		cards[i].classList.remove("selector")
		if (hasSelector) {
			cards[i].classList.add("selector")
		}
	}
}

function elegirActividad(e) {
	//	console.log("he pulsado la actividad", e.context.id)
	if (e[0].id != activity) {
		//	console.log("he pulsado la actividad dentro", e[0].id)
		var id = e.context.id.split("_")[1]
		var idCanvas = "editor-canvas_" + id
		var canv = document.getElementById(idCanvas)
		if (canv != null) {
			canv.classList.remove("ocultar")
			canv.classList.add("dropzone")

			var lastcanvas = document.getElementById(canvas.replace("#", ""))
			lastcanvas.classList.remove("dropzone")
			lastcanvas.classList.add("ocultar")

			activity = "activity_" + id;
			canvas = "#editor-canvas_" + id;
		}
	}
}

function eliminarActividad(e) {
	console.log("he pulsado la actividad", e[0].parentNode.id)
	var splitID = e[0].parentNode.id.split("_")
	var idEditor = "editor-canvas_" + splitID[1]
	document.getElementById(e[0].parentNode.id).remove()
	document.getElementById(idEditor).remove()

	var ultimo = $('#sortable li').last()
	if (ultimo.length !== 0) {
		var id = ultimo[0].id.split("_")[1]
		console.log("El utlimo es", ultimo)
		var editorMostrar = "editor-canvas_" + id;
		document.getElementById(editorMostrar).classList.add("dropzone")
		document.getElementById(editorMostrar).classList.remove("ocultar")

		console.log("el ultimo es", id)
		activity = "activity_" + id;
		canvas = "#editor-canvas_" + id;

		num_activity--;
		borrar = true
		lanzar()
	}
}

function addActivity() {

	var li = original.cloneNode(false)
	li.id = "activity_" + num_activity;

	li.innerHTML = '<div class="deleteActivity" onclick="eliminarActividad($(this))" >x</div>';

	var canvasElement = document.getElementById(canvas.replace("#", ""))
	if (canvasElement != null) {
		document.getElementById(canvas.replace("#", "")).classList.remove("dropzone")
		document.getElementById(canvas.replace("#", "")).classList.add("ocultar")
	}

	document.getElementById("sortable").appendChild(li)


	// Creamos nuevo canvas
	var theDiv = document.createElement("div")
	// <div id="editor-canvas" class="editor-canvas dropzone" style=>
	theDiv.id = "editor-canvas_" + num_activity
	theDiv.classList.add("editor-canvas")
	theDiv.classList.add("dropzone")
	theDiv.style = "border:2px;width:100%; height:100%;"


	document.getElementById("listaCanvas").append(theDiv)

	activity = "activity_" + num_activity;
	previousCanvas = canvas
	canvas = "#editor-canvas_" + num_activity

	theDiv.appendChild(document.createElement("br"));
	theDiv.appendChild(document.createElement("br"));
	var tag = document.createElement("h1"); 
	tag.id = "MensajeInicial_" + canvas.replace("#","")
	tag.classList.add("center");
	var text = document.createTextNode("Este es el área de edición:");
	tag.appendChild(text);
	theDiv.appendChild(tag);
	theDiv.appendChild(document.createElement("br"));

	var tag2 = document.createElement("h1");
	tag2.classList.add("center");
	var text2 = document.createTextNode("Arrastra sobre el área los iconos de la barra de");
	tag2.appendChild(text2);
	theDiv.appendChild(tag2);

	var tag3 = document.createElement("h1");
	tag3.classList.add("center");
	var text3 = document.createTextNode("herramientas para crear una actividad");
	tag3.appendChild(text3);
	theDiv.appendChild(tag3);

	
	
	num_activity++;
	borrar = true
	lanzar()
	captura(activity, canvas)
	evaluarMostrarMenu()
	//	document.getElementById("editor-canvas").classList.add("ocultar")
}

// Evalua si se tiene que mostrar el menu y reloj
function evaluarMostrarMenu() {
	var mostrarMenu = false
	var tieneReloj = false
	var hijos = document.getElementById(canvas.replace("#", "")).children
//	console.log("El canvas es", canvas)
//	console.log("los hijos del canvas", hijos)

	for (var i = 0; i < hijos.length; i++) {
		//console.log("hijo id", hijos[i].id)
		if (hijos[i].id.includes("area")) {
			mostrarMenu = true
		}

		if (hijos[i].id.includes("time")) {
			tieneReloj = true
		}
	}
//	console.log("Tiene algun area", mostrarMenu)
//	console.log("Tiene reloj", tieneReloj)

	if (mostrarMenu) {
		mostrarOpciones(tieneReloj)
	} else {
		ocultarOpciones()
	}
}

function ocultarOpciones() {

	var div = document.getElementById("TextoTemp");
	div.classList.remove("ocultar");
	div = document.getElementById("TextoBueno");
	div.classList.add("ocultar");

	div = document.getElementById("FotoTemp");
	div.classList.remove("ocultar");
	div = document.getElementById("FotoBueno");
	div.classList.add("ocultar");

	div = document.getElementById("SeleccionTemp");
	div.classList.remove("ocultar");
	div = document.getElementById("SeleccionBueno");
	div.classList.add("ocultar");

	div = document.getElementById("EmparejarTemp");
	div.classList.remove("ocultar");
	div = document.getElementById("EmparejarBueno");
	div.classList.add("ocultar");

	div = document.getElementById("CaminoTemp");
	div.classList.remove("ocultar");
	div = document.getElementById("CaminoBueno");
	div.classList.add("ocultar");

	div = document.getElementById("MatesTemp");
	div.classList.remove("ocultar");
	div = document.getElementById("MatesBueno");
	div.classList.add("ocultar");

	div = document.getElementById("TemporizadorTemp");
	div.classList.remove("ocultar");
	div = document.getElementById("TemporizadorBueno");
	div.classList.add("ocultar");
}

function mostrarOpciones(tieneReloj) {

	var div = document.getElementById("TextoBueno");
	div.classList.remove("ocultar");
	div = document.getElementById("TextoTemp");
	div.classList.add("ocultar");

	div = document.getElementById("FotoBueno");
	div.classList.remove("ocultar");
	div = document.getElementById("FotoTemp");
	div.classList.add("ocultar");

	div = document.getElementById("SeleccionBueno");
	div.classList.remove("ocultar");
	div = document.getElementById("SeleccionTemp");
	div.classList.add("ocultar");

	div = document.getElementById("EmparejarBueno");
	div.classList.remove("ocultar");
	div = document.getElementById("EmparejarTemp");
	div.classList.add("ocultar");

	div = document.getElementById("CaminoBueno");
	div.classList.remove("ocultar");
	div = document.getElementById("CaminoTemp");
	div.classList.add("ocultar");

	div = document.getElementById("MatesBueno");
	div.classList.remove("ocultar");
	div = document.getElementById("MatesTemp");
	div.classList.add("ocultar");

	div = document.getElementById("TemporizadorBueno");
	div.classList.remove("ocultar");
	div = document.getElementById("TemporizadorTemp");
	div.classList.add("ocultar");


	if (tieneReloj) {
		div = document.getElementById("TemporizadorTemp");
		div.classList.remove("ocultar");
		div = document.getElementById("TemporizadorBueno");
		div.classList.add("ocultar");
	}
} 


function limpiarCanvas() {

//	


	var mensajeInicial = document.getElementById("MensajeInicial_" + canvas.replace("#",""))
	
	
	console.log("Mensaje inicial es", mensajeInicial) 

	if(mensajeInicial != null){
		document.getElementById(canvas.replace("#", "")).innerHTML = "";
	}
	
}