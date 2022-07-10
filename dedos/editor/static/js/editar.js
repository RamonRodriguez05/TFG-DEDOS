'use strict'

async function iniciarEditar() {
	// Editar 
	console.log("Cargando proyecto a editar")
	let url = window.location.href;
	if (url.includes("/edit/")) {

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

		//console.log("Contenido editar", contenido)



		//document.getElementById("botonGuardar").innerHTML = '<i class="fa-solid fa-floppy-disk"></i></i> Actualizar'
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

		//console.log("El cargar es", cargar)
		//	console.log("El valor valee", cargar)
		document.getElementById("myVar").remove()
		document.getElementById("listaCanvas").innerHTML = ""
		document.getElementById("listaCanvas").innerHTML = cargar
		// console.log("El valor valee", cargar)
		// console.log("areaaa", document.getElementById("editor-canvas_1"))
		// document.getElementById("editor-canvas_1").appendChild(document.getElementById("area1"))

		// Lanzar elementos
		lanzarElementos("area")
		lanzarElementos("card")
		
		lanzarElementos("time")
		lanzarElementos("objetive")
		lanzarElementos("math")
		lanzarElementos("pairing")

		crearFlechas()



		// var el = $(document.getElementById("math1"))

		// 	el.draggable()
		// 	makeDraggable(el);
		// 	makeAreaDroppable(el)
		// 	el.resizable("destroy")
		borrar = false
		lanzar()
		generarListadoActividades()

		evaluarMostrarMenu()

		// html2canvas(document.querySelector("#editor-canvas_2")).then(canvas => { 
		// 	var prueba = document.getElementById("activity_2")
		// 		prueba.appendChild(canvas)});

		//  captura("activity_" + 1, "#editor-canvas_" + 1);
		//  captura("activity_" + 2, "#editor-canvas_" + 2);
		//  captura("activity_" + 3, "#editor-canvas_" + 3);

		cargarImagenes(contenido, nombre) 
		let prueba = cargarImagenesAreasTarjetas(contenido, nombre)
		//console.log("prueba valeeeeeee", prueba)
		




		
		// 	console.log("Lista capturas al editar", listaCapturas)

		// 	for(var cap= 0; cap < listaCapturas.length; listaCapturas++){
		// 		var actividad = filename.split("screenshots/")[1].split("_")[1]
		// 		var prueba = document.getElementById("activity_" + actividad)

		// 	   // 			console.log("entra en lo del zip")
		// 	   // 			//Descomentar
		// 					prueba.appendChild(listaCapturas[cap].file)
		// 	   // 			//document.getElementById("pruebaImagen").appendChild(image);
		//    }
		var myDropzone = document.getElementById("dropzone_1");
		//console.log("listado imagenes dropzone", listaImagenesDropzone)

		
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
		console.log("Actividad", actividades[i].id)
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
		//	captura(activity, canvas)


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

	//	document.getElementById("editor-canvas").classList.add("ocultar")
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
			} else if (nombreClase.includes("picture")) {
				//console.log("el picture es", el)
				dropzoneUpload("dropzone_" + id)
				if (id > num_picture) {
					num_picture = id
				}
			}
		}
	} else {
		for (var i = 0; i < elementos.length; i++) {
			var el = $(document.getElementById(elementos[i].id))
			var idSplit = elementos[i].id.split("_")
			var id = parseInt(idSplit[1]);
			//console.log("id al lanzar es", elementos[i].id)
			//console.log("el padre al lanzar", elementos[i].parentNode.parentNode.id)
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
				//listaSelectores.push(elementoLista)
			}
		}

	}
}


function crearFlechas() {
	// Obtener actividades
	var activities = document.getElementsByClassName("editor-canvas")

	
	//console.log("Los canvasssss activieties sonn", activities)
	for (var i = 0; i < activities.length; i++) {
		// document.getElementById(activities[i].id).classList.remove("ocultar")
		// xml += '  <Activity>\n'

		// var tieneSelectores = false
		// var select = ""
		// Listado con selectores pairing
		var selectoresPairing = document.getElementsByClassName("emparejado#" + activities[i].id)

		for (var pair = 0; pair < selectoresPairing.length; pair++) {








			var mover = false;
			var pairingElemento = ""
			var clases = document.getElementById(selectoresPairing[pair].id).classList

			for (var cl = 0; cl < clases.length; cl++) {
				if (clases[cl].includes("emparejadoCon-")) {
					//if(pairingElemento == ""){
					pairingElemento = document.getElementById(clases[cl].split("-")[1])

					//}
					document.getElementById(selectoresPairing[pair].id).classList.add("emparejadoCon-" + pairingElemento.id)
					document.getElementById(selectoresPairing[pair].id).classList.add("emparejado" + canvas)
					var startElement = document.getElementById(selectoresPairing[pair].id),
						endElement = document.getElementById(pairingElemento.id),
						lineaFinal = new LeaderLine(startElement, endElement);

				
					makeDraggable($(document.getElementById(selectoresPairing[pair].id)))
					//	makeDraggable($(document.getElementById(pairingElemento.id)))
					//var elFlecha = new elementoFlecha(lineaFinal, elementoEmparejar, $item[0].id, drag1)
					var add = true
					
					for(var listArrow = 0; listArrow < listaFlechas.length; listArrow++){
						if(listaFlechas[listArrow].elementoFin == pairingElemento.id && listaFlechas[listArrow].elementoInicio == selectoresPairing[pair].id ){
							add = false
						}
					}

					if(add){
						var elFlecha = new elementoFlecha(lineaFinal, selectoresPairing[pair].id, pairingElemento.id)
						listaFlechas.push(elFlecha)
					}

					
					//console.log("Lista de flechas iniciales editar", listaFlechas)





					//pairingElemento = document.getElementById(clases[cl].split("-")[1])
					document.addEventListener('mousemove', e => {

						try{
						if (mover) {
							console.log("entro mover de  mousemove")
							
							lineaFinal.color = 'rgba(255, 153, 0, 1)';
							
							
							var x = e.clientX;
							var y = e.clientY;


							console.log("El pairing es", pairingElemento)
							//	pairingElemento = document.getElementById("pairing_3")

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
					}catch{}

					});


					document.getElementById(pairingElemento.id).addEventListener("click", e => {
						//console.log("HAGLO CLICK EDITAR")



						var elems = document.elementsFromPoint(e.clientX, e.clientY)
						console.log("HAGLO CLICK EDITAR", elems)

						if (elems[0].id.includes("pairing_")) {

							for (var key2 in listaFlechas) {
								if (listaFlechas[key2].elementoFin == elems[0].id) {
									lineaFinal = listaFlechas[key2].line
								}
							}

							pairingElemento = document.getElementById(elems[0].id)



							var positionPairing2 = document.getElementById(pairingElemento.id).getBoundingClientRect()
							var elems2 = document.elementsFromPoint(positionPairing2.left, positionPairing2.top)
							console.log("Elementossssss detectados al dejar el pairing es", elems2)
							mover = true
							console.log("HAGLO CLICK EDITAR", mover)
							for (var el2 = 0; el2 < elems2.length; el2++) {
								if ((elems2[el2].id.includes("picture_") || elems2[el2].id.includes("card_")) && elems2[el2].id != pairingElemento.id) {
									console.log("Entro en pairing y debo PARAR")

									var unir = true

									for (var flechas = 0; flechas < listaFlechas.length; flechas++) {
										if (listaFlechas[flechas].elementoInicio == elems2[el2].id) {
											unir = false
										}

									}

									if (unir) {
										var width = document.getElementById(elems2[el2].id).offsetWidth + 5

										var height = document.getElementById(elems2[el2].id).offsetHeight + 5
										console.log("width", width, "height", height)
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
								console.log("entro en mover para quitar y seguir")
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
						try{
						for (var flechas = 0; flechas < listaFlechas.length; flechas++) {
							lineaFinal = listaFlechas[flechas].line
							if (editarInicial) {
								lineaFinal.color = 'rgba(0, 128, 0, 1)';
							}

							listaFlechas[flechas].line.position()
							lineaFinal.position();
						}
						editarInicial = false
					}catch{}
					}



					// var startElement = document.getElementById(selectoresPairing[pair].id),
					// 	endElement = document.getElementsByClassName(clases[cl].split("-")[1])[0],
					// 	lineaFinal = new LeaderLine(startElement, endElement);

					// makeDraggable($(document.getElementById(document.getElementById(selectoresPairing[pair].id))))
					// var elFlecha = new elementoFlecha(lineaFinal, selectoresPairing[pair].id, clases[cl].split("-")[1])
					// listaFlechas.push(elFlecha)
					// console.log("Lista de flechas iniciales editar", listaFlechas)

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
				//console.log("El filename", filename)
				promises.push(zip.files[filename].async('base64').then(function (fileData) {

					//console.log("filedataa", filename, fileData)

					var image = new Image();
					var actividad = filename.split("screenshots/")[1].split("_")[1]
					// 		var prueba = document.getElementById("activity_" + actividad)
					image.src = 'data:image/png;base64,' + fileData;
					// 			console.log("entra en lo del zip")
					// 			//Descomentar
					// 			prueba.appendChild(image)
					// 			//document.getElementById("pruebaImagen").appendChild(image);

					//console.log("no se que es el content", image);

					var elCaptura = new elementoCapturaEditar(filename.split("/screenshots/")[1], image, fileData)
					listaCapturasEditar.push(elCaptura)
					//

					var imageFile = new File([fileData], filename.split("/screenshots/")[1], {
						type: "image/png"
					});

					var editorCanvasElementos = document.getElementsByClassName("editor-canvas")
					var previous = "editor-canvas_1"
					for (var canvas = 0; canvas <editorCanvasElementos.length; canvas++) {
						if(editorCanvasElementos[canvas].id != previous){
							document.getElementById(previous).classList.add("ocultar")
						}
						document.getElementById(editorCanvasElementos[canvas].id).classList.remove("ocultar")
						var idCanvas = editorCanvasElementos[canvas].id.split("_")[1]
						captura("activity_" + idCanvas, "#editor-canvas_" + idCanvas)
						previous = editorCanvasElementos[canvas].id
					}
					
					for (var canvas2 = 0; canvas2 <editorCanvasElementos.length; canvas2++) {
						document.getElementById(editorCanvasElementos[canvas2].id).classList.add("ocultar")
					}
					document.getElementById("editor-canvas_1").classList.remove("ocultar")

// 					var ImageURL = 'data:image/png;base64,' + fileData;
// // Split the base64 string in data and contentType
// var block = ImageURL.split(";");
// // Get the content type of the image
// var contentType = block[0].split(":")[1];// In this case "image/gif"
// // get the real base64 content of the file
// var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

// // Convert it to a blob to upload
// var blob = b64toBlob(realData, contentType);

// 					console.log("BLOBBBBBBBBB", blob)
					
// 					elCaptura = new elementoCaptura(filename.split("/screenshots/")[1], blob)
// 					listaCapturas.push(elCaptura)
					counter++;

					return "ok"
				}))
			}

			Promise.all(promises).then(values => {
				for (var cap = 0; cap < listaCapturasEditar.length; cap++) {
					try{
					var actividad = listaCapturasEditar[cap].canvas.split("_")[1].replace(".png", "")
					var prueba = document.getElementById("activity_" + actividad)

					//console.log("el prueba es", prueba)
					// 			//Descomentar

					prueba.appendChild(listaCapturasEditar[cap].file) 


					var imageFile = new File([listaCapturasEditar[cap].base64], filename.split("/screenshots/")[1], {
						type: "image/png"
					});

					var elCaptura = new elementoCaptura(filename.split("/screenshots/")[1], imageFile)
					//listaCapturas.push(elCaptura)
					// 			//document.getElementById("pruebaImagen").appendChild(image);
				}catch{}
				}



				// var listar = true
				// for(var pr = 0; pr < promises; pr++){
				// 	if(promises[pr] != "ok"){
				// 		listar = false
				// 	}
				// }

				// if(listar && counter == promises.length && counter == listaCapturas.length + 1){
				// 	console.log("ha terminado bien", promises.length, counter, listaCapturas.length)


				// 	for (var cap = 0; cap < listaCapturas.length; cap++) {
				// 		var actividad = listaCapturas[cap].canvas.split("_")[1].replace(".png", "")
				// 		var prueba = document.getElementById("activity_" + actividad)

				// 		console.log("el prueba es", prueba)
				// 		// 			//Descomentar
				// 		listaCapturas = listaCapturas
				// 		prueba.appendChild(listaCapturas[cap].file)
				// 		// 			//document.getElementById("pruebaImagen").appendChild(image);
				// 	}
				// 	console.log(listaCapturas)
				// }else{
				// 	console.log("no ha terminado")
				// }

			}, reason => {
				console.log("fallo", reason)
			});



		})
		return "ok"
	}))


	// var zip = new JSZip();
	// zip.loadAsync(contenido, { base64: true }).then(function (zip) {
	//     try {
	//         zip.file('2/screenshots/previewactivity_2.png')
	//             .async("base64")
	//             .then(function (content) {
	//                 var image = new Image();
	//                 image.src = 'data:image/png;base64,' + content;

	//                 //Descomentar
	//                 document.getElementById("pruebaImagen").appendChild(image);

	//                // console.log(content);

	//             });
	//     } catch { }

	// }, function (e) {
	//     console.log("Error reading " + file.name + " : " + e.message);
	// });



}

function cargarImagenesAreasTarjetas(contenido, nombre) {
	const promises = [];
	var counter = 0

	promises.push(JSZip.loadAsync(contenido, { base64: true }).then(function (zip) {
		counter++
		Object.keys(zip.files).forEach(function (filename) {
			if (filename.includes("/contents/") && filename != nombre + "/contents/") {
				//console.log("El filename", filename)
				promises.push(zip.files[filename].async('base64').then(function (fileData) {
					//console.log("filedataa", filename, fileData)
					var image = new Image();
					image.src = 'data:image/png;base64,' + fileData;
					var p = dataURLtoFile(image.src, filename.split("/contents/")[1])
					listaImagenesAreas.push(p)
					counter++;
		 			//console.log("La imagen es", image)
					return "ok"
				}))
			}

			Promise.all(promises).then(values => {
				console.log("las imanages de las areas son", listaImagenesAreas, counter, promises)
				for (var img = 0; img < listaImagenesAreas.length; img++) {
					var elementosImagenes = document.getElementsByClassName(listaImagenesAreas[img].name)
					for (var el= 0; el < elementosImagenes.length; el++){
						var id = elementosImagenes[el].id.split("_")[1]
						var src1 = URL.createObjectURL(listaImagenesAreas[img]);					
						console.log("el src", src1)
						document.getElementById("area_" + id).style.backgroundImage = 'url(' + src1 + ')';

						
					}

					var elementosImagenesDZ = document.getElementsByClassName("DZ_" +listaImagenesAreas[img].name)
					console.log("Élementos con DZ clase", elementosImagenesDZ)
					for (var dz= 0; dz < elementosImagenesDZ.length; dz++){
						var add = true
						for(var drop = 0; drop < listaImagenesDropzone.length; drop++){
							if(listaImagenesDropzone[drop].file == listaImagenesAreas[img] && listaImagenesDropzone[drop].id == elementosImagenesDZ[dz].id){
								add = false
								break;
							}
						}

						if(add){
							var elFile = new elementoFileDropzone(elementosImagenesDZ[dz].id, listaImagenesAreas[img])
							listaImagenesDropzone.push(elFile)	
						}
						 

						
					}
					console.log("listado dropzone", listaImagenesDropzone)
					//DZ

					// var myDropzone = document.getElementById("dropzone_1")
					// var existingFiles = [
					// 	{ name: listaImagenesAreas[img].name, size: listaImagenesAreas[img].size }
					// ]
			
					// for (var i = 0; i < existingFiles.length; i++) {
					// 	myDropzone.emit("addedfile", existingFiles[i]);
					// 	myDropzone.emit("thumbnail", existingFiles[i], "/image/url");
					// 	myDropzone.emit("complete", existingFiles[i]);                
					// }
					
				}
				
				if(promises.length - 1 == listaImagenesAreas.length){
					console.log("promesas-listaareas", promises.length -1, listaImagenesAreas)
					lanzarElementos("picture")
				}
				
				console.log("ok promises")
			return "ok promises"
				/*
					const fileName = src1.split('/').pop();
					var	 el = document.createElement("a");
					el.setAttribute("href", src1);
					el.setAttribute("download", fileName);
					document.body.appendChild(el);
					el.click();
					el.remove();
					*/
			}, reason => {
				console.log("fallo", reason)
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
		
	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	
	return new File([u8arr], filename, {type:mime});
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

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}