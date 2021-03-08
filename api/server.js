// BUILD YOUR SERVER HERE
const express = require('express');

const User = require('./users/model');
const server = express();
server.use(express.json());

// server.post();
// server.get();
// server.get();
// server.put();
// server.delete();

module.exports = server; // EXPORT YOUR SERVER instead of {}
