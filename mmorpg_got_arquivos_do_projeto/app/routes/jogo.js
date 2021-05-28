//configurando route da view jogo.ejs
module.exports = app =>{

    app.get(`/jogo`, (req,res)=>{

        app.app.controllers.jogo.jogo(app,req,res)
    })

    app.get(`/deslogar`, (req,res)=>{

        app.app.controllers.jogo.deslogar(app,req,res)
    })

    app.get(`/aldeoes`, (req,res)=>{

        app.app.controllers.jogo.aldeoes(app,req,res)
    })
    
    app.post(`/ordenarSudito`, (req,res)=>{

        app.app.controllers.jogo.ordenarSudito(app,req,res)
    })

    app.get(`/pergaminhos`, (req,res)=>{

        app.app.controllers.jogo.pergaminhos(app,req,res)
    })
}