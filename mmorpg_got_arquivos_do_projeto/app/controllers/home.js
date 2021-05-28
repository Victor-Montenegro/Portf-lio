//configurando a route get "/"
module.exports.index = (app,req,res) => {

    res.render(`home/index`,{errors:null,dadosUsuario:{}})
}

//configurando a route post "/autentificar"
module.exports.autentificar = (app,req,res) => {

    //intanciando os dados inseridos do usuario
    const dadosUsuario = req.body
    
    //tratando errors de inserção de dados do usuario 
    req.assert(`usuario`,`O campo usuario esta vazio!`).notEmpty()
    req.assert(`senha`,`O campo senha esta vazio!`).notEmpty()
    const errors = req.validationErrors()

    if(errors){
        res.render(`home/index`,{errors: errors, dadosUsuario: dadosUsuario})
        return
    }

    //instanciando banco de dados e model do usuario
    const collection = app.config.database
    const usuarioModel = new app.app.models.UsuarioDAO(collection)
    //chamando classe autentificar para realziar o login do usuarios
    usuarioModel.autentificar(dadosUsuario,req,res)
    
}