const accountSid = "ACee1a144771e48226c5eceaf4db7aa80a";
const authToken = "01622da3c83a8863f85a8ae06424c431";
const serviceId = "MGe021a3d36da2e171409384e11a072d0b";
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);
const validatePhoneNumber = require('validate-phone-number-node-js');

const createNewAccessCode = async (req, res) => {
  // const {to} = req.params;
  const {phoneNumber} = req.body
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
  if (validatePhoneNumber.validate(phoneNumber)){
    res.json({otp: otp})
  } else{
    res.json({msg: "Invalid!"})
  }
};

const validateAccessCode = async (req, res) => {
  const {code, to} = req.params;
  client.verify
    .services(serviceId)
    .verificationChecks.create({ to, code })
    .then((verification) => {
      res.json(verification);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {createNewAccessCode, validateAccessCode}