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
            fs.writeFile("profgen.pdf", queryURL, (err) => {
                if (err) {
                    return console.log(err);
                } else {
                    const doc = new pdf;
                    
                    doc.rect(0, 0, 700, 800)
                    .fillColor("black")
                    .fillAndStroke(answers.choice)
                    doc.pipe(fs.createWriteStream('profgen.pdf'));
                    doc.font('Times-Roman')
                    doc.fontSize(18)
                    doc.fillColor("black")
                    .text(results.data.avatar_url)
                    doc.text(JSON.stringify("Location: " + results.data.location))
                    doc.text(JSON.stringify("URL: " + results.data.html_url))
                    
                    doc.end();
                }
    
             
            
            }) 
        })
        

        

        
    })