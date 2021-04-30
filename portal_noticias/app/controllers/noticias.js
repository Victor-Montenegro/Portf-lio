module.exports.noticias = (app,req,res) => {

    //instanciando bd | model
    const connection = app.config.database()
    const noticiaModel = new app.app.models.NoticiasDAO(connection)

    //realizando a comunicação com bd 
    noticiaModel.getNoticias((erros,result)=>{

        res.render(`noticias/noticias`,{noticias:result})
    })
}

module.exports.noticia = (app,req,res) => {

    const id_noticia = req.query
    
    //instanciando bd | model
    const connection = app.config.database()
    const noticiaModel = new app.app.models.NoticiasDAO(connection)

    //realizando a comunicação com bd
    noticiaModel.getNoticia(id_noticia, (error, result) => {

        console.log(result)
        res.render(`noticias/noticia`,{noticia: result})
    })

}