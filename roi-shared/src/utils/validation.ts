// @ts-nocheck

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-z][A-Za-z\s'-]{1,39}$/;
const PHONE_REGEX = /^\d{7,14}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const validateLoginFields = ({ email, password }) => {
  const errors = {};
  const emailValue = String(email || "").trim();
  const passwordValue = String(password || "").trim();

  if (!emailValue) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(emailValue)) {
    errors.email = "Enter a valid email address.";
  }

  if (!passwordValue) {
    errors.password = "Password is required.";
  }

  return errors;
};

export const validateRegisterFields = ({ firstName, lastName, email, countryCode, phoneNumber, password }) => {
  const errors = {};
  const firstNameValue = String(firstName || "").trim();
  const lastNameValue = String(lastName || "").trim();
  const emailValue = String(email || "").trim();
  const phoneValue = String(phoneNumber || "").trim();
  const passwordValue = String(password || "");

  if (!firstNameValue) {
    errors.firstName = "First name is required.";
  } else if (!NAME_REGEX.test(firstNameValue)) {
    errors.firstName = "Enter a valid first name.";
  }

  if (!lastNameValue) {
    errors.lastName = "Last name is required.";
  } else if (!NAME_REGEX.test(lastNameValue)) {
    errors.lastName = "Enter a valid last name.";
  }

  if (!emailValue) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(emailValue)) {
    errors.email = "Enter a valid email address.";
  }

  if (!countryCode) {
    errors.countryCode = "Select country code.";
  }

  if (!phoneValue) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!PHONE_REGEX.test(phoneValue)) {
    errors.phoneNumber = "Phone number must be 7 to 14 digits.";
  }

  if (!passwordValue) {
    errors.password = "Password is required.";
  } else if (!PASSWORD_REGEX.test(passwordValue)) {
    errors.password = "Min 8 chars with upper, lower, number, and special character.";
  }

  return errors;
};
