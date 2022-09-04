const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log("MongoDB connection is successful");
})

connection.on('error', (err) => {
  console.log("Error in MongoDB connection", err);
});

module.exports = mongoose;