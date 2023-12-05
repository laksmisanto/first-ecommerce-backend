const nameValidation = require("../helpers/nameValidation");
const emailValidation = require("../helpers/emailValidation");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

async function registrationController(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      telephone,
      address,
      city,
      postCode,
      country,
      state,
    } = req.body;

    if (!nameValidation(firstName)) {
      return res.status(400).send({
        error: "First Name Is Not Valid",
      });
    }
    if (!nameValidation(lastName)) {
      return res.status(400).send({
        error: "Last Name Is Not Valid",
      });
    }
    if (!emailValidation(email)) {
      return res.status(400).send({
        error: "Email Is Not Valid",
      });
    }
    //password bcrypt

    let exitingMail = await User.find({ email });

    if (exitingMail.length > 0) {
      return res.status(400).send({
        error: "Email already exists",
      });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      let userData = new User({
        firstName,
        lastName,
        email,
        password: hash,
        telephone,
        address,
        city,
        postCode,
        country,
        state,
      });
      userData.save();
      res.json({
        success: "Registration successfull",
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
    });

    res.send(req.body);
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = registrationController;
