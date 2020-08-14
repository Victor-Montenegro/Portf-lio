//ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO

// npm install nodemon -D --> isso e uma ferramenta para desenvolvedo, que irar auxiliar na hora do desenvolvimento, para que voce nao precise esta desligado o servidor toda a hora para atualizar uma modficação
//                     -D --> irar imstalar num lugar especifico na sua aplicação, isso so irar ser util quando a sua aplicação esta em fase de desenvolvimento, pois quandoa aplicação estive sendo usado e todos usadando, voce irar esquece e apagar e deixar o servidor sempre ligado
// para iniciar o nodemon deve fazer alguns passos, claro que existe outras maneiras mas essa que parecer ser mais facil

        //Va no arquivo package.json
        //dentro do "scripts": {aqui dentri} 
        // coloque essa sintaxe
        // dev = "nodemon src/server.js" | claro que o diretorio e o novo do arquivo onde esta o servidor vai variar de aplicação para aplicação
        // no console coloque o comando
        // npm run dev
        // para da restart a qualquer momento coloque o comando 'rs'

// TODA VEZ QUE FOR FAZER ALGUMA MODFICAÇÃO AQUI E SE O SERVIDO ESTIVER ATIVO DEVE RENICIAR, SE CASO O nodemon NAO ESTEJA INSTALADO

// ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO ATENÇÃO

// se existir alguma dependencia na sua aplicação e queira trazer para esse arquivo a sintaxe e essa
const express = require('express')// o tipo de dado do express e função
const server =  express() //<-- isso e uma função
// o pq de fazer essa duas const, e que para configurar certas coisas do server e necessario ter apenas a função express(), pois se fazer configuções assim | .user(require('express')()) | vai da um baita de um problema

// .use e as configurações do servidor
server.use(express.static("public")) //public e a pasta onde esta toda a estilização da aplicação que o cliente vai precisar
                    //arquivos static sao as imagens/scripts do front-end/css do front-end

//QUANDO RODAR ELE IRAR PEDIR AS ROTAS, E A FUNCIONALIDADE QUE DAR AS ROtAS E O GET
        // uma das rotas que ele pede e o /, devemos passar esse argumento no .get
        // o proximo argumento e o que ele vai lhe devolver
        //o argumento consiste em uma função que chamamos função anonima, function(){}, mas podemos simplificar por,() => {}, chamamos de função curta/arrowFunction
        //e como parametro para essa arrowFunction devemos passar, (req,res) => {}
        //req --> requisão, e o que acompanha o pedido, ao criar o server, ele pede a /, mas tambem esse req, vai conter outros tipos de dados, como, formularios, e entro outras ideais da aplicação
        //res --> vai ser a respota da sua requisão/pedido, que vai ser mostrado na sua tela
.get("/", (req, res) => {

                            //se voce for no console.log(__dirname)(lembrando que e o terminal do vscode nao no browser) vai lhe mostrar o caminho para chegar ate esse arquivo server.js
    return res.sendFile(__dirname + "/views/index.html")
                                  // + e concatenação,ja que o valor do __dirname e, SemanaNLW2/src, entao estou fanzendo isso, SemanaNLW2/src + /views/index.html

    //ESSE RETURN AQUI E UMA FORMA DE TESTA SE DEU CERTO
            //res será a "variavel" que vamos usar para quando quiser responder alguma requisao com seu determinado pedido   
    //return res.send("hi from nlw")

})
.get("/study", (req, res) => {

    return res.sendFile(__dirname + "/views/study.html")
})

.get("/give-classes", (req, res) => {

    return res.sendFile(__dirname + "/views/give-classes.html")
})
//
.listen(5500)
        //listen, provavelmente tem varias funcionalidades, mas nesse exemplo, ele esta pegando uma porta e fazendo um servidor
        //MAS COMO RODAR ELE???                   
                        
                        // VA NO SEU TERMINAL
                        // USANDO A SINTAXE node
                        // PROCURE O ARQUIVO QUE ESTA CRIANDO O SERVER
                        // EXECUTE ESSE COMANDO
                        // node src/server.js (claro que o diretorio vai depender aonde esta o arquivo)
                        // o node vai pedir  permissao e so aceitar
                        // e pronto o serve esta rodando naquela porta
                        // o seu terminal estará rodando caso voce termine(ctrl+c) a execução o serve irar cai

/*
//isso abaixo e simplesmente o registro de uma função, nao faz ela ser executada
function express() {

}

// para ser executada e necessario chama-la

express() //se o express e uma função, entao onde tem o require('express') tem que tem o () = require('express')()



*/