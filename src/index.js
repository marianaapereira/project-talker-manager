const express = require('express');
const { readTalkersData } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

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
    const talkerArray = await readTalkersData();
    return res.status(HTTP_OK_STATUS).json(talkerArray);
  } catch (error) {
    console.error(`Não há pessoas palestrantes cadastradas! Mensagem de erro: ${error}`);
    return res.status(HTTP_OK_STATUS).json([]);
  }
});

// requisito 2
app.get('/talker/:id', async (req, res) => {
  try {
    const talkerArray = await readTalkersData();
    const { id } = req.params;
    const requiredTalker = talkerArray.find((talker) => talker.id === Number(id));

    if (!requiredTalker) {
      return res.status(HTTP_NOT_FOUND_STATUS).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }

    return res.status(HTTP_OK_STATUS).json(requiredTalker);
  } catch (error) {
    console.error(`Pessoa palestrante não encontrada! Mensagem de erro: ${error}`);
  }
});