'use strict'

// Guardar datos
$(document).ready(function () {

    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }

    
    $('#submit').on('click', function () {
        var nombre = $('#nombre').val();
        var asignatura = $('#asignatura').val();
        var curso = $('#curso').val();
        var etiquetas = '' + $("#etiquetas").val() + '';
        var descripcion = $('#descripcion').val();
        etiquetas = replaceAll(etiquetas, ",", ", ")
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var fecha = yyyy + '-' + mm + '-' + dd;
        var contenidoZIP = ""

        var zip = generarZIP(nombre)

        zip.generateAsync({ type: "blob" }).then(function (content) {
            var reader = new FileReader();
            reader.readAsDataURL(content);
            reader.onloadend = function () {
                var base64String = reader.result;
                var splitbase = base64String.split("base64,")
                contenidoZIP = splitbase[1]
                var ele = document.getElementsByName('privacidad');

                for (var i = 0; i < ele.length; i++) {
                    if (ele[i].checked)
                        var privado = ele[i].value;
                }

                if (nombre == "" || descripcion == "" || asignatura == "" || curso == "" || etiquetas == "null") {
                    alert("Por favor, rellene todos los datos");
                } else {
                    // Elimina las imagenes para luego editar
                    var picturesEditar = document.getElementsByClassName("picture")
                    for (var pic = 0; pic < picturesEditar.length; pic++) {
                        var idDrop = "dropzone_" + picturesEditar[pic].id.split("_")[1]
                        while (document.getElementById(idDrop).children.length > 1) {
                            document.getElementById(idDrop).lastElementChild.remove()
                        }
                    }
                    
                    //Eliminar clases areas para botones
                    var elementos = document.getElementsByClassName("area")
                    var listaCanvas = document.getElementById("listaCanvas").innerHTML
                    let url = window.location.href;
                    if (url.includes("/edit/")) {
                        var urlSplit = url.split("/")
                        var idProyecto = urlSplit[urlSplit.length - 1]
                        var usuario = elminarCarateres(document.getElementById("usuarioEditar").value)
                        var creado = elminarCarateres(document.getElementById("creadoEditar").value)

                        if (usuario != JSON.parse(document.getElementById('user_id').textContent)) {
                            guardarProyecto(nombre, asignatura, curso, etiquetas, privado, JSON.parse(document.getElementById('user_id').textContent), fecha, listaCanvas, contenidoZIP, descripcion, creado)
                        } else {
                            $.ajax({
                                type: "POST",
                                url: "/editor/update/",
                                data: {
                                    idProyecto: idProyecto,
                                    nombre: nombre,
                                    asignatura: asignatura,
                                    curso: curso,
                                    etiquetas: etiquetas,
                                    privado: privado,
                                    canvas: listaCanvas,
                                    usuario: JSON.parse(document.getElementById('user_id').textContent),
                                    contenidoZIP: contenidoZIP,
                                    descripcion: descripcion,
                                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                                },
                                success: function () {
                                   //alert('Proyecto actualizado correctamente');
                                    window.location = "/editor/proyectos";
                                }
                            });
                        }
                    } else {
                        guardarProyecto(nombre, asignatura, curso, etiquetas, privado, JSON.parse(document.getElementById('user_id').textContent), fecha, listaCanvas, contenidoZIP, descripcion, JSON.parse(document.getElementById('user_id').textContent))
                    }
                }
            }
        });
    });
});

function guardarProyecto(nombre, asignatura, curso, etiquetas, privado, usuario, fecha, listaCanvas, contenidoZIP, descripcion, creado) {
    $.ajax({
        type: "POST",
        url: "/editor/insert/",
        data: {
            nombre: nombre,
            asignatura: asignatura,
            curso: curso,
            etiquetas: etiquetas,
            privado: privado,
            usuario: usuario,
            fecha: fecha,
            canvas: listaCanvas,
            contenidoZIP: contenidoZIP,
            descripcion: descripcion,
            creado: creado,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function () {
            //alert('Proyecto creado correctamente');
            $('#nombre').val('');
            $('#asignatura').val('');
            $('#curso').val('');
            $('#etiquetas').val('');
            window.location = "/editor/proyectos";
        }
    });
}


function generarZIP(nombre) {
    var zip = new JSZip();

    //Obtener imagenes areas
    var areas = document.getElementsByClassName("area")
    for (var i = 0; i < listaImagenesAreas.length; i++) {
        zip.file(nombre + "/contents/" + listaImagenesAreas[i].name, listaImagenesAreas[i]);
    }

    //Obtener imagenes dropzone
    for (var j = 0; j < listaImagenesDropzone.length; j++) {
        zip.file(nombre + "/contents/" + listaImagenesDropzone[j].file.name, listaImagenesDropzone[j].file);
    }

    //Obtener imagenes de las capturas
    for (var k = 0; k < listaCapturas.length; k++) {
        zip.file(nombre + "/screenshots/" + listaCapturas[k].file.name, listaCapturas[k].file);
    }

    zip.file(nombre + "/" + nombre + ".xml", getXMLString());

    return zip
}


function getXMLString() {
    var parser = new DOMParser();
    var xml = '<Project version="2">\n'

    var tieneFlechas = false
    var flechas = ""

    xml += '  <resolution x="' + window.screen.availWidth + '" y="' + window.screen.availHeight + '"/>\n'
    xml += '  <language code="es"/>\n'

    // Obtener actividades
    var activities = document.getElementsByClassName("editor-canvas")

    for (var i = 0; i < activities.length; i++) {
        document.getElementById(activities[i].id).classList.remove("ocultar")
        xml += '  <Activity>\n'

        var tieneSelectores = false
        var select = ""

        //Temporizador 
        var temporizador = document.getElementsByClassName("temp#" + activities[i].id)

        if (temporizador.length > 0) {
            tieneSelectores = true
            var valueTemp = temporizador[0].value
            document.getElementById(temporizador[0].id).setAttribute("value", valueTemp)
            select += '      <obj type="time" time="' + valueTemp + '"/>\n'
        }

        // Listado con selectores pairing
        var selectoresPairing = document.getElementsByClassName("emparejado#" + activities[i].id)
        for (var p = 0; p < selectoresPairing.length; p++) {
            var clases = document.getElementById(selectoresPairing[p].id).classList
            tieneSelectores = true
            tieneFlechas = true
            select += '      <obj type="pair" origen="' + selectoresPairing[p].id + '" tokenMeter="false">\n'
            select += '        <Targets>\n'
            for (var cl = 0; cl < clases.length; cl++) {
                if (clases[cl].includes("emparejadoCon-")) {
                    flechas += '      <arrow origin="' + selectoresPairing[p].id + '" dest="' + document.getElementsByClassName(clases[cl].split("-")[1])[0].id + '"/>\n'
                    select += '          <target name="' + document.getElementsByClassName(clases[cl].split("-")[1])[0].id + '"/>\n'
                }
            }
            select += '        </Targets>\n      </obj>\n'
        }

        // Listado con selectores math y objetive
        var selectores = document.getElementsByClassName("selector#" + activities[i].id)

        for (var l = 0; l < selectores.length; l++) {
            //Card
            if (selectores[l].id.includes("card_")) {
                var hijos = document.getElementById("idTitle_" + selectores[l].id.split("_")[1]).children
                for (var m = 0; m < hijos.length; m++) {
                    if (hijos[m].id.includes("objetive")) {
                        tieneSelectores = true
                        select += '      <obj type="sel" obj="' + selectores[l].id + '"/>\n'
                    }

                    if (hijos[m].id.includes("math")) {
                        tieneSelectores = true
                        var valueNumber = document.getElementById("InputNumber_" + hijos[m].id.split("_")[1]).value
                        document.getElementById("InputNumber_" + hijos[m].id.split("_")[1]).setAttribute("value", valueNumber)
                        select += '<obj type="tokenMeter" id="' + selectores[l].id + '" numValue="' + valueNumber + '">\n'
                        select += '<OriginTokens/>\n'
                        select += '<OriginZones/>\n'
                        select += '</obj>\n'
                    }
                }
            }

            //Picture
            if (selectores[l].id.includes("picture_")) {
                var hijos = document.getElementById("titleImage_" + selectores[l].id.split("_")[1]).children
                for (var m = 0; m < hijos.length; m++) {
                    if (hijos[m].id.includes("objetive")) {
                        tieneSelectores = true
                        select += '      <obj type="sel" obj="' + selectores[l].id + '"/>\n'
                    }

                    if (hijos[m].id.includes("math")) {
                        tieneSelectores = true
                        var valueNumber = document.getElementById("InputNumber_" + hijos[m].id.split("_")[1]).value
                        document.getElementById("InputNumber_" + hijos[m].id.split("_")[1]).setAttribute("value", valueNumber) //  value = valueNumber
                        select += '<obj type="tokenMeter" id="' + selectores[l].id + '" numValue="' + valueNumber + '">\n'
                        select += '<OriginTokens/>\n<OriginZones/>\n</obj>\n'
                    }
                }
            }
        }

        if (tieneSelectores) {
            xml += '    <Objectives>\n'
            xml += select
            xml += '    </Objectives>\n'
        } else {
            xml += '    <Objectives/>\n'
        }

        xml += '    <Tokenlist/>\n'

        //Areas
        var areas = document.getElementsByClassName("area#" + activities[i].id)

        if (areas.length == 0) {
            xml += '    <Arealist/>\n'
        } else {
            xml += '    <Arealist>\n'
            for (var j = 0; j < areas.length; j++) {
                var tipo = 'Jugador'
                var botonUsuario = document.getElementById("botonUsuario_" + areas[j].id.split("_")[1])
                
                if (botonUsuario.title == "Cambiar a zona de jugador") {
                    tipo = 'Juego'
                }

                var urlImageArea = '""'
                var idArea = areas[j].id
                var upload = document.getElementById("uploadArea_" + idArea.split("_")[1])
                var image = upload.files[0]

                if (image != undefined) {
                    urlImageArea = '"' + image.name + '"'
                }
                var area = document.getElementById(idArea)
                xml += '      <Area id="' + idArea + '" type="' + tipo + '">\n'
                xml += '        <pos x="' + (parseFloat(area.getBoundingClientRect().left)) + '" y="' + (parseFloat(area.getBoundingClientRect().top)) + '"/>\n'
                xml += '        <rotation value="0"/>\n'
                xml += '        <posfondo x="0" y="0"/>\n'
                xml += '        <size height="' + area.offsetHeight + '" width="' + area.offsetWidth + '"/>\n'
                xml += '        <bg url=' + urlImageArea + '/>\n'

                // Obtener hijos areas
                var hijosAreas = document.getElementsByClassName("hijode" + idArea)
                if (hijosAreas.length == 0) {
                    xml += '        <Tokenlist/>\n'
                } else {
                    xml += '        <Tokenlist>\n'
                    for (var k = 0; k < hijosAreas.length; k++) {
                        // Card
                        if (hijosAreas[k].id.includes("card_")) {
                            var card = document.getElementById(hijosAreas[k].id)
                            var textArea = document.getElementById("textArea_" + card.id.split("_")[1])
                            var texto = "Escriba aquí el texto"
                            if (textArea.value != "") {
                                texto = textArea.value
                                textArea.innerHTML = texto
                            }

                            var clickable = document.getElementById("Seleccionable_" + card.id.split("_")[1]).checked
                            document.getElementById("Seleccionable_" + card.id.split("_")[1]).setAttribute("checked", clickable)
                            var rotatable = document.getElementById("Girable_" + card.id.split("_")[1]).checked
                            document.getElementById("Girable_" + card.id.split("_")[1]).setAttribute("checked", rotatable)
                            var resizable = document.getElementById("Redimensionable_" + card.id.split("_")[1]).checked
                            document.getElementById("Redimensionable_" + card.id.split("_")[1]).setAttribute("checked", resizable)
                            var movable = true
                            var feedback = "Escriba aquí el texto"
                            var valorNumerico = document.getElementById("ValorNumerico_" + card.id.split("_")[1]).value
                            document.getElementById("ValorNumerico_" + card.id.split("_")[1]).setAttribute("value", valorNumerico)
                            if (document.getElementById("Retroalimentacion_" + card.id.split("_")[1]).value != "") {
                                feedback = document.getElementById("Retroalimentacion_" + card.id.split("_")[1]).value
                                document.getElementById("Retroalimentacion_" + card.id.split("_")[1]).innerHTML = feedback
                            }
                            if (card.classList.contains("ui-draggable-disabled")) {
                                movable = false
                            }

                            xml += '          <Token id="' + hijosAreas[k].id + '" type="txt" numValue="' + valorNumerico + '">\n'
                            xml += '            <pos x="' + (parseFloat(card.getBoundingClientRect().left) - (parseFloat(area.getBoundingClientRect().left))) + '" y="' + (parseFloat(card.getBoundingClientRect().top) - (parseFloat(area.getBoundingClientRect().top))) + '"/>\n'
                            xml += '            <size height="' + card.offsetHeight + '" width="' + card.offsetWidth + '"/>\n'
                            xml += '            <rotation value="0"/>\n'
                            xml += '            <clickable>' + clickable + '</clickable>\n'
                            xml += '            <rotatable>' + rotatable + '</rotatable>\n'
                            xml += '            <resizable>' + resizable + '</resizable>\n'
                            xml += '            <movable>' + movable + '</movable>\n'
                            xml += '            <content>\n'
                            xml += '              <text>' + texto + '</text>\n'
                            
                            if (feedback == "Escriba aquí el texto") {
                                xml += '              <feedback/>\n'
                            } else {
                                xml += '              <feedback>' + feedback + '</feedback>\n'
                            }

                            xml += '            </content>\n'
                            xml += '          </Token>\n'
                        }

                        // Picture
                        if (hijosAreas[k].id.includes("picture_")) {
                            var picture = document.getElementById(hijosAreas[k].id)
                            var clickable = document.getElementById("SeleccionableImage_" + picture.id.split("_")[1]).checked
                            document.getElementById("SeleccionableImage_" + picture.id.split("_")[1]).setAttribute("checked", clickable)
                            var rotatable = document.getElementById("GirableImage_" + picture.id.split("_")[1]).checked
                            document.getElementById("GirableImage_" + picture.id.split("_")[1]).setAttribute("checked", rotatable)
                            var resizable = document.getElementById("RedimensionableImage_" + picture.id.split("_")[1]).checked
                            document.getElementById("RedimensionableImage_" + picture.id.split("_")[1]).setAttribute("checked", resizable)
                            var movable = true
                            var feedback = "Escriba aquí el texto"
                            var valorNumerico = document.getElementById("ValorNumericoImage_" + picture.id.split("_")[1]).value
                            document.getElementById("ValorNumericoImage_" + picture.id.split("_")[1]).setAttribute("value", valorNumerico)
                            
                            if (document.getElementById("RetroalimentacionImage_" + picture.id.split("_")[1]).value != "") {
                                feedback = document.getElementById("RetroalimentacionImage_" + picture.id.split("_")[1]).value
                                document.getElementById("RetroalimentacionImage_" + picture.id.split("_")[1]).innerHTML = feedback
                            }
                            if (picture.classList.contains("ui-draggable-disabled")) {
                                movable = false
                            }

                            xml += '          <Token id="' + hijosAreas[k].id + '" type="img" numValue="' + valorNumerico + '">\n'
                            xml += '            <pos x="' + (parseFloat(picture.getBoundingClientRect().left) - (parseFloat(area.getBoundingClientRect().left))) + '" y="' + (parseFloat(picture.getBoundingClientRect().top) - (parseFloat(area.getBoundingClientRect().top))) + '"/>\n'
                            xml += '            <size height="' + picture.offsetHeight + '" width="' + picture.offsetWidth + '"/>\n'
                            xml += '            <rotation value="0"/>\n'
                            xml += '            <clickable>' + clickable + '</clickable>\n'
                            xml += '            <rotatable>' + rotatable + '</rotatable>\n'
                            xml += '            <resizable>' + resizable + '</resizable>\n'
                            xml += '            <movable>' + movable + '</movable>\n'
                            xml += '            <content>\n'

                            var tieneimagenes = false
                            var urlDropzone = ""
                            for (var p = 0; p < listaImagenesDropzone.length; p++) {
                                if (listaImagenesDropzone[p].id.includes("dropzone_" + picture.id.split("_")[1])) {
                                    tieneimagenes = true
                                    urlDropzone += '<url>' + listaImagenesDropzone[p].file.name + '</url>\n'
                                }
                            }

                            if (tieneimagenes) {
                                xml += '              <urlList>\n'
                                xml += urlDropzone
                                xml += '              </urlList>\n'
                            } else {
                                xml += '              <urlList/>\n'
                            }

                            if (feedback == "Escriba aquí el texto") {
                                xml += '              <feedback/>\n'
                            } else {
                                xml += '              <feedback>' + feedback + '</feedback>\n'
                            }

                            xml += '            </content>\n'
                            xml += '          </Token>\n'
                        }
                    }
                    xml += '        </Tokenlist>\n'
                }

                xml += '        <Tokenlist>null</Tokenlist>\n'
                xml += '      </Area>\n'
            }
        }

        xml += '    </Arealist>\n'

        if (tieneFlechas) {
            xml += '    <Arrows>\n'
            xml += flechas
            xml += '    </Arrows>\n'
        } else {
            xml += '    <Arrows/>\n'
        }

        xml += '  </Activity>\n'
        document.getElementById(activities[i].id).classList.add("ocultar")
    }

    xml += '</Project>'

    var xmlDoc = parser.parseFromString(xml, "application/xml");
 
    return xml;
}