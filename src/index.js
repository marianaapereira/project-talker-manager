const express = require('express');
const { readTalkersData, registerNewTalker } = require('./utils/fsUtils');
const { userInfoValidation } = require('./utils/userValidationFunctions');
const { createRandomToken, tokenValidation } = require('./utils/tokenFunctions');
const { talkerValidation, findTalkerById } = require('./utils/talkerFunctions');

const app = express();
app.use(express.json());

const {
  HTTP_OK_STATUS, HTTP_CREATED_STATUS, HTTP_BAD_REQUEST_STATUS, HTTP_UNAUTHORIZED_STATUS, HTTP_NOT_FOUND_STATUS, 
} = require('./data/http-status-codes');

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
    const requiredTalker = findTalkerById(talkerArray, id);

    return res.status(HTTP_OK_STATUS).json(requiredTalker);
  } catch ({ message }) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message });
  }
});

// requisitos 3 e 4
app.post('/login', (req, res) => {
  try {
    const { email, password } = { ...req.body };
    userInfoValidation(email, password);
  
    const token = createRandomToken(DESIRED_TOKEN_LENGTH);
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch ({ message }) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message });
  }
});

// requisito 5 novo

function validateToken(token, res) {
  try {
    tokenValidation(token);
  } catch ({ message }) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message });
  }
}

app.post('/talker', async (req, res) => {
  try {
    validateToken(req.headers.authorization, res);

    const newTalker = { ...req.body };
    talkerValidation(newTalker);
  
    const addedTalker = await registerNewTalker(newTalker);
    return res.status(HTTP_CREATED_STATUS).json(addedTalker);
  } catch ({ message }) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message });
  }
});

// requisito 5 antigo

// function validationResponseManager(res, status, message) {
//   return res.status(status).json({
//     message,
//   });
// }

// app.post('/talker', async (req, res) => {
//   const token = req.headers.authorization;
//   const tokenValidationResponse = tokenValidation(token, DESIRED_TOKEN_LENGTH);

//   if (tokenValidationResponse) {
//     return validationResponseManager(res, HTTP_UNAUTHORIZED_STATUS, tokenValidationResponse);
//   }

//   const newTalkerInfo = { ...req.body };
//   const talkerValidationResponse = talkerValidation(newTalkerInfo);

//   if (talkerValidationResponse) {
//     return validationResponseManager(res, HTTP_BAD_REQUEST_STATUS, talkerValidationResponse);
//   }

//   const addedTalker = await registerNewTalker(newTalkerInfo);
//   res.status(HTTP_CREATED_STATUS).json(addedTalker);
// });