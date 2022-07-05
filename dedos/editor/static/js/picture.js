'use strict'

function fijarPicture(input) {
	var parentDiv = $(input).parent();
	//	console.log("title texto", parentDiv)
	parentDiv.appendTo($('#source2'))
	$('#source2 div').appendTo($('#source2'));
	parentDiv.draggable();
	if (fix) {

		var clases = parentDiv.attr("class") + " fixed picture"
		parentDiv.attr("class", clases)

		parentDiv.draggable("disable");
	} else {

		var clases = parentDiv.attr("class") + " fixed picture"
		parentDiv.attr("class", clases)
		
		parentDiv.draggable("enable");
	}


}

function mostrarConfigPicture(input) {
	var parentDiv = $(input).parent();
	var hijo = parentDiv.children(0).children(7).context.id
	var splitData = hijo.split('_')
	var idd = "backImage_" + splitData[2].toString();
	var idd2 = "formDropzone_" + splitData[2].toString();
	var idd3 = "titleImage_" + splitData[2].toString();
	let menu = document.getElementById(idd);
	let menu2 = document.getElementById(idd2);
	let menu3 = document.getElementById(idd3);

	if (menu.classList.contains("ocultar")) {
		menu.classList.remove("ocultar")
		menu2.classList.add("ocultar")
		menu3.classList.add("ocultar")
		menu.classList.add("inputTextRetroalimentacion")
	} else {
		menu.classList.add("ocultar")
		menu2.classList.remove("ocultar")
		menu3.classList.remove("ocultar")
	}
}

function evaluarTabImage(evt, element) {
	//	console.log("Entro evaluarTabImage", element)

	var deseleccionar = []

	var elementID = element.id.split("_")[1];
	var elementooo = element.id

	var Acciones = "AccionesImage_" + elementID;
	var Feedback = "FeedbackImage_" + elementID;
	var Matematicas = "MatematicasImage_" + elementID;

	if (element.id.includes(Acciones)) {
		deseleccionar[0] = Feedback
		deseleccionar[1] = Matematicas
	}

	if (element.id.includes(Feedback)) {
		deseleccionar[0] = Acciones
		deseleccionar[1] = Matematicas
	}

	if (element.id.includes(Matematicas)) {
		deseleccionar[0] = Feedback
		deseleccionar[1] = Acciones
	}
	evalutarTab(Acciones, evt, element, deseleccionar)
	evalutarTab(Feedback, evt, element, deseleccionar)
	evalutarTab(Matematicas, evt, element, deseleccionar)
} 

// Crear dropzone
function dropzoneUpload(id) {

	try {

		var myDropzone = new Dropzone("#" + id, {
			url: "/editor/editor", // Set the url for your upload script location
			headers: { 'X-CSRFToken': csrftoken },
			paramName: "file", // The name that will be used to transfer the file
			maxFiles: 10,
			acceptedFiles: ".jpeg,.jpg,.png,.gif",
			maxFilesize: 100, // MB
			addRemoveLinks: true,
			dictRemoveFile: "x",

			accept: function (file, done) {
				console.log("el file en el dropzone a subir es", file)
				done()
				var elFile = new elementoFileDropzone(id, file)
				listaImagenesDropzone.push(elFile) 
				
				console.log("lista files dropzone", listaImagenesDropzone, id)
				document.getElementById(id).classList.add("DZ_" + file.name)

				/*
				var zip = new JSZip(); 
				zip.file("contents/" + file.name , file);
	
				zip.generateAsync({ type: "blob" }).then(function (content) {
	
	
	
					//	console.log("Content es", content)
					//	saveAs(content, "prueba.zip")
	
				});
			//	generarZIP()
			*/
				captura(activity, canvas)
			}, 
			removedfile: function(file) {
				console.log("Borrar fichero", file.name)
				document.getElementById(id).classList.remove("DZ_" + file.name)
				listaImagenesDropzone = listaImagenesDropzone.filter(item => !(item.file.name == file.name));
				console.log("lista files dropzone", listaImagenesDropzone)	
				var _ref;
    			return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
			}
		});
		console.log("Dropzone creado es", myDropzone)
	} catch (error) {
		//	console.log("No se crea dropzone")
	}
}