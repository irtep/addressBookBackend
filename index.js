const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/persons');

// token 'body' for morgan
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
})

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
//app.use(morgan('tiny')); // default small string
app.use(morgan(':method :url :response-time :body '));

// show all
app.get('/api/persons', (req, res) => {
  Person.find({}).then(notes => {
    res.json(notes)
  })
});

// show info page
app.get('/api/info', (req, res) => {
  const personCount = [];
  Person.find({}).then(notes => {
    const forCount = personCount.concat(notes);
    const responseString = `<p>Phonebook has info of ${forCount.length} people. </p>
    <p>${new Date()}</p>`;
    res.send(responseString);
  });
});

// show a certain that hits with id param given
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
    Person.findById(id).then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })/*
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted idx' })
    })*/
    .catch(error => next(error))
});
// delete note
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
});

// add new person
app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  let randomId = Math.floor(Math.random() * 99999);
  const note = new Person({
    name: body.name,
    number: body.number,
    id: randomId,
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  })
  .catch( error => next(error))
});

// update phone number of person
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const note = {
    content: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
};

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error);
};

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
