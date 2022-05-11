const defaultError = {
  statusCode: 500,
  message: 'Ошибка по умолчанию',
};

const validationUserError = {
  statusCode: 400,
  message: 'Переданы некорректные данные в методы создания пользователя',
};

const validationCardError = {
  statusCode: 400,
  message: 'Переданы некорректные данные в методы создания карточки',
};

const castError = {
  statusCode: 400,
  message: 'Переданы некорректные данные',
};

const authError = {
  statusCode: 401,
  message: 'Неправильные почта или пароль',
};

const tokenError = {
  statusCode: 401,
  message: 'Необходима авторизация',
};

const tokenNotMatchError = {
  statusCode: 403,
  message: 'Необходима авторизация',
};

const resourceError = {
  statusCode: 404,
  message: 'Ресурс не найден',
};

module.exports = {
  defaultError,
  validationUserError,
  validationCardError,
  castError,
  resourceError,
  authError,
  tokenError,
  tokenNotMatchError,
};
