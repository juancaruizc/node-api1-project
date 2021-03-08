// BUILD YOUR SERVER HERE
const e = require('express');
const express = require('express');

const User = require('./users/model');
const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
  const newUser = req.body;

  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: 'Please provide name and bio for the user' });
  } else {
    User.insert(newUser)
      .then(() => {
        res.status(200).json(newUser);
      })
      .catch(() => {
        res.status(500).json({
          message: 'There was an error while saving the user to the database',
        });
      });
  }
});
server.get('/api/users', (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The users information could not be retrieved' });
    });
});
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist' });
  } else {
    User.findById(id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: 'The user information could not be retrieved' });
      });
  }
});
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist' });
  } else {
    User.remove(id)
      .then((deletedUser) => {
        res.status(200).json(deletedUser);
      })
      .catch(() => {
        res.status(500).json({ message: 'The user could not be removed' });
      });
  }
});
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!id) {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist' });
  } else {
    User.update(id, changes)
      .then((updatedUser) => {
        if (!changes.name || !changes.bio) {
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
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
