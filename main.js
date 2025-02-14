// Main program logic, which calls the functions and prints the report
import { commonPasswords } from './commpass.js';
import { checkStrenth, containsDetails, crackTime, isCommon } from './function.js'

export function calcScore(password, name, age) {
  const score = checkStrenth(password);
  if (!containsDetails(password, name, age)){
    score++;
  }

  if(crackTime(password).includes("second")) {
    score += 1;
  } else if(crackTime(password).includes("minute")) {
    score += 2;
  } else if (crackTime(password).includes("hour")) {
    score += 3;
  } else {
    score += 4;
  }

  if(isCommon(password)) {
    return 0;
  } else {
    score++;
  }

  return score;
}

export function categScore(password, name, age) {
  const score = calcScore(password, name, age);
  if (score >= 0 && score < 5) {
    return `Your password is VERY WEAK and has a score of ${score}/18`;
  } else if (score >= 5 && score < 8) {
    return `Your password is WEAK and has a score of ${score}/18`;
  } else if (score >= 8 && score < 12) {
    return `Your password is MODERATE and has a score of ${score}/18`;
  } else if (score >= 12 && score < 16) {
    return `Your password is STRONG and has a score of ${score}/18`;
  } else {
    return `Your password is VERY STRONG and has a score of ${score}/18`;
  }
}