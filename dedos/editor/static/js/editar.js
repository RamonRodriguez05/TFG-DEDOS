'use strict'

async function iniciarEditar() {
	// Editar 
	
	let url = window.location.href;
	if (url.includes("/edit/")) {
		console.log("Cargando proyecto a editar")

		// Obtener valores e inicializarlo
		var nombre = elminarCarateres(document.getElementById("nombreEditar").value)
		document.getElementById("nombre").value = nombre.trim()

		var descripcion = elminarCarateres(document.getElementById("descripcionEditar").value)
		document.getElementById("descripcion").value = descripcion.trim()

		var curso = elminarCarateres(document.getElementById("cursoEditar").value)
		document.getElementById("curso").value = curso.trim()

		var asignatura = elminarCarateres(document.getElementById("asignaturaEditar").value)
		document.getElementById("asignatura").value = asignatura.trim()

		var etiquetas = elminarCarateres(document.getElementById("etiquetasEditar").value)
		var etiquetasSplit = etiquetas.split(",")
		for (var et = 0; et < etiquetasSplit.length; et++) {
			var data = {
				id: etiquetasSplit[et],
				text: etiquetasSplit[et]
			};
			var newOption = new Option(data.text, data.id, true, true);
			$('#etiquetas').append(newOption).trigger('change');
		}

		var privacidad = elminarCarateres(document.getElementById("privacidadEditar").value)
		if (privacidad == "True") {
			document.getElementById("privado").checked = true
			document.getElementById("publico").checked = false
		} else {
			document.getElementById("privado").checked = false
			document.getElementById("publico").checked = true
		}

		var contenido = elminarCarateres(document.getElementById("contenidoEditar").value)

		borrar = true
		lanzar()
		var myVar = document.getElementById("myVar").value;
		var procesado = myVar.split("QuerySet")
		var cargar = procesado[1]

		cargar = cargar.replace(/\\t/g, " ");
		cargar = cargar.replace(/\\n/g, " ");
		cargar = cargar.replace(/\\r/g, " ");
		cargar = cargar.replace(/[']/g, "");
		cargar = cargar.replace("[(", "")
		cargar = cargar.replace(",)]>", "")

		cargar = cargar.replace('<div id="listaCanvas">', "")
		cargar = cargar.substring(0, cargar.length - 6);
		cargar = cargar.replace('left: 20px; bottom: -15px; margin-bottom: -15px; position: relative;', 'left: 20px; bottom:-2px; margin-bottom: -15px; position:relative')
		cargar = cargar.replace('left: 20px; bottom: -5px; margin-bottom: -15px; position: relative;', 'left: 20px; bottom:-2px; margin-bottom: -15px; position: relative;')

		document.getElementById("myVar").remove()
		document.getElementById("listaCanvas").innerHTML = ""
		document.getElementById("listaCanvas").innerHTML = cargar

		// Lanzar elementos
		lanzarElementos("area")
		lanzarElementos("card")
		lanzarElementos("time")
		lanzarElementos("objetive")
		lanzarElementos("math")
		lanzarElementos("pairing")
		crearFlechas()

		borrar = false
		lanzar()
		generarListadoActividades()
		evaluarMostrarMenu()
		cargarImagenes(contenido, nombre)
		cargarImagenesAreasTarjetas(contenido, nombre)
	}
}

function replaceAll(string, search, replace) {
	return string.split(search).join(replace);
}

function elminarCarateres(dato) {
	var procesado = dato.split("QuerySet")
	var cargar = procesado[1]
	cargar = cargar.replace("[(", "")
	cargar = cargar.replace(",)]>", "")
	cargar = replaceAll(cargar, "'", "")

	return cargar.trim();
}

function generarListadoActividades() {
	var actividades = document.getElementsByClassName("editor-canvas")
	for (var i = 0; i < actividades.length; i++) {
		actividades[i].classList.add("ocultar")
		if (i == 0) {
			activity = "activity_" + 1;
			canvas = "#editor-canvas_" + 1
			previousCanvas = canvas
			actividades[i].classList.remove("ocultar")
		} else {
			AddActivityEdit(actividades[i].id.split("_")[1])
			canvas = "#editor-canvas_" + (i + 1)
			activity = "activity_" + (i + 1);
			var canvas3 = $(document.getElementById(canvas.replace("#", "")))
			canvas3.droppable()
			borrar = false
			lanzar()

		}
	}
	activity = "activity_" + 1;
	canvas = "#editor-canvas_" + 1
	previousCanvas = canvas
}


function AddActivityEdit(id) {
	var li = original.cloneNode(false)
	li.id = "activity_" + id;
	li.innerHTML = '<div class="deleteActivity" onclick="eliminarActividad($(this))" >x</div>';
	document.getElementById("sortable").appendChild(li)
	borrar = false
	lanzar()
	num_activity++;
}

function lanzarElementos(nombreClase) {
	var elementos = document.getElementsByClassName(nombreClase)

	if (nombreClase == "area" || nombreClase == "card" || nombreClase == "picture") {

		for (var i = 0; i < elementos.length; i++) {
			var el = $(document.getElementById(elementos[i].id))
			var id = parseInt(elementos[i].id.split("_")[1]);
			makeAreaDroppable(el)
			makeDraggable(el);
			el.resizable("destroy")
			el.resizable()
			el.resizable("enable")
			makeDraggable(el);

			if (nombreClase.includes("area")) {
				if (id > num_area) {
					num_area = id
				}
			} else if (nombreClase.includes("card")) {
				if (id > num_card) {
					num_card = id
				}
				var clickable = document.getElementById("Seleccionable_" + id).getAttribute("checked"); 
				var rotatable = document.getElementById("Girable_" + id).getAttribute("checked");
				var resizable = document.getElementById("Redimensionable_" + id).getAttribute("checked");
				 
				if(clickable == "false"){
					document.getElementById("Seleccionable_" + id).checked = false
				}else{
					document.getElementById("Seleccionable_" + id ).checked = true
				}

				if(rotatable == "false"){
					document.getElementById("Girable_" + id).checked = false
				}else{
					document.getElementById("Girable_" + id).checked = true
				}

				if(resizable == "false"){
					document.getElementById("Redimensionable_" + id).checked = false
				}else{
					document.getElementById("Redimensionable_" + id).checked = true
				}
				
			//document.getElementById("Girable_1").checked = false
			} else if (nombreClase.includes("picture")) {
				dropzoneUpload("dropzone_" + id)
				if (id > num_picture) {
					num_picture = id
				}

				var clickableImage = document.getElementById("SeleccionableImage_" + id).getAttribute("checked"); 
				var rotatableImage = document.getElementById("GirableImage_" + id).getAttribute("checked");
				var resizableImage = document.getElementById("RedimensionableImage_" + id).getAttribute("checked");
				 
				if(clickableImage == "false"){
					document.getElementById("SeleccionableImage_" + id).checked = false
				}else{
					document.getElementById("SeleccionableImage_" + id ).checked = true
				}

				if(rotatableImage == "false"){
					document.getElementById("GirableImage_" + id).checked = false
				}else{
					document.getElementById("GirableImage_" + id).checked = true
				}

				if(resizableImage == "false"){
					document.getElementById("RedimensionableImage_" + id).checked = false
				}else{
					document.getElementById("RedimensionableImage_" + id).checked = true
				}
			}
		}
	} else {
		for (var i = 0; i < elementos.length; i++) {
			var el = $(document.getElementById(elementos[i].id))
			var idSplit = elementos[i].id.split("_")
			var id = parseInt(idSplit[1]);
			el.draggable()
			makeDraggable(el);
			el.resizable("destroy")
			var elementoLista = new elementoSelectores(elementos[i].parentNode.parentNode.id, elementos[i].id)
			if (nombreClase.includes("time")) {
				if (id > num_time) {
					num_time = id
				}
			} else if (nombreClase.includes("objetive")) {
				if (id > num_objetive) {
					num_objetive = id
				}
				listaSelectores.push(elementoLista)
			} else if (nombreClase.includes("math")) {
				if (id > num_math) {
					num_math = id
				}
				listaSelectores.push(elementoLista)
			} else if (nombreClase.includes("pairing")) {
				if (id > num_pairing) {
					num_pairing = id
				}
			}
		}
	}
}


function crearFlechas() {
	// Obtener actividades
	var activities = document.getElementsByClassName("editor-canvas")

	for (var i = 0; i < activities.length; i++) {
		var selectoresPairing = document.getElementsByClassName("emparejado#" + activities[i].id)

		for (var pair = 0; pair < selectoresPairing.length; pair++) {
			var mover = false;
			var pairingElemento = ""
			var clases = document.getElementById(selectoresPairing[pair].id).classList

			for (var cl = 0; cl < clases.length; cl++) {
				if (clases[cl].includes("emparejadoCon-")) {
					pairingElemento = document.getElementById(clases[cl].split("-")[1])
					document.getElementById(selectoresPairing[pair].id).classList.add("emparejadoCon-" + pairingElemento.id)
					document.getElementById(selectoresPairing[pair].id).classList.add("emparejado" + canvas)
					var startElement = document.getElementById(selectoresPairing[pair].id),
						endElement = document.getElementById(pairingElemento.id),
						lineaFinal = new LeaderLine(startElement, endElement);

					makeDraggable($(document.getElementById(selectoresPairing[pair].id)))
					var add = true

					for (var listArrow = 0; listArrow < listaFlechas.length; listArrow++) {
						if (listaFlechas[listArrow].elementoFin == pairingElemento.id && listaFlechas[listArrow].elementoInicio == selectoresPairing[pair].id) {
							add = false
						}
					}

					if (add) {
						var elFlecha = new elementoFlecha(lineaFinal, selectoresPairing[pair].id, pairingElemento.id)
						listaFlechas.push(elFlecha)
					}

					document.addEventListener('mousemove', e => {
						try {
							if (mover) {
								lineaFinal.color = 'rgba(255, 153, 0, 1)';

								var x = e.clientX;
								var y = e.clientY;

								pairingElemento.style.left = x - 245
								pairingElemento.style.top = y - 80
								pairingElemento.style = "z-index:500; left:" + (x) + ";top:" + (y) + ";"

								var positionPairing2 = document.getElementById(pairingElemento.id).getBoundingClientRect()
								var elems2 = document.elementsFromPoint(positionPairing2.left, positionPairing2.top)
								mover = true
								for (var el2 = 0; el2 < elems2.length; el2++) {
									if ((elems2[el2].id.includes("picture_") || elems2[el2].id.includes("card_")) && elems2[el2].id != pairingElemento.id) {
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
						} catch { }
					});


					document.getElementById(pairingElemento.id).addEventListener("click", e => {
						var elems = document.elementsFromPoint(e.clientX, e.clientY)

						if (elems[0].id.includes("pairing_")) {
							for (var key2 in listaFlechas) {
								if (listaFlechas[key2].elementoFin == elems[0].id) {
									lineaFinal = listaFlechas[key2].line
								}
							}

							pairingElemento = document.getElementById(elems[0].id)
							var positionPairing2 = document.getElementById(pairingElemento.id).getBoundingClientRect()
							var elems2 = document.elementsFromPoint(positionPairing2.left, positionPairing2.top)
							mover = true
							for (var el2 = 0; el2 < elems2.length; el2++) {
								if ((elems2[el2].id.includes("picture_") || elems2[el2].id.includes("card_")) && elems2[el2].id != pairingElemento.id) {
									var unir = true

									for (var flechas = 0; flechas < listaFlechas.length; flechas++) {
										if (listaFlechas[flechas].elementoInicio == elems2[el2].id) {
											unir = false
										}
									}

									if (unir) {
										var width = document.getElementById(elems2[el2].id).offsetWidth + 5
										var height = document.getElementById(elems2[el2].id).offsetHeight + 5

										document.getElementById(pairingElemento.id).style = "width:" + width + "px;height:" + height + "px; position: absolute; left: -4px; top: -4px;z-index:-222"
										document.getElementById(elems2[el2].id).appendChild(document.getElementById(pairingElemento.id))
										document.getElementById(elems2[el2].id).classList.add("ElementoFinal")
										document.getElementById(elems2[el2].id).classList.add(pairingElemento.id)
										lineaFinal.color = 'rgba(0, 128, 0, 1)';
										mover = false
									}
								}
							}

							if (mover) {
								evaluarFlechasClases(pairingElemento.id, false)
								document.getElementById(pairingElemento.id).style = "width:" + 30 + "px;height:" + 30 + "px; position: absolute;"
								document.getElementById(canvas.replace("#", "")).appendChild(pairingElemento)
								for (var key in listaFlechas) {
									if (listaFlechas[key].elementoFin == pairingElemento.id) {
										lineaFinal = listaFlechas[key].line
									}
								}
							}
						}
					});

					function fixLine() {
						try {
							for (var flechas = 0; flechas < listaFlechas.length; flechas++) {
								lineaFinal = listaFlechas[flechas].line

								if (editarInicial) {
									lineaFinal.color = 'rgba(0, 128, 0, 1)';
								}

								listaFlechas[flechas].line.position()
								lineaFinal.position();
							}
							editarInicial = false
						} catch { }
					}
				}
			}
		}
	}
}

function cargarImagenes(contenido, nombre) {
	const promises = [];
	var counter = 0

	promises.push(JSZip.loadAsync(contenido, { base64: true }).then(function (zip) {
		counter++
		Object.keys(zip.files).forEach(function (filename) {
			if (filename.includes("/screenshots/") && filename != nombre + "/screenshots/") {
				promises.push(zip.files[filename].async('base64').then(function (fileData) {
					var image = new Image();
					var actividad = filename.split("screenshots/")[1].split("_")[1]
					image.src = 'data:image/png;base64,' + fileData;
					var elCaptura = new elementoCapturaEditar(filename.split("/screenshots/")[1], image, fileData)
					listaCapturasEditar.push(elCaptura)
					
					var imageFile = new File([fileData], filename.split("/screenshots/")[1], {
						type: "image/png"
					});

					var editorCanvasElementos = document.getElementsByClassName("editor-canvas")
					var previous = "editor-canvas_1"
					for (var canvas = 0; canvas < editorCanvasElementos.length; canvas++) {
						if (editorCanvasElementos[canvas].id != previous) {
							document.getElementById(previous).classList.add("ocultar")
						}
						document.getElementById(editorCanvasElementos[canvas].id).classList.remove("ocultar")
						var idCanvas = editorCanvasElementos[canvas].id.split("_")[1]
						captura("activity_" + idCanvas, "#editor-canvas_" + idCanvas)
						previous = editorCanvasElementos[canvas].id
					}

					for (var canvas2 = 0; canvas2 < editorCanvasElementos.length; canvas2++) {
						document.getElementById(editorCanvasElementos[canvas2].id).classList.add("ocultar")
					}
					document.getElementById("editor-canvas_1").classList.remove("ocultar")
					counter++;

					return "ok"
				}))
			}

			Promise.all(promises).then(values => {
				for (var cap = 0; cap < listaCapturasEditar.length; cap++) {
					try {
						var actividad = listaCapturasEditar[cap].canvas.split("_")[1].replace(".png", "")
						var prueba = document.getElementById("activity_" + actividad)
						prueba.appendChild(listaCapturasEditar[cap].file)
						var imageFile = new File([listaCapturasEditar[cap].base64], filename.split("/screenshots/")[1], {
							type: "image/png"
						});
						var elCaptura = new elementoCaptura(filename.split("/screenshots/")[1], imageFile)
					} catch { }
				}
			}, reason => {
			});
		})
		return "ok"
	}))
}

function cargarImagenesAreasTarjetas(contenido, nombre) {
	const promises = [];
	var counter = 0

	promises.push(JSZip.loadAsync(contenido, { base64: true }).then(function (zip) {
		counter++
		Object.keys(zip.files).forEach(function (filename) {
			if (filename.includes("/contents/") && filename != nombre + "/contents/") {
				promises.push(zip.files[filename].async('base64').then(function (fileData) {
					var image = new Image();
					image.src = 'data:image/png;base64,' + fileData;
					var p = dataURLtoFile(image.src, filename.split("/contents/")[1])
					listaImagenesAreas.push(p)
					counter++;

					return "ok"
				}))
			}

			Promise.all(promises).then(values => {
				for (var img = 0; img < listaImagenesAreas.length; img++) {
					var elementosImagenes = document.getElementsByClassName(listaImagenesAreas[img].name)
					for (var el = 0; el < elementosImagenes.length; el++) {
						var id = elementosImagenes[el].id.split("_")[1]
						var src1 = URL.createObjectURL(listaImagenesAreas[img]);
						document.getElementById("area_" + id).style.backgroundImage = 'url(' + src1 + ')';
					}

					var elementosImagenesDZ = document.getElementsByClassName("DZ_" + listaImagenesAreas[img].name)
					for (var dz = 0; dz < elementosImagenesDZ.length; dz++) {
						var add = true
						for (var drop = 0; drop < listaImagenesDropzone.length; drop++) {
							if (listaImagenesDropzone[drop].file == listaImagenesAreas[img] && listaImagenesDropzone[drop].id == elementosImagenesDZ[dz].id) {
								add = false
								break;
							}
						}

						if (add) {
							var elFile = new elementoFileDropzone(elementosImagenesDZ[dz].id, listaImagenesAreas[img])
							listaImagenesDropzone.push(elFile)
						}
					}
				}

				if (promises.length - 1 == listaImagenesAreas.length) {
					lanzarElementos("picture")
				}

				return "ok promises"
			}, reason => {
			});
		})
		return "ok"
	}))
}

function dataURLtoFile(dataurl, filename) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
}

function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;
	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}
		var byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	return new Blob(byteArrays, { type: contentType });
}