const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const JwtConfig = require('../config/Jwt-config');
const router = express.Router();
const User = require('../models/User');
//  @route              POST api/auth
//  @desc               User login and get token
//  @access             Public
router.post('/', async (req, res) => {
  let email = req.body.email;

  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (user) {
      // email found
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // password matched
        let userToken = JWT.sign(
          {
            id: user.id,
            email: user.email
          },
          JwtConfig.secret,
          {
            algorithm: JwtConfig.algorithm,
            expiresIn: JwtConfig.expiresIn,
            notBefore: JwtConfig.notBefore
          }
        );
        res.status(200).json({
          message: 'User logged in successfully',
          token: userToken
        });
      } else {
        // password not matched
        res.status(500).json({
          message: 'Password incorrect'
        });
      }
    } else {
      // email not found
      res.status(500).json({
        message: 'User not exists'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//  @route              GET api/auth
//  @desc               User authorization
//  @access             Private
router.get('/', async (req, res) => {
  //   console.log(req.headers['authorization']);
  let userToken = req.headers['authorization'];
  JWT.verify(userToken, JwtConfig.secret, (error, data) => {
    if (error) {
      res.status(500).json({
        message: 'Invalid token'
      });
    } else {
      res.status(200).json({
        userData: data
      });
    }
  });
});

module.exports = router;
