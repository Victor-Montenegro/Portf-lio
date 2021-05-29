module.exports.jogo = (app,req,res) =>{
    if(!req.session.usuario){
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
                <div class="alert alert-danger">
                            <strong>ATENÇÂO!</strong>
                            <ul>
                                    <li>Login não realizado</li>
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
            
            `)
    }
    
    //mensagens da aplicação 
    let msg = null
    
    if(req.query.msg){
        msg = req.query.msg
    }

    //exigindo database e model JogoDAO
    const connection = app.config.database
    const jogoModel = new app.app.models.JogoDAO(connection)

    //chamando a classe buscaPropriedade para iniciar o jogo 
    jogoModel.buscaPropriedade(req.session.usuario,res,msg)
}

module.exports.deslogar = (app,req,res) => {

    req.session.destroy()
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
        <div class="alert alert-info">
                    <strong>SESSÃO TERMINANDA!</strong>
                    <ul>
                            <li>Até breve senhor!</li>
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
    
    `)
}

module.exports.aldeoes = (app,req,res) => {
    if(!req.session.usuario){
        res.send(`
            <head>
                <script src="js/jquery-2.2.1.js"></script>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
                <link href="css/style.css" rel="stylesheet">
                <script type="text/javascript" >
                    const redirec = setTimeout(() =>{
                        window.location.href = "http://localhost/"
                        clearTimeout(redirec)
                    },4000)
                </script>
            </head>
            <body class="body-index">
                <div class="alert alert-danger">
                            <strong>ATENÇÂO!</strong>
                            <ul>
                                    <li>sessão encerrada!</li>
                                    <li>Redirecionando para a pagina de login!</li>
                            </ul>
                        </div>
            </body>     
            `)
    }

    res.render(`jogo/aldeoes`,{errors:null})
}

module.exports.ordenarSudito = (app,req,res) => {

    //recebendo dados do usuario
    const dadosOrdem = req.body
    dadosOrdem.usuario = req.session.usuario.usuario

    //tratando erros de insersão do usuario
    req.assert(`quant_aldeoes`,"A quantidade de aldeoes deve ser maior do que 0").notEmpty()
    req.assert(`ordem`,"deve escolher alguma ordem!").notEmpty()

    const errors = req.validationErrors()
    if(errors){
        res.redirect(`/jogo?msg=O`)
        return
    }

    //instanciando database e model jogo
    const connection =  app.config.database
    const jogoModel = new app.app.models.JogoDAO(connection)
    //chamando classe novaOrdem 
    jogoModel.novaOrdem(dadosOrdem,res)
}

module.exports.pergaminhos = (app,req,res) => {
    if(!req.session.usuario){
        res.send(`
            <head>
                <script src="js/jquery-2.2.1.js"></script>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
                <link href="css/style.css" rel="stylesheet">
                <script type="text/javascript" >
                    const redirec = setTimeout(() =>{
                        window.location.href = "http://localhost/"
                        clearTimeout(redirec)
                    },4000)
                </script>
            </head>
            <body class="body-index">
                <div class="alert alert-danger">
                            <strong>ATENÇÂO!</strong>
                            <ul>
                                    <li>sessão encerrada</li>
                                    <li>Redirecionando para a pagina de login!</li>
                            </ul>
                        </div>
            </body>     
            `)
    }

    // exigindo database e model 
    const connection = app.config.database
    const jogoModel = new app.app.models.JogoDAO(connection)

    // chamando o metodo ordemEmAcao que procura as ordens em vigor
    jogoModel.ordemEmAcao(req,res)

}

module.exports.revogarOrdem = (app,req,res) => {

    //recebendo id da ordem 
    const _id = req.query._id

    //intanciando database e model
    const connection = app.config.database
    const jogoModel = new app.app.models.JogoDAO(connection)

    //chamando o metodo revogarOrdem
    jogoModel.revogarOrdem(_id,res)
}
