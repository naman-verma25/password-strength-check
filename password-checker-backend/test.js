import { calcScore, categScore } from './main.js';

const name = "JohnDoe";
const age = 25;
const password = "JohnDoe3!";

console.log("\n🔍 Checking password:", password);

// Calculate password score
const score = calcScore(password, name, age);
