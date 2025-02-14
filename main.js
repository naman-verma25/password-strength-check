// Main program logic, which calls the functions and prints the report
import { commonPasswords } from './commpass.js';
import { checkStrenth, containsDetails, crackTime, isCommon } from './function.js'

export function calcScore(password, name, age) {
  let score = checkStrenth(password);
  if (!containsDetails(password, name, age)){
    score++;
  } else {
    score -= 2;
  }

  const timeToCrack = crackTime(password);
  if (timeToCrack.includes("second/s")) { 
    score += 1;
  } else if (timeToCrack.includes("minute/s")) { 
    score += 2;
  } else if (timeToCrack.includes("hour/s")) { 
    score += 3;
  } else if (timeToCrack.includes("day/s")) { 
    score += 4; 
  } else { 
    score += 5;
  }


  if(isCommon(password)) {
    score = 0;
  } else {
    score++;
  }

  console.log(categScore(score));
  return score;
}

export function categScore(score) {
  if (score >= 0 && score < 4) {
    return `Your password is VERY WEAK and has a score of ${score}/13`;
  } else if (score >= 4 && score < 7) {
    return `Your password is WEAK and has a score of ${score}/13`;
  } else if (score >= 7 && score < 9) {
    return `Your password is MODERATE and has a score of ${score}/13`;
  } else if (score >= 9 && score < 11) {
    return `Your password is STRONG and has a score of ${score}/13`;
  } else {
    return `Your password is VERY STRONG and has a score of ${score}/13`;
  }
}