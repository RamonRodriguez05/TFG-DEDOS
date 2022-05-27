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





    //
    $('#submit').on('click', function () {
        console.log("entro en guardar")
        var nombre = $('#nombre').val();
        var asignatura = $('#asignatura').val();
        var curso = $('#curso').val();
        var etiquetas = $('#etiquetas').val();


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

        var prueba = '<div id="listaCanvas"><div id="editor-canvas_1" class="editor-canvas dropzone ui-droppable" style="border:2px;width:100%; height:100%"><div class="area ui-resizable ui-droppable ui-draggable ui-draggable-handle" type="area" style="position: absolute; left: 129.599px; top: 144.994px;" id="area1"><a id="botonUsuario_0" class="btn user-image" title="Cambiar a zona de juego"><svg id="usuario_0" class="svg-inline--fa fa-user margenIzquierdo" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path></svg><!-- <i id="usuario_0" class="fa-solid fa-user margenIzquierdo"></i> Font Awesome fontawesome.com --></a><div class="image-upload"> <label for="uploadArea_0"> <svg class="svg-inline--fa fa-upload image-upload" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M105.4 182.6c12.5 12.49 32.76 12.5 45.25 .001L224 109.3V352c0 17.67 14.33 32 32 32c17.67 0 32-14.33 32-32V109.3l73.38 73.38c12.49 12.49 32.75 12.49 45.25-.001c12.49-12.49 12.49-32.75 0-45.25l-128-128C272.4 3.125 264.2 0 256 0S239.6 3.125 233.4 9.375L105.4 137.4C92.88 149.9 92.88 170.1 105.4 182.6zM480 352h-160c0 35.35-28.65 64-64 64s-64-28.65-64-64H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456z"></path></svg><!-- <i class="fa-solid fa-upload image-upload"></i> Font Awesome fontawesome.com --> </label> <input id="uploadArea_0" type="file" accept="image/png, image/gif, image/jpeg" onchange="changeBackground(this);" style="display: none;"> </div><div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;"></div><div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"></div></div><div class="card ui-resizable area-accept ui-droppable ui-draggable ui-draggable-handle" type="card" style="position: absolute; left: 579.886px; top: 162.994px;" id="card1"><div id="idTitle_0" class="tituloTexto"><button id="idbuttonCard_0" class="transparente" onclick="fijarTarjeta(this)"><svg class="svg-inline--fa fa-thumbtack fa-rotate-by" style="--fa-rotate-angle: 320deg;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbtack" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M32 32C32 14.33 46.33 0 64 0H320C337.7 0 352 14.33 352 32C352 49.67 337.7 64 320 64H290.5L301.9 212.2C338.6 232.1 367.5 265.4 381.4 306.9L382.4 309.9C385.6 319.6 383.1 330.4 377.1 338.7C371.9 347.1 362.3 352 352 352H32C21.71 352 12.05 347.1 6.04 338.7C.0259 330.4-1.611 319.6 1.642 309.9L2.644 306.9C16.47 265.4 45.42 232.1 82.14 212.2L93.54 64H64C46.33 64 32 49.67 32 32zM224 384V480C224 497.7 209.7 512 192 512C174.3 512 160 497.7 160 480V384H224z"></path></svg><!-- <i class="fa-solid fa-thumbtack fa-rotate-by" style="--fa-rotate-angle: 320deg;"></i> Font Awesome fontawesome.com --></button><span>Texto</span></div><textarea id="textArea_0" class="inputText" placeholder="Escriba aquí el texto" name="description"></textarea><section id="back_0" class="ocultar"><div class="tab center"><button class="tablinks active" onclick="openCity(event, Acciones_0)">Acciones</button><button class="tablinks" onclick="openCity(event, Feedback_0)">Feedback</button><button class="tablinks" onclick="openCity(event, Matematicas_0)">Matemáticas</button></div><div id="Acciones_0" style="display:block;" class="tabcontent "><input type="checkbox" checked="true" id="cbox1" value="firest_checkbox"> <label for="cbox1">Seleccionable</label><br><input type="checkbox" checked="true" id="cbox2" value="second_checkbox"> <label for="cbox2">Girable</label><br><input type="checkbox" checked="true" id="cbox3" value="firest_checkbox"> <label for="cbox3">Redimensionable</label></div><div id="Feedback_0" class="tabcontent inputTextRetroalimentacion"><div><div>Retroalimentación</div><textarea class="inputTextRetroalimentacion" placeholder="Escriba aquí el texto" name="textoRetroalimentacion"></textarea></div></div><div id="Matematicas_0" class="tabcontent inputNumero"><div><div style="width=100%;">Valor numérico</div><input type="number" step="any" value="1"></div></div> </section><div id="config_card_0" class="config"><svg class="svg-inline--fa fa-gear" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gear" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"></path></svg><!-- <i class="fa-solid fa-gear"></i> Font Awesome fontawesome.com --></div><div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;"></div><div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"></div></div></div><div id="linea"></div><!-- <section><div><i class="squarePath fa-solid fa-square" onclick="mostrar(conf)"></i></div><div><div class="PathIcono"><i class="fa-solid fa-location-dot fa-2xl"></i></div><div id="conf" class="configurarPath ocultar"><div style="height:50px"><i class="PathIcono fa-solid fa-location-dot fa-2xl"></i><i class=" fa-solid fa-square"></i><i class="xMark fa-solid fa-xmark" onclick="ocultar(conf)"></i></div><div id="mover" class="insidePath "><div style="background-color: green;width:40px">Hola</div><div id="pathidPadre" style="width:220px"><div id="pathid"></div></div><div style="background-color: green;width:40px; text-align: center;"><i class="fa-solid fa-eye fa-xl"></i></br><input type="color" id="favcolor" name="favcolor" value="#ff0000"></br><i class="fa-brands fa-connectdevelop fa-xl"></i></div></div><div id="arrastrar" class="insidePath"><i class="PathIcono fa-solid fa-location-dot fa-2x"></i>Arrastre hasta aquí para crear un nuevo camino</div></div></div></section> --><!-- <section><div><i class="squarePath fa-solid fa-square" onclick="mostrar(conf)"></i></div><div><div class="PathIcono"><i class="fa-solid fa-location-dot fa-2xl"></i></div><div id="conf" class="configurarPath"><div style="height:50px"><i class="PathIcono fa-solid fa-location-dot fa-2xl"></i><i class=" fa-solid fa-square"></i><i class="xMark fa-solid fa-xmark" onclick="ocultar(conf)"></i></div><div id="mover" class="insidePath "><div style="background-color: green;width:40px">Hola</div><div id="pathidPadre" style="width:220px"><div id="pathid" class="wrap"></div></div><div style="background-color: green;width:40px; text-align: center;"><i class="fa-solid fa-eye fa-xl"></i><input type="color" id="favcolor" name="favcolor" value="#ff0000"><i class="fa-brands fa-connectdevelop fa-xl"></i></div></div><div id="arrastrar" class="insidePath dropzone"><i class="PathIcono fa-solid fa-location-dot fa-2x"></i>Arrastre hasta aquí para crear un nuevo camino</div></div></div><canvas id="canvas2" width="500px" height="250px"></canvas></section> --><!-- <button id="btn_add" onclick="addCanvas()">Add a Div</button> --></div>'


        //

        var ele = document.getElementsByName('privacidad');

        for (var i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                var privado = ele[i].value;
        }
        console.log("privacidad", privado)
        console.log("fecha", today)
        if (nombre == "" || asignatura == "" || curso == "" || etiquetas == "") {
            alert("Por favor, rellene todos los datos");
        } else {

            $.ajax({
                type: "POST",
                url: "../editor/insert/",
                data: {
                    nombre: nombre,
                    asignatura: asignatura,
                    curso: curso,
                    etiquetas: etiquetas,
                    privado: privado,
                    usuario: JSON.parse(document.getElementById('user_id').textContent),
                    fecha: fecha,
                    canvas: prueba,
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
    });

   

   

});
