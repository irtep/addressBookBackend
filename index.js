const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/persons');

// token 'body' for morgan
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
})

app.use(express.static('build'));
app.use(express.json());
//app.use(morgan('tiny')); // default small string
app.use(morgan(':method :url :response-time :body '));
app.use(cors());
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}
app.use(errorHandler);

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
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
    .catch(error => next(error))
});
// delete note
app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
});

// add new person
app.post('/api/persons', (req, res) => {
  const body = req.body;
  let randomId = Math.floor(Math.random() * 99999);

  if (!body || !body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    });
  }
  // check if already in list
  Person.find({}).then(notes => {
    const dublicateCheck = notes.filter( person => person.name === body.name);
    if (dublicateCheck.length === 1) {
      return res.status(400).json({
        error: 'name must be unique'
      });
    }
  });

  const note = new Person({
    name: body.name,
    number: body.number,
    id: randomId,
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  })
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
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
