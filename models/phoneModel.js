const mongoose = require("mongoose"),
      Brand = require("./brand");
const {serviceSchema, Service} = require("./service");
      
const phoneModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Brand
  },
  services: [serviceSchema]
});

phoneModelSchema.pre('findOneAndUpdate', function(next) {
  if (this.getUpdate()['$push'] || this.getUpdate()['$set']) {
    const data = Object.values(Object.values(this.getUpdate())[0])[0];
    const newService = new Service(data);
    newService.validate()
      .then(() => next())
      .catch(err => next(err))
  } else {
    next();
  }
});


const phoneModel = mongoose.model("phoneModel", phoneModelSchema);
module.exports = phoneModel;
