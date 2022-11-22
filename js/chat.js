
let username = '';
let connection;

$(function () {

    username = prompt("Informe o seu nome:");

    connection = new signalR.HubConnectionBuilder()
        .withUrl("https://app-chat-faisp-dev.azurewebsites.net/chathub")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    

    connection.onclose(async () => {
        await start();
    });

    connection.on("ReceiveMessage", carregarMenssagemRecebida);

    // Start the connection.
    start();
});


//faz um "bind", ou vinculo, ao clicar no botão.
//Quando clicar no botão, a função enviarMensagem será executada
$("#btn-enviar-mensagem").on("click", enviarMensagem);

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }

};

async function enviarMensagem() {

    let textoMensagem = $("#txt-mensagem").val();

    let data = new Date();
    let hora = data.getHours() + ":" + data.getMinutes();
    
    try {
        await connection.invoke("SendMessage", username, textoMensagem);
    } catch (err) {
        console.error(err);
    }


    //o método load, carrega um html para dentro de um container html
    $("#temp").load("mensagem-enviada.html", function () {

        //cria-se uma variavel auxiliar para receber o 
        //conteúdo html importado do arquivo
        //$() -> é pra converter a string em um elemento do dom

        let templateTexto = $("#temp").html();

        //implementar o exercício aqui

        templateTexto = templateTexto.replace("{{mensagem}}", textoMensagem);
        templateTexto = templateTexto.replace("{{data}}", hora);

        let template = $(templateTexto);

        //Selecionando a div que vai receber 
        // a nova mensagem da conversa
        //a classe que a identifica é a message-container,
        //entretanto, precisamos adicionar o conteúdo em uma div filha
        $(".message-container > .column.is-9.mt-4").append(template);

        $("#temp").html('');
        $("#txt-mensagem").val('');
    });
}

function carregarMenssagemRecebida(usuario, textoMensagem){

    if(usuario == username) return;

    let data = new Date();
    let hora = data.getHours() + ":" + data.getMinutes();

    //o método load, carrega um html para dentro de um container html
    $("#temp").load("mensagem-recebida.html", function () {

        //cria-se uma variavel auxiliar para receber o 
        //conteúdo html importado do arquivo
        //$() -> é pra converter a string em um elemento do dom

        let templateTexto = $("#temp").html();

        //implementar o exercício aqui
        templateTexto = templateTexto.replace("{{remetente}}", usuario);
        templateTexto = templateTexto.replace("{{mensagem}}", textoMensagem);
        templateTexto = templateTexto.replace("{{data}}", hora);
        
        let template = $(templateTexto);

        //Selecionando a div que vai receber 
        // a nova mensagem da conversa
        //a classe que a identifica é a message-container,
        //entretanto, precisamos adicionar o conteúdo em uma div filha
        $(".message-container > .column.is-9.mt-4").append(template);

        $("#temp").html('');
    });
}