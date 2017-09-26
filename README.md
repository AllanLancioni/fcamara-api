# FcamaraTestAPI

## Requisitos para rodar o projeto
Node.js e NPM instalados na máquina
  
## Rodando o projeto

No terminal, na pasta do projeto, rode o comando
  _npm i_
para instalar todas as dependencias, após finalizado, entre com
  _node server_
e o projeto já estará disponível na url *http://localhost:8080/*.

## Estrutura

A API construda com Express conta com:
- banco de dados na nuvem (mongodb - mlab)
- roteamento com verbos http padronizados
- crud de produtos (e de usuários, apesar de não ser utilizado pelo front)
- login/registro de usuario com JWT
- middleware de token de autenticação
- retorno de mensagem de erro + status em caso de falhas
- um middleware fazendo verificação dos JWT do login
- código feito em TypeScript e features do EcmaScript6
- material design
- estilização (básica) com SCSS
- seed para os bancos bancos de dados

## Rodando o seed

É possível rodar da raiz do projeto com o comando *npm run seed-user* ou *npm run seed-products*, é um seed básico, via scripts, no User existe uma simulação de um arquivo JSON e no ede products, algo mais padronizado, gerado via programação
