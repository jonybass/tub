const usuarioAtual =
JSON.parse(localStorage.getItem("usuarioLogado"));


if(!usuarioAtual){

window.location.href="../login.html";

}



function somenteDev(){


if(usuarioAtual.tipo !== "DEV"){

window.location.href="../index.html";

}


}