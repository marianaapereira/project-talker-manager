// type verification

function numberIsInt(number) {
  return (typeof (number) === 'number') && (number === Math.floor(number));
}

function dateIsValid(date) {
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
  const dateValidation = regexDate.test(date);

  return dateValidation;
}

// number functions

function checkNumberRange(number, min, max) {
  return ((number >= min) && (number <= max));
}

module.exports = {
  numberIsInt,
  dateIsValid,
  checkNumberRange,
};