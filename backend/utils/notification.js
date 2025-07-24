const sendSMSAlert = (phoneNumber, message) => {
  // TODO: Implement SMS sending logic
  console.log("Sending SMS to " + phoneNumber + ": " + message);
};

const sendEmailAlert = (email, subject, message) => {
  // TODO: Implement Email sending logic
  console.log("Sending Email to " + email + ": Subject: " + subject + ", Message: " + message);
};

module.exports = {
  sendSMSAlert,
  sendEmailAlert,
};
