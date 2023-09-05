const express = require('express');
const { readTalkersData } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
//

// requisito 1
app.get('/talker', async (req, res) => {
  try {
    const talker = await readTalkersData();
    return res.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    console.error(`Não há pessoas palestrantes cadastradas! Mensagem de erro: ${error}`);
    return res.status(HTTP_OK_STATUS).json([]);
  }
});