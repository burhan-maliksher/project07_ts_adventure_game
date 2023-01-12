#! /usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { usrInput } from "./_input.js";
import { randomNo } from "./_randomNo.js";
import { titleTimer } from "./_title.js";
class Game {
    constructor() {
    }
    // run the app
    async Run() {
        await this.AppTitle();
        await this.App();
    }
    // autor watermark on app at the begening
    async AppTitle() {
        const title = chalkAnimation.neon(`__________________Welcome to M.B Adventure Game__________________`);
        await titleTimer();
        title.stop();
        console.log(chalk.bgRed.italic(`                                                             Autor:"M.B"`));
        // return;
    }
    // public async main(arry:string[]){
    async App() {
        // let choice= await usrInput();
        // console.log(choice);
        // // system objects
        // const usrInput=await inquirer.prompt([{
        //     type:"input",
        //     name:"action",
        //     validate:function(input:string){
        //         if(input!=="" && Number(input) && parseInt(input)!>3 && parseInt(input)!==0){
        //             return true;
        //         }
        //         else{
        //             let msg=console.log(chalk.bgRed(`Please Enter a number between 1 to 3`));
        //             return msg
        //         }
        //     }
        // }]);
        // // random number generator between o to max limit provided
        // function randomNo(maxNo:number) {
        //     return Math.floor(Math.random()*(maxNo+1))
        // }
        // let randomNo=Math.random()
        // Game variables
        let enemies = ["Skeleton", "Zombie", "Warrior", "Assasain"];
        let maxEnemyHealth = 75;
        let enemyAttackDamage = 25;
        // player variable
        let health = 100;
        let attackDamage = 50;
        let numHealthPortion = 3;
        let healthPortionHealAmount = 30;
        let healthPortionDropChance = 50; //percentage
        let running = true;
        console.log(chalk.cyanBright(`Welcome to the Dungon!`));
        Game: while (running) {
            console.log(chalk.bgCyan(`-----------------------------------`));
            // health of enemy appeared
            let enemyHealth = randomNo(maxEnemyHealth);
            // randomly choosing an enemy from the enemy list
            let enemy = enemies[randomNo(enemies.length)];
            console.log(chalk.redBright(`\t # ${enemy}  appeared! #\n`));
            // usr options once an enemy appeared
            while (enemyHealth > 0) {
                console.log(chalk.cyan(`\t Your Hp: ${health}`));
                console.log(chalk.cyan(`\t ${enemy} 's Hp: ${enemyHealth}`));
                console.log(chalk.cyan(`\n\t What would you like to do?`));
                console.log(chalk.cyan(`\t1. Attack`));
                console.log(chalk.cyan(`\t2. Drink health protion`));
                console.log(chalk.cyan(`\t3. Run`));
                // calling inquirer prompt for user input 
                // usrInput;
                let choice = await usrInput();
                // console.log(choice);
                // break;
                if (choice == "1") {
                    let damageDealt = randomNo(attackDamage); //damage to enemy
                    let damageTaken = randomNo(enemyAttackDamage); //damage to usr
                    enemyHealth -= damageDealt;
                    health -= damageTaken;
                    console.log(chalk.cyan(`\t You strike the ${enemy} for ${damageDealt} damage`));
                    console.log(chalk.cyan(`\t You receive ${damageTaken} in retaliation`));
                    // conditon if the usr is killed by enemy
                    if (health < 1) {
                        console.log(chalk.bgRed(`\t You have taken too much damage, you are too weak to go on!`));
                        break;
                    }
                }
                else if (choice == "2") {
                    if (numHealthPortion > 0) {
                        health += healthPortionHealAmount;
                        numHealthPortion--;
                        console.log(chalk.greenBright(`\t You drink a health portion, healing yourself for ${healthPortionHealAmount}  .
                                \n\t You now have ${health} Hp.
                                \n\t You have ${numHealthPortion} health portion left`));
                    }
                    else {
                        console.log(chalk.red(`\t You have no health portions left! Defeat enemies for a chance to get one `));
                    }
                }
                else {
                    console.log(chalk.blue(`\t You run away from the ${enemy} !`));
                    //this will skip the code below and run the Game labeled loop    
                    continue Game;
                }
            }
            // checking why usr is out of game loop
            if (health < 1) {
                console.log(chalk.blueBright(`You limp out of the dungeon, weak from battle.`));
                break;
            }
            console.log(chalk.blue(`-----------------------------------`));
            console.log(chalk.blue(`# enemy ${enemy} was defeted #`));
            console.log(chalk.blue(`# You have  ${health} Hp left.#`));
            if (randomNo(100) < healthPortionDropChance) {
                numHealthPortion++;
                console.log(chalk.blue(`# The ${enemy} dropped a heath portion #`));
                console.log(chalk.blue(`# You now have  ${numHealthPortion} heath portion(s). #`));
            }
            console.log(chalk.blue(`-------------------------------------`));
            console.log(chalk.blue(`What would you like to do!`));
            console.log(chalk.blue(`1. Continue fighting`));
            console.log(chalk.blue(`2. Exit dungeon`));
            // usrInput;
            let choice = await usrInput();
            while (choice == "3") {
                console.log(chalk.red(`invalid command`));
                usrInput;
                choice = await usrInput();
            }
            if (choice == "1") {
                console.log(chalk.cyan(`You continue on your adventure!`));
            }
            else {
                console.log(chalk.cyan(`You exit the dungeon, successful from the adventure`));
                break;
            }
        }
        ;
        console.log(chalk.green(`##############################`));
        console.log(chalk.green(`# THANKS FOR PLAYING #`));
        console.log(chalk.bgRed(`                     Autor:M.B`));
        console.log(chalk.green(`##############################`));
        // end of main method
    }
}
let run = new Game();
run.Run();
