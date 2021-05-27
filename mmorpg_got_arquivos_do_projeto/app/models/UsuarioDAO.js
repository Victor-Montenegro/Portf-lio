// exigindo o modulo crypto
const crypto = require('crypto')

function UsuarioDAO(connection){
    
    this._connection = connection
}

UsuarioDAO.prototype.inserirNovoUsuario = function(dadosUsuario,res){

    //realizando a criptografia da senha do usario 
    const senha_criptografada = crypto.createHash(`md5`).update(dadosUsuario.senha).digest('hex')

    dadosUsuario.senha = senha_criptografada

    // construindo JSON para realizar a inserção do cadastro do usuario no banco
    const dados = {
        operacao: `insert`,
        usuario: dadosUsuario,
        collection: `usuarios`,
        callback: (err, result) => {

            res.send(`
                <head>
                    <script src="js/jquery-2.2.1.js"></script>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
                    <link href="css/style.css" rel="stylesheet">
                    <script type="text/javascript" >
                        const redirec = setTimeout(() =>{
                            console.log("ola mundo")
                            window.location.href = "http://localhost/"
                            clearTimeout(redirec)
                        },4000)
                    </script>
                </head>
                <body class="body-index">
                    <div class="alert alert-success">
                                <strong>ATENÇÂO!</strong>
                                <ul>
                                        <li>cadastro realizado com sucesso</li>
                                        <li>Redirecionando para a pagina de login!</li>
                                </ul>
                            </div>

                    <div class="container">
                        <div class="row">
                            <div class="col-md-2"></div>

                            <div class="col-md-8">
                                <img src="images/game_of_thrones_logo.jpg" />
                            </div>

                            <div class="col-md-2"></div>
                            </div>
                        </div>
                    </div>
                </body>   
                
        `)}            
        }
    
    this._connection(dados)
}

UsuarioDAO.prototype.autentificar = function(dadosUsuario,req,res){
    
   const senha_criptografada = crypto.createHash(`md5`).update(dadosUsuario.senha).digest(`hex`)
   dadosUsuario.senha = senha_criptografada

   const dados = { 
       operacao: `find`,
       usuario: dadosUsuario,
       collection: `usuarios`,
       callback: (error, result) => {
           if(result == null){
               const errors = [{
                   msg:`usuario ou senha incorretos!`
               }]
               res.render(`home/index`,{errors:errors, dadosUsuario: dados.usuario})
               return
           }

           res.render(`jogo/jogo`)
       }
   }

   this._connection(dados)
}
module.exports = ()=>{

    return UsuarioDAO
}