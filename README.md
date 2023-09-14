# UFJ newsletter
Projeto final para a materia de docker na UFJ


**Alunos**: Gabriel Souza e Yago de Matos

### Tecnologias usadas:
Gateway:
- Node.js
- Express
- HTML, CSS
  
App (API):
- Node.js
- Fastify

DB:
- MySQL


#### Network
- O Gateway esta isolado do DB, por estarem em networks diferentes. 
- Somente o App participa de ambas networks o que permite que se comunique com o Gateway e o DB.

### Executando o projeto
```bash
docker compose up -d
```

### Acessar 
Para cadastrar usuario e email:
http://localhost:8000/


Para enviar uma mensagem (password: root):
http://localhost:8000/newsletter
