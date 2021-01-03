const mongoose = require('mongoose')
require('dotenv').config();

const nameToAdd = process.argv[3];
const nbrToAdd = process.argv[4];
/*NoniinNytOissiTaasPass1!*/

const url = process.env.MONGODB_URI;

console.log('connecting to ', url);
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
/*
const Note = mongoose.model('Person', noteSchema)

const note = new Note({
  name: nameToAdd,
  number: nbrToAdd
})

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

if (process.argv.length === 5) {
  note.save().then(response => {
    console.log('added ', nameToAdd, ' number ', nbrToAdd, ' to phonebook');
    mongoose.connection.close()
  })
}
if (process.argv.length === 3) {
  console.log('phonebook:');
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note.name, note.number);
    });
    mongoose.connection.close();
  });
}
*/
module.exports = mongoose.model('Person', noteSchema);