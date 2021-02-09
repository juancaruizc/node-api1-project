// BUILD YOUR SERVER HERE

const express = require('express');
const users = require('./users/model');
const server = express();
server.use(express.json());

// GET Request all
server.get('/api/users', (req, res) => {
  users
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(400).json({ message: `user not found` });
    });
});

// GET Request individual id
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;

  users
    .findById(id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(400).json({ message: `user not found` });
    });
});

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  users
    .insert(req.body)
    .then((newUser) => {
      if (!name || !bio) {
        res
          .status(400)
          .json({ message: 'Please provide name and bio for the user' });
      } else {
        res.status(201).json(newUser);
      }
    })
    .catch(() => {
      res.status(500).json({
        message: `There was an error while saving the user to the database`,
      });
    });
});

// PUT Request
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  users
    .update(id, changes)
    .then((updatedUser) => {
      if (!id) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist' });
      } else if (!changes) {
        res
          .status(400)
          .json({ message: 'Please provide name and bio for the user' });
      } else {
        res.status(200).json(updatedUser);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The user information could not be modified' });
    });
});

// DELETE Request
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  users
    .remove(id)
    .then((users) => {
      if (users) {
        res.status(200).json({ message: `User ${users} was deleted` });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: `The user could not be removed` });
    });
});

server.use('*', (req, res) => {
  res.status(404).json({ message: `404 not found)*` });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
