require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

//mongooseConnection  string
const connect  = mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true});
connect
  .then((db) => {
    console.log(" db connected successFully");
  })
  .catch((err) => {
    console.log(err);
  });

  //routes for an api
  const subscibersRouter = require('./Routes/Subscribers')
  app.use('/subcribers',subscibersRouter)

app.listen(process.env.PORT,()=>{
console.log(`server started at  ${process.env.PORT}`)
})