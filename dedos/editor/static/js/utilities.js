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

				//listaFlechas.length = listaFlechas.length - numeroFlechasEliminar
				evaluarFlechasClases($item[0].id, true)

				console.log("lista flechas", listaFlechas)
			}

			eliminarElementoEmparejado($item[0].id)
			//	lineaFinal.remove()
			console.log("lista final", listaFlechas)
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
				//	console.log("el iddddd es", $item[0].id)
				//	console.log("el item is", $item)
				//	console.log("el padre del item es", $item.parent()[0].children[0])
				if ($item.parent()[0].id.includes(canvas.replace("#", ""))) {
					// if (lastPadreObjetive != null) {
					// 	//	console.log("en el remoooveeee", $item.parent()[0].id)
					// 	lastPadreObjetive.classList.remove("selector")
					// 	lastPadreObjetive = null
					// }else{

					// }´
					console.log("Elemento borrado")
					$item.remove()
				} else {

					// colocar los elementos para que no se muevan

					if ($item.parent()[0].id.includes("card") || $item.parent()[0].id.includes("picture")) {
						var hijo = document.getElementById($item[0].id)
						if (hijo.id.includes("objetive")) {
							hijo.style = " left: 20px; bottom:-2px; margin-bottom: -15px; position:relative"
						} else {
							hijo.style = " left: 20px; bottom:-2px; margin-bottom: -15px; position:relative"
						}

						var parent = document.getElementById($item.parent()[0].children[0].id)

						//	console.log("el padre total es", $item.parent()[0].id)
						// Mira si ya tienen un elemento de ese tipo´

						var padreAbsoluto = document.getElementById($item.parent()[0].id)

						var objetiveEncontrado = padreAbsoluto.classList.contains("selector")
						var padre = document.getElementById($item.parent()[0].id)

						//	console.log("El padre para chequear es", padre)
						var hijos = padre.childNodes
						//	console.log("Los hijos para chequear son", hijos)


						//	console.log("ENCONTRADOO OBJETIVEe", objetiveEncontrado)
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
										console.log("Elemento borrado porque ya existe otro")
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
						console.log("lista selec", listaSelectores)

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
						console.log("Elemento borrado")
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
			eliminarElementoEmparejado($item[0].id)
			$($item).remove()
		} else {
			// Alinear con padre 
			var borrado = false
			if ($item[0].id.includes("objetive") || $item[0].id.includes("math")) {
				//console.log("el elemento arrastrado es", $item[0].id)
				var padre = null

				//		console.log("ELEMENTO EN POSICION",pointerElementID)
				if (isPicture) {
					padre = document.getElementById(padrePicture)
				} else if (isCard) {
					padre = document.getElementById(padreCard)
				} else {
					$item.remove()
					borrado = true
					console.log("Elemento borrado")
				}

				if (!borrado) {
					//	console.log("El padre es", padre.id)
					//	console.log("el item is", $item.id)

					if (padre.classList.contains("selector")) {
						lastPadreObjetive = null
						console.log("Se ha borrado porque ya tiene un elemento")
						$item.remove()

					} else {

						// colocar los elementos para que no se muevan

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


							//	console.log("El hijo", hijo)
							//	console.log("El padreabsoluto", padreAbsoluto)

							//	console.log("el padre total es", $item.parent()[0].id)
							// Mira si ya tienen un elemento de ese tipo´



							var objetiveEncontrado = padreAbsoluto.classList.contains("selector")
							var padre = document.getElementById($item.parent()[0].id)

							//	console.log("El padre para chequear es", padre)
							var hijos = padre.childNodes
							//	console.log("Los hijos para chequear son", hijos)


							//	console.log("ENCONTRADOO OBJETIVEe", objetiveEncontrado)
							if (!objetiveEncontrado) {
								padreAbsoluto.classList.add("selector")
								padreAbsoluto.classList.add("selector" + canvas)
								//	console.log("El padreabsoluto", padreAbsoluto)
								padreAbsoluto.children[0].insertBefore(hijo, padreAbsoluto.children[0].children[0]);
								lastPadreObjetive = padreAbsoluto
								var elSelectores = new elementoSelectores(padreAbsoluto.id, hijo.id)
								listaSelectores.push(elSelectores)

							} else {
								for (var i = 0; i < listaSelectores.length; i++) {
									if (listaSelectores[i].hijo == hijo.id) {
										if (listaSelectores[i].padre != padreAbsoluto.id) {
											$item.remove()
											console.log("Elemento borrado porque ya existe otro")
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
							console.log("lista selec", listaSelectores)
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

			// Pairing
			if ($item[0].id.includes("pairing")) {
				$(document.getElementById($item[0].id)).resizable()
				$(document.getElementById($item[0].id)).resizable("destroy")

				var mover = true;
				var elementoEmparejar = ""
				var borrarPairing = true;
				var elementoAsociado = ""

				console.log("he soltado un pairing")
				var positionPairing = document.getElementById($item[0].id).getBoundingClientRect()
				var elems = document.elementsFromPoint(positionPairing.left, positionPairing.top)
				console.log("Elementos detectados al dejar el pairing es", elems)
				// getPositionElement("area_1")
				console.log("Entra en el pairing")
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
					console.log("Borrar Pairing")
					$item[0].remove()
				} else {

					//	document.getElementById("picture_1").append(document.getElementById("pairing_1"))
					document.addEventListener('mousemove', e => {
						try {
							if (mover) {
								lineaFinal.color = 'rgba(255, 153, 0, 1)';
								var x = e.clientX;
								var y = e.clientY;
								//	console.log("Offset X:", x, "offset Y:", y)

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
						} catch {

						}
					});


					document.getElementById($item[0].id).addEventListener("click", e => {
						var positionPairing2 = document.getElementById($item[0].id).getBoundingClientRect()
						var elems2 = document.elementsFromPoint(positionPairing2.left, positionPairing2.top)
						console.log("Elementossssss detectados al dejar el pairing es", elems2)
						mover = true
						for (var el2 = 0; el2 < elems2.length; el2++) {
							if ((elems2[el2].id.includes("picture_") || elems2[el2].id.includes("card_")) && elems2[el2].id != $item[0].id) {
								console.log("Entro en pairing y debo PARAR")

								var unir = true

								for (var flechas = 0; flechas < listaFlechas.length; flechas++) {
									if (listaFlechas[flechas].elementoInicio == elems2[el2].id) {
										unir = false
									}

								}

								if (unir) {
									var width = document.getElementById(elems2[el2].id).offsetWidth + 10

									var height = document.getElementById(elems2[el2].id).offsetHeight + 10
									console.log("width", width, "height", height)
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







					//	$item.draggable('destroy')


					//$(document.getElementById("area_1")).draggable()
					//	$(document.getElementById("area_1")).draggable('destroy')

					//var drag1 =  new PlainDraggable(document.getElementById(elementoEmparejar), { onMove: fixLine });
					function fixLine() {
						for (var flechas = 0; flechas < listaFlechas.length; flechas++) {
							//lineaFinal = listaFlechas[flechas].line
							lineaFinal.position();
							//console.log("entra en fixline")	
							// Como borrar
							// drag1.remove() 
							// $(document.getElementById(elementoEmparejar)).draggable()
							// makeDraggable($(document.getElementById(elementoEmparejar)))
						}

						// 		//captura(activity, canvas)
						// 	´
					}

					var emparejarInicio = true


					document.getElementById(elementoEmparejar).classList.add("emparejadoCon-" + $item[0].id)
					document.getElementById(elementoEmparejar).classList.add("emparejado" + canvas)
					var startElement = document.getElementById(elementoEmparejar),
						endElement = document.getElementById($item[0].id),
						lineaFinal = new LeaderLine(startElement, endElement);
					//	attachment2 = LeaderLine.pointAnchor({element: endElement, x: 8});
					//lineaFinal = new LeaderLine(startElement, attachment2);



					// lineaFinal = new LeaderLine(startElement, endElement);
					//	endElement.pointAnchor({element: endElement, x: 16, y: 32});
					// 	  $(document.getElementById("pairing_1")).resizable("destroy")
					// 	function fixLine() {
					// 		lineaFinal.position();
					// 		//captura(activity, canvas)
					// 	}

					// 	// document.getElementById("area_1").onmouseover = function(){	
					//     //    lineaFinal.position();
					// 	// };

					// 	// document.getElementById("pairing_1").onmouseover = function(){

					// 	// 	lineaFinal.position();

					// 	// };
					// 	var drag1=	new PlainDraggable(endElement, { onMove: fixLine });

					//  drag1.onDragStart = function() {
					// 	for(var flechas = 0; flechas < listaFlechas.length; flechas++){
					// 		if (flechas === 0){
					// 			lineaFinal = new LeaderLine(document.getElementById("area_1"), document.getElementById("pairing_1"));
					// 		}
					// 		if (flechas === 1){
					// 			lineaFinal = new LeaderLine(document.getElementById("area_1"), document.getElementById("pairing_2"));
					// 		}
					// 	//	lineaFinal = listaFlechas[flechas].line 
					// 		console.log("muevo flecha", flechas, lineaFinal)
					// 		fixLine()
					// 	}

					//  }
					//	new PlainDraggable(endElement, { onMove: fixLine });
					//	new PlainDraggable(document.getElementById("picture_1"), { onMove: fixLine });
					// //	$("#groupMenu").collapse("toggle");
					// //	$("#editor").addClass("active");

					makeDraggable($(document.getElementById(elementoEmparejar)))
					//var elFlecha = new elementoFlecha(lineaFinal, elementoEmparejar, $item[0].id, drag1)
					var elFlecha = new elementoFlecha(lineaFinal, elementoEmparejar, $item[0].id)
					listaFlechas.push(elFlecha)
					console.log("Lista de flechas iniciales", listaFlechas)
				}


			}
		}
	}

	//		captura(activity, canvas)
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
		console.log("las cards son ", cards[i].id)
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
	evaluarMostrarMenu()
}

function eliminarActividad(e) {
	console.log("mirar quien borrar", e)
	console.log("he pulsado la actividad", e[0].parentNode.id)
	listaCapturas = listaCapturas.filter(item => !(item.canvas == ("preview" + e[0].parentNode.id)));
	console.log("El listado de las capturas es", listaCapturas)
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
		console.log("borro")
		selects[i].remove()
	}

})


function activarPairing(id) {
	console.log("Activo pairing")
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
	console.log("Desactivo pairing")
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
	console.log("hijos", document.getElementById("editor-canvas_1").children)
}


function evaluarFlechasClases(elementoID, eliminar) {
	var elInicial = ""
	var elFinal = ""
	//var eliminarDrag = true
	var countInicio = 1
	var countFinal = 1
	var countEmparejado = 0
	var eliminarClaseFinal = true

	console.log("EL PADRE DEL PAIRING ES", listaFlechas)
	for (var m = 0; m < listaFlechas.length; m++) {
		if (listaFlechas[m].elementoFin == elementoID) {
			elInicial = listaFlechas[m].elementoInicio
			var elementos = document.getElementsByClassName(elementoID)
			if (elementos.length > 0) {
				elFinal = elementos[0].id
			}
			console.log("El final es", elFinal)
			break
		}
	}

	// Eliminar clase drag del elemento incial
	// for (var n = 0; n < listaFlechas.length; n++) {
	// 	if(listaFlechas[n].elementoInicio == elInicial){

	// 		if(countInicio > 1){
	// 			eliminarDrag = false
	// 			break
	// 		}
	// 		countInicio++
	// 	}
	// }

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

	//console.log("Eliminar DRAAAAG", eliminarDrag)
	var numeroFlechasEliminar = 0
	for (var jj = 0; jj < listaFlechas.length; jj++) {
		if (listaFlechas[jj].elementoFin === elementoID) {
			// if(eliminarDrag){
			// 	listaFlechas[jj].drag.remove()
			// 	console.log("hagodragable", listaFlechas[jj].elementoInicio.id)
			makeDraggable($(document.getElementById(listaFlechas[jj].elementoInicio)))
			// 	alert("se quita el drag")
			// }

			document.getElementById(listaFlechas[jj].elementoInicio).classList.remove("emparejadoCon-" + elementoID)
			if (eliminar) {
				console.log("Flecha eliminadaaaaaaa")
				listaFlechas[jj].line.remove()
				listaFlechas = listaFlechas.filter(item => item.elementoFin !== elementoID)
			}


			break
		}
	}
}