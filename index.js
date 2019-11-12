const fs = require('fs');
const inquirer = require('inquirer')


console.log('work')

inquirer
    .prompt([
        {
        type: "input",
        message: "what's your favorite color?",
        name: "choice",
        }
       
    ])
    .then(answers => {
        console.log("your favorite color is " + answers.choice)
    })