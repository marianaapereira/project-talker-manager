const express = require('express');
const { readTalkersData } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST_STATUS = 400;
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

// requisito 3
function createRandomToken(tokenLength) {
  const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < tokenLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    token += allowedChars.charAt(randomIndex);
  }

  return token;
}

// requisito 4
function validateEmail(email) {
  if (!email || email === '') return 'O campo "email" é obrigatório';

  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const emailIsValid = regexEmail.test(email);

  if (!emailIsValid) return 'O "email" deve ter o formato "email@email.com"';
}

function validatePassword(password) {
  if (!password || password === '') return 'O campo "password" é obrigatório';
  
  if (password.length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
}

function userInfoValidation(email, password) {
  const emailErrorMessage = validateEmail(email);
  if (emailErrorMessage) return emailErrorMessage;

  const passwordErrorMessage = validatePassword(password);
  if (passwordErrorMessage) return passwordErrorMessage;
}
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