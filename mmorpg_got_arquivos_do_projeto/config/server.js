//exigindo modulos 
const express = require(`express`)
const consign = require(`consign`)
const expressValidator = require(`express-validator`)
const expressSession = require(`express-session`)
const bodyParser = require(`body-parser`)

//instanciando e chamando a funcao express
const app = express()

//configurando a responsabilidade das views para o ejs
app.set(`view engine`, `ejs`)
app.set(`views`,`./app/views`)

//configurando os middlewares
app.use(bodyParser.urlencoded({extended: true}))

app.use(expressValidator())

app.use(express.static(`app/public`))

app.use(expreesSession({
    secret: `asf123rtfsdg234`,
    resave: false,
    saveUninitialized: false
}))

consign().include(`app/routes`)
         .then(`config/database.js`)
         .then(`app/controllers`)
         .then(`app/models`)
         .into(app)

//exportando o server
module.exports = app