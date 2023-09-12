function validateEmail(email) {
  if (!email || email === '') throw new Error('O campo "email" é obrigatório');

  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const emailIsValid = regexEmail.test(email);

  if (!emailIsValid) throw new Error('O "email" deve ter o formato "email@email.com"');
}

function validatePassword(password) {
  if (!password || password === '') throw new Error('O campo "password" é obrigatório');
  
  if (password.length < 6) throw new Error('O "password" deve ter pelo menos 6 caracteres');
}

function userInfoValidation(email, password) {
  validateEmail(email);
  validatePassword(password);
}

module.exports = {
  userInfoValidation,
};