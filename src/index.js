const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const apiRouter = require('./routes/index');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

mongoose.set('strictQuery',false);
app.use(bodyParser.json());

app.use(cors());

mongoose.connect(`${process.env.DBURI}`)
    .then(()=>{
    console.log("Connection successful");
}).catch(err=>console.error(err));

//app.use('/easyorder/v1',apiRouter)

app.listen(PORT, () => {
    console.log(`Server launch on http://localhost:${PORT}`);
});