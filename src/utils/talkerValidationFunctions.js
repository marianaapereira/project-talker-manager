const MINIMUN_NAME_LENGTH = 3;

function nameValidation(name) {
  if (!name || name === '') return 'O campo "name" é obrigatório';

  if (name.length < MINIMUN_NAME_LENGTH) return 'O "name" deve ter pelo menos 3 caracteres';
}

function numberIsInt(number) {
  return (typeof (number) === 'number') && (number === Math.floor(number));
}

function ageValidation(age) {
  if (!age || age === '') return 'O campo "age" é obrigatório';

  if (!numberIsInt(age) || age < 18) {
    return 'O campo "age" deve ser um número inteiro igual ou maior que 18';
  }
}

function talkValidation(talk) {
  if (!talk) return 'O campo "talk" é obrigatório';
}

function talkerValidation({ name, age, talk }) {
  const nameErrorMessage = nameValidation(name);
  if (nameErrorMessage) return nameErrorMessage;

  const ageErrorMessage = ageValidation(age);
  if (ageErrorMessage) return ageErrorMessage;

  talkValidation(talk);
}

module.exports = {
  talkerValidation,
};