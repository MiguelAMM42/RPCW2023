exports.pessoasPage = function(lista, title){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="../w3.css"> 
            <title>${title}</title>
        </head>
        <body>
            <div class="w3-card-4">

            <header class="w3-container w3-blue">
            <h1>${title}</h1>
            </header>
            
            <div class="w3-container">
            <table class="w3-table-all">
            <!-- Table header -->
            <tr>
                <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
            </tr>
    
         `

    for(let i=0; i<lista.length; i++) {
        pagHTML += `
        <!-- Table data -->
        <tr onclick="location.href='/pessoas/${lista[i].id}';">
            <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td><td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
        </tr>
        

        `
    }


    pagHTML += 
    `
            </table>
            </div>
            
            <footer class="w3-container w3-blue">
            <h5>Generated in RPCW2023</h5>
            </footer>
            
            </div> 
        </body>
    </html>
    `

    return pagHTML //returns a string: HTML page
}


exports.indexPage = function(){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="../w3.css"> 
            <title>Consulta de dados</title>
        </head>
        <body>

            <header class="w3-container w3-blue">
            <h1>Sistema de consulta de dados</h1>
            </header>
            
            <div class="w3-container">

                <p>O sistema permite consultar dados de uma amostra de 16000 pessoas.</p>
                <p>Os dados podem ser consultados de acordo com as seguintes distribuições:</p>

                <a href="/pessoas" target="_parent" style="text-decoration: none;margin: 1em"><button class="w3-button w3-block w3-round-large w3-blue">Listar todas as pessoas</button></a>
                <a href="/sexo" target="_parent" style="text-decoration: none;margin: 1em"><button class="w3-button w3-block w3-round-large w3-blue">Distribuição por sexo</button></a>
                <a href="/desporto" target="_parent" style="text-decoration: none;margin: 1em"><button class="w3-button w3-block w3-round-large w3-blue">Distribuição por desporto</button></a>
                <a href="/top10profissoes" target="_parent" style="text-decoration: none;margin: 1em"><button class="w3-button w3-block w3-round-large w3-blue">Top 10 profissões</button></a>

            </div>
            
            <!-- <footer class="w3-container w3-blue">
            <h5>Generated in RPCW2023</h5>
            </footer> -->
            
        </body>
    </html>
    `

    return pagHTML //returns a string: HTML page
}


exports.sexoPage = function(distribuicaoSexo){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="../w3.css"> 
            <title>Distribuição por sexo</title>
        </head>
        <body>

            <header class="w3-container w3-blue">
            <h1>Distribuição por sexo</h1>
            </header>
            
            <div class="w3-container">

                <div class="w3-card-4">
                    <div class="w3-container w3-margin">
                        <h2>Sexo masculino</h2>
                        <p>Quantidade de pessoas com sexo masculino: <b>${distribuicaoSexo.masculino}</b></p>
                        <a href="/sexo/masculino" target="_parent" style="text-decoration: none;margin: 1em"><button class="w3-button w3-block w3-round-large w3-blue">Listar pessoas do sexo masculino</button></a>
                    </div>
                </div>

                <div class="w3-card-4">
                    <div class="w3-container w3-margin">
                        <h2>Sexo feminino</h2>
                        <p>Quantidade de pessoas com sexo feminino: <b>${distribuicaoSexo.feminino}</b></p>
                        <a href="/sexo/feminino" target="_parent" style="text-decoration: none;margin: 1em"><button class="w3-button w3-block w3-round-large w3-blue">Listar pessoas do sexo feminino</button></a>
                    </div>
                </div>

                <div class="w3-card-4">
                    <div class="w3-container w3-margin">
                        <h2>Outro sexo</h2>
                        <p>Quantidade de pessoas com outro sexo: <b>${distribuicaoSexo.outro}</b></p>
                        <a href="/sexo/outro" target="_parent" style="text-decoration: none;margin: 1em"><button class="w3-button w3-block w3-round-large w3-blue">Listar pessoas com outro sexo</button></a>
                    </div>
                </div>

            </div>
            
            <!-- <footer class="w3-container w3-blue">
            <h5>Generated in RPCW2023</h5>
            </footer> -->
            
        </body>
    </html>
    `

    return pagHTML //returns a string: HTML page
}


exports.pessoaPage = function(pessoa){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="../w3.css"> 
            <title>${pessoa.nome}</title>
        </head>
        <body>

            <header class="w3-container w3-blue">
            <h1>${pessoa.nome}</h1>
            </header>
            
            <div class="w3-container">

                <div class="w3-card-4">
                    <div class="w3-container w3-margin">
                        <h2>Identificação</h2>
                        <p>Id: <b>${pessoa.id}</b></p>
                        <p>Nome: <b>${pessoa.nome}</b></p>
                        <p>Idade: <b>${pessoa.idade}</b></p>
                        <p>Sexo: <b>${pessoa.sexo}</b></p>
                    </div>
                </div>

                <div class="w3-card-4">
                    <div class="w3-container w3-margin">
                        <h2>Morada</h2>
                        <p>Cidade: <b>${pessoa.morada.cidade}</b></p>
                        <p>Distrito: <b>${pessoa.morada.distrito}</b></p>
                    </div>
                </div>

                <div class="w3-card-4">
                    <div class="w3-container w3-margin">
                        <h2>Profissão</h2>
                        <p>Profissão: <b>${pessoa.profissao}</b></p>
                    </div>
                </div>

                <div class="w3-card-4">
                    <div class="w3-container w3-margin">
                        <h2>Desportos</h2>
                        
                    </div>
                </div>

            </div>
            
            <!-- <footer class="w3-container w3-blue">
            <h5>Generated in RPCW2023</h5>
            </footer> -->
            
        </body>
    </html>
    `

    return pagHTML 
}


exports.top10Profissoes = function(top10Profissoes){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="../w3.css"> 
            <title>Top 10 profissões</title>
        </head>
        <body>

            <header class="w3-container w3-blue">
            <h1>Top 10 profissões</h1>
            </header>
            
            <div class="w3-container">

                <div class="w3-card-4">
                    <div class="w3-container w3-margin">
                        <h2>Top 10 profissões</h2>
                        <p>1º lugar) <a href="/profissao/${top10Profissoes[0].profissao}" target="_parent" style="text-decoration: none;margin: 1em"><b>${top10Profissoes[0].profissao}</b> com <b>${top10Profissoes[0].quantidade}</b> pessoas</a></p>
                        <p>2º lugar) <a href="/profissao/${top10Profissoes[1].profissao}" target="_parent" style="text-decoration: none;margin: 1em"><b>${top10Profissoes[1].profissao}</b> com <b>${top10Profissoes[1].quantidade}</b> pessoas</a></p>
                        <p>3º lugar) <a href="/profissao/${top10Profissoes[2].profissao}" target="_parent" style="text-decoration: none;margin: 1em"><b>${top10Profissoes[2].profissao}</b> com <b>${top10Profissoes[2].quantidade}</b> pessoas</a></p>
                        <p>4º lugar) <a href="/profissao/${top10Profissoes[3].profissao}" target="_parent" style="text-decoration: none;margin: 1em"><b>${top10Profissoes[3].profissao}</b> com <b>${top10Profissoes[3].quantidade}</b> pessoas</a></p>
                        <p>5º lugar) <a href="/profissao/${top10Profissoes[4].profissao}" target="_parent" style="text-decoration: none;margin: 1em"><b>${top10Profissoes[4].profissao}</b> com <b>${top10Profissoes[4].quantidade}</b> pessoas</a></p>
                        <p>6º lugar) <a href="/profissao/${top10Profissoes[5].profissao}" target="_parent" style="text-decoration: none;margin: 1em"><b>${top10Profissoes[5].profissao}</b> com <b>${top10Profissoes[5].quantidade}</b> pessoas</a></p>
                        <p>7º lugar) <a href="/profissao/${top10Profissoes[6].profissao}" target="_parent" style="text-decoration: none;margin: 1em"><b>${top10Profissoes[6].profissao}</b> com <b>${top10Profissoes[6].quantidade}</b> pessoas</a></p>
                        <p>8º lugar) <a href="/profissao/${top10Profissoes[7].profissao}" target="_parent" style="text-decoration: none;margin: 1em"><b>${top10Profissoes[7].profissao}</b> com <b>${top10Profissoes[7].quantidade}</b> pessoas</a></p>
                        <p>9º lugar) <a href="/profissao/${top10Profissoes[8].profissao}" target="_parent" style="text-decoration: none;margin: 1em"><b>${top10Profissoes[8].profissao}</b> com <b>${top10Profissoes[8].quantidade}</b> pessoas</a></p>
                        <p>10º lugar) <a href="/profissao/${top10Profissoes[9].profissao}" target="_parent" style="text-decoration: none;margin: 1em"><b>${top10Profissoes[9].profissao}</b> com <b>${top10Profissoes[9].quantidade}</b> pessoas</a></p>
                    </div>
                </div>

            </div>
            
            <!-- <footer class="w3-container w3-blue">
            <h5>Generated in RPCW2023</h5>
            </footer> -->
            
        </body>
    </html>
    `

    return pagHTML 
}