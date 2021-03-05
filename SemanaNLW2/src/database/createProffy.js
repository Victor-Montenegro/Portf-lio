
// AQUI ESTOU INSERINDO OS DADOS DENTRO DAS TABELAS 

                   // para utilizar o await deve ter o async
module.exports = async function(db, { proffyValue, classValue, classScheduleValues } ) {
    // inserir dados na table de proffys
      //await e a mesma coisa do then(), so que ao utilizar o then(), vai fazendo que uma função fique dentro da outra 
                                        // o nome desse acrase no JS, e template literals, praticamente lhe permete quebra linha as aspas duplas ou simples, nao podem fazer isso
      const insertProffy = await db.run(`
        INSERT INTO proffys (
            Pro_Name,
            Pro_Avatar,
            Pro_Whatsapp,
            Pro_Bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
            // aqui estou recebendo o id que criamos dentro das tabelas 
    const proffy_id = insertProffy.lastID

    const insertClass = await db.run(`
            
            INSERT INTO classes (
                Cla_Subject,
                Cla_Cost,
                PRo_ID
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertClass.lastID
                        // difenrete do forEach, onde ele vai inteirar cada elemento e navegar por cada um dos elementos e colocando dentro da function, mas nao pode returnar nada, como nesse caso eu quero um return, entao utilizamos o map. onde ele vai fazer o mesmo papel do forEach, mas possibilitando o retorno, e cria um novo array 
    const insertedAllClassScheduleValues = classScheduleValues.map( (values) => {

        return db.run(`
            INSERT INTO class_schedule (
                CLa_ID,
                Sch_Weekday,
                Sch_Time_From,
                Sch_Time_To
            ) VALUES (
                "${class_id}",
                "${values.weekday}",
                "${values.time_from}",
                "${values.time_to}"

            );
        
        `)

    } )
                    // como o classSchedule e um array e nao sabemos quantos o proffy vai ter de horarios, entao o primise.all() vai esperar todo o array terminar (por isso primise.all, esperar todas as promessas)
    await Promise.all(insertedAllClassScheduleValues)
}