const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if(!usuario){
    window.location.href="../login.html";
}

let insumoEditando = null;

function mostrarSecao(secao){
    const secIds = ["estoque","cadastro","entrada","saida","movimentos","editar"];
    secIds.forEach(id=>{
        const el = document.getElementById(`${id}Section`);
        if(el){
            el.classList.toggle("hidden", id !== secao);
        }
    });

    document.querySelectorAll(".menu-insumos button").forEach(btn=>{
        btn.classList.toggle("active", btn.dataset.section === secao);
    });

    if(secao === "estoque"){
        carregarEstoque();
    }

    if(secao === "entrada"){
        carregarInsumosSelect("entradaInsumo");
    }

    if(secao === "saida"){
        carregarInsumosSelect("saidaInsumo");
    }
}

function carregarEstoque(){
    const insumos = DB.get("insumos");
    const lista = document.getElementById("insumosLista");
    lista.innerHTML = "";

    if(insumos.length === 0){
        lista.innerHTML = `
            <tr>
                <td colspan="3">Nenhum insumo cadastrado</td>
            </tr>
        `;
        return;
    }

    lista.innerHTML = insumos.map(item => `
        <tr>
            <td>
                <button type="button" class="link-button" onclick="mostrarMovimentos(${item.id})">
                    ${item.nome}
                </button>
            </td>
            <td>${item.quantidade}</td>
            <td>
                <button type="button" onclick="editarInsumo(${item.id})">Editar</button>
            </td>
        </tr>
    `).join("");
}

function carregarInsumosSelect(selectId){
    const insumos = DB.get("insumos");
    const select = document.getElementById(selectId);
    if(!select) return;

    if(insumos.length === 0){
        select.innerHTML = `<option value="">Nenhum insumo cadastrado</option>`;
        return;
    }

    select.innerHTML = insumos.map(item => `
        <option value="${item.id}">${item.nome}</option>
    `).join("");
}

function cadastrarInsumo(){
    const nome = document.getElementById("cadastroNome").value.trim();
    const tipo = document.getElementById("cadastroTipo").value;
    const msg = document.getElementById("cadastroMsg");

    if(!nome){
        msg.innerText = "Informe o nome do insumo.";
        return;
    }

    if(!tipo){
        msg.innerText = "Escolha o tipo de contagem do insumo.";
        return;
    }

    const insumos = DB.get("insumos");
    insumos.push({
        id: Date.now(),
        nome,
        tipo,
        quantidade: 0
    });

    DB.set("insumos", insumos);
    msg.innerText = "Insumo cadastrado com sucesso.";
    document.getElementById("cadastroNome").value = "";
    document.getElementById("cadastroTipo").value = "";

    carregarEstoque();
}

function cancelarCadastro(){
    document.getElementById("cadastroNome").value = "";
    document.getElementById("cadastroTipo").value = "";
    document.getElementById("cadastroMsg").innerText = "";
    mostrarSecao("estoque");
}

function registrarEntrada(){
    const select = document.getElementById("entradaInsumo");
    const quantidade = Number(document.getElementById("entradaQuantidade").value);
    const observacao = document.getElementById("entradaObservacao").value.trim();
    const turno = document.getElementById("entradaTurno").value.trim();
    const data = document.getElementById("entradaData").value;
    const msg = document.getElementById("entradaMsg");

    if(!select.value){
        msg.innerText = "Selecione um insumo.";
        return;
    }

    if(!quantidade || quantidade <= 0){
        msg.innerText = "Informe uma quantidade válida.";
        return;
    }

    const insumos = DB.get("insumos");
    const insumo = insumos.find(i => String(i.id) === select.value);
    if(!insumo){
        msg.innerText = "Insumo não encontrado.";
        return;
    }

    insumo.quantidade += quantidade;
    DB.set("insumos", insumos);

    const movimentacoes = DB.get("insumosMovimentacoes");
    movimentacoes.push({
        id: Date.now(),
        insumoId: insumo.id,
        tipo: "ENTRADA",
        quantidade,
        observacao,
        turno,
        data: data || new Date().toLocaleDateString(),
        usuario: usuario.nome
    });
    DB.set("insumosMovimentacoes", movimentacoes);

    msg.innerText = "Entrada registrada com sucesso.";
    document.getElementById("entradaQuantidade").value = "";
    document.getElementById("entradaObservacao").value = "";
    document.getElementById("entradaTurno").value = "";
    document.getElementById("entradaData").value = new Date().toISOString().slice(0,10);
    carregarEstoque();
}

function registrarSaida(){
    const select = document.getElementById("saidaInsumo");
    const quantidade = Number(document.getElementById("saidaQuantidade").value);
    const observacao = document.getElementById("saidaObservacao").value.trim();
    const turno = document.getElementById("saidaTurno").value.trim();
    const data = document.getElementById("saidaData").value;
    const msg = document.getElementById("saidaMsg");

    if(!select.value){
        msg.innerText = "Selecione um insumo.";
        return;
    }

    if(!quantidade || quantidade <= 0){
        msg.innerText = "Informe uma quantidade válida.";
        return;
    }

    const insumos = DB.get("insumos");
    const insumo = insumos.find(i => String(i.id) === select.value);
    if(!insumo){
        msg.innerText = "Insumo não encontrado.";
        return;
    }

    if(insumo.quantidade < quantidade){
        msg.innerText = "Quantidade insuficiente para saída.";
        return;
    }

    insumo.quantidade -= quantidade;
    DB.set("insumos", insumos);

    const movimentacoes = DB.get("insumosMovimentacoes");
    movimentacoes.push({
        id: Date.now(),
        insumoId: insumo.id,
        tipo: "SAÍDA",
        quantidade,
        observacao,
        turno,
        data: data || new Date().toLocaleDateString(),
        usuario: usuario.nome
    });
    DB.set("insumosMovimentacoes", movimentacoes);

    msg.innerText = "Saída registrada com sucesso.";
    document.getElementById("saidaQuantidade").value = "";
    document.getElementById("saidaObservacao").value = "";
    document.getElementById("saidaTurno").value = "";
    document.getElementById("saidaData").value = new Date().toISOString().slice(0,10);
    carregarEstoque();
}

function mostrarMovimentos(insumoId){
    const insumos = DB.get("insumos");
    const insumo = insumos.find(i => i.id === insumoId);
    if(!insumo){
        alert("Insumo não encontrado.");
        return;
    }

    const movimentos = DB.get("insumosMovimentacoes")
        .filter(m => m.insumoId === insumoId)
        .sort((a,b) => b.id - a.id)
        .slice(0, 10);

    document.getElementById("movimentosTitulo").innerText = `Movimentações de ${insumo.nome}`;

    const lista = document.getElementById("movimentosLista");
    if(movimentos.length === 0){
        lista.innerHTML = `
            <tr>
                <td colspan="5">Nenhuma movimentação registrada para este insumo.</td>
            </tr>
        `;
    } else {
        lista.innerHTML = movimentos.map(m => `
            <tr>
                <td>${m.tipo}</td>
                <td>${m.quantidade}</td>
                <td>${m.observacao || "-"}</td>
                <td>${m.turno || "-"}</td>
                <td>${m.data}</td>
            </tr>
        `).join("");
    }

    mostrarSecao("movimentos");
}

function editarInsumo(insumoId){
    const insumos = DB.get("insumos");
    const insumo = insumos.find(i => i.id === insumoId);
    if(!insumo){
        alert("Insumo não encontrado.");
        return;
    }

    insumoEditando = insumoId;
    document.getElementById("editarNome").value = insumo.nome;
    document.getElementById("editarTipo").value = insumo.tipo;
    document.getElementById("editarMsg").innerText = "";
    mostrarSecao("editar");
}

function atualizarInsumo(){
    const nome = document.getElementById("editarNome").value.trim();
    const tipo = document.getElementById("editarTipo").value;
    const msg = document.getElementById("editarMsg");

    if(!nome){
        msg.innerText = "Informe o nome do insumo.";
        return;
    }

    if(!tipo){
        msg.innerText = "Escolha o tipo de contagem do insumo.";
        return;
    }

    const insumos = DB.get("insumos");
    const insumo = insumos.find(i => i.id === insumoEditando);
    if(!insumo){
        msg.innerText = "Insumo não encontrado.";
        return;
    }

    insumo.nome = nome;
    insumo.tipo = tipo;
    DB.set("insumos", insumos);

    msg.innerText = "Insumo atualizado com sucesso.";
    insumoEditando = null;
    carregarEstoque();
    mostrarSecao("estoque");
}

function cancelarEdicao(){
    insumoEditando = null;
    document.getElementById("editarMsg").innerText = "";
    mostrarSecao("estoque");
}

function voltarParaEstoque(){
    mostrarSecao("estoque");
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("entradaData").value = new Date().toISOString().slice(0,10);
    document.getElementById("saidaData").value = new Date().toISOString().slice(0,10);
    mostrarSecao("estoque");
});
