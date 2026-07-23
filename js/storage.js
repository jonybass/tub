const DB = {
    get(chave){
        return JSON.parse(localStorage.getItem(chave)) || [];
    },

    set(chave, valor){
        localStorage.setItem(chave, JSON.stringify(valor));
    }
};


function iniciarSistema(){

    if(!localStorage.getItem("usuarios")){

        const usuarios = [
            {
                id:1,
                nome:"Desenvolvedor",
                login:"dev",
                senha:"123",
                tipo:"DEV"
            },
            {
                id:2,
                nome:"Usuario",
                login:"usuario",
                senha:"123",
                tipo:"USUARIO"
            }
        ];

        DB.set("usuarios", usuarios);
    }


    if(!localStorage.getItem("estoque")){
        DB.set("estoque", []);
    }


    if(!localStorage.getItem("movimentacoes")){
        DB.set("movimentacoes", []);
    }


    if(!localStorage.getItem("insumos")){
        DB.set("insumos", []);
    }


    if(!localStorage.getItem("insumosMovimentacoes")){
        DB.set("insumosMovimentacoes", []);
    }

}


iniciarSistema();