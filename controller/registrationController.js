const nameValidation = require("../helpers/nameValidation");

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

    // if (!nameValidation(firstName)) {
    //   return res.status(400).send({
    //     error: "First Name Is Not Valid",
    //   });
    // }
    res.send(req.body);
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = registrationController;
