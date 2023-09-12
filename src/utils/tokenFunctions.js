const DESIRED_TOKEN_LENGTH = 16;

function createRandomToken() {
  const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < DESIRED_TOKEN_LENGTH; i += 1) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    token += allowedChars.charAt(randomIndex);
  }

  return token;
}

function tokenValidation(token) {
  if (!token || token === '') throw new Error('Token não encontrado');

  if (token.length !== DESIRED_TOKEN_LENGTH || typeof (token) !== 'string') { 
    throw new Error('Token inválido'); 
}
}

module.exports = {
  createRandomToken,
  tokenValidation,
};