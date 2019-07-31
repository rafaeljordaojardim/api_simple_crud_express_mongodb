const mongoose = require('mongoose')
const Schema = mongoose.Schema // criando esquema para definir a estrutura


const clienteSchema = new Schema({
    nome:String,
    cpf: String,
    endereco: {
        rua:String,
        numero:String,
        bairro:String,
        complemento:String,
        cidade:String,
        cep:String,
        estado:String
    },
    telefone:{
        comercial:String,
        fixo:String,
        celular:String
    },
    email:String
})


module.exports = mongoose.model('Cliente', clienteSchema)

/*
    estrutura
  {
      nome:"", required
      cpf:00000000,
      endereco:{
            rua:"",
            numero:"",
            bairro:"",
            complemento,
            cidade:"",
            cep:"",
            estado:""
      },
      telefone:{ // telefone válido
          comercial:"",
          fixo:"",
          celular:""
      },
      email:""//email válido
  }
*/