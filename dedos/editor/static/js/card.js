'use strict'

function fijarCard(input) {
    var parentDiv = $(input).parent();

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