// This file will contain all the functions that will check the strength of the password
import { commonPasswords } from './commpass.js';

// Checks the strength of the password, by returning a strength score
export function checkStrenth(password) {
  let strength = 0;

  // checking for the length of the password
  if (password.length >= 8) {
    strength++;
  }

  if (password.length >= 12) {
    strength++;
  }

  // checking for lower case in password.
  if(/[a-z]/.test(password)) {
    strength++;
  }

  // checking for upper case in password.
  if(/[A-Z]/.test(password)) {
    strength++;
  };

  // checking for numbers in password.
  if(/\d/.test(password)) {
    strength++;
  }

  // checking for special characters in password.
  if(/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength++;
  }

  // checking if the password is in the 100 most common passwords
  if (commonPasswords.has(password)) {
    strength == 0;
  }

  return strength;
};