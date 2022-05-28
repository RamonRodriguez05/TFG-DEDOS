'use strict'

function fijarPicture(input) {
    var parentDiv = $(input).parent();
							//	console.log("title texto", parentDiv)
							parentDiv.appendTo($('#source2'))
							$('#source2 div').appendTo($('#source2'));

							if (fix) {
								
								var clases = parentDiv.attr("class") + " fixed picture"
								parentDiv.attr("class", clases)

								parentDiv.draggable("disable");
							} else {
								
								var clases = parentDiv.attr("class") + " fixed picture"
								parentDiv.attr("class", clases)
								parentDiv.draggable("enable");
							}


} 

function mostrarConfigPicture(input){
    var parentDiv = $(input).parent();
							var hijo = parentDiv.children(0).children(7).context.id
							var splitData = hijo.split('_')
							var idd = "backImage_" + splitData[2].toString();
							var idd2 = "formDropzone_" + splitData[2].toString();
							var idd3 = "titleImage_" + splitData[2].toString();
							let menu = document.getElementById(idd);
							let menu2 = document.getElementById(idd2);
							let menu3 = document.getElementById(idd3);

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