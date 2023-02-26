var http = require('http');
var fs = require('fs');


var myserver = http.createServer(function (req, res) {
    // na posicao 1 até 2(exluindo)
    var numPag = req.url.substring(1,req.url.length);
    console.log("req.url = " + req.url);
    console.log("numPag = " + numPag);

    // so quando o readFile terminar é que vai chamar a função callback
    // leitura com sucesso: erro = null, data = conteúdo do ficheiro
    fs.readFile('../out/xml/arq' + numPag + '.xml', function(err, data) {
        res.writeHead(200, { "Content-Type": "text/xml; charset=utf-8" });
        if (err)
            res.write("Erro: " + err);
        else
            res.write(data);
        res.end();
    })
})

myserver.listen(7777); // porta 7777 onde o servidor vai escutar

console.log('Servidor à escuta na porta 7777...');