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
    
    //exigindo database e model JogoDAO
    const connection = app.config.database
    const jogoModel = new app.app.models.JogoDAO(connection)

    //chamando a classe buscaPropriedade 
    jogoModel.buscaPropriedade(req.session.usuario.usuario,res)
// fazer commit
}