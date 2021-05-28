function JogoDAO(connection){
    
    this._connection = connection
}

JogoDAO.prototype.geraPropriedade = function(dadosUsuario){

    const dados = {
        operacao: `insert`,
        usuario: prop = {
            usuario: dadosUsuario,
            moeda: 15,
            aldeoes: 10,
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

JogoDAO.prototype.buscaPropriedade = function(dadosUsuario,res,msg){

    const dados = {
        operacao: `find`,
        usuario: {usuario:dadosUsuario.usuario},
        collection: `jogo`,
        callback: (err, result) => {
            result.casa = dadosUsuario.casa
            res.render(`jogo/jogo`,{propriedades:result,msg:msg})
            
        }
    }
    this._connection(dados)
}

JogoDAO.prototype.novaOrdem = function(dadosOrdem,res) {

    switch(dadosOrdem.ordem){
        case "1":
            dadosOrdem.descOrdem = "Coletar recursos"
            dadosOrdem.custoMoeda = 2 * dadosOrdem.quant_aldeoes
                        //tempo da ordem em milisegundos
            dadosOrdem.TOM = 1 * 60 * 60 * 1000 
            break
        case "2":
            dadosOrdem.descOrdem = "Enforca aldeão"
            dadosOrdem.custoMoeda = 3 * dadosOrdem.quant_aldeoes
            dadosOrdem.TOM = 2 * 60 * 60 * 1000
            break
        case "3":
            dadosOrdem.descOrdem = "Ensinar historia"
            dadosOrdem.custoMoeda = 1 * dadosOrdem.quant_aldeoes
            dadosOrdem.TOM = 5 * 60 * 60 * 1000
            break
        case "4":
            
            dadosOrdem.descOrdem = "Ensinar magia"
            dadosOrdem.custoMoeda = 1 * dadosOrdem.quant_aldeoes
            dadosOrdem.TOM = 5 * 60 * 60 * 1000
            break
    }

    //logica para capturar o tempo final da ordem
    const tempoReal = new Date()
    dadosOrdem.tempoFinalOrdem = tempoReal.getTime() + dadosOrdem.TOM 

    const dados = {
        operacao: `insert`,
        usuario: dadosOrdem,
        collection: `acao`,
        callback: (err, result) =>{

            res.redirect(`/jogo?msg=OR`)
        }
    }

    console.log(dadosOrdem)
    this._connection(dados)
}

//exportando a classe JogoDAO
module.exports = ()=>{
    
    return JogoDAO
}