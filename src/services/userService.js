const { User } = require('../database/models');

const validateDisplayName = (displayName) => {
  if (!displayName || displayName.length < 8) {
    return { code: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  
  return {};
};

const validateEmailLength = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
  if (!email || !email.match(emailRegex)) {
    return { code: 400, message: '"email" must be a valid email' };
  }

  return {};
};

const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { code: 400, message: '"password" length must be at least 6 characters long' };
  }

  return {};
};

const validateIfEmailExists = async (email) => {
  const result = await User.findOne({ where: { email } });

  if (result) return { code: 409, message: 'User already registered' };

  return {};
};

const validate = async (displayName, email, password) => {
  const isDisplayNameValid = validateDisplayName(displayName);
  const isEmailValid = validateEmailLength(email);
  const isPasswordValid = validatePassword(password);
  const emailExists = await validateIfEmailExists(email);

  if (isDisplayNameValid.message) return isDisplayNameValid;
  if (isEmailValid.message) return isEmailValid;
  if (isPasswordValid.message) return isPasswordValid;
  if (emailExists.message) return emailExists;

  return {};
};

const create = async (displayName, email, password, image) => {
  const validations = await validate(displayName, email, password);

  if (validations.message) return validations;

  await User.create({ displayName, email, password, image });

  return { code: 201, message: false };
};

const findAll = async () => {
  const result = await User.findAll();

  const users = result.map(({ dataValues }) => {
    const { id, displayName, email, image } = dataValues;
    return { id, displayName, email, image };
  });

  return users;
};

const findById = async (userId) => {
  const result = await User.findByPk(userId);

  if (!result) return { code: 404, message: 'User does not exist' };

  const { id, displayName, email, image } = result.dataValues;

  return { code: 200, user: { id, displayName, email, image } };
};

module.exports = {
  create,
  findAll,
  findById,
};