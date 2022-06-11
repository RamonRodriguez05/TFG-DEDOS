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
        var etiquetas = ''+ $("#etiquetas").val() + '';
        var descripcion = $('#descripcion').val();
        etiquetas = replaceAll(etiquetas, ",", ", ")
        
        //
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

        var contenido2 = ""

        //
        var zip = generarZIP2(nombre)
    //    zip.file("screenshots/prueba.txt", "hola que tal 222222");
   //     zip.file("prueba.xml", '<Project version="2"> <resolution x="1024" y="596.05"/> <language code="es"/> <Activity> <Objectives> <obj type="pair" origen="instance16928" tokenMeter="false"> <Targets> <target name="instance17385"/> </Targets> </obj> </Objectives> <Tokenlist> <Token id="instance17385" type="img" numValue="1"> <pos x="623.8" y="60.15"/> <size height="264.9" width="322"/> <rotation value="0"/> <clickable>true</clickable> <rotatable>true</rotatable> <resizable>true</resizable> <movable>true</movable> <content> <urlList> <url>pinnedout.png</url> <url>fondo_alas.png</url> </urlList> <feedback/> </content> </Token> </Tokenlist> <Arealist> <Area id="instance16928" type="Jugador"> <pos x="28.7" y="31.65"/> <rotation value="0"/> <posfondo x="0" y="0"/> <size height="273.75" width="558.05"/> <bg url=""/> <Tokenlist> <Token id="instance17085" type="txt" numValue="1"> <pos x="36.15" y="22.7"/> <size height="107.14999999999999" width="273.2"/> <rotation value="0"/> <clickable>false</clickable> <rotatable>true</rotatable> <resizable>true</resizable> <movable>true</movable> <content> <text>Holaque tal estas??</text> <feedback/> </content> </Token> </Tokenlist> <Tokenlist>null</Tokenlist> </Area> </Arealist> <Arrows> <arrow origin="instance16928" dest="instance17385"/> </Arrows> </Activity></Project>');

        zip.generateAsync({ type: "blob" }).then(function (content) { 
        //	saveAs(content, "prueba.zip")
            console.log("El contenido es", content)
            var reader = new FileReader();
            reader.readAsDataURL(content);
            reader.onloadend = function () {
                var base64String = reader.result;
                var splitbase = base64String.split("base64,")
                contenido2 = splitbase[1]

                var ele = document.getElementsByName('privacidad');

                for (var i = 0; i < ele.length; i++) {
                    if (ele[i].checked)
                        var privado = ele[i].value;
                }

                console.log("privacidad", privado)
                console.log("fecha", today)
                if (nombre == "" || descripcion == "" || asignatura == "" || curso == "" || etiquetas == "null") {
                    alert("Por favor, rellene todos los datos");
                } else {
                    // Elimina las imagenes para luego editar
                    for(var j=0; j< listaImagenesDropzone.length; j++){
                      
                        var _ref;
                         (_ref = listaImagenesDropzone[j].previewElement) != null ? _ref.parentNode.removeChild(listaImagenesDropzone[j].previewElement) : void 0;
                    }
                    
                    //Eliminar clases areas para botones
                    var elementos = document.getElementsByClassName("area")

	

		           
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
                            canvas: document.getElementById("listaCanvas").innerHTML,
                            contenido2: contenido2,
                            descripcion: descripcion,
                            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                        },
                        success: function () {
                            alert('Proyecto creado correctamente');
                            $('#nombre').val('');
                            $('#asignatura').val('');
                            $('#curso').val('');
                            $('#etiquetas').val('');
                            console.log("El elemento grande es", document.getElementById("listaCanvas").innerHTML)
                            window.location = "/editor/proyectos";
                        }
                    });
                }
            }
            //	console.log("Content es", content)
            //	saveAs(content, "prueba.zip")

        });


    });
}); 


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
    for(var i = 0; i < areas.length; i++){
        var id = areas[i].id.split("_")[1]
        var upload = document.getElementById("uploadArea_" + id)
        var image = upload.files[0]
       // console.log("las url son ", image)
        if (image != undefined) {
            zip.file(nombre +"/contents/" + image.name, image);
        }
    }

    //Obtener imagenes dropzone
    for(var j=0; j< listaImagenesDropzone.length; j++){
        zip.file(nombre+"/contents/" + listaImagenesDropzone[j].name, listaImagenesDropzone[j]);
    }

    //Obtener imagenes de las capturas
    for(var k=0; k< listaCapturas.length; k++){
        zip.file(nombre +"/screenshots/" + listaCapturas[k].file.name, listaCapturas[k].file);
    }
    
   // var xml  = new XMLSerializer().serializeToString(getXMLString());
    zip.file(nombre + "/" +nombre + ".xml", getXMLString());

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
    var xml = '<Project version="2">' 
    
    xml += '<resolution x="1076.8" y="655.25"/>'
    xml += '<language code="es"/>'
    xml += '<Activity>'
    xml += '<Objectives/>'
    xml += '<Tokenlist/>'
   
           
    
    // Obtener actividades
    var activities = document.getElementsByClassName("editor-canvas")
    for (var i= 0; i <activities.length; i++){
        console.log("Activity",activities[i].id)

        //Areas
        var areas = document.getElementsByClassName("area#" + activities[i].id)
        console.log("numero de areas es", areas.length)
        if(areas.length == 0){
            xml += '<Arealist/>'
        }else{
            xml += '<Arealist>'
        }
        for (var j = 0; j< areas.length; j++){
                console.log(areas[j])
           
                var tipo = 'Jugador'
                var botonUsuario = document.getElementById("botonUsuario_" + areas[j].id.split("_")[1])
                if(botonUsuario.title =="Cambiar a zona de jugador"){
                    tipo = 'Juego'
                }

                var urlImageArea = '""'
                var id = areas[j].id.split("_")[1]
                var upload = document.getElementById("uploadArea_" + id)
                var image = upload.files[0]
       
                if (image != undefined) {
                    urlImageArea = '"'+ image.name +'"'
                }
                var area = document.getElementById(areas[j].id)
                xml += '<Area id="' + areas[j].id + '" type="' + tipo + '">'
                xml += '<pos x="' + (parseFloat(area.getBoundingClientRect().left) - 250 )  + '" y="' + (parseFloat(area.getBoundingClientRect().top) - 220)  + '"/>'
                xml += '<rotation value="0"/>'
                xml += '<posfondo x="0" y="0"/>'
                xml += '<size height="' + area.offsetHeight + '" width="' + area.offsetWidth +'"/>'
                xml += '<bg url='+ urlImageArea + '/>'
                xml += '<Tokenlist/>'
                xml += '<Tokenlist>null</Tokenlist>' 
                xml += '</Area>'
            }
            
        
      //  console.log("La activitie",activities[i].children)
    }

    xml += '<Arrows/>'
    xml += '</Activity>'
    xml += '</Project>'



    // var xml = "<?xml version=\"1.0\" standalone=\"yes\" ?>";
    // xml = xml + "<PlanInfo UserId=\"" + "\"><Plans>";
    // for (var i = 0; i < 15; i++) {
    //     xml = xml + "<Plan ID=\"" +  "\" />";
    // }
    // xml = xml + "</Plans></PlanInfo>";
    
    var xmlDoc = parser.parseFromString(xml, "application/xml");
    console.log("el xml es", xml)
    return xml;
}