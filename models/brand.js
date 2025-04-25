const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 64,
  }
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
