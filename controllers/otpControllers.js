const accountSid = "ACee1a144771e48226c5eceaf4db7aa80a";
const authToken = "01622da3c83a8863f85a8ae06424c431";
const serviceId = "MGe021a3d36da2e171409384e11a072d0b";
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);
const validatePhoneNumber = require("validate-phone-number-node-js");
const { database } = require("../firebaseConfig");

const createNewAccessCode = async (req, res) => {
  // const {to} = req.params;
  const { phoneNumber } = req.body;
  const max = 999999;
  const min = 100000;
  const otp = Math.floor(Math.random() * (max - min) + min);
  // client.messages
  // .create({
  //    body: otp.toString(),
  //    from: '+15712008735',
  //    to: to
  //  })
  // .then(message => {
  //   console.log(message)
  // }).catch(err =>{
  //   console.log(err)
  // });
  if (validatePhoneNumber.validate(phoneNumber)) {
    const pendingValidate = database
      .collection("pendingValidate")
      .doc(phoneNumber);
    await pendingValidate.set({ otp: otp });
    console.log((await pendingValidate.get()).data().otp);
    res.json({ otp: otp });
  } else {
    res.json({ msg: "Invalid!" });
  }
};

const validateAccessCode = async (req, res) => {
  const { phoneNumber, accessCode } = req.body;
  // client.verify
  //   .services(serviceId)
  //   .verificationChecks.create({ to, code })
  //   .then((verification) => {
  //     res.json(verification);
  //   })
  //   .catch((err) => {
  //     res.json(err);
  //   });
  // if (validatePhoneNumber.validate(phoneNumber)) {
    
  console.log(phoneNumber)
  if (phoneNumber && validatePhoneNumber.validate(phoneNumber)){
    const pendingValidate = database.collection("pendingValidate").doc(phoneNumber);
    console.log((await pendingValidate.get()).data().otp)
    console.log(accessCode)
    if ((await pendingValidate.get()).data().otp.toString() === accessCode) {
      await pendingValidate.update({ otp: "" });
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } else{
    res.json({msg: "Please provide valid phone number!"})
  }
};

module.exports = { createNewAccessCode, validateAccessCode };
