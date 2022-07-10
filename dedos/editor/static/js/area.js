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
                console.log("entra en el distinto del filename",id)
                var file = document.getElementById(id).files[0]
                var nameFile = file.name
                
                /*
                var imagenAnterior = document.getElementById(id).classList
                if (imagenAnterior.length != 0){
                    listaImagenesAreas = listaImagenesAreas.filter(item => !(item.name == imagenAnterior[0]));
                }
                */
                var add = true

                for(var a = 0; a < listaImagenesAreas.length; a++){
                    if(file.name == listaImagenesAreas[a].name && file.size == listaImagenesAreas[a].size){
                        add = false
                        break
                    }
                }
                if(add){
                    listaImagenesAreas.push(file)
                }
              
				
                document.getElementById(id).classList = ""
                document.getElementById(id).classList.add(nameFile)
                var src1 = URL.createObjectURL(file);
                console.log("el src", src1)
                document.getElementById(uploadAreaID).style.backgroundImage = 'url(' + src1 + ')';
            } else {

                /*
                var imagenAnterior = document.getElementById(id).classList
                if (imagenAnterior.length != 0){
                    listaImagenesAreas = listaImagenesAreas.filter(item => !(item.name == imagenAnterior[0]));
                }
                */
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
      //  elemento.width = "40px"
        
    } else {
        elemento.classList.remove("users")
        elemento.classList.add("user")
        areaPadre.style.backgroundColor = "#DBF5FF";
        botonUsuario.title = "Cambiar a zona de juego" 
        elemento.src = "/static/dash/dist/assets/img/user.png"
      //  elemento.width = "40px"
    }
    captura(activity, canvas)
}

