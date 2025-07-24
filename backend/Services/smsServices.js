// SMS sending service implementation (stub)
// Integration with Twilio or other SMS providers can be added here

const sendSMS = (phoneNumber, message) => {
  // TODO: Implement actual SMS sending logic
  console.log("Sending SMS to " + phoneNumber + ": " + message);
};

module.exports = {
  sendSMS,
};
