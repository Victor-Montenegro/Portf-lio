//configurando o model da view home 

function NoticiasDAO(connMysql){

    const connection = connMysql

    this.ultimasNoticias = callback=>{

        connection.query(`select *,DATE_FORMAT(data_noticia,"%d/%m/%Y ") as data_noticia from noticias order by id_noticia desc limit 5;`,callback)
    }

    this.salvarNoticia = (dadoNoticia,callback) =>{

        connection.query(`insert into noticias set ?`,dadoNoticia,callback)
    }

    this.getNoticias = callback =>{

        connection.query(`select *,DATE_FORMAT(data_noticia,"%d/%m/%Y") as data_noticia from noticias order by id_noticia desc;`,callback)
    }

    this.getNoticia = (id,callback) =>{

        console.log(id.id_noticia)
        connection.query(`select *,DATE_FORMAT(data_noticia,"%d/%m/%Y") as data_noticia from noticias where id_noticia = ?`,id.id_noticia,callback)

    }
    
}

module.exports = () =>{

    return NoticiasDAO
}