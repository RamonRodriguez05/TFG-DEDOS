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
	if ($item != null) {
		var positions = $item.position()
		var rect = $item[0].getBoundingClientRect();
		var elementoX = rect.bottom
		var elementoY = rect.left
		var papelera = document.getElementById("papelera")
		var rect = papelera.getBoundingClientRect();
		var papeleraX = rect.top
		var papeleraY = rect.right

		if (elementoX - 30 > papeleraX && elementoY + 30 < papeleraY) {
			if ($item[0].id.includes("time")) {
				num_time = 0
				var div = document.getElementById("TemporizadorBueno");
				div.classList.remove("ocultar");
				div = document.getElementById("TemporizadorTemp");
				div.classList.add("ocultar");
				itemTemporizador = null
				evaluarMostrarMenu()
			}
			if ($item[0].id.includes("area")) {
				num_area--;
			}

			if ($item[0].id.includes("pairing_")) {
				evaluarFlechasClases($item[0].id, true)
			}
			eliminarElementoEmparejado($item[0].id)
			$($item).remove()
		} else {
			if ($item[0].id.includes("time")) {
				var temporizador = document.getElementById($item[0].id)
				temporizador.style.position = "fixed"
				temporizador.style.left = "87%"
				temporizador.style.top = "85%"
			}

			// Alinear con padre
			if ($item[0].id.includes("objetive") || $item[0].id.includes("math")) {
				if ($item.parent()[0].id.includes(canvas.replace("#", ""))) {
					$item.remove()
				} else {
					if ($item.parent()[0].id.includes("card") || $item.parent()[0].id.includes("picture")) {
						var hijo = document.getElementById($item[0].id)
						if (hijo.id.includes("objetive")) {
							hijo.style = " left: 20px; bottom:-2px; margin-bottom: -15px; position:relative"
						} else {
							hijo.style = " left: 20px; bottom:-2px; margin-bottom: -15px; position:relative"
						}

						var parent = document.getElementById($item.parent()[0].children[0].id)
						var padreAbsoluto = document.getElementById($item.parent()[0].id)
						var objetiveEncontrado = padreAbsoluto.classList.contains("selector")
						var padre = document.getElementById($item.parent()[0].id)
						var hijos = padre.childNodes

						if (!objetiveEncontrado) {
							padreAbsoluto.classList.add("selector")
							padreAbsoluto.classList.add("selector" + canvas)
							parent.insertBefore(hijo, parent.children[0]);
							lastPadreObjetive = padreAbsoluto
						} else {
							for (var i = 0; i < listaSelectores.length; i++) {
								if (listaSelectores[i].hijo == hijo.id) {
									if (listaSelectores[i].padre != padreAbsoluto.id) {
										$item.remove()
										listaSelectores = listaSelectores.filter(item => !(item.hijo == hijo.id));
									} else {
										if (hijo.id.includes("objetive")) {
											hijo.style = " left: 20px; bottom:-2px; margin-bottom: -15px; position:relative"
										} else {
											hijo.style = " left: 20px; bottom:-2px; margin-bottom: -15px; position:relative"
										}
										var padreAbsoluto = null
										if (padre.id.includes("card")) {
											padreAbsoluto = document.getElementById(padreCard)
										} else {
											padreAbsoluto = document.getElementById(padrePicture)
										}
										padreAbsoluto.children[0].insertBefore(hijo, padreAbsoluto.children[0].children[0]);
									}
								}
							}
						}
					} else if ($item.parent()[0].id.includes("area")) {
						var hijo = document.getElementById($item[0].id)
						parent = document.getElementById("area1")
						var rect = parent.getBoundingClientRect();
						var je = posRight - rect.top - 45
						var jo = posLeft - rect.left - 10
						hijo.style = "top:" + je + "px; left:" + jo + "px;"
						parent.appendChild(document.getElementById($item[0].id))
					} else {
						$item.remove();
						console.log("Elemento borrado")
					}
				}
			}

			if ($item[0].id.includes("picture")) {
				if ($item.parent()[0].id.includes("card")) {
					var hijo = document.getElementById($item[0].id)
					hijo.style = "  left: 60px;"
					var parent = document.getElementById("card1")
					parent.appendChild(document.getElementById("picture1"))
				}
			}

			if ($item[0].id.includes("pairing")) {
				getPositionElement("area_1")
			}
		}
	}
	captura(activity, canvas)
}

// Evaluar posicion al iniciar
function evaluarPosicionInicio($item) {
	if ($item != null) {
		var positions = $item.position()
		var rect = $item[0].getBoundingClientRect();
		var elementoX = rect.bottom
		var elementoY = rect.left
		var papelera = document.getElementById("papelera")
		var rect = papelera.getBoundingClientRect();
		var papeleraX = rect.top
		var papeleraY = rect.right

		//Eliminar elemento
		if (elementoX > papeleraX && elementoY < papeleraY) {
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
			eliminarElementoEmparejado($item[0].id)
			$($item).remove()
		} else {
			// Alinear con padre 
			var borrado = false
			if ($item[0].id.includes("objetive") || $item[0].id.includes("math")) {
				var padre = null

				if (isPicture) {
					padre = document.getElementById(padrePicture)
				} else if (isCard) {
					padre = document.getElementById(padreCard)
				} else {
					$item.remove()
					borrado = true
				}

				if (!borrado) {
					if (padre.classList.contains("selector")) {
						lastPadreObjetive = null
						$item.remove()
					} else {
						if (padre != null && (padre.id.includes("card") || padre.id.includes("picture"))) {
							var hijo = document.getElementById($item[0].id)
							if (hijo.id.includes("objetive")) {
								hijo.style = " left: 20px; bottom:-2px; margin-bottom: -15px; position:relative"
							} else {
								hijo.style = " left: 20px; bottom:-2px; margin-bottom: -15px; position:relative"
							}
							var padreAbsoluto = null
							if (padre.id.includes("card")) {
								padreAbsoluto = document.getElementById(padreCard)
							} else {
								padreAbsoluto = document.getElementById(padrePicture)
							}

							var objetiveEncontrado = padreAbsoluto.classList.contains("selector")
							var padre = document.getElementById($item.parent()[0].id)
							var hijos = padre.childNodes

							if (!objetiveEncontrado) {
								padreAbsoluto.classList.add("selector")
								padreAbsoluto.classList.add("selector" + canvas)
								padreAbsoluto.children[0].insertBefore(hijo, padreAbsoluto.children[0].children[0]);
								lastPadreObjetive = padreAbsoluto
								var elSelectores = new elementoSelectores(padreAbsoluto.id, hijo.id)
								listaSelectores.push(elSelectores)
							} else {
								for (var i = 0; i < listaSelectores.length; i++) {
									if (listaSelectores[i].hijo == hijo.id) {
										if (listaSelectores[i].padre != padreAbsoluto.id) {
											$item.remove()
											listaSelectores = listaSelectores.filter(item => !(item.hijo == hijo.id));
										} else {
											if (hijo.id.includes("objetive")) {
												hijo.style = " left: 20px; bottom:-2px; margin-bottom: -15px; position:relative"
											} else {
												hijo.style = " left: 20px; bottom:-2px; margin-bottom: -15px; position:relative"
											}
											var padreAbsoluto = null
											if (padre.id.includes("card")) {
												padreAbsoluto = document.getElementById(padreCard)
											} else {
												padreAbsoluto = document.getElementById(padrePicture)
											}
											padreAbsoluto.children[0].insertBefore(hijo, padreAbsoluto.children[0].children[0]);
										}
									}
								}
							}
						} else if ($item.parent()[0].id.includes("area")) {
							var hijo = document.getElementById($item[0].id)
							parent = document.getElementById("area1")
							var rect = parent.getBoundingClientRect();
							var je = posRight - rect.top - 45
							var jo = posLeft - rect.left - 10
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
					var hijo = document.getElementById($item[0].id)
					hijo.style = "  left: 60px;"
					var parent = document.getElementById("card1")
					parent.appendChild(document.getElementById("picture1"))
				}
			}

			// Pairing
			if ($item[0].id.includes("pairing")) {
				$(document.getElementById($item[0].id)).resizable()
				$(document.getElementById($item[0].id)).resizable("destroy")
				var mover = true;
				var elementoEmparejar = ""
				var borrarPairing = true;
				var elementoAsociado = ""
				var positionPairing = document.getElementById($item[0].id).getBoundingClientRect()
				var elems = document.elementsFromPoint(positionPairing.left, positionPairing.top)
				for (var el = 0; el < elems.length; el++) {
					if (elems[el].id.includes("area_") || elems[el].id.includes("picture_") || elems[el].id.includes("card_")) {
						elementoEmparejar = elems[el].id

						if (!document.getElementById(elementoEmparejar).classList.contains("ElementoFinal")) {
							borrarPairing = false;
							$(document.getElementById(elementoEmparejar)).draggable()
							$(document.getElementById(elementoEmparejar)).draggable('destroy')
							break
						}
					}
				}

				// Se borrar si no se ha soltado sobre un area, card o picture
				if (borrarPairing) {
					$item[0].remove()
				} else {
					document.addEventListener('mousemove', e => {
						try {
							if (mover) {
								lineaFinal.color = 'rgba(255, 153, 0, 1)';
								var x = e.clientX;
								var y = e.clientY;

								$item[0].style.left = x - 245
								$item[0].style.top = y - 80
								$item[0].style = "z-index:500; left:" + (x) + ";top:" + (y) + ";"

								var positionPairing2 = document.getElementById($item[0].id).getBoundingClientRect()
								var elems2 = document.elementsFromPoint(positionPairing2.left, positionPairing2.top)
								mover = true
								for (var el2 = 0; el2 < elems2.length; el2++) {
									if ((elems2[el2].id.includes("picture_") || elems2[el2].id.includes("card_")) && elems2[el2].id != $item[0].id) {
										var unir = true

										for (var flechas = 0; flechas < listaFlechas.length; flechas++) {
											if (listaFlechas[flechas].elementoInicio == elems2[el2].id) {
												unir = false
											}
										}
										if (unir) {
											lineaFinal.color = 'rgba(0, 128, 0, 1)';
										}
									}
								}
							}
							fixLine()
						} catch {}
					});

					document.getElementById($item[0].id).addEventListener("click", e => {
						var positionPairing2 = document.getElementById($item[0].id).getBoundingClientRect()
						var elems2 = document.elementsFromPoint(positionPairing2.left, positionPairing2.top)
						mover = true
						for (var el2 = 0; el2 < elems2.length; el2++) {
							if ((elems2[el2].id.includes("picture_") || elems2[el2].id.includes("card_")) && elems2[el2].id != $item[0].id) {
								var unir = true

								for (var flechas = 0; flechas < listaFlechas.length; flechas++) {
									if (listaFlechas[flechas].elementoInicio == elems2[el2].id) {
										unir = false
									}
								}

								if (unir) {
									var width = document.getElementById(elems2[el2].id).offsetWidth + 10
									var height = document.getElementById(elems2[el2].id).offsetHeight + 10
									document.getElementById($item[0].id).style = "width:" + width + "px;height:" + height + "px; position: absolute; left: -6px; top: -6px;z-index:-222"
									document.getElementById(elems2[el2].id).appendChild($item[0])
									document.getElementById(elems2[el2].id).classList.add("ElementoFinal")
									document.getElementById(elems2[el2].id).classList.add($item[0].id)
									elementoAsociado = elems2[el2].id
									lineaFinal.color = 'rgba(0, 128, 0, 1)';
									mover = false
								}
							}
						}

						if (mover) {
							evaluarFlechasClases($item[0].id, false)
							document.getElementById($item[0].id).style = "width:" + 30 + "px;height:" + 30 + "px; position: absolute;"
							document.getElementById(canvas.replace("#", "")).appendChild($item[0])
							for (var key in listaFlechas) {
								if (listaFlechas[key].elementoFin == $item[0].id) {
									lineaFinal = listaFlechas[key].line
								}
							}
						}
					});

					function fixLine() {
						for (var flechas = 0; flechas < listaFlechas.length; flechas++) {
							lineaFinal.position();
						}
					}

					var emparejarInicio = true

					document.getElementById(elementoEmparejar).classList.add("emparejadoCon-" + $item[0].id)
					document.getElementById(elementoEmparejar).classList.add("emparejado" + canvas)
					var startElement = document.getElementById(elementoEmparejar),
						endElement = document.getElementById($item[0].id),
						lineaFinal = new LeaderLine(startElement, endElement);

					makeDraggable($(document.getElementById(elementoEmparejar)))
					var elFlecha = new elementoFlecha(lineaFinal, elementoEmparejar, $item[0].id)
					listaFlechas.push(elFlecha)
				}
			}
		}
	}
}

// Evalua si una tarjeta tiene ya un objetivee o math
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
		var clases = cards[i].classList
		for (var cl = 0; cl < clases.length; cl++) {
			if (clases[cl].includes(canvas)) {
				cards[i].classList.remove("selector")
				cards[i].classList.remove("selector" + canvas)
				if (hasSelector) {
					cards[i].classList.add("selector")
					cards[i].classList.add("selector" + canvas)
				}
			}
		}
	}
}

function elegirActividad(e) {
	if (e[0].id != activity) {
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
	evaluarMostrarMenu()
}

function eliminarActividad(e) {
	listaCapturas = listaCapturas.filter(item => !(item.canvas == ("preview" + e[0].parentNode.id)));
	var splitID = e[0].parentNode.id.split("_")
	var idEditor = "editor-canvas_" + splitID[1]
	document.getElementById(e[0].parentNode.id).remove()
	document.getElementById(idEditor).remove()

	var ultimo = $('#sortable li').last()
	if (ultimo.length !== 0) {
		var id = ultimo[0].id.split("_")[1]
		var editorMostrar = "editor-canvas_" + id;
		document.getElementById(editorMostrar).classList.add("dropzone")
		document.getElementById(editorMostrar).classList.remove("ocultar")
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
	tag.id = "MensajeInicial_" + canvas.replace("#", "")
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
}

// Evalua si se tiene que mostrar el menu y reloj
function evaluarMostrarMenu() {
	var mostrarMenu = false
	var tieneReloj = false
	var hijos = document.getElementById(canvas.replace("#", "")).children
	for (var i = 0; i < hijos.length; i++) {
		if (hijos[i].id.includes("area")) {
			mostrarMenu = true
		}

		if (hijos[i].id.includes("time")) {
			tieneReloj = true
		}
	}

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
	var mensajeInicial = document.getElementById("MensajeInicial_" + canvas.replace("#", ""))
	if (mensajeInicial != null) {
		document.getElementById(canvas.replace("#", "")).innerHTML = "";
	}
}


$(document).ready(function () {
	$('#etiquetas').select2({
		tags: true,
		tokenSeparators: [',', ' ']
	})

	var selects = document.getElementsByClassName("select2-dropdown")
	for (var i = 0; i < selects.length; i++) {
		selects[i].remove()
	}
})


function activarPairing(id) {

	//Areas
	var areas = document.getElementsByClassName("area")
	for (var i = 0; i < areas.length; i++) {
		areas[i].classList.add("areaBack")
	}

	//Picture
	var pictures = document.getElementsByClassName("picture")
	for (var j = 0; j < pictures.length; j++) {
		pictures[j].classList.add("pictureBack")
	}

	//Card
	var cards = document.getElementsByClassName("card")
	for (var k = 0; k < cards.length; k++) {
		cards[k].classList.add("cardBack")
	}

	//Pairing
	var pairings = document.getElementsByClassName("pairing")
	for (var l = 0; l < pairings.length; l++) {
		pairings[l].classList.add("pairingBack")
	}

	document.getElementById(id).classList.add("pairingFront")
}

function desactivarPairing() {
	//Areas
	var areas = document.getElementsByClassName("area")
	for (var i = 0; i < areas.length; i++) {
		areas[i].classList.remove("areaBack")
	}

	//Picture
	var pictures = document.getElementsByClassName("picture")
	for (var j = 0; j < pictures.length; j++) {
		pictures[j].classList.remove("pictureBack")
	}

	//Card
	var cards = document.getElementsByClassName("card")
	for (var k = 0; k < cards.length; k++) {
		cards[k].classList.remove("cardBack")
	}

	//Pairing
	var pairings = document.getElementsByClassName("pairing")
	for (var l = 0; l < pairings.length; l++) {
		pairings[l].classList.add("pairingBack")
	}
}

function moverHijo(id) {
	var hijoCanvas = document.getElementById("editor-canvas_1").children
	const node = document.getElementById("pairing_1");
	const list = document.getElementById("editor-canvas_1");
	list.insertBefore(node, list.children[2]);
}

function evaluarFlechasClases(elementoID, eliminar) {
	var elInicial = ""
	var elFinal = ""
	var countInicio = 1
	var countFinal = 1
	var countEmparejado = 0
	var eliminarClaseFinal = true

	for (var m = 0; m < listaFlechas.length; m++) {
		if (listaFlechas[m].elementoFin == elementoID) {
			elInicial = listaFlechas[m].elementoInicio
			var elementos = document.getElementsByClassName(elementoID)
			if (elementos.length > 0) {
				elFinal = elementos[0].id
			}
			break
		}
	}

	if (elFinal != "") {
		var clasesFinal = document.getElementById(elFinal).classList

		for (var l = 0; l < clasesFinal.length; l++) {
			if (clasesFinal[l].includes("pairing_")) {
				if (countFinal > 1) {
					eliminarClaseFinal = false
					break
				}
				countFinal++
			}
		}
		document.getElementById(elFinal).classList.remove(elementoID)
		if (eliminarClaseFinal) {
			document.getElementById(elFinal).classList.remove("ElementoFinal")
		}
	}

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
	var numeroFlechasEliminar = 0
	for (var jj = 0; jj < listaFlechas.length; jj++) {
		if (listaFlechas[jj].elementoFin === elementoID) {
			makeDraggable($(document.getElementById(listaFlechas[jj].elementoInicio)))
			document.getElementById(listaFlechas[jj].elementoInicio).classList.remove("emparejadoCon-" + elementoID)
			if (eliminar) {
				listaFlechas[jj].line.remove()
				listaFlechas = listaFlechas.filter(item => item.elementoFin !== elementoID)
			}
			break
		}
	}
}