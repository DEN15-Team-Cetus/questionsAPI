const express = require('express');
const router = require('./routes.js');

const app = express();

app.use(express.json());

app.use('/reviews', router); 

app.listen('3000', () => {
  console.log('listening on 3000')
});