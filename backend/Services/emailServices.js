// Email sending service implementation (stub)
// Integration with SendGrid, Nodemailer, or other email providers can be added here

const sendEmail = (email, subject, message) => {
  // TODO: Implement actual email sending logic
  console.log("Sending Email to " + email + ": Subject: " + subject + ", Message: " + message);
};

module.exports = {
  sendEmail,
};
