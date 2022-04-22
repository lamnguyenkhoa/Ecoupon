const utils = require('./utils');
const User = require('../models/user');

exports.create = async (req, res) => {
  // Validate requests
  if (!req.body.name) {
    return res.status(400).send({
      message: 'Missing name!',
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: 'Missing email!',
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: 'Missing password!',
    });
  }

  // Create an user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    ownedCoupon: req.body.ownedCoupon || [],
    role: req.body.role,
  });

  // Save this user to database
  user
    .save()
    .then(async (data) => {
      res.status(200).send(req.body);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findAll = (req, res) => {
  utils.findAllData(User, req, res);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .then(async (data) => {
      // If data with this id is not found
      if (!data) {
        // return the error messages
        return res.status(404).send({
          message: 'No user is found with this id!',
        });
      }
      // else, store this data to toReturn
      res.status(200).send(data);
    })
    // Catching the error when assessing the DB
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error when accessing the database!' });
    });
};

exports.delete = async (req, res) => {
  utils.deleteData(User, req, res);
};

exports.update = async (req, res) => {
  utils.updateData(User, req, res);
};