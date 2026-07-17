function entrada(){


let estoque = DB.get("estoque");



const item={


id:Date.now(),


rua:
document.getElementById("rua").value,


produto:
document.getElementById("produto").value,


codigo:
document.getElementById("codigo").value,


barras:
document.getElementById("barras").value,


lote:
document.getElementById("lote").value,


tipo:
document.getElementById("tipo").value,


quantidade:
Number(document.getElementById("quantidade").value),


data:
new Date().toLocaleString()


};



const existente = estoque.find(e =>

e.rua===item.rua &&

e.produto===item.produto &&

e.codigo===item.codigo &&

e.lote===item.lote

);



if(existente){

existente.quantidade += item.quantidade;

existente.data=item.data;


}else{

estoque.push(item);

}



DB.set("estoque",estoque);

registrarMovimento("ENTRADA",item);

document.getElementById("msg").innerHTML=

"Entrada realizada";


limparMov();


}

function saida(){


let estoque = DB.get("estoque");



const rua =
document.getElementById("rua").value;


const produto =
document.getElementById("produto").value;


const codigo =
document.getElementById("codigo").value;


const lote =
document.getElementById("lote").value;


const quantidade =
Number(document.getElementById("quantidade").value);



const item = estoque.find(e=>

e.rua===rua &&

e.produto===produto &&

e.codigo===codigo &&

e.lote===lote

);



if(!item){

alert("Produto não encontrado");

return;

}



if(item.quantidade < quantidade){

alert("Quantidade insuficiente");

return;

}



item.quantidade -= quantidade;



item.data =
new Date().toLocaleString();



DB.set("estoque",estoque);

registrarMovimento("SAIDA",item);

document.getElementById("msg").innerHTML=

"Saída realizada";


limparMov();


}


function registrarMovimento(tipo,item){


let movimentos = DB.get("movimentacoes");


movimentos.push({

tipo:tipo,

produto:item.produto,

rua:item.rua,

quantidade:item.quantidade,

data:new Date().toLocaleString(),

usuario:
JSON.parse(localStorage.getItem("usuarioLogado")).nome


});


DB.set("movimentacoes",movimentos);


}



function limparMov(){

document.querySelectorAll("input").forEach(i=>{

i.value="";

});

}