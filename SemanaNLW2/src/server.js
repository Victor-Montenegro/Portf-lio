// server 
const express = require('express') 
const server =  express() 


const {pageLanding, pageStudy, pageGiveClasses} = require('./pages')

// nunjucks configuration (template engine)
const nunjucks = require('nunjucks')
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
         