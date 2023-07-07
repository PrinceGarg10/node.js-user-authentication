const mongoose = require('mongoose');

async function connectToDB() {
  try {
    const uri = process.env.URI
    if(!uri) {
        throw new Error("Uri Manadatory")
    }
    console.log({uri});
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useFindAndModify: false
    });
    console.log('Database connection established');
  } catch (error) {
    throw error;
  }
}

module.exports = {
  connectToDB,
};
