import { calcScore, categScore } from './main.js';

const name = "JohnDoe";  // Example name
const age = 25;          // Example age
const password = "JohnDoe3!";  // Example password

console.log("\n🔍 Checking password:", password);

// Calculate password score
const score = calcScore(password, name, age);
