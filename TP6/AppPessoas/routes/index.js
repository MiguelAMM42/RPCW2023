var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')
const { ObjectId } = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Pessoa.list()
    .then(pessoas => {
      res.render('index', { plist: pessoas, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de pessoas"})
    })
});

/* GET Student Form. */
router.get('/pessoas/registo', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  res.render('addPessoaForm', {d: data})
});

/* GET Student page. */
router.get('/pessoas/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('pessoa', { p: pessoa, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});

/* GET Student Update Form. */
router.get('/pessoas/edit/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('updatePessoaForm', {p: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});

/* GET Student Delete Form. */
router.get('/pessoas/delete/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('deletePessoaForm', {p: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});

/* GET Delete Confirmation */
router.get('/pessoas/delete/:idPessoa/confirm', (req,res)=>{
  Pessoa.deletePessoa(req.params.idPessoa)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
})

// POST Student Form Data
router.post('/pessoas/registo', (req,res) => {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var myId = (req.body._id).trim();
  const pId = new ObjectId();
  if (!ObjectId.isValid(myId)) {
    console.log("ID inválido: " + myId)
  } else {
    const pId = new ObjectId(myId)
  }
  console.log("ID: " + pId)

  let desportosList = req.body.desportos.split(",");
  let animaisList = req.body.animais.split(",");
  let destinosList = req.body.destinos_favoritos.split(",");
  let figurasList = req.body.figura_publica_pt.split(",");
  
  let pessoaToAdd = {
    _id : pId,
    nome: req.body.nome,
    idade: req.body.idade,
    sexo: req.body.sexo,
    marca_carro : req.body.marca_carro,
    religiao: req.body.religiao,
    CC : req.body.CC,
    profissao: req.body.profissao,
    morada: {
      cidade : req.body.cidade,
      rua : req.body.distrito
    },
    partido_politico:{
      party_name : req.body.party_name,
      party_abbr : req.body.party_abbr
    },
    desportos: desportosList,
    animais: animaisList,
    destinos_favoritos: destinosList,
    figura_publica_pt: figurasList,
    atributos:{
      fumador : req.body.fumador,
      gosta_cinema: req.body.gosta_cinema,
      gosta_viajar: req.body.gosta_viajar,
      acorda_cedo: req.body.acorda_cedo,
      gosta_ler: req.body.gosta_ler,
      gosta_musica: req.body.gosta_musica,
      gosta_comer: req.body.gosta_comer,
      gosta_animais_estimacao: req.body.gosta_animais_estimacao,
      gosta_dancar: req.body.gosta_dancar,
      comida_favorita: req.body.comida_favorita
    }
  }

  console.log(pessoaToAdd)
  
  Pessoa.addPessoa(pessoaToAdd)
    .then(pessoa => {
      console.log(pessoa)
      res.render('addPessoaConfirm', {p: pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo de pessoa"})
    })
})

// POST Student Update Form
router.post('/pessoas/edit', (req,res) => {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Pessoa.updatePessoa(req.body)
    .then(pessoa => {
      res.render('updatePessoaConfirm', {p: pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do registo de pessoa"})
    })
})

module.exports = router;
