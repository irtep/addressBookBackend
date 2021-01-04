const mongoose = require('mongoose')
require('dotenv').config();
/*NoniinNytOissiTaasPass1!*/

const url = process.env.MONGODB_URI;

// if env can't be reached:
if (url === undefined) {
  console.log('url undefined, switching to heroku env');
  url = ENV['MONGODB_URI'];
}

console.log('connecting to MongoDb');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
});

const noteSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('Person', noteSchema);
