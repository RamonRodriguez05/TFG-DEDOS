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
            if(data == "True"){
                return "Privado"
            }else{
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
                    if(data == "True"){
                        return "Privado"
                    }else{
                       return "Público" 
                    }
                   
                },
                targets: 6,
            }
        ],

    });


});
