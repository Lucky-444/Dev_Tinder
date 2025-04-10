const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("please enter firstName and lastName");
  } else if (firstName.length < 2 || firstName.length > 50) {
    throw new Error("firstName should be between 4 and 50 characters long");
  } else if (lastName.length < 2 || lastName.length > 50) {
    throw new Error("lastName should be between 4 and 50 characters long");
  } else if (!email || !validator.isEmail(email)) {
    throw new Error("Please enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};


module.exports = { validateSignupData, validateEditProfileData };
