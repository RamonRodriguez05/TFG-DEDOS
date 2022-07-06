'use strict'

// Guardar datos´

$(document).ready(function () {

    //
    // let url = window.location.href;

    // if (url.includes("/edit/")){
    //     console.log("Editar proyecto")

    //     var myVar = document.getElementById("myVar").value;
    //     var procesado = myVar.split("QuerySet")
    //     var cargar = procesado[1]

    //     cargar = cargar.replace(/\\t/g," ");
    //     cargar = cargar.replace(/\\n/g," ");
    //     cargar = cargar.replace(/[']/g, "");
    //     cargar = cargar.replace("[(","")
    //     cargar = cargar.replace(",)]>","")
    //     console.log("El valor valee", cargar)
    //     document.getElementById("listaCanvas").innerHTML = ""
    //     document.getElementById("listaCanvas").innerHTML = cargar
    //     console.log("El valor valee",  cargar)
    // }



    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }

    //
    $('#submit').on('click', function () {
        console.log("entro en guardar")
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

        //
        var zip = generarZIP2(nombre)
        //    zip.file("screenshots/prueba.txt", "hola que tal 222222");
        //     zip.file("prueba.xml", '<Project version="2"> <resolution x="1024" y="596.05"/> <language code="es"/> <Activity> <Objectives> <obj type="pair" origen="instance16928" tokenMeter="false"> <Targets> <target name="instance17385"/> </Targets> </obj> </Objectives> <Tokenlist> <Token id="instance17385" type="img" numValue="1"> <pos x="623.8" y="60.15"/> <size height="264.9" width="322"/> <rotation value="0"/> <clickable>true</clickable> <rotatable>true</rotatable> <resizable>true</resizable> <movable>true</movable> <content> <urlList> <url>pinnedout.png</url> <url>fondo_alas.png</url> </urlList> <feedback/> </content> </Token> </Tokenlist> <Arealist> <Area id="instance16928" type="Jugador"> <pos x="28.7" y="31.65"/> <rotation value="0"/> <posfondo x="0" y="0"/> <size height="273.75" width="558.05"/> <bg url=""/> <Tokenlist> <Token id="instance17085" type="txt" numValue="1"> <pos x="36.15" y="22.7"/> <size height="107.14999999999999" width="273.2"/> <rotation value="0"/> <clickable>false</clickable> <rotatable>true</rotatable> <resizable>true</resizable> <movable>true</movable> <content> <text>Holaque tal estas??</text> <feedback/> </content> </Token> </Tokenlist> <Tokenlist>null</Tokenlist> </Area> </Arealist> <Arrows> <arrow origin="instance16928" dest="instance17385"/> </Arrows> </Activity></Project>');

        zip.generateAsync({ type: "blob" }).then(function (content) {
            //	saveAs(content, "prueba.zip")
            //  console.log("El contenido es", content)
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

                //   console.log("privacidad", privado)
                //   console.log("fecha", today)
                if (nombre == "" || descripcion == "" || asignatura == "" || curso == "" || etiquetas == "null") {
                    alert("Por favor, rellene todos los datos");
                } else {
                    // Elimina las imagenes para luego editar
                    for (var j = 0; j < listaImagenesDropzone.length; j++) {

                        var _ref;
                        //  (_ref = listaImagenesDropzone[j].file.previewElement) != null ? _ref.parentNode.removeChild(listaImagenesDropzone[j].file.previewElement) : void 0;
                    }

                    //Eliminar clases areas para botones
                    var elementos = document.getElementsByClassName("area")

                    var listaCanvas = document.getElementById("listaCanvas").innerHTML
                    let url = window.location.href;
                    if (url.includes("/edit/")) {
                        var urlSplit = url.split("/")
                        var idProyecto = urlSplit[urlSplit.length - 1]
                        console.log("el id proyecto es", idProyecto)
                        var usuario = elminarCarateres(document.getElementById("usuarioEditar").value) 
                        var creado = elminarCarateres(document.getElementById("creadoEditar").value)

                        if(usuario != JSON.parse(document.getElementById('user_id').textContent)){
                            guardarProyecto(nombre,asignatura, curso, etiquetas, privado, JSON.parse(document.getElementById('user_id').textContent), fecha, listaCanvas, contenidoZIP, descripcion, creado)
                        }else{
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
                                    alert('Proyecto actualizado correctamente');
                                    window.location = "/editor/proyectos";
                                }
                            });
                        }
                    } else {

                        guardarProyecto(nombre,asignatura, curso, etiquetas, privado, JSON.parse(document.getElementById('user_id').textContent), fecha, listaCanvas, contenidoZIP, descripcion, JSON.parse(document.getElementById('user_id').textContent))
                        
                        /*
                        $.ajax({
                            type: "POST",
                            url: "/editor/insert/",
                            data: {
                                nombre: nombre,
                                asignatura: asignatura,
                                curso: curso,
                                etiquetas: etiquetas,
                                privado: privado,
                                usuario: JSON.parse(document.getElementById('user_id').textContent),
                                fecha: fecha,
                                canvas: listaCanvas,
                                contenidoZIP: contenidoZIP,
                                descripcion: descripcion,
                                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                            },
                            success: function () {
                                alert('Proyecto creado correctamente');
                                $('#nombre').val('');
                                $('#asignatura').val('');
                                $('#curso').val('');
                                $('#etiquetas').val('');
                                window.location = "/editor/proyectos";
                            }
                        });
                        */
                    }
                }
            }
            //	console.log("Content es", content)
            //	saveAs(content, "prueba.zip")

        });


    });
});

function guardarProyecto(nombre,asignatura, curso, etiquetas, privado, usuario, fecha, listaCanvas, contenidoZIP, descripcion, creado){
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
            alert('Proyecto creado correctamente');
            $('#nombre').val('');
            $('#asignatura').val('');
            $('#curso').val('');
            $('#etiquetas').val('');
            window.location = "/editor/proyectos";
        }
    });
}

// function generarZIP() { 
//     var el = document.getElementById("uploadArea_1")
//     console.log("el dropzone es", document.getElementById("dropzone_1"))
//     console.log("Las imagenesée buscadas es", document.querySelector('#dropzone_1').innerHTML)

//     var imagenesDropzone = document.getElementsByClassName("dz-image")

//     for (var i = 0; i < imagenesDropzone.length; i++) {
//         console.log("las iamanges son", imagenesDropzone[i].childNodes[0].getAttribute("src"))
//         var splitt = imagenesDropzone[i].childNodes[0].outerHTML
//         console.log("EL SRC", splitt)
//         var fuente = $(imagenesDropzone[i])
//         console.log("FINAL", fuente[0].innerHTML)

//     }

//     if (document.getElementById("dropzone_1") != null) {
//         var e = document.getElementById("dropzone_1")
//         //   var myDropzone = new Dropzone('#dropzone_1', {url: './images'});
//         //  console.log("los ficheros son", e.getQueuedFiles)
//     }
//     if (el != null) {

//         var url = el.files[0]
//         console.log("urllll", url)

//         if (url != undefined) {
//             var zip = new JSZip();
//             //  const fileName = 'alas.png'


//             //  alert(url.substring(4, url.length-1));
//             //   var image =	document.getElementById("myfile").files[0]
//             //     console.log("imagen es", file)

//             // create a file
//             //var fileData = dataURLtoFile(url, "imageName.jpg");
//             // oops, cat on keyboard. Fixing !
//             zip.file("contents/" + url.name, url);
//             zip.file("screenshots/", "");

//             zip.file("prueba.xml", '<Project version="2"> <resolution x="1024" y="596.05"/> <language code="es"/> <Activity> <Objectives> <obj type="pair" origen="instance16928" tokenMeter="false"> <Targets> <target name="instance17385"/> </Targets> </obj> </Objectives> <Tokenlist> <Token id="instance17385" type="img" numValue="1"> <pos x="623.8" y="60.15"/> <size height="264.9" width="322"/> <rotation value="0"/> <clickable>true</clickable> <rotatable>true</rotatable> <resizable>true</resizable> <movable>true</movable> <content> <urlList> <url>pinnedout.png</url> <url>fondo_alas.png</url> </urlList> <feedback/> </content> </Token> </Tokenlist> <Arealist> <Area id="instance16928" type="Jugador"> <pos x="28.7" y="31.65"/> <rotation value="0"/> <posfondo x="0" y="0"/> <size height="273.75" width="558.05"/> <bg url=""/> <Tokenlist> <Token id="instance17085" type="txt" numValue="1"> <pos x="36.15" y="22.7"/> <size height="107.14999999999999" width="273.2"/> <rotation value="0"/> <clickable>false</clickable> <rotatable>true</rotatable> <resizable>true</resizable> <movable>true</movable> <content> <text>Holaque tal estas??</text> <feedback/> </content> </Token> </Tokenlist> <Tokenlist>null</Tokenlist> </Area> </Arealist> <Arrows> <arrow origin="instance16928" dest="instance17385"/> </Arrows> </Activity></Project>');


//             // create a file and a folder



//             zip.generateAsync({ type: "blob" }).then(function (content) {



//                 //	console.log("Content es", content)
//                 //	saveAs(content, "prueba.zip")

//             });


//         }
//     }
// }

function generarZIP2(nombre) {
    var zip = new JSZip();

    //Obtener imagenes areas
    var areas = document.getElementsByClassName("area")
    for (var i = 0; i < listaImagenesAreas.length; i++) {
        zip.file(nombre + "/contents/" + listaImagenesAreas[i].name, listaImagenesAreas[i]);
        /*
        var id = areas[i].id.split("_")[1]
        var upload = document.getElementById("uploadArea_" + id)
        var image = upload.files[0]
        // console.log("las url son ", image)
        if (image != undefined) {
            zip.file(nombre + "/contents/" + image.name, image);
        }
        */
    }

    //Obtener imagenes dropzone
    for (var j = 0; j < listaImagenesDropzone.length; j++) {
        zip.file(nombre + "/contents/" + listaImagenesDropzone[j].file.name, listaImagenesDropzone[j].file);
    }

    //Obtener imagenes de las capturas
    for (var k = 0; k < listaCapturas.length; k++) {
        zip.file(nombre + "/screenshots/" + listaCapturas[k].file.name, listaCapturas[k].file);
    }

    // var xml  = new XMLSerializer().serializeToString(getXMLString());
    zip.file(nombre + "/" + nombre + ".xml", getXMLString());

    return zip
}


// function dataURLtoFile(dataurl, filename) {
//     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, { type: mime });
// }


function getXMLString() {
    var parser = new DOMParser();
    var xml = '<Project version="2">\n'

    var tieneFlechas = false
    var flechas = ""

    xml += '  <resolution x="' + window.screen.availWidth + '" y="' + window.screen.availHeight + '"/>\n'
    xml += '  <language code="es"/>\n'




    // Obtener actividades
    var activities = document.getElementsByClassName("editor-canvas")

    //console.log("Los canvasssss activieties sonn", activities)
    for (var i = 0; i < activities.length; i++) {
        document.getElementById(activities[i].id).classList.remove("ocultar")
        xml += '  <Activity>\n'

        var tieneSelectores = false
        var select = ""
        // Listado con selectores pairing
        var selectoresPairing = document.getElementsByClassName("emparejado#" + activities[i].id)
        console.log("LAS FLECHAS SOOOON AL GUARDAR", selectoresPairing)
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
        console.log("los selectores son", selectores)
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
                        //InputNumber_1
                        tieneSelectores = true
                        var valueNumber = document.getElementById("InputNumber_" + hijos[m].id.split("_")[1]).value
                        document.getElementById("InputNumber_" + hijos[m].id.split("_")[1]).setAttribute("value", valueNumber)//.value = valueNumber
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
                        select += '<obj type="sel" obj="' + selectores[l].id + '"/>\n'
                    }

                    if (hijos[m].id.includes("math")) {
                        //InputNumber_1
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
        //      console.log("numero de areas es", areas.length)
        if (areas.length == 0) {
            xml += '    <Arealist/>\n'
        } else {
            xml += '    <Arealist>\n'
            for (var j = 0; j < areas.length; j++) {
                //console.log(areas[j])

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
                            var rotatable = document.getElementById("Girable_" + card.id.split("_")[1]).checked
                            var resizable = document.getElementById("Redimensionable_" + card.id.split("_")[1]).checked
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


                            //   console.log("Card", hijosAreas[k].id)
                        }


                        // Picture
                        if (hijosAreas[k].id.includes("picture_")) {
                            var picture = document.getElementById(hijosAreas[k].id)


                            var clickable = document.getElementById("SeleccionableImage_" + picture.id.split("_")[1]).checked
                            var rotatable = document.getElementById("GirableImage_" + picture.id.split("_")[1]).checked
                            var resizable = document.getElementById("RedimensionableImage_" + picture.id.split("_")[1]).checked
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


                            //  console.log("Picture", hijosAreas[k].id)
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
        //  console.log("La activitie",activities[i].children)
        document.getElementById(activities[i].id).classList.add("ocultar")
    }

    xml += '</Project>'



    // var xml = "<?xml version=\"1.0\" standalone=\"yes\" ?>";
    // xml = xml + "<PlanInfo UserId=\"" + "\"><Plans>";
    // for (var i = 0; i < 15; i++) {
    //     xml = xml + "<Plan ID=\"" +  "\" />";
    // }
    // xml = xml + "</Plans></PlanInfo>";

    var xmlDoc = parser.parseFromString(xml, "application/xml");
    //   console.log("el xml es", xml)
    return xml;
}