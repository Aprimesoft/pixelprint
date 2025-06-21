const mongoose =require('mongoose')
//importançãoes
const db = mongoose.connect(
  'mongodb+srv://baltazar23011998:baltazar23011998@bdpixelprint.mik9v3g.mongodb.net/?retryWrites=true&w=majority&appName=bdpixelprint'
).then(()=>{
    console.log('base dados conectado com sucesso!')
}).catch((error)=>{
    console.log('falha na conexao com o banco de dado ')
})
//exportando a variavel de conexão
module.exports = db