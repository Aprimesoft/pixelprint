const models = require('../model/models')

//Registar novo funcionario 
const Novo_funcionario =  async (req,res)=>{
   try{
     const {nome,genero,Datanascimento,naturalidade,telefone,email,senha} = req.body
        const novoRegisto = await new models.Utilizador({
            nome:nome,
            genero:genero,
            datanascimento:Datanascimento,
            naturalidade:naturalidade,
            telefone:telefone,
            email:email,
            senha:senha
        })
        novoRegisto.save()
        res.json({ tipo: 'sucesso', mensagem: 'Conta criada com sucesso!' });
        
   }catch (error){
        res.json({ tipo: 'erro', mensagem: 'Erro interno, por favor tente novamente ...!' });
   }
}

//Perimitir acesso de utilizador
const Acesso = async (req, res) => {
    try {
      const {email,senha} = req.body 
  
      const Utilizador_Autorizado = await models.Utilizador.findOne({ email: email, senha: senha });
  
      if (!Utilizador_Autorizado) {
        return res.json({ tipo: "erro", mensagem: "Credenciais inválidas. por favor verifique os dados e tente novamente." });
      }
  
      // Armazenando os dados na sessão
      req.session.utilizador = {
        id: Utilizador_Autorizado._id,
        email: Utilizador_Autorizado.email,
        nome: Utilizador_Autorizado.nome
      };
  
      res.json({ tipo: "sucesso", mensagem: `Creedenciais aceite, Seja bem vindo/a a Pixelprint, ${req.session.utilizador.nome}!` });
  
    } catch (error) {
      console.error(error);
      res.json({ tipo: "erro", mensagem: "Erro interno. Por favor, recarregue a página e tente novamente." });
    }
};

//Registrar equipamentos
const NovoEquiamento = async (req, res) => {
  try {
    const novoEquipamento = await new models.Equipamento({
      desinacao: req.body.desinacao,
      marca: req.body.marca,
      quantidade: req.body.quantidade,
      estado: req.body.estado,
      areafuncional: req.body.areafuncional,
      Qt_em_uso: req.body.Qt_em_uso,
      Data_entrada: req.body.Data_entrada,
      imagem: req.file.filename // Nome da imagem armazenada
    });

    await novoEquipamento.save();
    const listaEquipamentos = await models.Equipamento.find({})
    res.json({dados:listaEquipamentos})
    //res.status(201).send({ message: 'Equipamento cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao cadastrar o equipamento.' });
  }
};


module.exports= {
    Novo_funcionario,
    Acesso,
    NovoEquiamento
}