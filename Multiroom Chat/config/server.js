//exigindo modulos 
const express = require(`express`)
const consign = require(`consign`)
const bodyParser = require(`body-parser`)
const expressValidator = require(`express-validator`)

//chamando a funcao express
const app = express()

//configurando a responsabilidades das views para ejs 
app.set(`view engine`,`ejs`)
app.set(`views`,`./app/views`)

//configurando middlewares 
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())
app.use(express.static(`./app/public`))

//automatizando as routes | controllers 
consign().include(`app/routes`)
         .then(`app/controllers`)
         .into(app)

//relizando o exports do server 
module.exports = app