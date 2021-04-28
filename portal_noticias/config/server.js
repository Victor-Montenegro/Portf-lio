//exigindo modulos
    const express = require(`express`)
    const consign = require(`consign`)
//chamando a funcao express
const app = express()

//configurando a responsabilidade da view engine para ejs | localização das views
app.set(`view engine`,`ejs`)
app.set(`views`,`./app/views`)

//configurando middlewares
app.use(express.static(`./app/public`))

//automatizando routes | bd | models | controllers 

consign().include(`app/routes`)
         .then(`config/database.js`)
         .then(`app/models/HomeDAO.js`)
         .then(`app/controllers/home.js`)
         .into(app)

//exportar server
module.exports = app
