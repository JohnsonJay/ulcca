const express = require('express');
const bodyParser = require('body-parser');
const compatibilityRoutes = require('./routes/compatibility');

const app = express();
const port = 3000;

// application/json
app.use(bodyParser.json());

// prevent CORS errors and only enable POST requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/compatibility', compatibilityRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
});
