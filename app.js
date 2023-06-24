const express = require("express");
const bodyParser = require("body-parser");
const request = require ("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;

    console.log(firstName, lastName, email);

    const data ={
        members: [
        { 
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }}]
    };
    
    const jsonData = JSON.stringify(data);

    const url = 'https://us8.api.mailchimp.com/3.0/lists/ba66aca36f';

    const options = {
        method: "POST",
        auth: "anamaria1:e4badc1a4231ae34ed1016fbf859a9ef-us8"
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");;
        }

        response.on("data", function(data){
        //    console.log(JSON.parse(data)); 
        })
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})
//when clicking the submission button in the failure.html's form 
//the user makes the request to be redirected to the root page because it triggers
// the code in line 10, the app.get that sends the root page 


app.listen(process.env.PORT || 3000 , function() {
    console.log("Server started on port 3000");
}); 


// API key 
// e4badc1a4231ae34ed1016fbf859a9ef-us8
// Audience ID
// ba66aca36f