const router = require("express").Router();
const {sendOrder, sendCallback} = require("../controllers/orders");
const {validationBodySendOrder, validationBodySendCallback} = require("../middlewares/validators/requestsValidators");

router.post("/order", validationBodySendOrder, sendOrder);
router.post("/callback", validationBodySendCallback, sendCallback);


module.exports = router;