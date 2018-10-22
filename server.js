const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

//defining the partials location in the project to use in our templates
hbs.registerPartials(__dirname + "/views/partials");

//declaring the view engine to be hbs.
app.set("view engine", "hbs");

//creating a helper that returns the full year
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

//creating a helper that will get a text and turn it into uppercase text
hbs.registerHelper("capitalize", (text) => {
    return text.toUpperCase();
});

// a middle ware that will log the time in the console and a file every time there is a request to our app.
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile("server.log", `${log}\n`, (error) => {
        if(error) {
            console.log("There was an error logging the request");
        }
    });

    next();
});

//
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//making the path in the url to able to call for specific html pages that present in the public directory.
app.use(express.static(__dirname + "/public"));

//routers
app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: "Home Page",
        hTitle: "Home",
        welcomeMessage: "Welcome user!",
    })
});

app.get('/about', (req, res) => {
    res.render("about.hbs", {
        title: "About Page",
        hTitle: "About Page",
    });
});

//initializing the server
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});