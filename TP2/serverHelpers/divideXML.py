import bs4 as bs

def desmembrarXML(xml):
    lxml = 'lxml-xml'
    encoding = 'utf-8'
    soup = bs.BeautifulSoup(xml, lxml, from_encoding=encoding)
    arqelems = soup.find_all('ARQELEM')
    numelems = 1
    for arqelem in arqelems:
        elemXML = bs.BeautifulSoup("", "lxml-xml")
        elemXML.append(arqelem)
        output_xml = open(f'../out/xml/arq{numelems}.xml', 'w')
        output_xml.write('<?xml version="1.0" encoding="utf-8"?>\n')
        output_xml.write(arqelem.prettify())
        numelems += 1
    print("Número de elementos: ", numelems-1)
    return numelems-1


if __name__ == '__main__':
    xml = open('../data/arq.xml', 'r')
    desmembrarXML(xml)


