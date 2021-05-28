function JogoDAO(connection){
    
    this._connection = connection
}

JogoDAO.prototype.geraPropriedade = function(dadosUsuario){

    const dados = {
        operacao: `insert`,
        usuario: prop = {
            usuario: dadosUsuario,
            moeda: 15,
            suditos: 10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        },
        collection: `jogo`,
        callback: (err, result) => {
            
        }
    }

    this._connection(dados)
}

JogoDAO.prototype.buscaPropriedade = function(dadosUsuario,res){

    const dados = {
        operacao: `find`,
        usuario: {usuario:dadosUsuario},
        collection: `jogo`,
        callback: (err, result) => {

            res.render(`jogo/jogo`,{propriedades:result,msg:{}})
            
        }
    }
    this._connection(dados)
}
//exportando a classe JogoDAO
module.exports = ()=>{
    
    return JogoDAO
}