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
            fs.writeFile("profgen.pdf", queryURL, (err) => {
                if (err) {
                    return console.log(err);
                } else {
                    const doc = new pdf;
                    
                    // makes rectangle same color as favorite color prompt. Defaults to white if no color
                    doc.rect(0, 0, 700, 800)
                    .fillColor("white")
                    .fillAndStroke(answers.choice)
                    // pulls answers from prompt and pipes to pdf file
                    doc.pipe(fs.createWriteStream('profgen.pdf'));
                    // links inquire/js output to pdf
                    doc.fontSize(20)
                    .fillColor("black")
                    .text("I'm " + results.data.name + ".", {
                        width: 500,
                        align: 'center'   
                    });
                    doc.fontSize(10)
                    .fillColor("black")
                    .text("See my profile picture at " + JSON.stringify(results.data.avatar_url),{
                        align: 'center'
                    });
                    
                    doc.font("Times-Roman")
                    .moveDown(2)
                    .fontSize(14)
                    .text("Location: " + JSON.stringify(results.data.location),{
                        align: 'left',
                        continued:true
                    })
                    .text("GitHub: " +JSON.stringify(results.data.html_url),{
                        align: "right"
                    });

                    doc.font("Times-Roman")
                    .moveDown(1)
                    .fontSize(14)
                    .text("Followers: " + JSON.stringify(results.data.followers),{
                        align: 'left',
                        continued:true
                    })
                    .text("Following: " + JSON.stringify(results.data.following),{
                        align: "center",
                        continued: true
                    })
                    .text("Repositories: " + JSON.stringify(results.data.public_repos),{
                        align: "right"

                    });

                    
                    doc.end();
                }
    
             
            
            }) 
        })
        

        

        
    })