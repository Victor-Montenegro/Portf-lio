module.exports.iniciarChat = (app,req,res) =>{
    
    const dadoUsuario = req.body
    //tratando os dados do request
    req.assert(`apelido`,`apelido é obrigatorio!`).notEmpty()
    req.assert(`apelido`,`apelido deve ter entre 5 a 15 caracteres!`).len(5,15)

    const errors = req.validationErrors()

    if(errors){

        res.render(`index`,{errors: errors})
        return
    }

    res.render(`chat`)
}


module.exports.chat = (app,req,res) =>{
    
    res.render(`chat`)
}