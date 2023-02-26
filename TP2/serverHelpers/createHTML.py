import os
from divideXML import desmembrarXML


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
        pagWeb = f""" 
        <!DOCTYPE html>
        <html>
            <head>
                <title>Arqueosítio {i}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Arqueosítio {i}</h1>
                
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





