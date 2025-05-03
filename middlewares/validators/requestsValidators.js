const { celebrate, Joi } = require("celebrate");

const validationBodySendOrder = celebrate({
  body: Joi.object().keys({
    modelID: Joi.string().required().hex().length(24),
    serviceID: Joi.string().required().hex().length(24),
    customer: Joi.string().required().min(2).max(32),
    phone: Joi.string().required().min(5).max(16),
    contactMethod: Joi.string().required().min(2).max(16),
  }),
});

const validationBodySendCallback = celebrate({
  body: Joi.object().keys({
    customer: Joi.string().required().min(2).max(32),
    phone: Joi.string().required().min(5).max(16),
    contactMethod: Joi.string().required().min(2).max(16),
  }),
});

module.exports = { validationBodySendOrder, validationBodySendCallback };
