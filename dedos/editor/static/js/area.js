'use strict'


// Añadir imagen de fondo a la tarjeta
function uploadAreaButton(input, id) {
    var parentDiv = $(input).parent();
    console.log("uploadArea id", parentDiv[0].id)
    parentDiv.appendTo($('#source2'))
    $('#source2 div').appendTo($('#source2'));
    uploadAreaID = parentDiv[0].id;

    var fileupload = $("#" + id);
    fileupload.on('change', function () {
        let fileName = document.getElementById(id).files[0];
        console.log("EL UPLOAD AREA ES", uploadAreaID)
        if (uploadAreaID != "") {
            console.log("entra en el distinto", fileName)
            if (fileName != undefined) {
                console.log("entra en el distinto del filename")
                var src1 = URL.createObjectURL(document.getElementById(id).files[0]);
                console.log("el src", src1)
                document.getElementById(uploadAreaID).style.backgroundImage = 'url(' + src1 + ')';
            } else {
                document.getElementById(uploadAreaID).style.backgroundImage = 'none';
            }
        }
    })
}

// Cambiar zona de juego o de jugador
function addUserButton(click) {
    var parentDiv = $(click).parent();
    var elemento = document.getElementById(parentDiv.context.children[0].id);
    var areaPadre = document.getElementById(parentDiv[0].id);
    var botonUsuario = document.getElementById(parentDiv.context.id)

    if (elemento.classList.contains("fa-user")) {
        elemento.classList.remove("fa-user")
        elemento.classList.add("fa-users")
        areaPadre.style.backgroundColor = "#F0FFB4";
        botonUsuario.title = "Cambiar a zona de jugador"
    } else {
        elemento.classList.remove("fa-users")
        elemento.classList.add("fa-user")
        areaPadre.style.backgroundColor = "#DBF5FF";
        botonUsuario.title = "Cambiar a zona de juego"
    }
}

