//configurando a rota home | index
module.exports = app => {

    app.get(`/portal_noticias`,(req,res)=>{

        app.app.controllers.home.index(app,req,res)
    })
}