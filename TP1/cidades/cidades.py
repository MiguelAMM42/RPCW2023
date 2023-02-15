import json
import os

def ordCidade(c):
    return c['nome']

def ordOrigem(c):
    return c['origem']

def ordNomeDestino(c):
    return c['nomeDestino']


f = open("cidades/data/mapa.json")
data = json.load(f)
cidades = data['cidades']

cidadesNome = {}
for c in cidades:
    cidadesNome[c['id']] = c['nome']

cidades.sort(key=ordCidade)


ligacoesData = data['ligações']
ligacoesDataExtended = []

numLigacoes = len(ligacoesData)
numLigacoes += 1

# repetir ligações para o sentido contrário
for l in ligacoesData:
    base = l.copy()
    base['nomeDestino'] = cidadesNome[l['destino']]
    ligacoesDataExtended.append(base)
    
    sentContrario = {}
    id = "l" + str(numLigacoes) + "-" + l['destino'] + "-" + l['origem']
    numLigacoes += 1
    sentContrario['id'] = id
    sentContrario['origem'] = l['destino']
    sentContrario['destino'] = l['origem']
    sentContrario['distância'] = l['distância']
    sentContrario['nomeDestino'] = cidadesNome[l['origem']]
    ligacoesDataExtended.append(sentContrario)


# ordenar alfabeticamente o código da origem
# para uma mesma cidade ter todas as suas ligações seguidas
ligacoesDataExtended.sort(key=ordOrigem)


# dicionário com código de origem a ser key 
# ligaçoes a serem value
ligacoes = {}
codigo = ligacoesDataExtended[0]['origem']
ligacoes[codigo] = []
for l in ligacoesDataExtended:
    if l['origem'] == codigo:
        ligacoes[codigo].append(l)
    else:
        codigo = l['origem']
        ligacoes[codigo] = []
        ligacoes[codigo].append(l)

# ordenar alfabeticamente o nome do Destino
# para a lista das ligações aparecer ordenada
for ligs in ligacoes:
    ligacoes[ligs].sort(key=ordNomeDestino)


pagWeb = """ 
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8">
    </head>
    <body>
        <!-- Tabela com uma linha e 2 colunas -->
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com o índice (por ordem alfabetica) -->
                    <ul>
"""


for c in cidades:
    pagWeb += f"""
        <li>
            <a href="#{c['id']}">{c['nome']}</a>
        </li>
    """

pagWeb += """
</ul>

                </td>
                <td width="70%">
"""

for c in cidades:
    pagWeb += f"""
                    <a name="{c['id']}"/>
                    <h3>{c['nome']}</h3>
                    <p><b>População:</b> {c['população']}</p>
                    <p><b>Descrição:</b> {c['descrição']}</p>
                    <p><b>Distrito:</b> {c['distrito']}</p>
                    <p><b>Ligações:</b>
                    <ul>
                """


    for lig in ligacoes[c['id']]:
        pagWeb += f"""
            <li>
                <a href="#{lig['destino']}">{lig['nomeDestino']}</a> : {lig['distância']} Km
            </li>
        """



    pagWeb += f"""
                    </ul>
                    <adress>[<a href="#indice">Voltar ao índice</a>]</adress>
                    <center>
                        <hr width="80%">
                    </center>
    """

pagWeb += """   
                </td>
            </tr>
        </table>
        
    </body>
</html>
"""
                    



file = open("cidades/cidades.html", "w")
file.write(pagWeb)
file.close()





