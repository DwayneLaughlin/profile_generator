const fs = require('fs');
const inquirer = require('inquirer')



console.log('work')

inquirer
    .prompt([
        {
            type: "input",
            message: "what's your favorite color?",
            name: "choice"
        },
        {
            type: "input",
            message: "what is your github username?",
            name: "userName"
        }
      
    ])
    .then(answers => {
        fs.writeFile("log.pdf", JSON.stringify(answers), (err) => {
            if (err) {
                return console.log(err);
            }
        })
        
            
       
     
      
    })