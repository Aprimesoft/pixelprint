const express = require('express');
const body_parser = require('body-parser'); 
const cors = require('cors');
const http = require('http'); 
const fs = require('fs');

const session = require('express-session');
const app = express();
app.use(cors()); 

// Configuração para servir arquivos estáticos
app.use(express.static('public'));
app.use(body_parser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());


//dependecias
const bd = require('./database/database')
 

/**função global para a verificação dos autenticação dos dados */

app.use(session({
  secret: 'sentia-segredo', // troque por algo mais seguro em produção
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hora
}));


function verificarLogin(req, res, next) {
    if (req.session.utilizador) {
      next();
    } else {
      //res.status(401).json({ tipo: "erro", mensagem: "Acesso não autorizado. Por favor preencha os dados de acesso." });
      res.redirect('/')
    }
}
  

// Rotas principais
app.get('/', async (req, res) => {res.render('app');});


// Define a porta correta para ambientes online
const PORTA = process.env.PORT || 8080;
app.listen(PORTA, () => {
    console.log(`Servidor rodando em: https://musical-space-broccoli-jjq9xgp76qqrf5q4g-8080.app.github.dev`);
});
