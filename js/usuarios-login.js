function salvarUsuarioLogin(){
    const nome = document.getElementById("nome").value.trim();
    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const tipo = document.getElementById("tipo").value;
    const mensagem = document.getElementById("mensagem");

    if(!nome || !login || !senha){
        mensagem.innerText = "Preencha todos os campos.";
        return;
    }

    if(tipo === "DEV"){
        mensagem.innerText = "Não é permitido criar usuário DEV por aqui.";
        return;
    }

    const usuarios = DB.get("usuarios");
    const existente = usuarios.find(u => u.login === login);
    if(existente){
        mensagem.innerText = "Login já existe.";
        return;
    }

    usuarios.push({
        id: Date.now(),
        nome,
        login,
        senha,
        tipo
    });
    DB.set("usuarios", usuarios);

    mensagem.innerText = "Usuário criado com sucesso.";
    document.getElementById("nome").value = "";
    document.getElementById("login").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("tipo").value = "USUARIO";
}
