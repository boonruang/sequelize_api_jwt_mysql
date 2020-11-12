const express = require('express');
const db = require('./config/db');
const app = express();

const PORT = 5000;

db.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Database connect failed ', error);
  });

app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => {
  console.log('Application is running on port', PORT);
});
