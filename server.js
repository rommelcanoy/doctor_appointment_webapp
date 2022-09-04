
const express = require('express');
const app = express();

require('dotenv').config()
const dbConfig = require('./config/dbConfig');
// i destructure to json
app.use(express.json());

// pag connect sa end points (routes) sa atong server
const userRoute = require('./routes/userRoute');
app.use('/api/user', userRoute);

const port = process.env.PORT || 5000;
// console.log(process.env.MONGO_URL)

app.listen(port, () => console.log(`Node server: ${port}`));

