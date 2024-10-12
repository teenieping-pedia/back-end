const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const teeniepingRoutes = require('./routes/teeniepingRoutes');

const app = express();
const port = 3000;

app.use(cors());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello Teenieping!');
});

app.use('/teeniepings', teeniepingRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
