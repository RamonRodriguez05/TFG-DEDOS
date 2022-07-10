'use strict'

function fijarPicture(input) {
	var parentDiv = $(input).parent();
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
			url: "/editor/editor", 
			headers: { 'X-CSRFToken': csrftoken },
			paramName: "file", 
			maxFiles: 15,
			acceptedFiles: ".jpeg,.jpg,.png,.gif",
			maxFilesize: 100, // MB
			addRemoveLinks: true,
			dictRemoveFile: "x",

			accept: function (file, done) {
				done()
				var elFile = new elementoFileDropzone(id, file)
				listaImagenesDropzone.push(elFile)
				document.getElementById(id).classList.add("DZ_" + file.name.replace(" ", ""))
				captura(activity, canvas)
			},
			removedfile: function (file) {
				document.getElementById(id).classList.remove("DZ_" + file.name)
				listaImagenesDropzone = listaImagenesDropzone.filter(item => !(item.file.name == file.name));
				listaImagenesAreas = listaImagenesAreas.filter(item => !(item.name == file.name));
				var _ref;
				return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
			}
		});
		var existingFiles = [];
		var listaImagenesDropzoneAux = listaImagenesDropzone.filter(item => (item.id == myDropzone.clickableElements[0].id));

		for (var aux = 0; aux < listaImagenesDropzoneAux.length; aux++) {
			var auxNuevo = new elementoFileDropzoneEditar(listaImagenesDropzoneAux[aux].file.name, listaImagenesDropzoneAux[aux].file.size, listaImagenesDropzoneAux[aux].file)
			existingFiles.push(auxNuevo)
		}

		for (var i = 0; i < existingFiles.length; i++) {
			var src1 = URL.createObjectURL(existingFiles[i].file);
			listaImagenesAreas = listaImagenesAreas.filter(item => !(item.name == existingFiles[i].name));
			myDropzone.emit("addedfile", existingFiles[i]);
			myDropzone.emit("thumbnail", existingFiles[i], src1);
			myDropzone.emit("complete", existingFiles[i]);
		}
		done()
	} catch (error) {}
}

function getBase64(file) {
	var reader = new FileReader();
	reader.onload = function () {
		base64String = reader.result.replace("data:", "")
			.replace(/^.+,/, "");
		imageBase64Stringsep = base64String;
	}
	reader.readAsDataURL(file);
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