# profile_generator
An application that uses Node to generate githib profiles.

The pdf file is generated using a combination of pdfkit and fs packages. 

Inquirer is used to get information from the user. The favorite color is applied as the background color of the pdf document by creating a rectangle to cover the pdf and setting the color to the answer that is submitted. If the color submitted is not recognized as a color the page defaults to white. 

The user name fills out the call for github's API. Once submitted the information is pulled from the API and fills in the information available for that user. 

Go to https://drive.google.com/file/d/1M92mnwpmKBEKtnELk8g49062Fli68UqV/view to see a video of the app in action
