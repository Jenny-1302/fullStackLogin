const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = "polar270296";

exports.createUser = async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    rol: req.body.rol
  };

  try {
    const user = await User.create(newUser);
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
    const dataUser = {
      name: user.name,
      email: user.email,
      accessToken: accessToken,
      expiresIn: expiresIn,
      rol: user.rol
    };
    res.send({ dataUser });
  } catch (error) {
    if (error.code == 11000)
      res.status(409).send('Email already exist');
    else
      res.status(500).send('Something is wrong');
  }
};

exports.loginUser = async (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const users = await User.login({ email: userData.email });
    const user = users[0];
    if (!user) {
      res.status(409).send({ message: 'Something is wrong' });
      return;
    }

    const resultPassword = bcrypt.compareSync(userData.password, user.password);
    if (resultPassword) {
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
      const dataUser = {
        name: user.name,
        email: user.email,
        accessToken: accessToken,
        expiresIn: expiresIn,
        rol: user.rol
      }
      res.send({ dataUser });
    } else {
      res.status(409).send({ message: 'Something is wrong' });
    }
  } catch (error) {
    res.status(500).send('Server error');
  }

};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.getUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
