import inquirer from "inquirer";
import chalk from "chalk";
export async function usrInput() {
    const Input = await inquirer.prompt([{
            type: "input",
            name: "action",
            validate: function (input) {
                if (input !== "" && Number(input) && parseInt(input) < 4 && parseInt(input) !== 0) {
                    return true;
                }
                else {
                    let msg = console.log(chalk.bgRed(`Please Enter a number between 1 to 3`));
                    return msg;
                }
            }
        }]);
    return Input.action;
}
