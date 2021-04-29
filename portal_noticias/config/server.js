//exigindo modulos
    const express = require(`express`)
    const consign = require(`consign`)
    const bodyParser = require(`body-parser`)
    const expressValidator = require(`express-validator`)
//chamando a funcao express
const app = express()

//configurando a responsabilidade da view engine para ejs | localização das views
app.set(`view engine`,`ejs`)
app.set(`views`,`./app/views`)

//configurando middlewares
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(`./app/public`))
app.use(expressValidator())

//automatizando routes | bd | models | controllers 

consign().include(`app/routes`)
         .then(`config/database.js`)
         .then(`app/models/NoticiasDAO.js`)
         .then(`app/controllers`)
         .into(app)

//exportar server
module.exports = app
