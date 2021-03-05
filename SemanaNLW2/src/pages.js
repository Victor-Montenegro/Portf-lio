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
          
          proffys.map( (proffys) => {
            proffys.Cla_Subject = getSubject(proffys.Cla_Subject)

          } )

          return res.render('study.html', { proffys, filters, subjects, weekdays })
        
      } catch (error) {
          console.log(error)
      }

}       

function pageGiveClasses(req,res){
    
return res.render( "give-classes.html", {subjects, weekdays})
}

function pageSuccess(req, res) {

    return res.render("success.html")
}

async function saveClasses(req, res){
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {

        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])

        }
    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues } )

        return res.redirect("/study")
    } catch (error) {
        console.log(error) 
    }
    
    // ao receber os dados usando o query, na url da pagina vai aparecer o formulario, para esconder isso utilizamos o body,mas deve configurar no server,pois como padrao ele nao pode receber no body

        
}


module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageSuccess
}

