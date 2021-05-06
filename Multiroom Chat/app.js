//exigindo o server
const app = require(`./config/server`)

//configurando a porta para o protocolo http
const server = app.listen(80, ()=>{
    console.log(`servidor ON`)
})

//configurando a porta do protocolo tcp para a inicializar a comunica web socket  
const io = require(`socket.io`)(server)
app.set(`io`,io)

io.on(`connection`, socket =>{

    console.log(`Usuario conectou`)

    socket.on(`disconnect`, socket =>{
        
        console.log(`Usuario desconectou`)
    })

    /**recebendo evento de envio de mensagem do cliente */
    socket.on(`MsgClienteServidor`, msgCliente =>{

        /**Evento para inserir dialogo*/
        socket.emit(`msgServidorCliente`,{apelido:msgCliente.apelido,mensagem:msgCliente.mensagem})
        socket.broadcast.emit(`msgServidorCliente`,{apelido:msgCliente.apelido,mensagem:msgCliente.mensagem})

        /**Evento para inserir participantes do chat */
        if(parseInt(msgCliente.quantidade_de_participacao) == 0){

            socket.emit(`novoParcipante`,{apelido:msgCliente.apelido})
            socket.broadcast.emit(`novoParcipante`,{apelido:msgCliente.apelido})
        }
    })

})