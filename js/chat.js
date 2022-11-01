//faz um "bind", ou vinculo, ao clicar no botão.
//Quando clicar no botão, a função enviarMensagem será executada
$("#btn-enviar-mensagem").on("click", enviarMensagem);

function enviarMensagem() {

    let textoMensagem = $("#txt-mensagem").val();
    let hora = new Date().getTime();


    //o método load, carrega um html para dentro de um container html
    $("#temp").load("mensagem-enviada.html", function () {

        //cria-se uma variavel auxiliar para receber o 
        //conteúdo html importado do arquivo
        //$() -> é pra converter a string em um elemento do dom

        let templateTexto = $("#temp").html();

        //implementar o exercício aqui






        let template = $(templateTexto);

        //Selecionando a div que vai receber 
        // a nova mensagem da conversa
        //a classe que a identifica é a message-container,
        //entretanto, precisamos adicionar o conteúdo em uma div filha
        $(".message-container > .column.is-9.mt-4").append(template);

        $("#temp").html('');
    });
}