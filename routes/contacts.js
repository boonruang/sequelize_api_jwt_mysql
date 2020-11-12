const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const JwtConfig = require('../config/Jwt-config');
const router = express.Router();
const JwtMiddleware = require('../config/Jwt-middlware');
const Contact = require('../models/Contact');
//  @route              POST api/contacts
//  @desc               Add contact
//  @access             Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;

  try {
    const contactFound = await Contact.findOne({
      where: {
        email: email
      }
    });

    if (contactFound) {
      // email found
      res.status(500).json({
        message: 'Contact already exists'
      });
    } else {
      // email not found
      const contact = await Contact.create({
        name: name,
        email: email,
        phone: phone,
        userId: req.user.id
      });

      if (contact) {
        // able to create
        res.status(200).json({
          message: 'contact created successfully'
        });
      } else {
        // can not create
        res.status(500).json({
          message: 'Can not create contact'
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//  @route              GET api/contacts
//  @desc               Get all contact
//  @access             Private
router.get('/', JwtMiddleware.checkToken, async (req, res) => {
  try {
    const contactFound = await Contact.findAll({
      where: {
        userId: req.user.id
      }
    });

    if (contactFound) {
      // contact found
      res.status(200).json(contactFound);
    } else {
      // contact not found
      res.status(500).json({
        message: 'Contact not found'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//  @route              PUT api/contacts/:id
//  @desc               Update contact
//  @access             Private
router.put('/:id', JwtMiddleware.checkToken, async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;

  try {
    const contactFound = await Contact.findOne({
      where: {
        id: req.params.id
      }
    });

    if (contactFound) {
      // contact found
      // make sure user owns contact

      if (contactFound.userId === req.user.id) {
        // own contact
        const contact = await Contact.update(
          {
            name: name,
            email: email,
            phone: phone
          },
          {
            where: {
              id: req.params.id
            }
          }
        );

        if (contact) {
          // able to create
          res.status(200).json({
            message: 'contact updated successfully'
          });
        } else {
          // can not create
          res.status(500).json({
            message: 'Can not update contact'
          });
        }
      } else {
        // not owner
        res.status(500).json({
          message: 'Not allow update'
        });
      }
    } else {
      // contact not found
      res.status(500).json({
        message: 'Contact not found'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//  @route              DELETE api/contacts/:id
//  @desc               Delete contact
//  @access             Private
router.delete('/:id', JwtMiddleware.checkToken, async (req, res) => {
  try {
    const contactFound = await Contact.findOne({
      where: {
        id: req.params.id
      }
    });

    if (contactFound) {
      // contact found
      // make sure user owns contact

      if (contactFound.userId === req.user.id) {
        // own contact
        const contact = await Contact.destroy({
          where: {
            id: req.params.id
          }
        });

        if (contact) {
          // able to create
          res.status(200).json({
            message: 'contact deleted successfully'
          });
        } else {
          // can not create
          res.status(500).json({
            message: 'Can not delete contact'
          });
        }
      } else {
        // not owner
        res.status(500).json({
          message: 'Not allow delete'
        });
      }
    } else {
      // contact not found
      res.status(500).json({
        message: 'Contact not found'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
