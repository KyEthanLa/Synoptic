const { compare } = require('bcrypt');
const fs = require('fs');
let villagerInfo  = JSON.parse(fs.readFileSync('./villagers.json', 'utf-8'));

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getVillagers=()=>{
    return villagerInfo;
}

exports.getID = (name, phoneNumber)=>{
    for (var i = 0; i < villagerInfo.length; i++){
        if(villagerInfo[i].name == name && villagerInfo[i].phoneNumber == phoneNumber){
            return i;
        }
    }
    return -1;
}

exports.Name = (userID) =>{
    return villagerInfo[userID].name;
}

exports.nameAlreadyExist = (name) =>{
    for (var i = 0; i < villagerInfo.length; i++){
        console.log(name)
        console.log(villagerInfo[i].name)
        if(villagerInfo[i].name == name){
            return true;
        }
    }
    return false;
}

exports.createAccount = (name, phoneNumber, language, skills) =>{

    villagerInfo[villagerInfo.length] = {
        name: name,
        phoneNumber: phoneNumber,
        language: language,
        skills: skills
    }
    fs.writeFileSync('./villagers.json', JSON.stringify(villagerInfo));

}

exports.removeAccount = (name) => {

    for (var i = 0; i < villagerInfo.length; i++){
        if(villagerInfo[i].name == name){
            delete villagerInfo[i]
            fs.writeFileSync('./villagers.json', JSON.stringify(villagerInfo));
            return true;
        }
    }
    return false;

}