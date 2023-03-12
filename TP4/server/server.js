// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr
var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux function to process body


function reloadPage(res,d){
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
        }
        )).catch(errors => {
            console.log(errors);
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
            res.end()
        }
        )
}




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
                            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
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
                if(req.url == '/'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            axios.post('http://localhost:3000/toDo', result)
                            .then(function(resp) {
                                console.log(resp.status)
                                reloadPage(res,d)
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



