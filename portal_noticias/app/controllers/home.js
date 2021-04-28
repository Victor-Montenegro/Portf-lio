module.exports.index = (app,req,res) =>{

    //instanciando bd e model
    const connection = app.config.database()
    const indexModel = new app.app.models.HomeDAO(connection)

    //realizando a consulta no bd

    indexModel.ultimasNoticias((error,result)=>{

        console.log(result)
        res.render(`home/index`,{ultNoticias: result})
    })

}