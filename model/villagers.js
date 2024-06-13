const { compare } = require('bcrypt');
const fs = require('fs');
let villagerInfo  = JSON.parse(fs.readFileSync('./data/villagers.json', 'utf-8'));

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getVillagers=()=>{
    return villagerInfo;
}