// configurando a route get "/cadastro"
module.exports.cadastro = (app,req,res) =>{

    res.render(`admin/cadastro`,{errors: null,dadosUsuario: {}})
}

// configurando a route post "/cadastrar"
module.exports.cadastrar= (app,req,res) =>{

    //instanciando dados do form
    const dadosUsuario = req.body

    //tratando errors de inserção de dados do usuario 
    req.assert(`nome`,`O campo nome esta vazio!`).notEmpty()
    req.assert(`usuario`,`O campo usuario esta vazio!`).notEmpty()
    req.assert(`senha`,`O campo senha esta vazio!`).notEmpty()
    req.assert(`casa`,`O campo casa esta vazio!`).notEmpty()

    const errors = req.validationErrors()

    if(errors){
        res.render(`admin/cadastro`,{errors: errors, dadosUsuario: dadosUsuario})
        return
    }

    // instanciando  database e model 
    const connection = app.config.database
    const usuarioModel = new app.app.models.UsuarioDAO(connection)
    //instanciando model JogoDAO
    const jogoDAO = new app.app.models.JogoDAO(connection)

    //chamando classe inserirNovoUsuario para realizar o cadasatro do usuario
    usuarioModel.inserirNovoUsuario(dadosUsuario,res)
    //chamando classe geraPropriedade para criar habilidades no jogo 
    jogoDAO.geraPropriedade(dadosUsuario.usuario)

}


