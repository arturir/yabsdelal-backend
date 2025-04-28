const PhoneModel = require("../models/phoneModel");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const Brand = require("../models/brand");
const errorHandler = require("./errorHandler");

module.exports.getAllModelsPhone = (req, res, next) => {
    PhoneModel.find({})
    .populate("brand")
    .then(phoneModels => res.send(phoneModels))
    .catch(err => { next(err) })
}

module.exports.getModelsPhoneByBrand = (req, res, next) => {
    console.log(req.params.brandId)
    Brand.findById(req.params.brandId)
    .then(brand => {
      if (!brand) {
        throw new NotFoundError("Бренда с таким id не существует!");
      } else {
        PhoneModel.find({brand: req.params.brandId})
        .populate("brand")
        .then(phoneModels => {
            if (!phoneModels?.length) {
                throw new NotFoundError("Телефоны с указаным брендом не найдены");
            } else {
                res.send(phoneModels)
            }})
        .catch((err) => { next(err) })
      }
    })
    .catch(err => errorHandler(err))
}

module.exports.createModelPhone = (req, res, next) => {
    const {name, brand, services} = req.body;
    Brand.exists({"_id": brand})
    .then((brand) => {
        if(brand) {
            PhoneModel.create({name, brand, services})
            .then(newPhoneModel => {
                res.send(newPhoneModel)
            })
            .catch(err => errorHandler(err, next))
        } else {
            throw new BadRequestError("ID бренда указано неверно или отсутствует.");
        }
    })
    .catch(err => errorHandler(err, next)) // выкидывает ошибку при передаче неправильного ID и сервер падает
}

module.exports.deleteModelPhone = (req, res, next) => {
    PhoneModel.findById(req.params.id)
    .then((phoneModel) => {
        if (!phoneModel) {
            throw new NotFoundError("Устройство с указанным _id не найдено.");
        }
        else {
            phoneModel.deleteOne()
            .then(() => { res.send({ message: "Устройство удалено." }); })
            .catch(next)
        }
    })
    .catch(err => errorHandler(err, next))
}

module.exports.editBrand = (req, res, next) => {
    const { brand } = req.body;
    Brand.exists({"_id": brand})
    .then((data) => {
        if (data) {
            PhoneModel.findByIdAndUpdate(req.params.id, { brand }, { new: true, runValidators: true })
            .then((phoneModel) => {
                if (!phoneModel) {
                    throw new NotFoundError("Устройство с указанным _id не найдено.");
                } else {
                    res.send(phoneModel);
                }
            })
            .catch(next)
        } else {
            throw new BadRequestError("Бренд с указанным _id не найден.");
        }
    })
    .catch(err => errorHandler(err, next))
}

module.exports.editName = (req, res, next) => {
    const { name } = req.body;
    PhoneModel.findByIdAndUpdate(req.params.id, { name }, { new: true, runValidators: true })
    .then(phoneModel => {
        if (!phoneModel) {
            throw new NotFoundError("Устройство с указанным _id не найден.");
        } else {
            res.send(phoneModel);
        }
    })
    .catch(err => errorHandler(err, next))
}

module.exports.editService = (req, res, next) => {
    const { name, price } = req.body;
    PhoneModel.findOneAndUpdate({_id: req.params.id, services: {$elemMatch: {_id: req.params.serviceId}}}, 
        {$set: {
            'services.$': {name, price, _id: req.params.serviceId}
        }}, {new: true}
    )
    .then((phoneModel) => {
        if (!phoneModel?.services?.find(service => service._id.toString() === req.params.serviceId)) {
            throw new NotFoundError("Устройство или услуга с переданными ID не существует");
        } else {
            res.send(phoneModel);
        }
    })
    .catch(err => errorHandler(err, next))
}

module.exports.deleteService = (req, res, next) => {
    PhoneModel.findOneAndUpdate({_id: req.params.id}, {$pull: {
        "services": {
            "_id": req.params.serviceId
        }
    }})
    .then((phoneModel) => {
        if (!phoneModel?.services?.find(service => service._id.toString() === req.params.serviceId)) {
            throw new NotFoundError("Устройство или услуга с переданными ID не существует");
        } else {
            PhoneModel.findById(req.params.id)
            .then(newPhoneModel => res.send(newPhoneModel))
            .catch(next)
        }
    })
    .catch(err => errorHandler(err, next))
}

module.exports.addNewService = (req, res, next) => {
    const { serviceName, price } = req.body;
    PhoneModel.findOneAndUpdate({_id: req.params.id}, 
        {$push: {
            services: {name: serviceName, price}
        }}, {new: true}
    )
    .then(phoneModel => {
        if (!phoneModel) {
            throw new NotFoundError("Устройство или услуга с переданными ID не существует");
        } else {
            res.send(phoneModel);
        }
    })
    .catch(err => errorHandler(err, next))
}