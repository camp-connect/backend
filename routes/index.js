var express = require('express');
var router = express.Router();

router.get("/api/login", (req, res) =>  {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    const chkUser = () =>{
        if(userEmail === 'testuser@jklu.edu.in' & userPassword === "rootAccess"){
            res.status(200).json({UserEmail:userEmail, redirect:true});
        }
        else{
            res.status(500).json({UserEmail:null , redirect:false});
        }
    }
    
    chkUser();
})

module.exports = router;