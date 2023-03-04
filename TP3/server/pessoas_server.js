// pessoas_server.js
// RPCW: 2023-02-27
// by jcr

var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')


http.createServer(function(req, res){
    var d = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(req.method + " " + req.url + " " + d)

    // descodificar o url
    var dicURL = url.parse(req.url, true) //true cria a estrutura de dados
    if(dicURL.pathname == "/" ){
        // return a html page
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(mypages.indexPage()); // o conteudo da pagina é criado no mypages

    }else if(dicURL.pathname == "/w3.css") {
        fs.readFile('../styles/w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'});
            if (err){
                console.log("Erro na leitura da stylesheet.");
                res.write("Erro: " + err);
            }else
                res.write(data);
            res.end();
        })

    }else if(dicURL.pathname == "/pessoas" ){
        //ordenado pelo JSON server
        axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc")
            .then(function (resp) {
                //esta uma sintaxe de função em JS: não tem id, pq nao é invocada de fora
                var pessoas = resp.data // para ter só os dados
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas,"Pessoas")); // o conteudo da pagina é criado no mypages
            })
            .catch(erro => {
                // sintaxe alternativa de funcoes em JS
                console.log("Erro: " + erro)
                // tambem queremos que o cliente veja o erro: nao so na consola
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })
    }else if(dicURL.pathname.startsWith("/pessoas/")) {
        var id = dicURL.pathname.substring(9); // valor depois de "pessoas/"
        axios.get(`http://localhost:3000/pessoas/${id}`)
            .then(function (resp) {
                
                var pessoa = resp.data // para ter só os dados
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoaPage(pessoa)); // o conteudo da pagina é criado no mypages
            })
            .catch(erro => {
                // sintaxe alternativa de funcoes em JS
                console.log("Erro: " + erro)
                // tambem queremos que o cliente veja o erro: nao so na consola
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })
    }else if(dicURL.pathname == "/sexo" ){
        axios.get("http://localhost:3000/pessoas")
            .then(function (resp) {
        
                var pessoas = resp.data 

                var pessoasMasculinas = pessoas.filter(p => p.sexo == "masculino")
                var pessoasFemininas = pessoas.filter(p => p.sexo == "feminino")
                var pessoasOutro = pessoas.filter(p => p.sexo == "outro")

                let distribuicaoSexo = {
                    masculino: pessoasMasculinas.length,
                    feminino: pessoasFemininas.length,
                    outro: pessoasOutro.length
                }

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.sexoPage(distribuicaoSexo));
            })
            .catch(erro => {
                // sintaxe alternativa de funcoes em JS
                console.log("Erro: " + erro)
                // tambem queremos que o cliente veja o erro: nao so na consola
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })

    }else if(dicURL.pathname == "/sexo/feminino" ){
        //ordenado pelo JSON server
        axios.get("http://localhost:3000/pessoas?sexo=feminino&_sort=nome&order=asc")
            .then(function (resp) {
                //esta uma sintaxe de função em JS: não tem id, pq nao é invocada de fora
                var pessoas = resp.data // para ter só os dados
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas,"Pessoas do sexo feminino")); // o conteudo da pagina é criado no mypages
            })
            .catch(erro => {
                // sintaxe alternativa de funcoes em JS
                console.log("Erro: " + erro)
                // tambem queremos que o cliente veja o erro: nao so na consola
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })
    }else if(dicURL.pathname == "/sexo/masculino" ){
        //ordenado pelo JSON server
        axios.get("http://localhost:3000/pessoas?sexo=masculino&_sort=nome&order=asc")
            .then(function (resp) {
                //esta uma sintaxe de função em JS: não tem id, pq nao é invocada de fora
                var pessoas = resp.data // para ter só os dados
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas,"Pessoas do sexo masculino")); // o conteudo da pagina é criado no mypages
            })
            .catch(erro => {
                // sintaxe alternativa de funcoes em JS
                console.log("Erro: " + erro)
                // tambem queremos que o cliente veja o erro: nao so na consola
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })
    }else if(dicURL.pathname == "/sexo/outro" ){
        //ordenado pelo JSON server
        axios.get("http://localhost:3000/pessoas?sexo=outro&_sort=nome&order=asc")
            .then(function (resp) {
                //esta uma sintaxe de função em JS: não tem id, pq nao é invocada de fora
                var pessoas = resp.data // para ter só os dados
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas,"Pessoas com outro sexo")); // o conteudo da pagina é criado no mypages
            })
            .catch(erro => {
                // sintaxe alternativa de funcoes em JS
                console.log("Erro: " + erro)
                // tambem queremos que o cliente veja o erro: nao so na consola
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })
    }else if(dicURL.pathname == "/top10profissoes" ){
        axios.get("http://localhost:3000/pessoas")
            .then(function (resp) {
        
                var pessoas = resp.data 

                var profissoes = pessoas.map(p => p.profissao)

                var profissoesContadas = profissoes.reduce((acc, profissao) => {
                    if(profissao in acc){
                        acc[profissao]++
                    }else{
                        acc[profissao] = 1
                    }
                    return acc
                }, {})

                var profissoesOrdenadas = Object.keys(profissoesContadas).sort((a,b) => profissoesContadas[b] - profissoesContadas[a])

                let top10Profissoes = profissoesOrdenadas.slice(0,10)

                let top10ProfissoesContadas = top10Profissoes.map(profissao => {
                    return {
                        profissao: profissao,
                        quantidade: profissoesContadas[profissao]
                    }
                })

                //console.log(top10Profissoes)
                //console.log(top10ProfissoesContadas)

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.top10Profissoes(top10ProfissoesContadas));
            })
            .catch(erro => {
                // sintaxe alternativa de funcoes em JS
                console.log("Erro: " + erro)
                // tambem queremos que o cliente veja o erro: nao so na consola
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })

    }else if(dicURL.pathname.startsWith("/profissao/")) {
        var profissao = dicURL.pathname.substring(11); // valor depois de "pessoas/"
        console.log("Profissao: " + profissao)
        axios.get(`http://localhost:3000/pessoas?profissao=${profissao}&_sort=nome&order=asc`)
            .then(function (resp) {
                
                var pessoas = resp.data // para ter só os dados
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas,"Pessoas com profissão: " + decodeURIComponent(profissao))); // o conteudo da pagina é criado no mypages
            })
            .catch(erro => {
                // sintaxe alternativa de funcoes em JS
                console.log("Erro: " + erro)
                // tambem queremos que o cliente veja o erro: nao so na consola
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: " + erro)
            })
    }else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("ERRO: operação não suportada")
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777....")