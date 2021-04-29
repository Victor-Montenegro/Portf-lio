module.exports.index = (app,req,res) =>{

    //instanciando bd e model
    const connection = app.config.database()
    const noticiaModel = new app.app.models.NoticiasDAO(connection)

    //realizando a consulta no bd

    noticiaModel.ultimasNoticias((error,result)=>{

        res.render(`home/index`,{ultNoticias: result})
    })

}