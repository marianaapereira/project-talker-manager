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

module.exports = {
  userInfoValidation,
};