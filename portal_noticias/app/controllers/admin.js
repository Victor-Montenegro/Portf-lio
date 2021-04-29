// incluindo a logica necessaria para a route formulario_inclusao_noticia
module.exports.inclusaoNoticia = (app,req,res) =>{

    res.render(`admin/formulario_inclusao_noticia`,{errors: null, dadoNoti:{}})
}

module.exports.salvarNoticia = (app,req,res) =>{

    //preparando os dados do request 
    const dadoNoticia = req.body

    //tratando possveis erros de inserção de dados
    req.assert(`titulo`,`titulo é obrigatorio!`).notEmpty()
    req.assert(`resumo`,`resumo deve ter entre 10 a 100 é obrigatorio!`).notEmpty()
    req.assert(`autor`,`autor é obrigatorio!`).notEmpty()
    req.assert(`data_noticia`,`data é obrigatoria!`).notEmpty()
    req.assert(`noticia`,`noticia é obrigatoria!`).notEmpty()

    const errors = req.validationErrors()

    if(errors){

        res.render(`admin/formulario_inclusao_noticia`,{errors: errors, dadoNoti:dadoNoticia})
    }

    //instanciando bd,models
    const connection = app.config.database()
    const noticiaModel = new app.app.models.NoticiasDAO(connection)

    //realizando inserção de dados no database
    noticiaModel.salvarNoticia(dadoNoticia,(error,result) =>{

        res.redirect(`/portal_noticias`)
    })

}