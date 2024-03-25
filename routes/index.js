const router = require("express").Router();
const express = require("express");
const { errors } = require("celebrate");
const errorHandler = require("../middlewares/errorHandler");
const handlerCORS = require("../middlewares/handlerCORS");
const { requestLogger, errorLogger } = require("../middlewares/logger");
const NotFoundError = require("../errors/NotFoundError");

router.use(express.json());
router.use(requestLogger);
router.use(handlerCORS);

router.use("/models", require("./phoneModels"));
router.use("/brands", require("./brands"));
router.use("/request", require("./orders"));
router.use("*", (req, res, next) => {
    next(new NotFoundError("Неправильный URL запроса"));
});

router.use(errorLogger);
router.use(errors());
router.use(errorHandler);
module.exports = router;