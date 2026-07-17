function salvarAuditoria(){


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



if(!item.rua || !item.produto || !item.quantidade){

alert("Preencha os campos obrigatórios");

return;

}




const existente = estoque.find(e=>

e.rua===item.rua &&

e.produto===item.produto &&

e.codigo===item.codigo &&

e.lote===item.lote

);



if(existente){


existente.quantidade=item.quantidade;

existente.data=item.data;


}else{


estoque.push(item);


}



DB.set("estoque",estoque);



document.getElementById("mensagem").innerHTML=

"Contagem salva";


limparFormulario();



}



function limparFormulario(){


document.querySelectorAll("input").forEach(i=>{

i.value="";

});


}