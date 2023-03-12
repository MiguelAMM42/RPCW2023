// server.js
// RPCW2023: 2023-03-12
// original by jcr; modified by miguel martins

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


// Server creation

var tasksServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    // var d = new Date().toISOString().substring(0, 16)
    var d = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if(req.url == "/"){
                    let toDo = "http://localhost:3000/toDo"
                    let resolved = "http://localhost:3000/resolved"

                    const requestToDo = axios.get(toDo);
                    const requestResolved = axios.get(resolved);

                    axios.all([requestToDo, requestResolved]).then(axios.spread((...responses) => {
                        const responseToDo = responses[0]
                        const responseResolved = responses[1]
                        // use/access the results 
                        // console.log("responseToDo",responseToDo.data);
                        // console.log("responseResolved",responseResolved.data);

                        toDo = responseToDo.data
                        resolved = responseResolved.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(templates.tasksPage(toDo, resolved, d))
                        res.end()
                        })).catch(errors => {
                            console.log(errors);
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + errors + "</p>")
                            res.end()
                        })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/newTask'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            axios.post('http://localhost:3000/toDo', result)
                            .then(function(resp) {
                                res.statusCode = 302;
                                res.setHeader('Location', '/');
                                res.end();
                                //res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                //res.write(templates.alunoPostConfirmPage(result, d))
                                //res.end()
                            }).catch(erro => {
                                //res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                //res.write("<p>Erro a inserir aluno...</p>")
                                //res.end()
                                console.log("Erro: " + erro)
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                    /*res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    
                    res.write(templates.alunoPostConfirmPage(aluno,d))
                    res.end()*/
                }
                else if(req.url == '/deleteToDo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            
                            axios.delete('http://localhost:3000/toDo/' + result.id)
                            .then(function(resp) {
                                res.statusCode = 302;
                                res.setHeader('Location', '/');
                                res.end();
                            }).catch(erro => {
                                //res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                //res.write("<p>Erro a inserir aluno...</p>")
                                //res.end()
                                console.log("Erro: " + erro)
                            })
                            console.dir(result)
                        }else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else if(req.url == '/deleteResolved'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            axios.delete('http://localhost:3000/resolved/' + result.id)
                            .then(function(resp) {
                                console.log(resp.status)
                                res.statusCode = 302;
                                res.setHeader('Location', '/');
                                res.end();
                                //res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                //res.write(templates.alunoPostConfirmPage(result, d))
                                //res.end()
                            }).catch(erro => {
                                //res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                //res.write("<p>Erro a inserir aluno...</p>")
                                //res.end()
                                console.log("Erro: " + erro)
                            })
                        }else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }else if(req.url == '/resolve'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            let deleteToDo = "http://localhost:3000/toDo/" + result.id
                            
                            const requestDeleteToDo = axios.delete(deleteToDo);
                            const requestAddToResolve = axios.post('http://localhost:3000/resolved', result);

                            axios.all([requestDeleteToDo, requestAddToResolve]).then(axios.spread((...responses) => {
                                    res.statusCode = 302;
                                    res.setHeader('Location', '/');
                                    res.end();
                                })).catch(errors => {
                                    console.log("Erro: " + errors)
                                })

                        }else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else if(req.url == '/undo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            let deleteResolved = "http://localhost:3000/resolved/" + result.id
                            
                            const requestDeleteResolved = axios.delete(deleteResolved);
                            const requestAddToToDo = axios.post('http://localhost:3000/toDo', result);

                            axios.all([requestDeleteResolved, requestAddToToDo]).then(axios.spread((...responses) => {
                                    res.statusCode = 302;
                                    res.setHeader('Location', '/');
                                    res.end();
                                })).catch(errors => {
                                    console.log("Erro: " + errors)
                                })

                        }else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

tasksServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



