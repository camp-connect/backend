const express = require('express');
// const { auth } = require('express-openid-connect');
var indexrouter = require("./routes/index.js");
const bodyParser = require('body-parser')

require('dotenv').config();
const app = express();

var port = process.env.PORT || 3000;

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.SECRET,
//     baseURL: process.env.BASEURL,
//     clientID: process.env.CLIENTID,
//     issuerBaseURL: process.env.ISSUERBASEURL,

//   };

//middleware
app.use(bodyParser.json());
// app.use(auth(config));

app.use("/", indexrouter);


app.listen(port);