#!/usr/bin/env node
const commander = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cliProgress = require("cli-progress");
const package = require("./package.json");
const sha = require("./src/sha");
const aes = require("./src/aes");

const ver = package.version;

const ordermsg = [
  "SHA-1",
  "SHA-256",
  "SHA-512",
  "AES-128",
  "AES-256",
  "quit ⭐️",
  //new inquirer.Separator(),
];
const order = () => {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "order",
        message: "Select System",
        choices: ordermsg,
      },
    ])
    .then((answer) => {
      console.log(chalk.rgb(128, 128, 128)(answer.order + " is selected"));
      if (answer.order == ordermsg[0]) {
        sha(1);
      } else if (answer.order == ordermsg[1]) {
        sha(256);
      } else if (answer.order == ordermsg[2]) {
        sha(512);
      } else if (answer.order == ordermsg[3]) {
        aes(128);
      } else if (answer.order == ordermsg[4]) {
        aes(256);
      } else if (answer.order == ordermsg[5]) {
        console.log("Good Bye!! 👋");
        process.exit(1);
      } else {
        console.log("Not Found");
      }
    });
};

commander.version(ver, "-v, --version").usage("[option]");
commander
  //   .arguments("<count>")
  //   .option("-u, --username [username]", "깃허브 계정", "account")
  //   .option("-e, --email [email]", "이메일", "account")
  .action(function (count) {
    console.log(
      chalk.rgb(128, 128, 128)("cyper cli ver. " + ver + ' | type "help"')
    );
    order();
  })
  .parse(process.argv);
commander
  .command("*", { noHelp: true }) // 도움말을 띄우지 말고,
  .action(() => {
    console.log("해당 명령어를 찾을 수 없습니다.");
    program.help();
  });
