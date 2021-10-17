const mongoose = require("mongoose");

// Replace this with your MONGOURI.
// removed password for security pourposes
const MONGOURI = "mongodb+srv://dbuser:$$$$$$$@cluster0.ivdg6.mongodb.net/projet-web?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    }); 
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e; 
  }
};



module.exports = InitiateMongoServer;
