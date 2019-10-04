const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const monk = require('monk');


const app = express();

const db = monk('localhost/meower');
const mews = db.get('mews');

app.use(cors());
app.use(express.json());

const schema = Joi.object().keys({                                     
  name: Joi.string().min(2).trim().required(),
  content: Joi.string().min(5).max(150).trim().required()                             
});


app.get('/', (req, res) => {
  res.json({
    message: "hello world!!!"
  });
});

app.get('/mews', (req,res) => {
  mews
      .find()
      .then((mews) => {
       res.json(mews);
      });
});

app.post('/mews', (req, res) => {
  const result =Joi.validate(req.body,schema);        //validating the the req.body data 
  if(result.error === null) {
   const mew = {
     name : req.body.name,
     content : req.body.content,
     created : new Date()
   };
    mews
        .insert(mew)
        .then((createdMew) => {
          res.json(createdMew);
        });

  }else {
   res.status(422);
   res.json({
    message : 'Hey name and content are required'
   });
  }
});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
})