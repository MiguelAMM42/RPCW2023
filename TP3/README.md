# TPC 3 

## Comandos

- Comandos utilizados para criar uma REST API com JSON Server das informações do dataset `joined-dataset.json`, gerando-se primeiramente as dependências necessárias para o projeto:

```properties
npm init
```  

```properties
npm i axios --save
```  

```properties
npm i json-server --save
```  

```properties
json-server --watch joinedDataset/joined-dataset.json
```  

- O *dataset* foi concebido juntando as 16000 entradas dos 4 *datasets* presentes na diretoria `/datasets`.
