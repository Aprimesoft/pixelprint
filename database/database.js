const {config }= require('dotenv').config()
const mongoose =require('mongoose')

//importançãoes
const db = mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.BD}.mik9v3g.mongodb.net/?retryWrites=true&w=majority&appName=bdpixelprint`
).then(()=>{
    console.log('base dados conectado com sucesso!')
}).catch((error)=>{
    console.log('falha na conexao com o banco de dado ')
})
//exportando a variavel de conexão
module.exports = db