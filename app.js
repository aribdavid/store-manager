const express = require('express');
const routers = require('./routers');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routers.product);
app.use('/sales', routers.sale);

app.use((error, _req, response, _next) => {
  if (!error.status) {
    console.log('Error: ', error.message);
    return response.status(500).json({ message: 'Internal server erroror' });
  }
  return response.status(error.status).json({ message: error.message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
