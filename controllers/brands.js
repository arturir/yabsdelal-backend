const Brand = require("../models/brand");
const PhoneModel = require("../models/phoneModel");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const errorHandler = require("./errorHandler");

module.exports.getBrands = (req, res, next) => {
    Brand.find({})
      .then((brands) => res.send(brands))
      .catch(err => { next(err) })
};

module.exports.createBrand = (req, res, next) => {
  const { name } = req.body;
  Brand.create({ name })
    .then((brand) => res.send({ brand }))
    .catch(err => errorHandler(err))
};

module.exports.deleteBrand = (req, res, next) => {
  PhoneModel.find({brand: req.params.id})
  .then(phoneModels => {
    if (!phoneModels?.length) {
      Brand.findById(req.params.id)
      .then(brand => {
        if (!brand) {
          throw new NotFoundError("Такой записи не существует");
        } else {
          brand.deleteOne()
          .then(() => { res.send({ message: "Запись бренда удалена" }); })
          .catch(next)
        }
      })
      .catch(next)
    } else {
      throw new ForbiddenError("На данный объект ссылаются другие объекты.");
  }})
  .catch(err => errorHandler(err))
};