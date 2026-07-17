function entrar(){

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;


    const usuarios = DB.get("usuarios");


    const usuario = usuarios.find(
        u => u.login === login && u.senha === senha
    );


    if(usuario){

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuario)
        );

        window.location.href="index.html";

    }else{

        document.getElementById("erro").innerHTML =
        "Login inválido";

    }

}