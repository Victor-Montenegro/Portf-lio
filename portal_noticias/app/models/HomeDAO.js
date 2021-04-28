//configurando o model da view home 

function HomeDAO(connMysql){

    const connection = connMysql

    this.ultimasNoticias = (callback) =>{

        connection.query(`select *,DATE_FORMAT(data_noticia,"%d/%m/%Y ") as data_noticia from noticias order by id_noticia desc limit 5;`,callback)
    }
}

module.exports = () =>{

    return HomeDAO
}