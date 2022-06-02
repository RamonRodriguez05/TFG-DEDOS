'use strict'

$(document).ready(function () {
    $('#tablaMisProyectos').DataTable({
        "aLengthMenu": [[2, 5, 10, 20, 30, 40, 50, 100, -1], [2, 5, 10, 20, 30, 40, 50, 100, "Todos"]],
        "iDisplayLength": -1,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "columns": [
            { "width": "5px", "visible": false },
            { "width": "5px", "visible": false },
            { "width": "750px" },
            { "width": "500px" },
            { "width": "300px" },
            { "width": "100px" },
            { "width": "30px" },
            { "width": "250px" },
            { "width": "30px" },
            { "orderable": false },
            { "orderable": false },
            { "orderable": false }
        ],
        columnDefs: [
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                render: function (data, type, row) {
                    if (data == "True") {
                        return "Privado"
                    } else {
                        return "Público"
                    }

                },
                targets: 6,
            }
        ],
    });

    $('#tablaTodosProyectos').DataTable({
        "aLengthMenu": [[2, 5, 10, 20, 30, 40, 50, 100, -1], [2, 5, 10, 20, 30, 40, 50, 100, "Todos"]],
        "iDisplayLength": -1,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "columns": [
            { "width": "5px", "visible": false },
            { "width": "5px", "visible": false },
            { "width": "750px" },
            { "width": "500px" },
            { "width": "300px" },
            { "width": "100px" },
            { "width": "30px" },
            { "width": "500px" },
            { "width": "30px" },
            { "orderable": false },
            { "orderable": false },
            { "orderable": false }
        ],
        columnDefs: [
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                render: function (data, type, row) {
                    if (data == "True") {
                        return "Privado"
                    } else {
                        return "Público"
                    }

                },
                targets: 6,
            }
        ],

    });

  

    var myVar = document.getElementById("myVar2").value;
		var procesado = myVar.split("QuerySet")
		var cargar = procesado[1]

		cargar = cargar.replace(/\\t/g, " ");
		cargar = cargar.replace(/\\n/g, " ");
		cargar = cargar.replace(/\\r/g, " ");
		cargar = cargar.replace(/[']/g, "");
		cargar = cargar.replace("[(", "")
		cargar = cargar.replace(",)]>", "") 
    
        var zip = new JSZip();	
       
       var buffer = base64ToBuffer(cargar);
        zip.file("d/", buffer)
    //	var zip = new JSZip(buffer);
    zip.file("Hello.txt", "Hello World\n");

// base64
zip.file("smile.gif", "R0lGODdhBQAFAIACAAAAAP/eACwAAAAABQAFAAACCIwPkWerClIBADs=", {base64: true});
    zip.generateAsync({type : "blob"}).then(function(content){

	

        	console.log("Content es", content)
        // 	saveAs(content, "prueba.zip")
        
          });

    	
    console.log("my var proyectos es", cargar) 
    console.log("decodificado",zip); 


    //



// Start file download.
download("zip1.zip", cargar); 
window.location.href = "http://127.0.0.1:8000/editor/proyectos";

});

function download(filename, data) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;base64,' + data);
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }



function base64ToBuffer(str){
    str = window.atob(str); // creates a ASCII string
    var buffer = new ArrayBuffer(str.length),
        view = new Uint8Array(buffer);
    for(var i = 0; i < str.length; i++){
        view[i] = str.charCodeAt(i);
    }
    return buffer;
}

