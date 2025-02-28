// Main program logic, which calls the functions and prints the report
import { checkStrenth, containsDetails, crackTime, isCommon } from './function.js';
import axios from 'axios';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// This function helps calculating the score based on the criterias
export function calcScore(password, name, age) {
  let score = checkStrenth(password);
  let factors = [];

  if(isCommon(password)) {
    score = 0;
    factors.push("common");
    console.log(categScore(score));
    return score;
  } else {
    score++;
  }

  if (!containsDetails(password, name, age)){
    score++;
  } else {
    score -= 2;
    factors.push("details");
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

  console.log(`⏳ Estimated time to crack password using Brute Force: ${timeToCrack}`);
  console.log(categScore(score));
  return { score, factors, timeToCrack};
}

// This function helps categorising the score and conidtion.
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

// Function to get words related to interest by using Datamuse API
async function getRelated(interest) {
  try {
    const resp = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(interest)}`);
    const summary = resp.data.extract; // Get the Wikipedia summary text

    // Extract words from the summary, filtering for meaningful words
    const words = summary.match(/\b[A-Za-z]{5,}\b/g) || []; // Get words with 5+ letters
    const uniqueWords = [...new Set(words)]; // Remove duplicates
    return uniqueWords.slice(0, 5); // Return the first 5 unique words
  } catch (error) {
    console.error('Error fetching related words from Wikipedia: ', error);
    return [];
  }
}

// Function to generate 5 passwords based on Interest through NLP
async function generatePass(interest, failedCond) {
  const related = await getRelated(interest);
  let passwords = [];

  // generate 5 passwords
  for (let i = 0; i < 5; i++) {
    let password = '';
    const word1 = related[Math.floor(Math.random() * related.length)];
    const word2 = related[Math.floor(Math.random() * related.length)];
    let num = Math.floor(Math.random() * 100) + 1;
    let special = '!@#$%^&*()_+';

    if (failedCond.includes("details")) {
      password = word1.charAt(0).toUpperCase() + word1.slice(1) + num + word2.charAt(0).toUpperCase() + word2.slice(1) + special.charAt(Math.floor(Math.random() * special.length));
    } else {
      password = word1.charAt(0).toUpperCase() + word1.slice(1) + word2.charAt(0).toUpperCase() + word2.slice(1) + '123';
    }

    if (password.length < 12) {
      password += '123';
    }
    if (password.length > 14) {
      password = password.substring(0,14);
    }

    while (crackTime(password) < 100) {
      password = word1.charAt(0).toUpperCase() + word1.slice(1) + word2.charAt(0).toUpperCase() + word2.slice(1) + '2023#' + special.charAt(Math.floor(Math.random() * special.length));
    }

    passwords.push(password);
  }

  return passwords.sort((a, b) => crackTime(b) - crackTime(a));
}


// Function to ask questions and process input
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function start() {
  // Ask user for their name, age, and password
  const name = await askQuestion("Enter your name: ");
  const age = await askQuestion("Enter your age: ");
  const password = await askQuestion("Enter your password: ");
  const interest = await askQuestion("Enter your interest: ");

  const {score, factors, timeToCrack} = calcScore(password, name, age);

  let failedConditions = factors;
  if (timeToCrack.includes('second/s') || timeToCrack.includes('minute/s')) {
    failedConditions.push('weak crack time');
  }

  // If the user failed conditions, adjust AI generation
  console.log("\nPassword conditions have been tracked. Generating 5 stronger passwords...");

  // Generate 5 recommended passwords
  const recommendedPasswords = await generatePass(interest, failedConditions);

  console.log("\nHere are 5 recommended passwords based on your interest:");
  recommendedPasswords.forEach((pwd, index) => {
    console.log(`${index + 1}. ${pwd} (Crack time: ${crackTime(pwd)})`);
  });
  
  // Close the readline interface after processing
  rl.close();
}

// Start the program
start();