const mongoose = require("mongoose");
const { DB_URL } = require("../config");

module.exports = async () => {
  try {
    console.log("***PRODUCT DB_URL>>",DB_URL)
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("---DB Connected---");
  } catch (error) {
    console.log("---Error----");
    console.log(error);
    process.exit(1);
  }
};
