const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose')
const port = 3000
//importando o cliente
const Cliente = require('./cliente')
//Conexao
mongoose.connect('mongodb://localhost:27017/nsc_crud', {useNewUrlParser: true});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


//Salva um cliente
app.post('/clientes', (req, res) => {
    const cliente = colocarDadosClienteInsert(req, res)
    // res.send(cliente.nome)
    cliente.save(() => {
        res.json({mensagem:`Cliente ${cliente.nome} cadastrado com sucesso`})
     })
})

//Tras todos os clientes
app.get('/clientes', (req, res) => {
    //pegando todos os clientes
    Cliente.find((err, clientes) => {
     if(err) res.json(err)
        if(clientes) {
            res.json(clientes)
        }else{
            res.json({mensagem:`Não há clientes`})
        }
     })
})

//deletar
app.delete('/clientes/:id', (req, res) => {
    Cliente.findByIdAndDelete(req.params.id, (err, cliente) => {
        if(err) console.log(err);
        if(cliente){
            res.json({mensagem:`Cliente ${cliente.nome} excluído `})
        }else{
            res.json({mensagem:`Cliente não encontrado`})
        }
    })
})

//editar 
app.put('/clientes/:id', (req, res) => {
    const id = req.params.id
    Cliente.findById( id, (err, cliente) => {
    if (err)  res.send(err)
            if (cliente) {
            const nomeOld = cliente.nome
            cliente = colocarDadosClienteUpdate(req, cliente);
            cliente.save(() => {
                res.json({mensagem:`Cliente ${nomeOld} atualizado com sucesso`})
            });    
        }else{
            res.json({mensagem:`Cliente não encontrado`})
        }
    });  
})

//Funções auxiliares
function colocarDadosClienteUpdate(req, cliente) {
    cliente.nome = req.body.nome ? req.body.nome : cliente.nome
    cliente.cpf = req.body.cpf ? req.body.cpf : cliente.cpf
    cliente.endereco.rua = req.body.rua ? req.body.rua : cliente.endereco.rua
    cliente.endereco.numero = req.body.numero ? req.body.numero : cliente.endereco.numero
    cliente.endereco.bairro = req.body.bairro ? req.body.bairro : cliente.endereco.bairro
    cliente.endereco.complementto = req.body.complementto ? req.body.complementto : cliente.endereco.complementto
    cliente.endereco.cidade = req.body.cidade ? req.body.cidade : cliente.endereco.cidade
    cliente.endereco.cep = req.body.cep ? req.body.cep : cliente.endereco.cep
    cliente.endereco.estado = req.body.estado ? req.body.estado : cliente.endereco.estado
    cliente.telefone.comercial = req.body.tel_comercial ? req.body.tel_comercial : cliente.telefone.comercial
    cliente.telefone.fixo = req.body.tel_fixo ? req.body.tel_fixo : cliente.telefone.fixo
    cliente.telefone.celular = req.body.tel_celular ? req.body.tel_celular : cliente.telefone.celular
    cliente.email = req.body.email ? req.body.email : cliente.email

    return cliente
}

function colocarDadosClienteInsert(req, res) {
    const cliente = new Cliente()
    cliente.nome = req.body.nome ? req.body.nome : res.json({mensagem:"nome vazio"})
    cliente.cpf = req.body.cpf
    cliente.endereco.rua = req.body.rua
    cliente.endereco.numero = req.body.numero
    cliente.endereco.bairro = req.body.bairro
    cliente.endereco.complemento = req.body.complemento ? req.body.complemento : ""
    cliente.endereco.cep = req.body.cep 
    cliente.endereco.estado = req.body.estado
    cliente.telefone.comercial = req.body.telefone_comercial ? req.body.telefone_comercial : ""
    cliente.telefone.fixo = req.body.telefone_fixo ? req.body.telefone_fixo : ""
    cliente.telefone.celular = req.body.telefone_celular ? req.body.telefone_celular : ""
    cliente.email = req.body.email
    return cliente
}


app.listen(port, () => {
    console.log('Executando...');
})


