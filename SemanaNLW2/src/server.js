// server 
const express = require('express') 
const server =  express() 


const {pageLanding, pageStudy, pageGiveClasses, saveClasses,pageSuccess} = require('./pages')

// nunjucks configuration (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
        express: server,
        noChace: true,             
})

// server start and configuration
server
// receive data from req.body
.use(express.urlencoded( {extended : true}))
// configuration of static files (css,scripts, imagens)
.use(express.static("public"))  

//aplicattion routes
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/success", pageSuccess)
.get("/give-classes", pageGiveClasses)   
.post("/save-classes", saveClasses)                     
// start server
.listen(5501)


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
         