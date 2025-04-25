const router = require("express").Router();
const {getBrands, createBrand, deleteBrand} = require("../controllers/brands");

router.get("/", getBrands);
router.post("/", createBrand);
router.delete("/:id", deleteBrand);

module.exports = router;