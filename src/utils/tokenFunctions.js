function createRandomToken(tokenLength) {
  const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < tokenLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    token += allowedChars.charAt(randomIndex);
  }

  return token;
}

function tokenValidation(token, length) {
  if (!token || token === '') return 'Token não encontrado';

  if (token.length !== length || typeof (token) !== 'string') return 'Token inválido';
}

module.exports = {
  createRandomToken,
  tokenValidation,
};