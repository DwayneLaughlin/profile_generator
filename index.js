const fs = require('fs');
const inquirer = require('inquirer')
const pdf = require('pdfkit')
const test = "hello"
// queryURL = "https://api.github.com/users/" + answers.userName;



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
        queryURL = "https://api.github.com/users/" + answers.userName;

        fs.writeFile("log.pdf", queryURL, (err) => {
            if (err) {
                return console.log(err);
            } else {
                const doc = new pdf;
                doc.pipe(fs.createWriteStream('profgen.pdf'));
                doc.font('Times-Roman')
                doc.fontSize(18)
                doc.text(queryURL)
                doc.end();
            }
        }) 
    })


  
