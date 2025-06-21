const mongoose = require('mongoose')
const db = require('../database/database')

const Utilizador = mongoose.model('Funcionario',{
    nome:String,
    sobrenome:String,
    genero:String,
    datanascimento:Date,
    naturalidade:String,
    telefone:String,
    foto:String,
    Cargo:String,
    email:String,
    senha:String
})

const Equipamento = mongoose.model('Equipamento',{
    desinacao:String,
    marca:String,
    quantidade:Number, 
    estado:String,
    areafuncional:String,
    Qt_em_uso:Number,
    Data_entrada:Date
})
/*
const Topicos = mongoose.model('Topicos',{
    Assunto:String,
    Texto:String,
    Positivo:Number,
    Negativo:Number,
    Neutro:Number,
    Aspecto_positivo:String,
    Aspecto_Negativo:String,
})

const comentarios = mongoose.model('comentarios',{
    comentarios:String,
    classificacao:String,
    usuarioId:String,
    AssuntoId:String
})

*/
module.exports = {
    Utilizador, 
    Equipamento
}