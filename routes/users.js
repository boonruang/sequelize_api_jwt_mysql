const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
//  @route              POST api/users
//  @desc               Register user
//  @access             Public
router.post('/', async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 10);

  try {
    const userFound = await User.findOne({
      where: {
        email: email
      }
    });

    if (userFound) {
      // email found
      res.status(500).json({
        message: 'User already exists'
      });
    } else {
      // email not found
      const user = await User.create({
        name: name,
        email: email,
        password: password
      });

      if (user) {
        // able to create
        res.status(200).json({
          message: 'User created successfully'
        });
      } else {
        // can not create
        res.status(500).json({
          message: 'Can not create user'
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
