const User = require("../models/userModel");

async function matchOTP(req, res) {
  let { email, randomOTP } = req.body;

  let existingMail = await User.find({ email });

  if (existingMail[0].randomOTP === randomOTP) {
    let removeOTP = await User.findOneAndUpdate(
      { email },
      { $set: { randomOTP: "" } },
      { new: true }
    );
    return res.send({
      message: "OTP Matched",
    });
  } else {
    return res.send({
      message: "OTP Not Matched",
    });
  }
}
module.exports = matchOTP;
