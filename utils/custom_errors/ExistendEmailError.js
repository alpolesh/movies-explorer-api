class ExistendEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExistendEmailError';
    this.statusCode = 409;
  }
}

module.exports = { ExistendEmailError };
