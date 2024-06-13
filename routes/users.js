// var mysql = require ('mysql2');
// var connection = mysql.createConnection( {
//     host: "localhost",
//     user: "root",
//     password: "abc1234",
//     database: "pmsdatabase"
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected Successfully!");
// });

const { compare } = require('bcrypt');
const fs = require('fs');
let userInfo  = JSON.parse(fs.readFileSync('./data/userdb.json', 'utf-8'));

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getUsers=()=>{
    return userInfo;
}

exports.getID = (email, userPassword)=>{
    // let check = false;
    // const userInputPassword = userPassword
    // for (var i = 0; i < userInfo.length; i++){
    //     let storedHashedPassword = userInfo[i].password;
    //     bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
    //         if(err){
    //             return -1;
    //         }
    //         check = result || check;
    //         return;
    //     });
    // }
    // console.log(check)
    for (var i = 0; i < userInfo.length; i++){
        if(userInfo[i].email == email && userInfo[i].password == userPassword){
            return i;
        }
    }
    return -1;
}

exports.getUsername = (userID) =>{
    return userInfo[userID].username;
}

exports.getAdminStatus = (userID) =>{
    if(userInfo[userID].admin == true){
        return true;
    }
    return false;
}

exports.emailAlreadyExist = (email) =>{
    for (var i = 0; i < userInfo.length; i++){
        console.log(email)
        console.log(userInfo[i].email)
        if(userInfo[i].email == email){
            return true;
        }
    }
    return false;
}

exports.createAccount = (email, name, number, password) =>{

    // bcrypt.genSalt(saltRounds, (err, salt) => {
    //     if (err) {
    //       return;
    //     }
    //     else {
    //         const userPassword = password;
    //         bcrypt.hash(userPassword, salt, (err, hash) => {
    //             if (err) {
    //                 return;
    //             }
    //             userInfo[userInfo.length] = {
    //                 username: name,
    //                 number: number,
    //                 email: email,
    //                 password: hash
    //             }
    //             fs.writeFileSync('./userdb.json', JSON.stringify(userInfo));
    //             return
    //         });
    //         return;
    //     }
    // });

    userInfo[userInfo.length] = {
        username: name,
        number: number,
        email: email,
        password: password
    }
    fs.writeFileSync('./data/userdb.json', JSON.stringify(userInfo));

}

exports.removeAccount = (email) => {

    for (var i = 0; i < userInfo.length; i++){
        if(userInfo[i].email == email){
            delete userInfo[i]
            fs.writeFileSync('./data/userdb.json', JSON.stringify(userInfo));
            return true;
        }
    }
    return false;

}