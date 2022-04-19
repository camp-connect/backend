const express = require('express');
var indexrouter = require("./routes/index.js");
const bodyParser = require('body-parser')
require('dotenv').config();
const { Pool } = require("pg");
const { response } = require('express');

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

//student table
// const student = `CREATE TABLE IF NOT EXISTS students(
//     name varchar(100) NOT NULL,
//     roll varchar(30) NOT NULL,
//     roomNo varchar(10) NOT NULL,
//     password varchar(30) NOT NULL,
//     email varchar(100) PRIMARY KEY,
//     personalContact varchar(12) NOT NULL,
//     parentsContact varchar(12) NOT NULL,
//     mentor varchar(50) NOT NULL,
//     approved boolean NOT NULL DEFAULT FALSE);
// `;

// pool.query(student, [], (err, result) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log("Successful creation of the 'student' table");
// });


// //admin table
// const admin = `CREATE TABLE IF NOT EXISTS admin(
//     email varchar(100) PRIMARY KEY,
//     password varchar(30) NOT NULL,
//     adminName varchar(100) NOT NULL,
//     empID varchar(50) NOT NULL,
//     personalContact varchar(20) NOT NULL);
// `;
  
// pool.query(admin, [], (err, result) => {
//     if (err) {
//         return console.error(err.message);
//       }
//     console.log("Successful creation of the 'admin' table");
// });


// //hostel table
// const hostel = `CREATE TABLE IF NOT EXISTS hostel(
//     name varchar(100) NOT NULL,
//     roomNO varchar(10) NOT NULL,
//     hostelNO varchar(2) NOT NULL,
//     roll varchar(30) PRIMARY KEY
// );`;

// pool.query(hostel, [], (err, result) => {
//     if (err) {
//         return console.error(err.message);
//       }
//     console.log("Successful creation of the 'hostel' table");
// });


// //outpass table

// const outpass = `CREATE TABLE IF NOT EXISTS outpass(
//     outID serial PRIMARY KEY,
//     purpose varchar(200) NOT NULL,
//     outTime Time NOT NULL,
//     inTime Time NOT NULL,
//     outDate Date NOT NULL,
//     inDate Date NOT NULL,
//     Name Varchar(100) NOT NULL,
//     roll varchar(30) NOT NULL

// );`;

// pool.query(outpass, [], (err, result) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log("Successful creation of the 'outpass' table");
// })


// //isue table

// const issue = `CREATE TABLE IF NOT EXISTS issue(
//     issueid serial PRIMARY KEY,
//     name varchar(100) NOT NULL,
//     roll varchar(10) NOT NULL,
//     roomno varchar(10) NOT NULL,
//     personalContact varchar(20) NOT NULL,
//     issue varchar(200) NOT NULL
// );`;

// pool.query(issue, [], (err, result) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log("Successful creation of the 'issue' table");
// })


// //notice

// const notice = `CREATE TABLE IF NOT EXISTS notice(
//     adminid varchar(10),
//     roll varchar(10) ,
//     time time NOT NULL,
//     date date NOT NULL,
//     notice varchar(200) NOT NULL,
//     PRIMARY KEY(adminid, roll)
// );`;

// pool.query(notice, [], (err, result) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log("Successful creation of the 'notice' table");
// })

//APIs

//signup student
app.post("/api/signup/student", (req, res) => {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var name = req.body.name;
    var roll = req.body.roll;
    var room = req.body.room;
    var personalContact = req.body.personalContact;
    var parentsContact = req.body.parentsContact;
    var mentor = req.body.mentor;

    const ins = `insert into students (name, roll, roomNo, password, email, personalContact, parentsContact, mentor) values('${name}', '${roll}', '${room}', '${userPassword}', '${userEmail}', '${personalContact}', '${parentsContact}', '${mentor}');`;
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


//login student
app.post("/api/login/student", (req, res) =>  {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    const chkUser = async () =>{
        const q = `select name, roll, roomNo, email, personalContact, parentsContact, mentor  from students where email = '${userEmail}' and password = '${userPassword}';`
        await pool.query(q, [], (err, result) =>{
            if(err){
                console.error(err.message);
                return res.status(500).json({msg: "error"});
            }
            else{
                if(result.rowCount != 0){
                    return res.status(200).json(result.rows[0]);
                }
                else{
                    return res.status(401).json({msg: "invalid credentials"});
                }
            }
        })
    }
    
    chkUser();
})

//////////////////////////////////////////////////////////////////////////////////////////////////

//signup admin
app.post("/api/signup/admin", (req, res) => {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var adminName = req.body.adminName;
    var empID = req.body.empID;
    var personalContact = req.body.personalContact;

    const ins = `insert into admin (adminName, password, email, empID, personalContact) values('${adminName}', '${userPassword}', '${userEmail}', '${empID}', '${personalContact}');`;
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


//login admin
app.post("/api/login/admin", (req, res) =>  {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    const chkUser = async () =>{
        const q = `select adminName, email, empID, personalContact  from admin where email = '${userEmail}' and password = '${userPassword} and ';`
        await pool.query(q, [], (err, result) =>{
            if(err){
                console.error(err.message);
                return res.status(500).json({msg: "error"});
            }
            else{
                if(result.rowCount != 0){
                    return res.status(200).json(result.rows[0]);
                }
                else{
                    return res.status(401).json({msg: "invalid credentials"});
                }
            }
        })
    }
    
    chkUser();
})

////////////////////////////////////////////////////

// vereification
app.post("api/verify", (req, res) =>{
    var userEmail = res.body.userEmail;
    
    const verify = async ()=>{
        const q = `update table student set approved = true where email = "${userEmail}";`
        await pool.query(q, [], (err, result) =>{
            if(err){
                console.error(err.message);
                return res.status(500).json({msg: "error"});
            }
            else{
                return res.status(200).json({msg: "user approved"});
            }
        })
    }
})
app.listen(port);       
