
const mongoose = require("mongoose");
const BadRequestError = require("../errors/BadRequestError");

module.exports = (err, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError("Переданные данные не соответствуют схеме данных и не прошли валидацию."));
    } else if (err instanceof mongoose.Error.CastError ) {
        next(new BadRequestError("Неверный формат id."));
    } else {
        next(err);
    }
}