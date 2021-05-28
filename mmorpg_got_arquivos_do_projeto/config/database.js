//exigindo o modulo do banco de dados 
var mongo = require(`mongodb`).MongoClient
// modulo para as tratativas de erros 
var assert = require(`assert`)

// configurando url da connection 
const url = `mongodb://localhost:27017`
const dbName = `got`

//função para conexão com o servidor
var createConnection = (dados) =>{

    mongo.connect(url, (err, client) =>{

        //verificando se ouve erros durante a conexao
        assert.equal(null, err)  
        
        //realizando a criacao do banco de dados
        const db = client.db(dbName)
        
        //funcao que fará as interações com o banco
        query(db,dados) 

        client.close() 
    })
}

//função de interação com o banco 
function query(db,dados){
    
    const collection = db.collection(dados.collection)

    switch(dados.operacao){
        case `insert`: 
            collection.insert(dados.usuario,dados.callback)
            break
        case `find`:
            collection.findOne(dados.usuario,dados.callback)
            break
        case `update`:
        case `remove`:
    }

}

module.exports = ()=>{

    return createConnection
}
