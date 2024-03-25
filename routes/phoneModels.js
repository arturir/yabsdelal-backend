const router = require("express").Router();
const {getAllModelsPhone, getModelsPhoneByBrand, createModelPhone, editName, editBrand, 
       deleteService, editService, addNewService, deleteModelPhone} = require("../controllers/phoneModels");
const auth = require("../middlewares/easyAuth");

router.get("/", getAllModelsPhone);
router.post("/", auth, createModelPhone);
router.get("/brand/:brandId", getModelsPhoneByBrand);
router.patch("/:id/name", auth, editName);
router.patch("/:id/brand", auth, editBrand);
router.delete("/:id/:serviceId", auth, deleteService);
router.patch("/:id/:serviceId", auth, editService);
router.post("/:id", auth, addNewService);
router.delete("/:id", auth, deleteModelPhone);

module.exports = router;