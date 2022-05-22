'use strict'
function inicializarCampanias() {

  //  pedirDatos();

    $("#filtroInput3D").datepicker({ //Inicializamos los input text que sean para fecha para que solo se despligue un calendario del que se selecciona la fecha
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        timeFormat: "hh:mm:ss",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 11)
        }
    });

    $("#filtroInput3H").datepicker({
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        timeFormat: "hh:mm:ss",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 11)
        }
    });

    $("#filtroInput4D").datepicker({
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        timeFormat: "hh:mm:ss",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 11)
        }
    });

    $("#filtroInput4H").datepicker({
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        timeFormat: "hh:mm:ss",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 11)
        }
    });

 //   if (idCampaniaActiva != 0) {//Variable global para verCampania
  //      pedirParticipantes(idCampaniaActiva);
 //   }

    //Meter el modal en el body
    $("#ObservacionModal").prependTo("body");
    $("#FormacionModal").prependTo("body");

    var today = new Date();
    $("#fechaReunion").datepicker({
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        timeFormat: "hh:mm:ss",
        minDate: today,
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 11)
        }
    });
};


//Obtenemos los datos de la tabla y llamamos a la función que coloca dichos datos en ella
function pedirDatos() {
    $.ajax({
        url: url + 'Campanias/DevolverDatos',
        type: "GET",
        success: function (data) {
            CargarDatosTabla(data);
        },
        error: function (xhr, status, p3, p4) {
            alert("Error. La petición de datos ha fallado.");
        }
    });
}
// Definimos la tabla como variable global para recargar datos por el filtrado
var table = null;


function CargarDatosTabla(data) {
    //Si la peticion ha sido correcta, cargamos los datos en la tabla
    table = $('#MisProyectos').DataTable({
        destroy: true,
        "pagingType": "full_numbers",
        iDisplayLength: 30,
        autoWidth: true,
        data: data.filasCampanias,
        fixedColumns: false,
        select: true,
        dom: 'B<"clear">lfrtip', //'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: 'excelExportado',
                className: 'btn',
                text: "Excel"
            }
        ],

        "language": {
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "lengthMenu": "Mostrar _MENU_",
            "search": "Buscar:",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sZeroRecords": "No se encontraron resultados en la busqueda",
            "sEmptyTable": "No hay registros disponibles",
            "paginate": {
                "previous": "Anterior",
                "next": "Siguiente",
                "first": "Primero",
                "last": "Último"
            },
            "select": {
                "rows": {
                    "1": " 1 fila seleccionada",
                    "_": " %d filas seleccionadas"
                }
            }
        },

        drawCallback: function () {
            $('.dataTables_wrapper').addClass('personalizadoDatatable');
        },

        "aoColumnDefs": [
            { 'bSortable': false, 'aTargets': [0, 5] },
        ],

        "order": [[2, "desc"], [3, "asc"]],

        columns: [
            {
                'data': 'id',
                "render": function (id) {
                    return '<button type="button" data-toggle="tooltip" title="Ver campaña" onclick="verCampania(' + id + ')" class="dashboardButton"> <i class="fa-solid fa-magnifying-glass fa-xs"></i> </button>' +
                        '<button type="button" data-toggle="tooltip" title="Vista previa" onclick=" " class="dashboardButton"> <i class="fa-solid fa-eye"></i> </button>' +
                        '<button id="boton_' + id + '" type="button" data-toggle="tooltip" title="Borrar campaña" onclick="eliminarCampania(' + id + ')" class="dashboardButton"> <i class="fa-solid fa-trash-can fa-xs"></i></button>';
                }
            },
            {
                'data': 'id',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': 'nombre',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': 'dominio',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': 'servidor',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': 'estado',
                render: function (data) {
                    return data.trim();
                }
            },
            {
                'data': 'idEmpresa',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': 'fechaInicio',
                render: function (data) {
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                'data': 'fechaFin',
                render: function (data) {
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                'data': 'numAlcance',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': 'numVerificacion',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': 'numFallos',
                render: function (data) {
                    return data;
                }
            }
        ]
    });
}
//Variables para filtros
// varaibles de opción en el filtro
var idCampania = "";
var idEstado = "-1";
var nomEmpresa = "";
var opcionEmpresa = "0";
var opcionFInicio = "-1";
var opcionFFin = "-1";
var opcionAlcance = "-1";
var opcionVerificacion = "-1";
var opcionFallos = "-1";
// variables con los valores introducidos en el filtro
var fechaInicioDesde = "undefined//undefined";
var fechaInicioHasta = "undefined//undefined";
var fechaFinDesde = "undefined//undefined";
var fechaFinHasta = "undefined//undefined";
var alcanceInput = "";
var verificacionInput = "";
var fallosInput = "";

function mostrarOcultarFiltro(columna) { //Función para mostrar y ocultar el icono del filtro en la tabla de Campañas
    switch (columna) {
        case "filtroNombreC":
            if ($("#filtroNombreC").is(":hidden")) {
                $("#filtroNombreC").attr("hidden", false);
            } else {
                $("#filtroNombreC").attr("hidden", true);
            }
            break;
        case "filtroDominio":
            if ($("#filtroDominio").is(":hidden")) {
                $("#filtroDominio").attr("hidden", false);
            } else {
                $("#filtroDominio").attr("hidden", true);
            }
            break;
        case "filtroServidor":
            if ($("#filtroServidor").is(":hidden")) {
                $("#filtroServidor").attr("hidden", false);
            } else {
                $("#filtroServidor").attr("hidden", true);
            }
            break;
        case "filtroEmpresa":
            if ($("#filtroEmpresa").is(":hidden")) {
                $("#filtroEmpresa").attr("hidden", false);
            } else {
                $("#filtroEmpresa").attr("hidden", true);
            }
            break;
        case "filtroAlcance":
            if ($("#filtroSelect5").is(":hidden")) {
                $("#filtroSelect5").attr("hidden", false);
            } else {
                $("#filtroSelect5").attr("hidden", true);
            }
            break;
        case "filtroAcierto":
            if ($("#filtroSelect6").is(":hidden")) {
                $("#filtroSelect6").attr("hidden", false);
            } else {
                $("#filtroSelect6").attr("hidden", true);
            }
            break;
        case "filtroFallos":
            if ($("#filtroSelect7").is(":hidden")) {
                $("#filtroSelect7").attr("hidden", false);
            } else {
                $("#filtroSelect7").attr("hidden", true);
            }
            break;
        case "filtroRespuesta":
            if ($("#filtroSelect8").is(":hidden")) {
                $("#filtroSelect8").attr("hidden", false);
            } else {
                $("#filtroSelect8").attr("hidden", true);
            }
            break;
    }
}

$("#cabeceraFiltro1").change(function () {//ID
    idCampania = $("#filtroInput1").val();
    filtrar();
});

$("#filtroSelect2").change(function () { //Estado
    idEstado = $("#filtroSelect2").val();
    filtrar();
    
});

$("#cabeceraFiltroEmpresa").change(function () {// Nombre empresa
    opcionEmpresa = $("#filtroEmpresa").val();
    nomEmpresa = $("#filtroInput2").val();
    filtrar();
});

$("#cabeceraFiltro3").change(function () { //Fecha de inicio
    opcionFInicio = $("#filtroSelect3").val();
    if (opcionFInicio == "0") {//Busca
        if (document.getElementById('filtroFechaInicio').classList.contains("hidden")) {
            $("#filtroFechaInicio").removeClass("hidden");
        } else {
            fechaInicioDesde = $("#filtroInput3D").val();
            fechaInicioHasta = $("#filtroInput3H").val();
            filtrar();
        }
    } else {
        fechaInicioDesde = "undefined//undefined";
        fechaInicioHasta = "undefined//undefined";
        $("#filtroInput3D").val("");
        $("#filtroInput3H").val("");
        $("#filtroFechaInicio").addClass("hidden");
        filtrar();
    }
});

$("#cabeceraFiltro4").change(function () { //Fecha de finalización
    opcionFFin = $("#filtroSelect4").val();
    if (opcionFFin == "0") {//Busca
        if (document.getElementById('filtroFechaFinalizacion').classList.contains("hidden")) {
            $("#filtroFechaFinalizacion").removeClass("hidden");
        } else {
            fechaFinDesde = $("#filtroInput4D").val();
            fechaFinHasta = $("#filtroInput4H").val();
            filtrar();
        }
    } else {
        fechaFinDesde = "undefined//undefined";
        fechaFinHasta = "undefined//undefined";
        $("#filtroInput4D").val("");
        $("#filtroInput4H").val("");
        $("#filtroFechaFinalizacion").addClass("hidden");
        filtrar();
    }
});

$("#cabeceraFiltro5").change(function () {//Número de empleados probados
    opcionAlcance = $("#filtroSelect5").val();
    alcanceInput = $("#filtroInput5").val();
    filtrar(); 
});

$("#cabeceraFiltro6").change(function () {//Número de verificaciones
    opcionVerificacion = $("#filtroSelect6").val();
    verificacionInput = $("#filtroInput6").val();
    filtrar();
});

$("#cabeceraFiltro7").change(function () {//Número de fallos
    opcionFallos = $("#filtroSelect7").val();
    fallosInput = $("#filtroInput7").val();
    filtrar();
});

function filtrar() { //Enviamos los valores de los filtros al back
    var formData = new FormData();

    formData.append("idCampania", idCampania);
    formData.append("idEstado", idEstado);
    formData.append("nomEmpresa", nomEmpresa);
    formData.append("opcionEmpresa", opcionEmpresa);
    formData.append("opcionFInicio", opcionFInicio);
    formData.append("opcionFFin", opcionFFin);
    formData.append("opcionAlcance", opcionAlcance);
    formData.append("opcionVerificacion", opcionVerificacion);
    formData.append("opcionFallos", opcionFallos);
    formData.append("fechaInicioDesde", fechaInicioDesde);
    formData.append("fechaInicioHasta", fechaInicioHasta);
    formData.append("fechaFinDesde", fechaFinDesde);
    formData.append("fechaFinHasta", fechaFinHasta);
    formData.append("alcanceInput", alcanceInput);
    formData.append("verificacionInput", verificacionInput);
    formData.append("fallosInput", fallosInput);

    $.ajax({
        url: url + 'Campanias/FiltrarDatos',
        type: "POST",
        processData: false,
        data: formData,
        contentType: false,
        async: false,
        success: function (data) {
            table.clear().draw(); //Vaciamos tabla
            CargarDatosTabla(data); //Cargamos otra vez datos dependiendo de filtros
        },
        error: function (xhr, status, p3, p4) {
            alert("Error. La petición de datos ha fallado en el filtrado.");
        }
    });
}

function downloadExcel() { //Descargar table en formato excel
    if (!table.data().count()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Un dashboard sin datos no se puede descargar.',
            confirmButtonText: "Vale",
            confirmButtonColor: "#D97925"
        });
    } else {
        document.getElementsByClassName("dt-button buttons-excel buttons-html5 btn")[0].click();
        Swal.fire({
            icon: 'success',
            title: 'Excel descargando',
            text: 'El excel con los datos del dashboard se ha generado correctamente.',
            confirmButtonText: "Vale",
            confirmButtonColor: "#D97925"
        });
    }
}

//Eliminar la información de una campaña en front --> en la base de datos no se pierde
function eliminarCampania(id) {
    var formCampania = new FormData();
    formCampania.append("id", id);

    Swal.fire({
        icon: 'warning',
        title: 'Borrado de campaña',
        text: "¿Está totalmente seguro de que desea borrar esta camapaña?",
        background: '#FDFEFE',
        buttonsStyling: false,
        showCancelButton: true,
        cancelButtonText: "No",
        customClass: {
            cancelButton: 'btn btn-cerrar',
            confirmButton: 'btn btn-iniciar'
        },
        confirmButtonText: "Sí",
        reverseButtons: true,
        closeOnCancel: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + 'Campanias/BorrarCampania',
                type: "POST",
                data: formCampania,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data.res == 0) {
                        // Si la petición ha tenido exito, volvemos a cargar los datos a la tabla sin el valor eliminado
                        CargarDatosTabla(data);
                    } else if (data.res == -2) {
                        // Si la sesión ha caducado, redirigimos al usuario a la página principal
                        window.location.href = urlLogin;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: data.mensaje,
                            confirmButtonText: "Vale",
                            confirmButtonColor: "#D97925"
                        });
                    }
                },
                error: function (xhr, status, p3, p4) {
                    alert("Error. La petición de datos ha fallado.");
                }
            })
        }
    })
}

//Nueva campaña
$(document).ready(function () {
    var today = new Date();
    //Inicializamos los input text que sean para fecha para que solo se despligue un calendario del que se selecciona la fecha
    $("#fechaInicioCampania").datepicker({
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        timeFormat: "hh:mm:ss",
        minDate: today,
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 11)
        }
    });

    $("#fechaFinCampania").datepicker({
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        timeFormat: "hh:mm:ss",
        minDate: today,
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 11)
        }
    });
});

// Rango de fechas para la campaña
$("#fechaInicioCampania").change(function () {

    var fecha = $("#fechaInicioCampania").val().split('-');
    fecha = new Date(fecha[1] + '-' + fecha[0] + '-' + fecha[2]);
    fecha.setDate(fecha.getDate() + 1);

    $("#fechaFinCampania").datepicker('destroy');

    $("#fechaFinCampania").datepicker({
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        timeFormat: "hh:mm:ss",
        minDate: fecha,
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 11)
        }
    });

    //Se comprueba que la fecha de inicio y finalización son válidas
    duracionMinima();

});

$("#fechaFinCampania").change(function () {
    duracionMinima();
});

function duracionMinima() { //Una campaña dura mínimo 24 horas
    var inicio = $("#fechaInicioCampania").val().split('-');
    var fin = $("#fechaFinCampania").val().split('-');

    if (fin[0] <= inicio[0] && fin[1] == inicio[1]) {
        Swal.fire({
            icon: 'error',
            title: 'Duración mínima',
            text: "La fecha de finalización debe ser posterior a la de inicio",
            confirmButtonText: "Vale",
            confirmButtonColor: "#D97925",
        });
    }
}

// Mostrar las diferentes opciónes del alcance
$("#empresaSelecionada").change(function () {
    if ($("#empresaSelecionada").val() !== "-1") {
        $("#opcionAlcance-2").removeClass("hidden");
    } else {
        $("#opcionAlcance-2").addClass("hidden");

    }
    mostrarAreas($("#empresaSelecionada").val());
    $("#paraArea").val("-1");
    $("#departamentoSeleccionado").val("-1");
    $("#areaSeleccionado").val("-1");
});

$("#alcanceSeleccionado").change(function () {
    if ($("#alcanceSeleccionado").val() === "0") {
        $("#paraArea").addClass("hidden");
        $("#paraAleatorio").addClass("hidden");
        $("#paraUno").addClass("hidden");
        $("#paraDepartamento").addClass("hidden");
    } else if ($("#alcanceSeleccionado").val() === "1") {
        $("#paraArea").removeClass("hidden");
        $("#paraAleatorio").addClass("hidden");
        $("#paraUno").addClass("hidden");
        $("#paraArea").val("-1");
    } else if ($("#alcanceSeleccionado").val() === "2") {
        $("#paraArea").addClass("hidden");
        $("#paraAleatorio").removeClass("hidden");
        $("#paraUno").addClass("hidden");
        $("#paraDepartamento").addClass("hidden");
    } else if ($("#alcanceSeleccionado").val() === "3") {
        $("#paraArea").removeClass("hidden");
        $("#paraAleatorio").addClass("hidden");
        $("#paraUno").addClass("hidden");
        $("#paraDepartamento").addClass("hidden");
    } else if ($("#alcanceSeleccionado").val() === "-1") {
        $("#paraArea").addClass("hidden");
        $("#paraAleatorio").addClass("hidden");
        $("#paraUno").addClass("hidden");
        $("#paraDepartamento").addClass("hidden");
    }
});

$("#paraArea").change(function () { //Mostrar las areas

    if ($("#areaSeleccionado").val() === "-1") {
        $("#paraDepartamento").addClass("hidden");
    } else {
        $("#paraDepartamento").removeClass("hidden");
        mostrarDepartamentos($("#areaSeleccionado").val());
    }
});

$("#departamentoSeleccionado").change(function () { //Mostrar los departamentos
    if (($("#alcanceSeleccionado").val() === "3") && ($("#departamentoSeleccionado").val() !== "-1")) {
        $("#paraUno").removeClass("hidden");
        mostrarEmpelados($("#departamentoSeleccionado").val(), $("#areaSeleccionado").val(), $("#empresaSelecionada").val());
    } else {
        $("#paraUno").addClass("hidden");
    }
});

function mostrarAreas(id) {//Mostramos las áreas de la Empresa seleccionada, usando idEmpresa
    var formCompania = new FormData();
    formCompania.append("id", id);

    $("#areaSeleccionado").empty(); //Eliminar registros de otras consultas
    $("#areaSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="-1">Seleccione</option>');

    $.ajax({
        url: url + 'Campanias/MostrarAreas',
        type: "POST",
        data: formCompania,
        contentType: false,
        processData: false,
        success: function (data) {
            for (var i = 0; i < data.nombresArea.length; i++) {
                $("#areaSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="' + data.nombresArea[i].idArea + '">' + data.nombresArea[i].nombreArea + '</option>');
            }
        }
    });
}

function mostrarDepartamentos(id) {//Mostramos los departamentos del área seleccionado, usando idArea
    var formCompania = new FormData();
    formCompania.append("id", id);

    $("#departamentoSeleccionado").empty(); //Eliminar registros de otras consultas

    $.ajax({
        url: url + 'Campanias/MostrarDepartamentos',
        type: "POST",
        data: formCompania,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.listaDep.length == 0) {
                $("#departamentoSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="0">No hay</option>');
                if ($("#alcanceSeleccionado").val() === "3") {
                    $("#paraUno").removeClass("hidden");
                    mostrarEmpelados($("#departamentoSeleccionado").val(), $("#areaSeleccionado").val(), $("#empresaSelecionada").val());
                }
            }
            else {
                $("#departamentoSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="-1">Seleccione</option>');
                for (var i = 0; i < data.listaDep.length; i++) {
                    $("#departamentoSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="' + data.listaDep[i].idDepartamento + '">' + data.listaDep[i].nombreDepartamento + '</option>');
                }
            }
        }
    });
}

// Mostrando el nombre de los empleados en función del área y el departamento, si lo hay
function mostrarEmpelados(idDep, idArea, idEmpresa) {
    var formCompania = new FormData();
    formCompania.append("idDep", idDep);
    formCompania.append("idArea", idArea);
    formCompania.append("idEmpresa", idEmpresa);

    $("#empleadoSeleccionado").empty(); //Eliminar registros de otras consultas

    $.ajax({
        url: url + 'Campanias/MostrarEmpleados',
        type: "POST",
        data: formCompania,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.listaEmpleados.length == 0) {
                $("#empleadoSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="-1">No hay</option>');
            }
            else {
                $("#empleadoSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="-1">Seleccione</option>');
                for (var i = 0; i < data.listaEmpleados.length; i++) {
                    $("#empleadoSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="' + data.listaEmpleados[i].idEmpleado + '">' + data.listaEmpleados[i].nombre + '</option>');
                }
            }
        }
    });
}

// Las plantillas del nivel
$("#nivelSeleccionado").change(function () {
    $("#categoria").removeClass("hidden");

    if ($("#bajo").is(':checked')) {
        mostrarPlantillas("1");
    }
    if ($("#medio").is(':checked')) {
        mostrarPlantillas("2");
    }
    if ($("#alto").is(':checked')) {
        mostrarPlantillas("3");
    }
});

// Mostrar las diferentes opciónes del nivel
function mostrarPlantillas(idNivel) {
    var formPlantilla = new FormData();
    formPlantilla.append("idNivel", idNivel);

    $("#plantillaSeleccionado").empty(); //Quedan registros de otras consultas

    $.ajax({
        url: url + 'Campanias/MostrarPlantillas',
        type: "POST",
        data: formPlantilla,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.listaPlantillas.length == 0) {
                $("#plantillaSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="-1">No hay</option>');
            }
            else {
                $("#plantillaSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="-1">Seleccione</option>');
                $("#plantillaSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="-2">Añadir plantillas</option>');
                for (var i = 0; i < data.listaPlantillas.length; i++) {
                    $("#plantillaSeleccionado").append('<option class="persnalizadoTamanoFuenteGeneral" value="' + data.listaPlantillas[i].idPlantilla + '">' + data.listaPlantillas[i].nombrePlantilla + '</option>');
                }
            }
        }
    });
}

$("#plantillaSeleccionado").change(function () { //Mostrar los elementos para añadir nueva plantilla o esconderlos
    if ($("#plantillaSeleccionado").val() === "-2") {

        $("#aniadirPlantillaIniciarCampania").removeClass("hidden");
        $("#paraPrueba").removeClass("hidden");
        $("#pruebaButton").addClass("hidden");
        $("#mostrarPrueba").addClass("hidden");

    }
    else if ($("#plantillaSeleccionado").val() === "-1") {
        $("#aniadirPlantillaIniciarCampania").addClass("hidden");
        $("#mostrarPrueba").addClass("hidden");
    }
    else {
        $("#aniadirPlantillaIniciarCampania").addClass("hidden");
        $("#mostrarPrueba").removeClass("hidden");
    }
});

//Inicializamos al entrar a la página la barra de progreso
var i = 1;
$('.vprogress .circle').removeClass().addClass('circle');
$('.vprogress .bar').removeClass().addClass('bar');

$('#circle1').addClass('active');

//Botones de siguiente y anterior en el formulario
var allNextBtn = $('.btn-continuar');

allNextBtn.click(function () {
    var curStep = $(this).closest(".setup-content-3"),
        curStepBtn = curStep.attr("id"),
        nextStepSteps = $('#' + curStepBtn).next().attr("id");

    var valido = true;
    var text = "";

    //Filtrado por pasos
    if (curStepBtn == "step-1") {
        if ($("#nombreCampania").val() === "") {
            valido = false;
            text = "Debe introducir un nombre para la campaña.";
        }
        if ($("#fechaInicioCampania").val() === "") {
            valido = false;
            text = "Debe seleccionar la fecha para el inicio de la campaña.";
        }
        else if ($("#fechaFinCampania").val() === "") {
            valido = false;
            text = "Debe seleccionar las fechas para de finalización de la campaña.";
        }
        else if ($("#empresaSelecionada").val() === "-1") {
            valido = false;
            text = "Debe seleccionar la empresa a la que quiere lanzar la campaña.";
        }

        if (($("#alcanceSeleccionado").val() === "-1" && !document.getElementById('opcionAlcance-2').classList.contains("hidden"))) {
            valido = false;
            text = "Debe seleccionar a quién quiere lanzar la campaña.";
        }

        if ($("#alcanceSeleccionado").val() === "1" && $("#areaSeleccionado").val() === "-1" && document.getElementById('paraDepartamento').classList.contains("hidden")) {
            valido = false;
            text = "Debe seleccionar un área.";
        }

        if ($("#departamentoSeleccionado").val() === "-1" && !document.getElementById('paraDepartamento').classList.contains("hidden")) {
            valido = false;
            text = "Debe seleccionar un departamento.";
        }

        if ($("#numAlcanceAleatorio").val() === "" && !document.getElementById('paraAleatorio').classList.contains("hidden")) {
            valido = false;
            text = "Debe seleccionar el número de empleados a los que quiere lanzar la campaña.";
        }

        
        if (Number.isNaN(Number.parseInt($("#numAlcanceAleatorio").val(), 10)) && !document.getElementById('paraAleatorio').classList.contains("hidden")) {
            valido = false;
            text = "Debe introducir un valor NUMÉRICO."
        }


        if ($("#empleadoSeleccionado").val() === "-1" && !document.getElementById('paraUno').classList.contains("hidden")) {
            valido = false;
            text = "Debe seleccionar el empleado al que quiere lanzar la campaña.";
        }
    }

    if (valido == true) {
        var formCampania = new FormData();
        formCampania.append("empresa", $("#empresaSelecionada").val());
        formCampania.append("opcionAlcance", $("#alcanceSeleccionado").val());
        formCampania.append("area", $("#areaSeleccionado").val());
        formCampania.append("departamento", $("#departamentoSeleccionado").val());
        formCampania.append("aleatorio", $("#numAlcanceAleatorio").val());
        formCampania.append("empleado", $("#empleadoSeleccionado").val());

        $.ajax({
            url: url + 'Campanias/NumeroDestinatarios',
            type: "POST",
            data: formCampania,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.res == 0) {
                    valido = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.mensaje,
                        confirmButtonText: "Vale",
                        confirmButtonColor: "#C70039"
                    });
                } else {
                    //Mostrar y esconder partes del formulario
                    $('#' + curStepBtn).attr('hidden', true);
                    $('#' + nextStepSteps).removeAttr('hidden');

                    //ProgressBar
                    i++;
                    $('#circle' + i).addClass('active');
                    $('#circle' + (i - 1)).removeClass('active').addClass('done');
                    $('#circle' + (i - 1) + ' .label').html('✓');
                    $('#bar' + (i - 1)).addClass('active');
                    $('#bar' + (i - 2)).removeClass('active').addClass('done');

                    if (i == 0) {
                        $('.vprogress .bar').removeClass().addClass('bar');
                        $('.vprogress div.circle').removeClass().addClass('circle');
                        i = 1;
                    }
                }
            },
            error: function (xhr, status, p3, p4) {
                alert("Error. La petición de datos ha fallado.");
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Faltan campos requeridos',
            text: text,
            confirmButtonText: "Vale",
            confirmButtonColor: "#D97925",
        })
    }     
});

var allPrevBtn = $(".btn-atras");

allPrevBtn.click(function () {
    var curStep = $(this).closest(".setup-content-3"),
        curStepBtn = curStep.attr("id");
    prevStepSteps = $("#" + curStepBtn).prev().attr("id");

    $('#' + curStepBtn).attr('hidden', true);
    $('#' + prevStepSteps).removeAttr('hidden');

    //Progressbar            
    i--;
    $('#circle' + (i + 1)).removeClass('active');
    $('#circle' + i).removeClass('done').addClass('active');
    $('#circle' + i + ' .label').html(i);
    $('#bar' + i).removeClass('active');
    $('#bar' + (i - 1)).removeClass('done').addClass('active');

    if (i == 0) {
        $('.vprogress .bar').removeClass().addClass('bar');
        $('.vprogress div.circle').removeClass().addClass('circle');
        i = 1;
    }
});

function comprobarCampos() { //Para cargar datos
    var valido = true;
    var text = "";

    if (document.getElementById('categoria').classList.contains("hidden")) {
        valido = false;
        text = "Debe seleccionar el nivel de las plantillas.";
    }
    if ($("#plantillaSeleccionado").val() === "-1") {
        valido = false;
        text = "Debe seleccionar las plantillas que quiere utilizar.";
    }
    if ($("#plantillaSeleccionado").val() === "-2" && $("#nombre").val() == "") {
        valido = false;
        text = "Debe darle un nombre a las plantillas."
    }
    if ($("#plantillaSeleccionado").val() === "-2" && $("#asunto").val() == "") {
        valido = false;
        text = "Debe introducir el nombre del asunto para los correos asociados a esta plantilla."
    }
    if ($("#plantillaSeleccionado").val() === "-2" && $("#dropzonePlantillasCorreo")[0].dropzone.files.length === 0) {
        valido = false;
        text = "Debe añadir los archivos del correo de la plantilla."
    }
    if ($("#plantillaSeleccionado").val() === "-2" && $("#dropzonePlantillasWeb")[0].dropzone.files.length === 0) {
        valido = false;
        text = "Debe añadir los archivos de las plantillas."
    }
    
    if (valido == true) {
        generarPlantilla();
    }
    else
    {
        Swal.fire({
            icon: 'error',
            title: 'Faltan campos requeridos',
            text: text,
            confirmButtonText: "Vale",
            confirmButtonColor: "#D97925",
        });
    }
}

var idPlantillaUtilizada = "";
var idNuevaCampania = "";

function generarPlantilla() {
    var formCampania = new FormData();
 
    var nivel;
    if ($("#bajo").is(':checked')) {
        nivel = 1;
    } else if ($("#medio").is(':checked')) {
        nivel = 2;
    } else if ($("#alto").is(':checked')) {
        nivel = 3;
    }
    formCampania.append("nivel", nivel);
    formCampania.append("nombrePlantilla", $("#nombre").val());
    formCampania.append("asunto", $("#asunto").val())

    var lista = [];
    for (var i = 0; i < $("#dropzonePlantillasCorreo")[0].dropzone.files.length; i++) {
        lista[i] = $("#dropzonePlantillasCorreo")[0].dropzone.files[i].id;
    }
    var longitud = lista.length;
    var j = $("#dropzonePlantillasWeb")[0].dropzone.files.length;
    i = 0;
    while (j > 0) {
        lista[longitud] = $("#dropzonePlantillasWeb")[0].dropzone.files[i].id;
        j--; i++; longitud++;
    }
    //console.log(lista);
    formCampania.append("archivos", lista);

    $.ajax({
        url: url + 'Campanias/GenerarPlantilla',
        type: "POST",
        data: formCampania,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.res == 1) {
                idPlantillaUtilizada = data.idPlantilla;

                const $select = document.querySelector("#plantillaSeleccionado");
                const option = document.createElement('option');
                option.value = idPlantillaUtilizada;
                option.text = data.nombre;
                $select.appendChild(option);
                
                $("#plantillaSeleccionado").val(option.value);

                $("#mostrarPrueba").removeClass("hidden");
                $("#paraPrueba").removeClass("hidden");
                $("#grupoBotones").addClass("hidden");
                $("#aniadirPlantillaIniciarCampania").addClass("hidden");
                
            } else if (data.res == -2) {
                window.location.href = urlLogin;
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.mensaje,
                    confirmButtonText: "Vale",
                    confirmButtonColor: "#C70039"
                });
            }
        },
        error: function (xhr, status, p3, p4) {
            alert("Error. La petición de datos ha fallado.");
        }
    })
}

function comprobarCorreoOrigen() {
    var valido = true;
    var mensaje = "";

    if ($("#puerto").val() === "") {
        valido = false;
        mensaje = "Debe introducir un puerto";
    }
    if (Number.isNaN(Number.parseInt($("#puerto").val(), 10))) {
        valudo = false;
        mensaje = "El puerto es nu número."
    }
    if ($("#servidorSMTP").val() === "") {
        valido = false;
        mensaje = "Debe introducir un servidorSMTP."
    }
    if ($("#contrasenia").val() === "") {
        valido = false;
        mensaje = "Debe introducir la contraseña asociada al correo."
    }
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test($("#correo").val())) {
        valido = false;
        mensaje = "El correo introducido no es valido."
    }
    if ($("#correo").val() === "") {
        valido = false;
        mensaje = "Debe introducir el correo de origen de la campaña";
    }

    var lista = [valido, mensaje];
    return lista;
}

function comprobarCamposPrueba() { //Que el correo de prueba tenga destinatario y se manda el correo
    valido = true;
    mensaje = "";

    lista = comprobarCorreoOrigen();
    valido = lista[0];
    mensaje = lista[1];

    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test($("#correoPrueba").val())) {
        valido = false;
        mensaje = "El correo de destino introducido no es valido."
    }
    if ($('#prueba').is(':checked') && $("#correoPrueba").val() === "") {
        valido = false;
        mensaje = "Debe poner un correo destinatario para el correo de prueba."
    }
    
    if (valido) {
        enviarPrueba();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
            confirmButtonText: "Vale",
            confirmButtonColor: "#C70039"
        });
    }
}

function enviarPrueba() {
    var form = new FormData();
    form.append("correoDestino", $("#correoPrueba").val());
    form.append("idPlantilla", $("#plantillaSeleccionado").val());
    form.append("correoOrigen", $("#correo").val());
    form.append("contrasenia", $("#contrasenia").val());
    form.append("servidorSMTP", $("#servidorSMTP").val());
    form.append("puerto", $("#puerto").val());

    $.ajax({
        url: url + 'Campanias/CorreoPrueba',
        type: "POST",
        data: form,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.res == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Correo de prueba enviado',
                    text: 'Revise su bandeja de entrada',
                    confirmButtonText: "Vale",
                    confirmButtonColor: "#D97925"
                });
            } else if (data.res == -2) {
                window.location.href = urlLogin;
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.mensaje,
                    confirmButtonText: "Vale",
                    confirmButtonColor: "#C70039"
                });
            }
        },
        error: function (xhr, status, p3, p4) {
            alert("Error. La petición de datos ha fallado.");
        }
    })
}

$("#prueba").change(function () { //Se muestra boton para correo prueba o para iniciar campaña
    if ($('#prueba').is(':checked')) {
        $("#pruebaButton").removeClass("hidden");
        $("#iniciarButton").addClass("hidden");
    }
    else {
        $("#pruebaButton").addClass("hidden");
        $("#iniciarButton").removeClass("hidden");
    }
});

function comprobarCamposCampania() {
    valido = true;
    mensaje = "";

    lista = comprobarCorreoOrigen();
    valido = lista[0];
    mensaje = lista[1];

    if ($("#plantillaSeleccionado").val() === "-1"){
        valido = false;
        mensaje = "Debe seleccionar una plantilla para la campaña."
    }

    if (valido) {
        enviarCorreosCampania();
    }
    else { 
        Swal.fire({
            icon: 'error',
            title: 'Faltan campos requeridos',
            text: mensaje,
            confirmButtonText: "Vale",
            confirmButtonColor: "#D97925",
        });
    }
}

function enviarCorreosCampania() { //Manda al back la confirmación para enviar los correos y convertir la campaña en permanenete
    var formCampania = new FormData();
    formCampania.append("nombreCampania", $("#nombreCampania").val());
    formCampania.append("fechaInicio", $("#fechaInicioCampania").val());
    formCampania.append("fechaFin", $("#fechaFinCampania").val());
    formCampania.append("empresa", $("#empresaSelecionada").val());
    formCampania.append("plantilla", $("#plantillaSeleccionado").val());
    formCampania.append("correoOrigen", $("#correo").val());
    formCampania.append("contrasenia", $("#contrasenia").val());
    formCampania.append("servidorSMTP", $("#servidorSMTP").val());
    formCampania.append("puerto", $("#puerto").val());
    if ($("#dominio").val() !== "") {
        formCampania.append("dominio", $("#dominio").val());
    }
    if ($("#servidor").val() !== "") {
        formCampania.append("servidor", $("#servidor").val());
    }

    Swal.fire({
        icon: 'warning',
        title: 'Empezar campaña',
        text: "¿Está seguro de que quiere lanzar la campaña?",
        background: '#FDFEFE',
        buttonsStyling: false,
        showCancelButton: true,
        cancelButtonText: "No",
        customClass: {
            cancelButton: 'btn btn-cerrar',
            confirmButton: 'btn btn-iniciar'
        },
        confirmButtonText: "Sí",
        reverseButtons: true,
        closeOnCancel: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + 'Campanias/LanzarCampania',
                type: "POST",
                data: formCampania,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data.res == 1) {
                        //Si la petición ha tenido exito, volvemos a cargar los datos a la tabla con la campania iniciada
                        CargarDatosTabla(data);
                        window.location.href = url;
                    } else if (data.res == -2) {
                        window.location.href = urlLogin;
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: data.mensaje,
                            confirmButtonText: "Vale",
                            confirmButtonColor: "#C70039"
                        });
                    }
                },
                error: function (xhr, status, p3, p4) {
                    alert("Error. La petición de datos ha fallado.");
                }
            })
        }
    })
}

//VER CAMPAÑA
function verCampania(id) {
    window.location.href = url + "Campanias/VerCampania?id=" + id;
}

function pedirParticipantes(id) {//Perdir participantes

    var today = new Date();
    //Inicializamos los input text que sean para fecha para que solo se despligue un calendario del que se selecciona la fecha
    $("#fechaInicioCampania").datepicker({
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        timeFormat: "hh:mm:ss",
        minDate: today,
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 11)
        }
    });

    $("#fechaFinCampania").datepicker({
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        timeFormat: "hh:mm:ss",
        minDate: today,
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShow: function () {
            $(".ui-datepicker").css('font-size', 11)
        }
    });

    var formCompania = new FormData();
    formCompania.append("id", id);

    $.ajax({
        url: url + 'Campanias/MostrarParticipantes',
        type: "POST",
        data: formCompania,
        contentType: false,
        processData: false,
        success: function (data) {
            cargarParticipantes(data);
        },
        error: function (xhr, status, p3, p4) {
            alert("Error. La petición de datos ha fallado.");
        }
    });
}

function cargarParticipantes(data) {
    //Si la peticion ha sido correcta, cargamos los datos en la tabla
    table = $('#tablaVerCampanias').DataTable({
        destroy: true,
        "pagingType": "full_numbers",
        iDisplayLength: 30,
        autoWidth: true, //false --> reajusta; true-> desactiva el auto ajuste
        data: data.participante,
        fixedColumns: false,
        dom: 'B<"clear">lfrtip', //'Bfrtip',

        "language": {
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "lengthMenu": "Mostrar _MENU_",
            "search": "Buscar:",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sZeroRecords": "No se encontraron resultados en la busqueda",
            "sEmptyTable": "No hay registros disponibles",
            "paginate": {
                "previous": "Anterior",
                "next": "Siguiente",
                "first": "Primero",
                "last": "Último"
            },
        },

        drawCallback: function () {
            $('.dataTables_wrapper').addClass('personalizadoDatatable');
        },

        "aoColumnDefs": [
            { 'bSortable': false, 'aTargets': [0, 5, 7] },
            { className: "text-center", 'aTargets': [5, 7] },
        ],

        "order": [[1, "asc"], [2, "asc"], [3, "asc"], [6, "asc"]],

        columns: [
            {
                'data': 'EmpID',
                "render": function (EmpID) {
                    return '<button type="button" id="' + EmpID + '" data-toggle="modal" data-target="#ObservacionModal" onclick="sacarEmpID(' + EmpID + ')" title="Observación" class="dashboardButton observacionButton"> <i class="fa-solid fa-pencil fa-xs"></i> </button>';
                }
            },
            {
                'data': 'AreaNombre',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': 'DepNombre',
                render: function (data) {
                    return data.trim();
                }
            },
            {
                'data': 'Nombre',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': 'EmailTrabajo',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': 'Acierto',
                render: function (Acierto) {
                    if (Acierto) {
                        return '<i class="fa-solid fa-check fa-xl"></i';
                    } else {
                        return '<i class="fa-solid fa-xmark fa-xl"></i>';
                    }
                }
            },
            {
                'data': 'InformacionCaptada',
                render: function (data) {
                    return data;
                }
            },
            {
                'data': function (data, type, dataToSet) {
                    if (data.Fracaso) {
                        return '<input type="checkbox" style="cursor:pointer; " id="' + data.EmpID + '" name="selecionarParaCorreo" checked/>';
                    } else {
                        return '<input type="checkbox" style="cursor:pointer;" id="' + data.EmpID + '" name="selecionarParaCorreo"/>';
                    }
                }
            },
            {
                'data': 'Observacion',
                render: function (data) {
                    return data;
                }
            }
        ]
    });

    if (esSuperAdmin == "False") { //Esconder la columna de información captada para no administradores
        $("#tablaVerCampanias").DataTable().column(6).visible(false);
    }
}

function mostrarOcultarFiltroVer(columna) { //Muestra oculta el icono de filtro en la tabla de empleados que participan en la campaña
    switch (columna) {
        case "filtroArea":
            if ($("#filtroArea").is(":hidden")) {
                $("#filtroArea").attr("hidden", false);
            } else {
                $("#filtroArea").attr("hidden", true);
            }
            break;
        case "filtroDep":
            if ($("#filtroDep").is(":hidden")) {
                $("#filtroDep").attr("hidden", false);
            } else {
                $("#filtroDep").attr("hidden", true);
            }
            break;
        case "filtroNombre":
            if ($("#filtroNombre").is(":hidden")) {
                $("#filtroNombre").attr("hidden", false);
            } else {
                $("#filtroNombre").attr("hidden", true);
            }
            break;
        case "filtroCorreo":
            if ($("#filtroCorreo").is(":hidden")) {
                $("#filtroCorreo").attr("hidden", false);
            } else {
                $("#filtroCorreo").attr("hidden", true);
            }
            break;
        case "filtroCaptada":
            if ($("#filtroCaptada").is(":hidden")) {
                $("#filtroCaptada").attr("hidden", false);
            } else {
                $("#filtroCaptada").attr("hidden", true);
            }
            break;
    }
}

$("#selecionarTodo").change(function () { //Seleccionar todos los partcipantes para correo formativo
    if (this.checked) {
        var elem = document.getElementsByName('selecionarParaCorreo');
        for (var i = 0; i < elem.length; i++) {
            if (elem[i].type == 'checkbox')
                elem[i].checked = true;
        }
    }
});

//Filtro para participantes
var inputArea = "";
var opcionArea = "0";
var inputDep = "";
var opcionDep = "0";
var inputNom = "";
var opcionNom = "0";
var inputCorreo = "";
var opcionCorreo = "0";
var inputCaptada = "";
var opcionCaptada = "0";
var inputObservacion = "";
var opcionObservacion = "0";


$("#cabeceraFiltroArea").change(function () {//Area
    inputArea = $("#filtroInputArea").val();
    opcionArea = $("#filtroArea").val();
    filtrarEmpleado();
});

$("#cabeceraFiltroDep").change(function () { //Departamento
    inputDep = $("#filtroInputDep").val();
    opcionDep = $("#filtroDep").val();
    filtrarEmpleado();
});

$("#cabeceraFiltroNombre").change(function () {// Nombre empleado
    inputNom = $("#filtroInputNombre").val();
    opcionNom = $("#filtroNombre").val();
    filtrarEmpleado();
});

$("#cabeceraFiltroCorreo").change(function () {// Email usado
    inputCorreo = $("#filtroInputCorreo").val();
    opcionCorreo = $("#filtroCorreo").val();
    filtrarEmpleado();
});

$("#cabeceraFiltroCaptada").change(function () {// Información captada
    inputCaptada = $("#filtroInputCaptada").val();
    opcionCaptada = $("#filtroCaptada").val();
    filtrarEmpleado();
});

$("#cabeceraFiltroObservacion").change(function () {// Información captada
    inputObservacion = $("#filtroInputObservacion").val();
    opcionObservacion = $("#filtroObservacion").val();
    filtrarEmpleado();
});

function filtrarEmpleado() { //Enviamos los valores de los filtros al back
    var formData = new FormData();

    formData.append("idCampania", idCampaniaActiva)
    formData.append("inputArea", inputArea);
    formData.append("opcionArea", opcionArea);
    formData.append("inputDep", inputDep);
    formData.append("opcionDep", opcionDep);
    formData.append("inputNom", inputNom);
    formData.append("opcionNom", opcionNom);
    formData.append("inputCorreo", inputCorreo);
    formData.append("opcionCorreo", opcionCorreo);
    formData.append("inputCaptada", inputCaptada);
    formData.append("opcionCaptada", opcionCaptada);
    formData.append("inputObservacion", inputObservacion);
    formData.append("opcionObservacion", opcionObservacion);

    $.ajax({
        url: url + 'Campanias/FiltrarDatosEmpleados',
        type: "POST",
        processData: false,
        data: formData,
        contentType: false,
        async: false,
        success: function (data) {
            table.clear().draw(); //Vaciamos tabla
            cargarParticipantes(data); //Cargamos otra vez datos dependiendo de filtros
        },
        error: function (xhr, status, p3, p4) {
            alert("Error. La petición de datos ha fallado en el filtrado.");
        }
    });
}

var idEmpleadoObs;
function sacarEmpID(id){
    idEmpleadoObs = id;
}

function comprobarCamposObservacion() { //Comprueba campos de añadir obervación
    if (!$.trim($("#contenidoObs").val())) {
        Swal.fire({
            icon: 'error',
            title: 'Faltan campos requeridos',
            text: 'Debe escribir una observación',
            confirmButtonText: "Vale",
            confirmButtonColor: "#D97925",
        });
    }
    else {
        aniadirObservacion();
    }
}

function aniadirObservacion() { //Añadir obervación
    $("#ObservacionModal").modal('hide');

    var formData = new FormData();
    formData.append("idCampania", idCampaniaActiva);
    formData.append("idEmpleado", idEmpleadoObs);
    formData.append("contenidoObs", $("#contenidoObs").val());
    
    $.ajax({
        url: url + 'Campanias/AniadirObservacion',
        type: "POST",
        processData: false,
        data: formData,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.res == 0) {
                table.clear().draw(); //Vaciamos tabla
                cargarParticipantes(data); //Cargamos otra vez datos dependiendo de filtros
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.mensaje,
                    confirmButtonText: "Vale",
                    confirmButtonColor: "#C70039"
                });
            }
        },
        error: function (xhr, status, p3, p4) {
            alert("Error. La petición de datos ha fallado en el filtrado.");
        }
    });
}

function enviarCorreoFormativo() { //Manda al backend la lista de empleados a los que hay que mandar el correo formativo
    var listaEmplados = [];

    var elem = document.getElementsByName('selecionarParaCorreo');
    for (var i = 0; i < elem.length; i++) { //Seleciona todos los empleados
        if (elem[i].checked)
            listaEmplados.push(elem[i].id);
    }

    var formData = new FormData();
    formData.append("listaEmpleados", listaEmplados);
    formData.append("fechaReunion", $("#fechaReunion").val());
    formData.append("horaReunion", $("#horaReunion").val());
    formData.append("lugarReunion", $("#lugarReunion").val());

    $.ajax({
        url: url + 'Campanias/CorreoFormativo',
        type: "POST",
        processData: false,
        data: formData,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.res == 0) {
                $("#FormacionModal").modal('toggle');
                Swal.fire({
                    icon: 'success',
                    title: 'Correo formativo enviado',
                    text: 'El correo con los datos para la reunión formativa ha sido enviado correctamente',
                    confirmButtonText: "Vale",
                    confirmButtonColor: "#D97925"
                });
            } else if (data.res == -2) {
                window.location.href = urlLogin;
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.mensaje,
                    confirmButtonText: "Vale",
                    confirmButtonColor: "#C70039"
                });
            }
        },
        error: function (xhr, status, p3, p4) {
            alert("Error. La petición de datos ha fallado en el filtrado.");
        }
    }); 
}

function comprobarCamposReunion() { //Datos de la reunión
    var valido = true;
    var mensaje = "";

    if ($("#fechaReunion").val() == "")
    {
        valido = false;
        mensaje = "Debe seleccionar una fecha para la reunión."
    }
    if ($("#horaReunion").val() == "") {
        valido = false;
        mensaje = "Debe seleccionar una hora para la reunión."
    }
    if ($("#lugarReunion").val() == "") {
        valido = false;
        mensaje = "Debe introducir un lugar para la reunión."
    }

    if (valido) {
        enviarCorreoFormativo();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Faltan campos requeridos',
            text: mensaje,
            confirmButtonText: "Vale",
            confirmButtonColor: "#D97925",
        });
    }
}

$("#nivelEd").change(function () {
    var nivel;
    if ($("#bajo").is(':checked')) {
        nivel = 1;
    } else if ($("#medio").is(':checked')) {
        nivel = 2;
    } else if ($("#alto").is(':checked')) {
        nivel = 3;
    }

    var formData = new FormData();

    formData.append("nivel", nivel);
    $("#plantillaSeleccionadaEd").removeClass("hidden");
    $("#nombrePlantillaEd").addClass("hidden");
    $("#plantillaSeleccionadaEd").empty(); //Eliminar registros de otras consultas

    $.ajax({
        url: url + 'Campanias/EditarPlantillaCampania',
        type: "POST",
        processData: false,
        data: formData,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.res == 0) {
                if (data.listaPlantillas.length == 0) {
                    $("#plantillaSeleccionadaEd").append('<option class="persnalizadoTamanoFuenteGeneral" value="-1">No hay</option>');
                }
                else {
                    $("#plantillaSeleccionadaEd").append('<option class="persnalizadoTamanoFuenteGeneral" value="-1">Seleccione</option>');
                    for (var i = 0; i < data.listaPlantillas.length; i++) {
                        $("#plantillaSeleccionadaEd").append('<option class="persnalizadoTamanoFuenteGeneral" value="' + data.listaPlantillas[i].id + '">' + data.listaPlantillas[i].nombrePlantilla + '</option>');
                    }
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.mensaje,
                    confirmButtonText: "Vale",
                    confirmButtonColor: "#C70039"
                });
            }
        },
        error: function (xhr, status, p3, p4) {
            alert("Error. La petición de datos ha fallado en el filtrado.");
        }
    });
});

$("#fechaInicioCampania, #fechaFinCampania, #nombrePlantillaC, #plantillaSeleccionadaEd, #nivelEd, #dominioEd, #servidorEd").change(function(){
    $("#guardarEd").removeClass("hidden");
});

function comprobarCamposEdicion() {
    var valido = true;
    var mensaje = "";

    if (!document.getElementById('plantillaSeleccionadaEd').classList.contains("hidden") && $("#plantillaSeleccionadaEd").val() == "-1") {
        valido = false;
        mensaje = "Debe seleccionar una plantilla para la campaña";
    }
    if ($("#nombrePlantillaC").val() == "") {
        valido = false;
        mensaje = "Una campaña necesita un nombre. Introduzca un nombre."
    }
    if ($("#fechaFinCampania").val() == "") {
        valido = false;
        mensaje = "Las campañas necesitan fechas de finalización."
    }
    if ($("#fechaInicioCampania").val() == "") {
        valido = false;
        mensaje = "Las campañs necesitan fechas de inicio";
    }

    if (valido) {
        Swal.fire({
            icon: 'warning',
            title: 'Guardar cambios campaña',
            text: "¿Está seguro de que quiere modificar la campaña?",
            background: '#FDFEFE',
            buttonsStyling: false,
            showCancelButton: true,
            cancelButtonText: "No",
            customClass: {
                cancelButton: 'btn btn-cerrar',
                confirmButton: 'btn btn-iniciar'
            },
            confirmButtonText: "Sí",
            reverseButtons: true,
            closeOnCancel: true
        }).then((result) => {
            guardarCambiosEdicion()
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Faltan campos requeridos',
            text: mensaje,
            confirmButtonText: "Vale",
            confirmButtonColor: "#D97925",
        });
    }
}

function guardarCambiosEdicion() {
    var plantilla;

    if (document.getElementById('plantillaSeleccionadaEd').classList.contains("hidden")) {
        plantilla = 0;
    }
    else {
        plantilla = $("#plantillaSeleccionadaEd").val();
    }

    var formData = new FormData();
    formData.append("idCampania", idCampaniaActiva);
    formData.append("fechaInicio", $("#fechaInicioCampania").val());
    formData.append("fechaFin", $("#fechaFinCampania").val());
    formData.append("nombre", $("#nombrePlantillaC").val());
    formData.append("idPlantilla", plantilla);
    formData.append("dominio", $("#dominioEd").val());
    formData.append("servidor", $("#servidorEd").val());

    $.ajax({
        url: url + 'Campanias/GuardarCambiosCampaña',
        type: "POST",
        processData: false,
        data: formData,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.res == 0) {
                window.location.href = url;
            }
            else if (data.res = -2) {
                window.location.href = urlLogin;
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.mensaje,
                    confirmButtonText: "Vale",
                    confirmButtonColor: "#C70039"
                });
            }
        },
        error: function (xhr, status, p3, p4) {
            alert("Error. La petición de datos ha fallado en el filtrado.");
        }
    });
}

