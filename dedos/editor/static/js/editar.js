'use strict'

function iniciarEditar() {
	// Editar 
	console.log("Cargando proyecto a editar")
	let url = window.location.href;
	if (url.includes("/edit/")) {
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
		cargar = cargar.replace('left: 20px; bottom: -15px; margin-bottom: -15px; position: relative;', 'left: 20px; bottom:-2px; margin-bottom: -15px;')
		cargar = cargar.replace('left: 20px; bottom: -5px; margin-bottom: -15px; position: relative;', 'left: 20px; bottom:-2px; margin-bottom: -15px; position: relative;')


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
		lanzarElementos("picture")
		lanzarElementos("time")
		lanzarElementos("objetive")
		lanzarElementos("math") 

		// var el = $(document.getElementById("math1"))
			
		// 	el.draggable()
		// 	makeDraggable(el);
		// 	makeAreaDroppable(el)
		// 	el.resizable("destroy")
		borrar = false
		lanzar()
		generarListadoActividades()
		
		

		// html2canvas(document.querySelector("#editor-canvas_2")).then(canvas => { 
		// 	var prueba = document.getElementById("activity_2")
		// 		prueba.appendChild(canvas)});

		//  captura("activity_" + 1, "#editor-canvas_" + 1);
		//  captura("activity_" + 2, "#editor-canvas_" + 2);
		//  captura("activity_" + 3, "#editor-canvas_" + 3);
	



	}
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
				console.log("el picture es", el)
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
			console.log("id al lanzar es", elementos[i].id)
			console.log("el padre al lanzar", elementos[i].parentNode.parentNode.id)
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
			}
		}

	}
}