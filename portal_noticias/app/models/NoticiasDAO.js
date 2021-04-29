//configurando o model da view home 

function NoticiasDAO(connMysql){

    const connection = connMysql

    this.ultimasNoticias = (callback) =>{

        connection.query(`select *,DATE_FORMAT(data_noticia,"%d/%m/%Y ") as data_noticia from noticias order by id_noticia desc limit 5;`,callback)
    }

    this.salvarNoticia = (dadoNoticia,callback) =>{

        connection.query(`insert into noticias set ?`,dadoNoticia,callback)
    }
}

module.exports = () =>{

    return NoticiasDAO
}