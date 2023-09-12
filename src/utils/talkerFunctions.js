const { numberIsInt, dateIsValid, checkNumberRange } = require('./generalFunctions');

// const

const MINIMUN_NAME_LENGTH = 3;

// general

function findTalkerById(talkerArray, talkerId) {
  const requiredTalker = talkerArray.find((talker) => talker.id === Number(talkerId));

  if (!requiredTalker) throw new Error('Pessoa palestrante não encontrada');

  return requiredTalker;
}

// validations

function nameValidation(name) {
  if (!name || name === '') throw new Error('O campo "name" é obrigatório');

  if (name.length < MINIMUN_NAME_LENGTH) { 
    throw new Error('O "name" deve ter pelo menos 3 caracteres'); 
  }
}

function ageValidation(age) {
  if (!age || age === '') throw new Error('O campo "age" é obrigatório');

  if (!numberIsInt(age) || age < 18) {
    throw new Error('O campo "age" deve ser um número inteiro igual ou maior que 18');
  }
}

function watchedAtValidation(watchedAt) {
  if (!watchedAt || watchedAt === '') throw new Error('O campo "watchedAt" é obrigatório');

  if (!dateIsValid(watchedAt)) {
     throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'); 
  }
}

function rateValidation(rate) {
  if (rate === undefined || rate === null) throw new Error('O campo "rate" é obrigatório');

  const rateIsInt = numberIsInt(rate);
  const rateIsInCorrectRange = checkNumberRange(rate, 1, 5);

  if (!rateIsInt || !rateIsInCorrectRange) {
    throw new Error('O campo "rate" deve ser um número inteiro entre 1 e 5');
  }
}

function talkValidation(talk) {
  if (!talk) throw new Error('O campo "talk" é obrigatório');

  const { watchedAt, rate } = talk;

  watchedAtValidation(watchedAt);
  rateValidation(rate);
}

function talkerValidation({ name, age, talk }) {
  nameValidation(name);
  ageValidation(age);
  talkValidation(talk);
}

module.exports = {
  findTalkerById,
  talkerValidation,
};