//configurando a route formulario_inclusao_noticia
module.exports = app =>{

    app.get(`/formulario_inclusao_noticia`,(req,res) =>{

        app.app.controllers.admin.inclusaoNoticia(app,req,res)
    })


    app.post(`/noticias/salvar`, (req,res) =>{

        app.app.controllers.admin.salvarNoticia(app,req,res)

    })
}