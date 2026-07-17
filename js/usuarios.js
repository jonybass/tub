const logado =
JSON.parse(localStorage.getItem("usuarioLogado"));


if(!logado || logado.tipo !== "DEV"){

window.location.href="../index.html";

}



function carregarUsuarios(){

const usuarios = DB.get("usuarios");


const lista=document.getElementById("lista");


lista.innerHTML="";


usuarios.forEach(u=>{


lista.innerHTML += `

<tr>

<td>${u.nome}</td>

<td>${u.login}</td>

<td>${u.tipo}</td>

<td>

<button onclick="excluirUsuario(${u.id})">
Excluir
</button>

</td>

</tr>

`;


});


}



function salvarUsuario(){


const usuarios = DB.get("usuarios");


const novo={

id:Date.now(),

nome:
document.getElementById("nome").value,

login:
document.getElementById("login").value,

senha:
document.getElementById("senha").value,

tipo:
document.getElementById("tipo").value

};


usuarios.push(novo);


DB.set("usuarios",usuarios);


limpar();


carregarUsuarios();


}



function excluirUsuario(id){


let usuarios=DB.get("usuarios");


usuarios =
usuarios.filter(u=>u.id!==id);


DB.set("usuarios",usuarios);


carregarUsuarios();


}



function limpar(){

document.getElementById("nome").value="";
document.getElementById("login").value="";
document.getElementById("senha").value="";

}



carregarUsuarios();