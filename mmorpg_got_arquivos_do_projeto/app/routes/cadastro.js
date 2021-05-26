//configurando as routes da view cadastro.js
module.exports = app =>{

    app.get('/cadastro',(req,res)=>{

        app.app.controllers.admin.cadastro(app,req,res)
    })

    app.post(`/cadastrar`,(req,res)=>{

        app.app.controllers.admin.cadastrar(app,req,res)
    })
}