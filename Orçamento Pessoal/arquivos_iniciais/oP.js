// criação classes

class Bd{

    constructor(){
        this.id = localStorage.key(0)
        
        if(this.id === null){
            this.id = 0
            localStorage.setItem('id',this.id)
        }
    }
    
    //metodo que fará dinamicamente os indices/keys/identificador dos dados do banco
    getProximoID(){

        let proximoID = localStorage.getItem('id')

        return parseInt(proximoID) + 1  
    }

    //metodo de fará a persistencia dos dados no banco de dados(localStorage)
    gravarDado(despesa){

        let id = this.getProximoID()
        localStorage.setItem(id,JSON.stringify(despesa))

        localStorage.setItem('id',id)

        // localStorage.clear()
    }

    //recuperar todas as despesas no localStorage
    recuperarRegistro(){

        let despesas = Array()
        let id = localStorage.getItem('id')
        for(let i = "0"; i <= id; i++){

            let registro = JSON.parse(localStorage.getItem(i))
            
            if(registro === null){
                continue
            }

            registro.id = i
            despesas.push(registro)

        }

       return despesas
    }

    //realizará o filtro das despesas atraves dos dados informados pelo usuario
    pesquisar(filtroDespesa){

        let despesas = this.recuperarRegistro()
        

        if(filtroDespesa.dia != ''){
            despesas = despesas.filter(d => d.dia == filtroDespesa.dia)
        }
        if(filtroDespesa.mes != ''){
            despesas = despesas.filter(d => d.mes == filtroDespesa.mes)
        }
        if(filtroDespesa.ano != ''){
            despesas = despesas.filter(d => d.ano == filtroDespesa.ano)
        }
        if(filtroDespesa.tipo != ''){
            despesas = despesas.filter(d => d.tipo == filtroDespesa.tipo)
        }
        if(filtroDespesa.descricao != ''){
            despesas = despesas.filter(d => d.descricao == filtroDespesa.descricao)
        }
        if(filtroDespesa.valor != ''){
            despesas = despesas.filter(d => d.valor == filtroDespesa.valor)
        }

        return despesas       
    }

    // removerá o dado selecionado pelo usuario
    removerDespesa(id){

        localStorage.removeItem(id)

    }   

}

let bd = new Bd()

class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao 
        this.valor = valor
        this.id 
    }

    // fará a checagem se todos os campos de um despesa foi preenchidos 
    validarDados(){
        
        for(let i in this){
            if(this[i] == '' || this[i] == null || this[i] == undefined){
                return false
            }
        }
        return true
    }
}

//pegará os dados informados pelo usuario e armazená-los no localStorage
function cadastrarOrcamento(){

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    if(despesa.validarDados()){
        bd.gravarDado(despesa)


        document.getElementById('modalTitle').className = ' text-success' 
        document.getElementById('modalTitle').innerHTML = "Registro inserido com sucesso"


        document.getElementById("modalText").innerHTML = "Despesa foi cadastrada com sucesso"

        document.getElementById("modalButton").className = " btn-success"
        document.getElementById("modalButton").innerHTML = 'voltar'

        dia.value = ''
        mes.value = ''
        ano.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

        
        $('#modalRegistraDespesa').modal('show')
    }else{
        document.getElementById('modalTitle').className = ' text-danger' 
        document.getElementById('modalTitle').innerHTML = "Error na Gravação"


        document.getElementById("modalText").innerHTML = "Existem campos que não foram preenchidos"
        
        document.getElementById("modalButton").className = " btn-danger"
        document.getElementById("modalButton").innerHTML = 'voltar e corrigir'
        $("#modalRegistraDespesa").modal('show')
    }
    
}

// função que carregará e fará a insersão de todas as despesas do usuario ao entrar na tela de consulta
function carregarListaDespesas(despesas = Array(), filtro = false){

    if(despesas.length == 0 && filtro == false ){
    
        despesas = bd.recuperarRegistro()  
    }

    // let id = 1
    let tbody = document.getElementById('registroDeDespesas')
    tbody.innerHTML = ''

    despesas.forEach(function(valorArray){

        tr = tbody.insertRow()
        // tr.id = id

        tr.insertCell(0).innerHTML = `${valorArray.dia}/${valorArray.mes}/${valorArray.ano}`
        switch(valorArray.tipo){
            case '1': 
                valorArray.tipo = 'Alimentação' 
                break
            case '2':
                valorArray.tipo = 'Educação'  
                break
            case '3':
                valorArray.tipo = 'Lazer'  
                break
            case '4':
                valorArray.tipo = 'Saúde'  
                break
            case '5':
                valorArray.tipo = 'Tansporte'  
                break

        }
        tr.insertCell(1).innerHTML = valorArray.tipo
        tr.insertCell(2).innerHTML = valorArray.descricao
        tr.insertCell(3).innerHTML = valorArray.valor

        let btn = document.createElement('button')
        btn.className ='btn btn-danger'
        btn.onclick = function() {
            
            let id = this.id.substr(11,1)
            bd.removerDespesa(id)
            tbody.innerHTML = ''
            carregarListaDespesas()
        }
        btn.innerHTML = '<i class = "fas fa-times"></i>'
        btn.id = `id_despesa_${valorArray.id}`

        tr.insertCell(4).append(btn)

        
    })
    
    // listarDespesas(despesas)
}

//função que realizará o filtro de registros 
function filtrarDespesas(){

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let filtroDespesa = new Despesa(ano.value,mes.value,dia.value,tipo.value,descricao.value,valor.value)

    let despesas = bd.pesquisar(filtroDespesa)

    carregarListaDespesas(despesas, true)
}