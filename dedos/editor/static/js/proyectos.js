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
            { "width": "200px" },
            { "width": "100px" },
            { "width": "100px" },
            { "width": "100px" },
            { "width": "80px" },
            { "width": "100px" },
            { "width": "500px" },
            { "orderable": false },
            { "orderable": false },
            { "orderable": false }
        ],
        columnDefs: [
            {
                render: function (data, type, row) {
                    if (data == "True") {
                        return "Privado"
                    } else {
                        return "Público"
                    }
                },
                targets: 7,
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
            { "width": "2000px" },
            { "width": "100px" },
            { "width": "100px" },
            { "width": "100px" },
            { "width": "30px" },
            { "width": "150px" },
            { "width": "30px" },
            { "orderable": false },
            { "orderable": false }
        ],
    });

    var myVar = document.getElementById("myVar2").value;
    var nombre = document.getElementById("myVar3").value;
    var procesado = myVar.split("QuerySet")
    var nombreProcesado = nombre.split("QuerySet")
    var cargar = procesado[1]
    var nombreZip = nombreProcesado[1]

    if (cargar != undefined) {
        cargar = cargar.replace(/\\t/g, " ");
        cargar = cargar.replace(/\\n/g, " ");
        cargar = cargar.replace(/\\r/g, " ");
        cargar = cargar.replace(/[']/g, "");
        cargar = cargar.replace("[(", "")
        cargar = cargar.replace(",)]>", "")

        nombreZip = nombreZip.replace(/\\t/g, " ");
        nombreZip = nombreZip.replace(/\\n/g, " ");
        nombreZip = nombreZip.replace(/\\r/g, " ");
        nombreZip = nombreZip.replace(/[']/g, "");
        nombreZip = nombreZip.replace(" [(", "")
        nombreZip = nombreZip.replace(",)]>", "")

        // Descargar
        download(nombreZip + ".zip", cargar);
        window.location.href = "http://127.0.0.1:8000/editor/proyectos";
    }

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

function base64ToBuffer(str) {
    str = window.atob(str); 
    var buffer = new ArrayBuffer(str.length),
        view = new Uint8Array(buffer);
    for (var i = 0; i < str.length; i++) {
        view[i] = str.charCodeAt(i);
    }
    return buffer;
}

function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}


async function getAllEntries(zipReader, options) {
    let entries = await zipReader.getEntries(options);
    entries = await Promise.all(entries.map(async entry => {
        if (entry.filename.toLowerCase().endsWith(".zip")) {
            const innerZipReader = new zip.ZipReader(new zip.BlobReader(await entry.getData(new zip.BlobWriter())));
            return getAllEntries(innerZipReader, options);
        } else {
            return entry;
        }
    }));
    return entries.flat();
}