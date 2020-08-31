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

// aplicattion functionallity

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function convertHoursToMinutes(time){
                                    //o split e um funcionalidade para string, onde ele separa a string usando o parametro que voce deseja, ex, se as horas estao sendo separadas por ":"(09:00), voce vai usar como parametro os dois pontos ":", fazendo assim que o split vai seperar em como um array, ["09","00"]
    const [hour, minutes] = time.split(":") // e a mais coisa se for fazer assim == const [hours] = time.split(":")[0], const [minutes] = time.split(":")[1]
            //number e uma funcionalidade para garartir que o retorno seja um numero
    return Number( (hour * 60) + minutes )
}


module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}