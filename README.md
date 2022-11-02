# Sobre o Projeto
Neste projeto foi desenvolvida uma API e um banco de dados para a produção de conteúdo para um blog!

A aplicação é feita em Node.js usando o pacote sequelize para fazer a manipulação das tabelas do banco de dados.

O projeto foi desenvolvido utilizando as camadas Models, Services e Controllers(MSC).

Os endpoints conectados ao banco de dados seguem os princípios do REST.

Para fazer um post é necessário usuário e login, que são autenticados utilizando o JWT(JSON Web Token).

# Rodando o Projeto

### Requisitos:
- Node.js 16
- Docker
- Docker Compose

Depois de clonar o repositório instale as dependências do npm com o comando:
```
npm install
```
Inicie o docker utilizando o comando:
```
docker-compose up -d --build
```
Crie o banco de dados com o comando:
```
docker exec -it blogs_api npm run prestart
```
Popule o banco de dados utilizando o comando:
```
docker exec -it blogs_api npm run seed
```
E por fim, inicie o servidor back-end com o comando:
```
docker exec -it blogs_api npm start
```
