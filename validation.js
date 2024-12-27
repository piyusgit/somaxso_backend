const validator = require("validator");

const validationData = (req) => {
  const { firstname, lastname, email, phone, message } = req.body;

  console.log(firstname, lastname, email, phone, message);
  if (!firstname || !lastname || !email || !phone || !message) {
    return { status: 400, message: "All input is required" };
  }
  if (
    firstname.length < 3 ||
    (firstname.length > 10 && lastname.length < 3) ||
    lastname.length > 10
  ) {
    return { status: 400, message: "Name must be between 3 and 10 characters" };
  }
  if (phone.length < 10 || phone.length > 10) {
    return { status: 400, message: "Phone number must be 10 digits" };
  }
  if (!validator.isEmail(email)) {
    return { status: 400, message: "Invalid email" };
  }
  if (message.length < 10) {
    return { status: 400, message: "Message must be at least 10 characters" };
  }
  return null;
};

module.exports = validationData;
