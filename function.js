// This file will contain all the functions that will check the strength of the password
import { commonPasswords } from './commpass.js';

// defining constant
const secInMin = 60;
const minInHour = 60;
const hourInDay = 24;

// Checks the strength of the password, by returning a strength score
export function checkStrenth(password) {
  let strength = 0;

  // checking for the length of the password
  if (password.length >= 8) {
    strength++;
    console.log("✅ Password length is at least 8 characters");
  } else {
    console.log("❌ Password length is too short (less than 8 characters)");
  }

  if (password.length >= 12) {
    strength++;
    console.log("✅ Password length is at least 12 characters");
  } else {
    console.log("❌ Password length is short (less than 12 characters)");
  }

  // checking for lower case in password.
  if (/[a-z]/.test(password)) {
    console.log("✅ Password contains lowercase letters");
    strength++;
  } else {
    console.log("❌ Password does not contain lowercase letters");
  }

  // checking for upper case in password.
  if(/[A-Z]/.test(password)) {
    console.log("✅ Password contains uppercase letters");
    strength++;
  } else {
    console.log("❌ Password does not contain uppercase letters");
  }

  // checking for numbers in password.
  if(/\d/.test(password)) {
    console.log("✅ Password contains numbers letters");
    strength++;
  } else {
    console.log("❌ Password does not contain numbers");
  }

  // checking for special characters in password.
  if(/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    console.log("✅ Password contains special characters");
    strength++;
  } else {
    console.log("❌ Password does not contain special characters");
  }

  return strength;
}

// this function is used to check if the password contains the name or age
// of the user, which will help determine the strength score
export function containsDetails(password, name, age) {
  const details = [name, age.toString()];
  const contains = details.toString(detail => password.toLowerCase().includes(detail.toLowerCase()));

  if (contains) {
    console.log("❌ Password contains personal details (name or age)");
  } else {
    console.log("✅ Password does not contain personal details");
  }

  return contains;
}

// This function is used to calculate the time taken for the password to be cracked
export function crackTime(password) {
  const len = password.length;
  const complexity = (/[a-z]/.test(password) ? 26 : 0) +
                     (/[A-Z]/.test(password) ? 26 : 0) +
                     (/\d/.test(password) ? 10 : 0) +
                     (/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 32 : 0);

  // combination for the possible password and the time taken
  // in seconds to crack it.                   
  const combinations = Math.pow(complexity, len);
  const sec = combinations/ (1000000000);

  //calculating the time taken to crack this password using brute force
  let result;
  if (sec < secInMin) {
    result = `${Math.round(sec)} second/s`;
  } else {
    const min = sec / secInMin;
    if (min < minInHour) {
      result = `${Math.round(min)} minute/s`;
    } else {
      const hour = min / minInHour;
      if (hour < hourInDay) {
        result = `${Math.round(hour)} hour/s`;
      } else {
        const days = hour / hourInDay;
        result = `${Math.round(days)} day/s`;
      }
    }
  }

  console.log(`⏳ Estimated time to crack password using Brute Force: ${result}`);
  return result;
}

// This function checks if the password is in the 100 most common passwords
export function isCommon(password) {
  if (commonPasswords.has(password)) {
    console.log("❌ Password is too common");
    return true;
  } else {
    console.log("✅ Password is not in common password list");
    return false;
  }
}

