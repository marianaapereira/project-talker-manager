const MINIMUN_NAME_LENGTH = 3;

function nameValidation(name) {
  if (!name || name === '') return 'O campo "name" é obrigatório';

  if (name.length < MINIMUN_NAME_LENGTH) return 'O "name" deve ter pelo menos 3 caracteres';
}

function ageValidation(age) {
  if (!age || age === '') return 'O campo "age" é obrigatório';

  if (typeof (age) !== 'number' || age < 18) {
    return 'O campo "age" deve ser um número inteiro igual ou maior que 18';
  }
}

function talkValidation(talk) {
  if (!talk) return 'O campo "talk" é obrigatório';
}

function talkerValidation(talker) {
  const { name, age, talk } = talker;

  nameValidation(name);
  ageValidation(age);
  talkValidation(talk);
}

module.exports = {
  talkerValidation,
};