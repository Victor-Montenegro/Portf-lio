
// AQUI ESTOU CRIANDO AS TABELAS DO BANCO E FAZENDO A IMPORTAÇÃO PARA OS OUTROS ARQUIVOS COMO createProffy.js | test.js

const database = require('sqlite-async')

function execute(db) {
            // isso e um acrase, para iniciar a fazer comandos sql aqui dentro ( db.exec(``) )
    // ao colocar o return, o db.exec ao terminar de executar ele vai guarda e devolver a execução para o execute, fazendo que voce possa utiliza o banco em qualquer lugar, fazendo o import ou o require()
    return db.exec(` 
        CREATE TABLE IF NOT EXISTS proffys (
            Pro_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Pro_Name TEXT,
            Pro_Avatar TEXT,
            Pro_Whatsapp TEXT,
            Pro_Bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            Cla_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Cla_Subject INTERGER,
            Cla_Cost TEXT,
            PRo_ID INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            Sch_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            CLa_ID INTEGER,
            Sch_Weekday INTEGER,
            Sch_Time_From INTEGER,
            Sch_Time_To INTEGER
        );
    
    `)
}                                                

// module e um objeto que tem varias funcionalidades e propriedades, e uma delas e o exports, onde pode pegar/receber varios tipos de dados, o node onde ja sabe quando eu utilizar esse module, e que quando eu fazer um require pegando esse arquivo, ele vai de devolver a execução dessa linha em baixo 
module.exports = database.open(__dirname + '/database.sqlite').then(execute)
                                                //then( entao), e uma forma para que o database.open, execute e abra o arquivo 'database.sqlite' antes de todos, pois o java-script executa linha a linha, mas pode acontece que essa linha onde estamos demore a abrir e executa e o java-script passe para a proxima linha, então por isso o then,o then fará que, quando termina de abrir e executar o arquivo, 'entao passar isso'
