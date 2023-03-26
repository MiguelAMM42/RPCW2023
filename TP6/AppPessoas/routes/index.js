var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

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
  Pessoa.addPessoa(req.body)
    .then(pessoa => {
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
