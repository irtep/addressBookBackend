const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// token 'body' for morgan
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
})

app.use(express.json());
//app.use(morgan('tiny')); // default small string
app.use(morgan(':method :url :response-time :body '));
app.use(cors());
app.use(express.static('build'));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
  }
];

// show all
app.get('/api/persons', (req, res) => {
  res.json(persons);
});
// show info page
app.get('/api/info', (req, res) => {
  const responseString = `<p>Phonebook has info of ${persons.length} people. </p>
  <p>${new Date()}</p>`;
  res.send(responseString);
});
// show a certain that hits with id param given
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find( person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});
// delete note
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end()
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
  const dublicateCheck = persons.filter( person => person.name === body.name);
  if (dublicateCheck.length === 1) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }
  const note = {
    name: body.name,
    number: body.number,
    id: randomId,
  }

  persons = persons.concat(note)
  res.json(note)
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
