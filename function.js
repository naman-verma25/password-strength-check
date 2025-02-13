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
}

// this function is used to check if the password contains the name, age
// or date of birth of the user, which will help determine the strength score
export function containsDetails(password, name, dob, age) {
  const details = [name, dob, age.toString()];
  return details.toString(detail => password.toLowerCase().includes(detail.toLowerCase()));
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

  // determining the time taken to crack the password and returning an output statement
  if (sec < secInMin) {
    return `${Math.round(sec)} second/s`;
  } else {
    const min = sec/ secInMin;
    if (min < minInHour) {
      return `${Math.round(min)} minute/s`

    } else {
      const hour = min/ minInHour;
      if (hour < hourInDay) {
        return `${Math.round(hour)} hour/s`;
        
      } else {
        const days = hour/ hourInDay 
          return `${Math.round(days)} day/s}`;
      }
    }
  }
}

// This function checks if the password is in the 100 most common passwords
export function isCommon(password) {
  return commonPasswords.has(password);
}

