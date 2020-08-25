const express = require('express');

const app = express();

// req = request
// res = response
app.get('/', (req, res) => {
  res.json({
    message: "Mewover!"
  })
});

app.post('/mews', (req, res) => {
  console.log(req.body);

})

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});

