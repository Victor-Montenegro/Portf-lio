//configurando a route index.js 
module.exports = app =>{

    app.get(`/`,(req,res)=>{

        app.app.controllers.home.index(app,req,res)
    })

    app.post(`/autentificar`,(req,res)=>{

        app.app.controllers.home.autentificar(app,req,res)
    })
}