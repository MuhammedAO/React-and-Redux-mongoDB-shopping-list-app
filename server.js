const express = require ('express');
const mongoose = require ('mongoose');
const path = require('path');
const app = express();
const items = require('./routes/api/items');
//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require ('./config/keys').mongoURI;
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log('Database connected'))
.catch((err) => console.log(err));

//Use Routes
app.use('/api/items', items);

//Serve static assets if in production
if (process.env.NODE_ENV==='production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res) =>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}


const Port = process.env.PORT || 5000;

app.listen(Port, ()=> console.log(`server is running on port ${Port}`));
