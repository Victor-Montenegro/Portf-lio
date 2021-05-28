//configurando route da view jogo.ejs
module.exports = app =>{

    app.get(`/jogo`, (req,res)=>{

        app.app.controllers.jogo.jogo(app,req,res)
    })
}