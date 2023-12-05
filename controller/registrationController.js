const nameValidation = require("../helpers/nameValidation");
const emailValidation = require("../helpers/emailValidation");
const bcrypt = require("bcrypt");

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
        error: "email Is Not Valid",
      });
    }
    //password bcrypt

    res.send(req.body);
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = registrationController;
