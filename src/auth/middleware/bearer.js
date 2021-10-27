'use strict';

const { users } = require('../models');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);

    req.user = validUser.username;
    req.token = validUser.token;
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
};
