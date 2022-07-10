'use strict'


// Añadir imagen de fondo a la tarjeta
function uploadAreaButton(input, id) {
    var parentDiv = $(input).parent();
    parentDiv.appendTo($('#source2'))
    $('#source2 div').appendTo($('#source2'));
    uploadAreaID = parentDiv[0].id;

    var fileupload = $("#" + id);
    fileupload.on('change', function () {
        let fileName = document.getElementById(id).files[0];

        if (uploadAreaID != "") {
            if (fileName != undefined) {
                var file = document.getElementById(id).files[0]
                var nameFile = file.name
                var add = true

                for (var a = 0; a < listaImagenesAreas.length; a++) {
                    if (file.name == listaImagenesAreas[a].name && file.size == listaImagenesAreas[a].size) {
                        add = false
                        break
                    }
                }

                if (add) {
                    listaImagenesAreas.push(file)
                }
                
                document.getElementById(id).classList = ""
                document.getElementById(id).classList.add(nameFile)
                var src1 = URL.createObjectURL(file);
                document.getElementById(uploadAreaID).style.backgroundImage = 'url(' + src1 + ')';
            } else {
                document.getElementById(id).classList = ""
                document.getElementById(uploadAreaID).style.backgroundImage = 'none';
            }
            captura(activity, canvas)
        }
    })
}

// Cambiar zona de juego o de jugador
function addUserButton(click) {
    var parentDiv = $(click).parent();
    var elemento = document.getElementById(parentDiv.context.children[0].id);
    var areaPadre = document.getElementById(parentDiv[0].id);
    var botonUsuario = document.getElementById(parentDiv.context.id)

    if (elemento.classList.contains("user")) {
        elemento.classList.remove("user")
        elemento.classList.add("users")
        areaPadre.style.backgroundColor = "#F0FFB4";
        botonUsuario.title = "Cambiar a zona de jugador"
        elemento.src = "/static/dash/dist/assets/img/users.png"
    } else {
        elemento.classList.remove("users")
        elemento.classList.add("user")
        areaPadre.style.backgroundColor = "#DBF5FF";
        botonUsuario.title = "Cambiar a zona de juego"
        elemento.src = "/static/dash/dist/assets/img/user.png"
    }
    captura(activity, canvas)
}

