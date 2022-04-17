const express = require('express');
var indexrouter = require("./routes/index.js");
const bodyParser = require('body-parser')
require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    user: "iyhkixuy",
    host: "rosie.db.elephantsql.com",
    database: "iyhkixuy",
    password: "a6sU_mXJolUT9BKKc6K5hW5MWUyUjV3g",
    port: 5432
  });
  

const app = express();

var port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
// app.use(auth(config));

app.use("/", indexrouter);

//database

const student = `CREATE TABLE IF NOT EXISTS students(
    name varchar(50) NOT NULL,
    roll char(12) NOT NULL,
    roomNo varchar(3) NOT NULL,
    hostel varchar(10) NOT NULL,
    password varchar(50) NOT NULL,
    email varchar(30) PRIMARY KEY);
`;

pool.query(student, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'student' table");
  });
  

//APIs

//signup
app.post("/api/signup", (req, res) => {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var hostel = req.body.hostel;
    var name = req.body.name;
    var roll = req.body.roll;
    var room = req.body.room;

    const ins = `insert into students (name, roll, roomNo, hostel, password, email) values('${name}', '${roll}', '${room}', '${hostel}', '${userPassword}', '${userEmail}');`;
    pool.query(ins, [], (err, result) =>{
        if (err) {
            console.error(err.message);
            res.status(400).json({status: false});
        }
        else{
            res.status(200).json({status: true});
        }
        
    })

})


//login
app.get("/api/login", (req, res) =>  {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    const chkUser = async () =>{
        const q = `select email, password from students where email = '${userEmail}' and password = '${userPassword}';`
        await pool.query(q, [], (err, result) =>{
            if(err){
                console.error(err.message);
                return res.status(400).json({msg: "error"});
            }
            else{
                if(result.rowCount != 0){
                    return res.status(200).json(result.rows[0]);
                }
                else{
                    return res.status(203).json({msg: "invalid credentials"});
                }
            }
        })
    }
    
    chkUser();
})


//


app.listen(port);       
