const express = require('express');
const router = require('./routes.js');

const app = express();

app.use(express.json());

app.use('/reviews', router); 

app.get('/loaderio-99b70cbf9d3f07bf26606f861036caa0', (req, res) => {
  res.send('loaderio-99b70cbf9d3f07bf26606f861036caa0')
});

app.listen('3000', () => {
  console.log('listening on 3000')
});