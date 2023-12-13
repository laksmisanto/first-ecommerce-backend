"use client";
const nameValidation = require("../helpers/nameValidation");
const emailValidation = require("../helpers/emailValidation");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const sendMail = require("../helpers/sendMail");
const otpTemplate = require("../helpers/otpTemplate");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

let registrationController = async (req, res) => {
  //async function registrationController(req, res)
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

    let existingMail = await User.find({ email });

    if (existingMail.length > 0) {
      return res.status(400).send({
        error: "Email Already Exists",
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

      const generator2 = aleaRNGFactory(Date.now());
      let randomOTP = generator2.uInt32().toString().substring(0, 4);
      let randomOtpStore = await User.findOneAndUpdate(
        { email },
        { $set: { randomOTP: randomOTP } },
        { new: true }
      );

      // sendMail(email, randomOtpStore, otpTemplate);
      sendMail(email, randomOtpStore.randomOTP, otpTemplate);

      // setTimeout(async () => {
      //   console.log("Delete your OTP");
      //   let randomOtpStore = await User.findOneAndUpdate(
      //     { email },
      //     { $unset: { randomOTP: "" } },
      //     { new: true }
      //   );
      // }, 8000);

      res.json({
        success: "Registration successfull",
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = registrationController;
