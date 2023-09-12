// const

const MINIMUN_NAME_LENGTH = 3;

// general

function findTalkerById(talkerArray, talkerId) {
  return talkerArray.find((talker) => talker.id === Number(talkerId));
}

// validations

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

function dateIsValid(date) {
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
  const dateValidation = regexDate.test(date);

  return dateValidation;
}

function watchedAtValidation(watchedAt) {
  if (!watchedAt || watchedAt === '') return 'O campo "watchedAt" é obrigatório';

  if (!dateIsValid(watchedAt)) return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
}

function checkNumberRange(number, min, max) {
  return ((number >= min) && (number <= max));
}

function rateValidation(rate) {
  if (rate === undefined || rate === null) return 'O campo "rate" é obrigatório';

  const rateIsInt = numberIsInt(rate);
  const rateIsInCorrectRange = checkNumberRange(rate, 1, 5);

  if (!rateIsInt || !rateIsInCorrectRange) {
    return 'O campo "rate" deve ser um número inteiro entre 1 e 5';
  }
}

function talkValidation(talk) {
  if (!talk) return 'O campo "talk" é obrigatório';

  const { watchedAt, rate } = talk;

  const watchedAtErrorMessage = watchedAtValidation(watchedAt);
  if (watchedAtErrorMessage) return watchedAtErrorMessage;
  
  const rateErrorMessage = rateValidation(rate);
  if (rateErrorMessage) return rateErrorMessage; 
}

function talkerValidation({ name, age, talk }) {
  const nameErrorMessage = nameValidation(name);
  if (nameErrorMessage) return nameErrorMessage;

  const ageErrorMessage = ageValidation(age);
  if (ageErrorMessage) return ageErrorMessage;

  const talkErrorMessage = talkValidation(talk);
  if (talkErrorMessage) return talkErrorMessage;
}

module.exports = {
  findTalkerById,
  talkerValidation,
};