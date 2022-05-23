'use strict'

// Guardar datos´

$(document).ready(function () {
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
            url: "insert/",
            data: {
                nombre: nombre,
                asignatura: asignatura,
                curso: curso,
                etiquetas: etiquetas,
                privado: privado,
                usuario: JSON.parse(document.getElementById('user_id').textContent),
                fecha: fecha,

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
}); 
});
