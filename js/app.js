const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));


if(!usuario){

    window.location.href="login.html";

}


document.addEventListener("DOMContentLoaded",()=>{


document.getElementById("usuario").innerHTML =
usuario.nome + " - " + usuario.tipo;



if(usuario.tipo !== "DEV"){

    const menu = document.getElementById("menuUsuarios");

    if(menu){

        menu.style.display="none";

    }

}


});



function sair(){

localStorage.clear();

window.location.href="login.html";

}