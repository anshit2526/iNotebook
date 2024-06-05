const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express()
const port = 5000

// A middleware to use req.body in this project. This is used to deal with json like sending requests in json.  
app.use(express.json());

// Available Routes 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}/`)
})