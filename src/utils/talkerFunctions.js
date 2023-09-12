const { numberIsInt, dateIsValid, checkNumberRange } = require('./generalFunctions');
const { HTTP_NOT_FOUND_STATUS, HTTP_BAD_REQUEST_STATUS } = require('../consts/http-status-codes');

// const

const MINIMUN_NAME_LENGTH = 3;

// general

function createTalkerId(talker, talkerArray) {
  const lastId = talkerArray[(talkerArray.length - 1)].id;
  const newId = lastId + 1;

  return { ...talker, id: newId };
}

function findTalkerById(talkerArray, talkerId) {
  const requiredTalker = talkerArray.find((talker) => talker.id === Number(talkerId));

  if (!requiredTalker) {
    throw new Error(
      'Pessoa palestrante não encontrada', 
      { httpStatusCode: HTTP_NOT_FOUND_STATUS },
    ); 
  }

  return requiredTalker;
}

// validations

function nameValidation(name) {
  if (!name || name === '') { 
    throw new Error(
      'O campo "name" é obrigatório', 
      { httpStatusCode: HTTP_BAD_REQUEST_STATUS },
    ); 
  }

  if (name.length < MINIMUN_NAME_LENGTH) { 
    throw new Error(
      'O "name" deve ter pelo menos 3 caracteres',
      { httpStatusCode: HTTP_BAD_REQUEST_STATUS },
    ); 
  }
}

function ageValidation(age) {
  if (!age || age === '') { 
    throw new Error(
      'O campo "age" é obrigatório',
      { httpStatusCode: HTTP_BAD_REQUEST_STATUS },
    ); 
  }

  if (!numberIsInt(age) || age < 18) {
    throw new Error(
      'O campo "age" deve ser um número inteiro igual ou maior que 18',
      { httpStatusCode: HTTP_BAD_REQUEST_STATUS },
    );
  }
}

function watchedAtValidation(watchedAt) {
  if (!watchedAt || watchedAt === '') { 
    throw new Error(
      'O campo "watchedAt" é obrigatório',
      { httpStatusCode: HTTP_BAD_REQUEST_STATUS },
    ); 
  }

  if (!dateIsValid(watchedAt)) {
    throw new Error(
      'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      { httpStatusCode: HTTP_BAD_REQUEST_STATUS },
    ); 
  }
}

function rateValidation(rate) {
  if (rate === undefined || rate === null) { 
    throw new Error(
      'O campo "rate" é obrigatório',
      { httpStatusCode: HTTP_BAD_REQUEST_STATUS },
    ); 
  }

  const rateIsInt = numberIsInt(rate);
  const rateIsInCorrectRange = checkNumberRange(rate, 1, 5);

  if (!rateIsInt || !rateIsInCorrectRange) {
    throw new Error(
      'O campo "rate" deve ser um número inteiro entre 1 e 5',
      { httpStatusCode: HTTP_BAD_REQUEST_STATUS },
    );
  }
}

function talkValidation(talk) {
  if (!talk) { 
    throw new Error(
      'O campo "talk" é obrigatório',
      { httpStatusCode: HTTP_BAD_REQUEST_STATUS },
    ); 
  }

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
  createTalkerId,
  findTalkerById,
  talkerValidation,
};