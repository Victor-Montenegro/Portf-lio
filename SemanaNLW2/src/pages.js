//em vez de ter um unico nome para os 3 objetos, dessa forma voce poode usar o respectivo nome do obejcto
const {subjects, weekdays, getSubject, convertHoursToMinutes} = require('./utils/format')
const Database = require('./database/db')

function pageLanding(req,res){
    return res.render("index.html")
}

async function pageStudy(req,res){   
    const filters = req.query    
    
    if (!filters.subject || !filters.weekday || !filters.time){
        return res.render('study.html', {filters, subjects, weekdays} )  
    }

    
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.PRo_ID = proffys.Pro_ID)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.CLa_ID = classes.Cla_ID
            AND class_schedule.Sch_Weekday = ${filters.weekday}
            AND class_schedule.Sch_Time_From <= ${timeToMinutes}
            AND class_schedule.Sch_Time_To > ${timeToMinutes}
        )
        AND
        classes.Cla_Subject = '${filters.subject}'
    `

    
     //aqui e a hora que vamos fazer a conexao com o banco de dados, o try e uma boa pratica para capturar erros durante o execução do banco
      try {
          const db = await Database
          const proffys = await db.all(query)

          return res.render('study.html', {proffys, subjects, filters, weekdays})
        
      } catch (error) {
          console.log(error)
      }

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

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses
}

