class NonExistendError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NonExistendError';
    this.statusCode = 404;
  }
}

module.exports = { NonExistendError };
