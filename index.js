const dotenv = require('dotenv');
const express = require ('express');
const app = express();
const mongoose = require('mongoose')
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('Connected to db'));

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error: ' + err)
    process.exit(-1)
 });


//Middleware
app.use(express.json());
//route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server is running'));