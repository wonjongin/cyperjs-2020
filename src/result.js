const chalk = require("chalk");

function resoutput(res) {
  console.log(chalk.bold("📌 Result: ") + chalk.bold.blue(res));
  console.log(chalk.bold("📌 Result is copied to clipboard automatically! 📋"));
}

module.exports = resoutput;
