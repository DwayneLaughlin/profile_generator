const fs = require('fs');
const inquirer = require('inquirer')
const pdf = require('pdfkit')
const axios = require('axios');






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

        axios
        .get(queryURL)
        .then(function(results){
            console.log(results.data.id)
            fs.writeFile("log.pdf", queryURL, (err) => {
                if (err) {
                    return console.log(err);
                } else {
                    const doc = new pdf;
                    
                    // doc.rect(max,max,max,max)
                    doc.pipe(fs.createWriteStream('profgen.pdf'));
                    doc.font('Times-Roman')
                    doc.fontSize(18)
                    doc.text(JSON.stringify(results.data.id + results.data.name)).fillColor("red")
                    
                    doc.end();
                }
    
             
            
            }) 
        })
        

        

        
    })