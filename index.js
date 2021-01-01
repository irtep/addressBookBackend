const express = require('express');
const app = express();

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
/*
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
  console.log('get received!');
})
*/

app.get('/api/persons', (req, res) => {
  res.json(persons);
  console.log('api/persons received');
});

app.get('/api/info', (req, res) => {
  const responseString = `<p>Phonebook has info of ${persons.length} people. </p>
  <p>${new Date()}</p>`;
  res.send(responseString);
  console.log('api/persons received');
});

app.get('/api/persons/:id', (req, res) => {
  console.log('got get with id ', req);
  const id = Number(req.params.id);
  const person = persons.find( person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
