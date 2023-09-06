const express = require('express');
const { readTalkersData } = require('./utils/fsUtils');
const { userInfoValidation } = require('./utils/userValidationFunctions');
const { createRandomToken, tokenValidation } = require('./utils/tokenFunctions');
const { talkerValidation } = require('./utils/talkerValidationFunctions');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CREATED_STATUS = 201;

const DESIRED_TOKEN_LENGTH = 16;

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

// requisitos 3 e 4
app.post('/login', (req, res) => {
  const userLoginInfo = { ...req.body };
  const { email, password } = userLoginInfo;
  const validationResponse = userInfoValidation(email, password);

  if (validationResponse) { 
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: validationResponse,
    });
  }

  const token = createRandomToken(DESIRED_TOKEN_LENGTH);
  res.status(HTTP_OK_STATUS).json({ token });
});

function validationResponseManager(res, status, message) {
    return res.status(status).json({
      message,
    });
  }

// requisito 5
app.post('/talker', (req, res) => {
  const token = req.headers.authorization;
  const tokenValidationResponse = tokenValidation(token, DESIRED_TOKEN_LENGTH);

  if (tokenValidationResponse) {
    return validationResponseManager(res, HTTP_UNAUTHORIZED_STATUS, tokenValidationResponse);
  }

  const newTalkerInfo = { ...req.body };
  const talkerValidationResponse = talkerValidation(newTalkerInfo);

  if (talkerValidationResponse) {
    return validationResponseManager(res, HTTP_BAD_REQUEST_STATUS, talkerValidationResponse);
  }

  res.status(HTTP_CREATED_STATUS).json({ newTalkerInfo });
});