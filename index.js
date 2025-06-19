const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const routes = require('./routes');

connectDB();
app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



