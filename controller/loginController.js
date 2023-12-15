const emailValidation = require("../helpers/emailValidation");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function loginController(req, res) {
  let { email, password } = req.body;
  let existingMail = await User.find({ email });

  if (!emailValidation(email)) {
    return res.status(400).send({
      error: "Email Is Not Valid",
    });
  }

  if (existingMail.length > 0) {
    console.log("email match");
    bcrypt.compare(password, existingMail[0].password, function (err, result) {
      if (result) {
        res.json({
          success: "Login successfull",
          firstName: existingMail[0].firstName,
          lastName: existingMail[0].lastName,
        });
      } else {
        return res.status(400).send({
          error: "Password Not Matched",
        });
      }
    });
  } else {
    return res.status(400).send({
      error: "Email Not Matched",
    });
  }
}
module.exports = loginController;
