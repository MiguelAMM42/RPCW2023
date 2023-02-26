import os
from divideXML import desmembrarXML
import bs4 as bs


def criarIndex(numElems):
    pagWeb = """ 
    <!DOCTYPE html>
    <html>
        <head>
            <title>Arqueosítios</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Arqueosítios</h1>
            <h2>Índice</h3>
            <a name="indice"/>
            <!-- Lista com o índice (por ordem alfabetica) -->
            <ul>
    """


    for i in range(1, numElems+1):
        pagWeb += f"""
            <li>
                <a href="{i}">Arqueosítio {i}</a>
            </li>
        """

    pagWeb += """
    </ul>
    </body>
    </html>
    """

    output_html = open(f'../out/html/index.html', 'w')
    output_html.write(pagWeb)
    output_html.close()

def criarPaginas(numElems):
    for i in range(1, numElems+1):

        xml = open(f'../out/xml/arq{i}.xml', 'r')
        lxml = 'lxml-xml'
        encoding = 'utf-8'
        soup = bs.BeautifulSoup(xml, lxml, from_encoding=encoding)

        if soup.find('IDENTI') is not None:
            identi = soup.find('IDENTI').text
        else:
            identi = "N/A"
        if soup.find('LUGAR') is not None:
            lugar = soup.find('LUGAR').text
        else:
            lugar = "N/A"
        if soup.find('FREGUE') is not None:
            fregue = soup.find('FREGUE').text
        else:
            fregue = "N/A"
        if soup.find('CONCEL') is not None:
            concel = soup.find('CONCEL').text
        else:
            concel = "N/A"
        if soup.find('CODADM') is not None:
            codadm = soup.find('CODADM').text
        else:
            codadm = "N/A"
        if soup.find('LATITU') is not None:
            latitu = soup.find('LATITU').text
        else:
            latitu = "N/A"
        if soup.find('LONGIT') is not None:
            longit = soup.find('LONGIT').text
        else:
            longit = "N/A"
        if soup.find('ALTITU') is not None:
            altitu = soup.find('ALTITU').text
        else:
            altitu = "N/A"

        pagWeb = f""" 
        <!DOCTYPE html>
        <html>
            <head>
                <title>Arqueosítio {i}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Arqueosítio {i}</h1>
                <h2>{identi}</h2>
                <ul>
                    <li><b>Lugar:</b> {lugar}</li>
                    <li><b>Freguesia:</b> {fregue}</li>
                    <li><b>Concelho:</b> {concel}</li>
                    <li><b>Código administrativo:</b> {codadm}</li>
                    <li><b>Latitude:</b> {latitu}</li>
                    <li><b>Longitude:</b> {longit}</li>
                    <li><b>Altitude:</b> {altitu}</li>
                </ul>
                
        """

        

        pagWeb += """
        </body>
        </html>
        """

        output_html = open(f'../out/html/arq{i}.html', 'w')
        output_html.write(pagWeb)
        output_html.close()




if __name__ == '__main__':
    xml = open('../data/arq.xml', 'r')
    numElems = desmembrarXML(xml)
    criarIndex(numElems)
    criarPaginas(numElems)

"""
<TIPO ASSUNTO="arqueossitio"/>
<IDENTI> Bouro </IDENTI>
<DESCRI> Castelo </DESCRI>
<CRONO> Idade Média </CRONO>
<LUGAR> Piorneiro </LUGAR>
<FREGUE> Monte (Santa Isabel) </FREGUE>
<CONCEL> Terras de Bouro </CONCEL>
<LATITU> 527,7 </LATITU>
<LONGIT> 191,4 </LONGIT>
<ALTITU> 992m </ALTITU>
<ACESSO>
No cume do Piorneiro ou de Crasto, cerca de 1 km para Norte da aldeia de Seara. O acesso ao sítio do castelo é difícil e faz-se a pé (cerca de 30 minutos), por caminho carreteiro e de pé posto que parte da aldeia de Seara para Norte em direcção à elevação de Crasto ou de Piorneiro. À aldeia de Seara chega-se por estradão municipal parcialmente alcatroado, a partir das aldeias de Rebordochão e Campos Abades, estas servidas pela estrada municipal que liga à sede do concelho de Terras de Bouro. O monumento não está sinalizado.
</ACESSO>
<DESARQ>
Amplamente referenciado nas Inquirições de 1220 e de 1258, em relação ao qual praticamente todas as freguesias das cercanias tinham pesadas obrigações e encargos, o castelo de Bouro foi durante toda a Idade Média um ponto estratégico de defesa do acesso ao vale alto do rio Homem. Com a Portela da Amarela e a Portela do Homem, o castelo de Bouro constituia um triângulo de vigilância e defesa da importante via de comunicação de origem romana que penetrava no interior galego, a célebre "Jeira", a via XVIII do Itinerário de Antonino que se manteve em uso até bem entrada a Época Moderna. O castelo, uma construção elementar, aparentemente estruturada à base de madeira, que tinha que ser refeita praticamente todos os anos, foi erguido no topo do monte onde se aglomera um denso caos de blocos, a mais de 950 metros de altitude, numa implantação que, podendo considerar-se paisagisticamente espectacular, terá obedecido sobretudo a interesses geo-estratégicos. Daí se domina todo o curso do rio Homem, em particular o seu troço alto e a ligação natural ao vale do rio Cávado pelo talvegue Covide / Rio Caldo. A fortificação, de que apenas restam alguns panos muito derrubados da
<LIGA TERMO="cerca"> cerca </LIGA>
que fechava os espaços entre os enormes blocos graníticos, deverá datar de finais do século XII e princípios do século XIII. Terá conhecido uma ocupação recorrente mas não permanente, servindo sobretudo em períodos de conflito. Pelas tipologia construtiva e de implantação fisiográfica, trata-se de um característico castelo dos primórdios da nacionalidade, igual a tantos outros que então se ergueram no Entre Douro-e-Minho no cume dos montes mais proeminentes. Com os desenvolvimentos modernos da arte da guerra, nomeadamente a difusão do uso da artilharia a partir do século XVI, o castelo de Bouro deixou de ter qualquer importância militar, devendo datar desse período o seu abandono. Do ponto de vista arqueológico o monumento está mal conservado.
</DESARQ>
<INTERP> Castelo medieval. </INTERP>
<INTERE>
Apesar do inegável significado histórico regional e mesmo nacional do castelo de Bouro, do monumento praticamente nada resta e o sítio, embora beneficie de um excelente enquadramento paisagístico, oferece vestígios muito escassos, de difícil percepção.
</INTERE>
<BIBLIO>
ALMEIDA, C.A.F.(1978b). Castelologia Medieval de Entre Douro e Minho, Prova Complementar da Tese de Doutoramento (policopiado), Faculdade de Letras da Universidade do Porto, Porto,1978.
</BIBLIO>
<BIBLIO>
CUNHA, A.R.(1975). "Trepando aos montes", O Distrito de Braga , 2ª série, I, Braga, 1975, pp.513-514.
</BIBLIO>
<AUTOR> Luis Fontes </AUTOR>
<DATA> 04-FEV-1998 </DATA>

"""
