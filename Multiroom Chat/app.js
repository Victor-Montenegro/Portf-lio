//exigindo o server
const app = require(`./config/server`)

//configurando a porta pra o protocolo http
const server = app.listen(80, ()=>{
    console.log(`servidor ON`)
})