var express = require('express');
var router = express.Router();




module.exports = router;

var Task = require('../controllers/task');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Task.toDo()
    .then(_toDo_ => {
      Task.resolved()
        .then(_resolved_ => {
          res.render('index', { toDo: _toDo_, resolved: _resolved_, d: data })
          //console.log('toDo: ' + _toDo_)
          //onsole.log('resolved: ' + _resolved_)
        })
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});


router.post('/newTask', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Task.newTask(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

router.post('/deleteToDo/', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(req.body.id)
  Task.deleteToDo(req.body.id)
    .then(() => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

router.post('/deleteResolved/', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Task.deleteResolved(req.body.id)
    .then(() => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});


router.post('/resolve/', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Task.resolve(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

router.post('/undo/', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Task.undo(req.body)
    .then(() => {
      res.redirect('/')
      //res.send(`<script>window.location.href='/';</script>`);
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

router.post('/editToDo/', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Task.editToDo(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

router.post('/editDone/', function(req, res, next) {
  var data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  Task.editDone(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});