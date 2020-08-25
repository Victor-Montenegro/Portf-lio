
//aplicattion data 
const weekdays = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
]

const subjects = [

        "Artes",
        "Biologia",
        "Ciências",
        "Educação física",
        "física",
        "Geografia",
        "História",
        "Matemática",
        "Português",
        "Química",   
]

const proffys = [ 
        
        {name:"Diego Fernandes", avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
         whatsapp:"986254575", 
         bio:"Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject:"Química", 
        cost:"20", 
        weekday:[0], 
        time_from:[720], 
        time_to:[1220] } 
]

// aplicattion functionallity

function getSubject(subjectNumber) {
        const position = +subjectNumber - 1
        return subjects[position]


}

function pageLanding(req,res){
         return res.render("index.html")
 }

function pageStudy(req,res){   
        const filters = req.query         
         return res.render("study.html", {proffys, filters, subjects, weekdays} )  
 }       

function pageGiveClasses(req,res){
        const data = req.query

        //checking if there is any data in data = req.query 
                                    //transforma em um vetor com as chaves/variaveis de um dado, ex( {name, avatar, bio},voce notou são os mesmo da const proffys )   
        const isNotEmpty = Object.keys(data).length > 0
        if (isNotEmpty) {

                data.subject = getSubject(data.subject)

                //adding data to the list / vector of the proffys
                proffys.push(data)

                return res.redirect("/study")
        }
        
        return res.render( "give-classes.html", {subjects, weekdays})
}

// server 
const express = require('express') 
const server =  express() 
const nunjucks = require('nunjucks')

// nunjucks configuration (template engine)
nunjucks.configure('src/views', {
        express: server,
        noChace: true,             
})

// server start and configuration
server 
.use(express.static("public"))  

//aplicattion routes
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)                        
// start server
.listen(5500)


//  
//                                                                       
//                                   const isNotEmpty = Object.Keys(data).length > 0
       
//                                   //console.log(data)
                          
//                                   if (isNotEmpty) {
//                                           //console.log("entrei aqui")
//                                           
//                                           proffys.push(data)
                                          
//                                           return res.redirect("/study")
//                                   }
         