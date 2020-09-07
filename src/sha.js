const crypto = require("crypto");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cliProgress = require("cli-progress");
const clipboardy = require("clipboardy");

function sha(v) {
  const bar1 = new cliProgress.SingleBar(
    {
      format: "Hashing ⛓ |" + "{bar}" + "| {percentage}% | {value}/{total} ",
    },
    cliProgress.Presets.shades_classic
  );

  const cryptsha = (string) => {
    console.log(chalk.rgb(128, 128, 128)("Please wait... 🔒"));
    bar1.start(5, 0);
    var system = "sha" + v;
    bar1.update(1);
    var shasum = crypto.createHash(system);
    bar1.update(2);
    shasum.update(string);
    bar1.update(3);
    var output = shasum.digest("hex");
    bar1.update(4);
    clipboardy.writeSync(output);
    bar1.update(5);
    bar1.stop();
    console.log("");
    console.log("result: " + output);
    console.log("Result is copied to clipboard");
  };
  const shaq = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "string",
          message: "Type string 🖋 ",
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
          cryptsha(answer.string);
        } else {
          shaq();
        }
      });
  };
  shaq();
}
module.exports = sha;
