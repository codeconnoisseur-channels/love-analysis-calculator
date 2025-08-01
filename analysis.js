const fs = require("fs");

const loveAnalysis = async (name1, name2) => {
  const procedure = (msg, delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(msg);
        resolve();
      }, delay);
    });
  };

  await procedure("Calculating compatibility", 1000);
  await procedure("Analyzing hearts...", 2000);
  await procedure("Generating results...", 3000);

  const score1 = Math.floor(Math.random() * 101);

  const score2 = Math.floor(Math.random() * 101);

  const average = (score1 + score2) / 2;

  let message = "";
  if (average <= 30) {
    message = "Uh-oh... Maybe stay friends";
  } else if (average > 30 && average <= 60) {
    message = "There's potential. Keep trying";
  } else if (average > 60 && average <= 85) {
    message = "You both are a great match";
  } else if (average > 85 && average <= 100) {
    message = "Perfect soulmates";
  } else {
    message = "No match";
  }

  return {
    name1,
    name2,
    score1,
    score2,
    average,
    message,
  };
};
module.exports = { loveAnalysis };
