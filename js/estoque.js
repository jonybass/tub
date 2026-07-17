const estoque = DB.get("estoque");


function carregarRuas(){


const lista = document.getElementById("ruas");


lista.innerHTML="";


const ruas=[];


estoque.forEach(item=>{


if(!ruas.includes(item.rua)){

ruas.push(item.rua);

}


});



ruas.forEach(rua=>{


const produtos =
estoque.filter(e=>e.rua===rua);



let quantidade=0;

let data="";


produtos.forEach(p=>{


quantidade += Number(p.quantidade);


if(p.data > data){

data=p.data;

}


});



lista.innerHTML += `

<tr>

<td>${rua}</td>

<td>${quantidade}</td>

<td>${data}</td>


<td>

<button onclick="abrirRua('${rua}')">

Abrir

</button>

</td>


</tr>


`;



});


}




function abrirRua(rua){


const produtos =
estoque.filter(e=>e.rua===rua);



let html=`


<h2>Rua ${rua}</h2>


<table border="1" width="100%">


<tr>

<th>Produto</th>

<th>Código</th>

<th>Barras</th>

<th>Lote</th>

<th>Tipo</th>

<th>Quantidade</th>

</tr>


`;



produtos.forEach(p=>{


html += `


<tr>

<td>${p.produto}</td>

<td>${p.codigo}</td>

<td>${p.barras}</td>

<td>${p.lote}</td>

<td>${p.tipo}</td>

<td>${p.quantidade}</td>

</tr>


`;


});



html += "</table>";



document.getElementById("detalhes").innerHTML=html;


}




carregarRuas();