const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
  },
  price: {
    type: Number,
    required: true,
  }
});

const Service =  mongoose.model("Service", serviceSchema);

module.exports = {serviceSchema, Service};
