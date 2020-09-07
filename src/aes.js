const crypto = require("crypto");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cliProgress = require("cli-progress");
const clipboardy = require("clipboardy");
const resoutput = require("./result");

function aes(v) {
  //진행바
  const bare = new cliProgress.SingleBar(
    {
      format:
        "Encryption 🔏 |" + "{bar}" + "| {percentage}% | {value}/{total} ",
    },
    cliProgress.Presets.shades_classic
  );
  const bard = new cliProgress.SingleBar(
    {
      format:
        "Decryption 🔐 |" + "{bar}" + "| {percentage}% | {value}/{total} ",
    },
    cliProgress.Presets.shades_classic
  );
  //암호화
  const encryptaes = (string, k) => {
    console.log(chalk.gray("Please wait... ⏱\n"));
    bare.start(5, 0);
    var system = "aes" + v;
    bare.update(1);
    var ciper = crypto.createCipher(system, k);
    bare.update(2);
    ciper.update(string, "utf8", "base64");
    bare.update(3);
    var output = ciper.final("base64");
    bare.update(4);
    clipboardy.writeSync(output);
    bare.update(5);
    bare.stop();
    console.log("");
    resoutput(output);
  };
  //복호화
  const decryptaes = (string, k) => {
    console.log(chalk.gray("Please wait... ⏱\n"));
    bard.start(5, 0);
    var system = "aes" + v;
    bard.update(1);
    var deciper = crypto.createDecipher(system, k);
    bard.update(2);
    deciper.update(string, "base64", "utf8");
    bard.update(3);
    try {
      var outputd = deciper.final("utf8");
      bard.update(4);
      clipboardy.writeSync(outputd);
      bard.update(5);
      bard.stop();
      console.log("");
      resoutput(outputd);
    } catch (err) {
      bard.stop();
      console.log("❌ Password or String is incorrect! ❌");
    }
  };
  const ec = () => {
    inquirer
      .prompt([
        {
          type: "rawlist",
          name: "ecs",
          message: "Select",
          choices: ["Encryption", "Decryption"],
        },
      ])
      .then((answer) => {
        aesq(answer.ecs);
      });
  };

  const aesq = (ect) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "string",
          message: "Type string 🖋 ",
        },
        {
          type: "password",
          name: "passwd",
          message: "Type password 🔐 ",
        },
        {
          type: "confirm",
          name: "confirm",
          message: "Is it right??",
          default: true,
        },
      ])
      .then((answer) => {
        if (answer.confirm == true) {
          if (ect == "Encryption") {
            encryptaes(answer.string, answer.passwd);
          } else if (ect == "Decryption") {
            decryptaes(answer.string, answer.passwd);
          }
        } else {
          aesq();
        }
      });
  };
  ec();
}

module.exports = aes;
