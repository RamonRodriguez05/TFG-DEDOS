'use strict'

function fijarCard(input) {
    var parentDiv = $(input).parent();
    	
    parentDiv.draggable()
    if (fix) {
        var clases = parentDiv.attr("class") + " fixed card"
        parentDiv.attr("class", clases)
        parentDiv.draggable("disable");
    } else {
        var clases = parentDiv.attr("class") + " fixed card"
        parentDiv.attr("class", clases)

        parentDiv.draggable("enable");
    }
}

function mostrarConfigCard(input) {
    var parentDiv = $(input).parent();
    var hijo = parentDiv.children(0).children(7).context.id

    var splitData = hijo.split('_')
    var idd = "back_" + splitData[2].toString();
    var idd2 = "textArea_" + splitData[2].toString();
    var idd3 = "idTitle_" + splitData[2].toString();
    let menu = document.getElementById(idd);
    let menu2 = document.getElementById(idd2);
    let menu3 = document.getElementById(idd3)

    if (menu.classList.contains("ocultar")) {
        menu.classList.remove("ocultar")
        menu2.classList.add("ocultar")
        menu3.classList.add("ocultar")
        menu.classList.add("inputTextRetroalimentacion")
    } else {
        menu.classList.add("ocultar")
        menu2.classList.remove("ocultar")
        menu3.classList.remove("ocultar")
    }
}

function evalutarTab(idElemento, evt, element, deseleccionar) {
    console.log("el evento",evt)
    if (idElemento == element.id) {
        document.getElementById(idElemento).style.display = "block";
        evt.currentTarget.className += " active";
    }

    for (var i = 0; i < deseleccionar.length; i++) {
        var el = document.getElementsByClassName(deseleccionar[i])
        el[0].classList.remove("active")
        document.getElementById(deseleccionar[i]).style.display = "none";
        document.getElementById(deseleccionar[i]).classList.remove("active") //= document.getElementById(idElemento).className.replace(" active", "");
    }
}

function evaluarTabCard(evt, element) {
    //	console.log("Entro en evaluarTabCard", element)

    var deseleccionar = []

    var elementID = element.id.split("_")[1];
    var elementooo = element.id

    var Acciones = "Acciones_" + elementID;
    var Feedback = "Feedback_" + elementID;
    var Matematicas = "Matematicas_" + elementID;

    if (element.id.includes(Acciones)) {
        deseleccionar[0] = Feedback
        deseleccionar[1] = Matematicas
        
    }

    if (element.id.includes(Feedback)) {
        deseleccionar[0] = Acciones
        deseleccionar[1] = Matematicas
        
    }

    if (element.id.includes(Matematicas)) {
        deseleccionar[0] = Feedback
        deseleccionar[1] = Acciones
        
    }
    
    evalutarTab(Acciones, evt, element, deseleccionar)
    evalutarTab(Feedback, evt, element, deseleccionar)	
    evalutarTab(Matematicas, evt, element, deseleccionar)
}