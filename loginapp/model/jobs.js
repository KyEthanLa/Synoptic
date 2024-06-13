const fs = require('fs');
let jobInfo  = JSON.parse(fs.readFileSync('./jobs.json', 'utf-8'));

exports.createJob = (name) =>{

    jobInfo[jobInfo.length] = {
        name: name, 
        place: place,
        employer: employer, 
        description: description, 
        tags: tags, 
        contact: contact,
        
    }

    fs.writeFileSync('./jobs.json', JSON.stringify(userInfo));

}

exports.getJobInformation = () => {
    return jobInfo;
}

exports.deleteJob = (name) =>{

    for (var i = 0; i < jobInfo.length; i++){
        if(jobInfo[i].name == name){
            delete jobInfo[i]
            fs.writeFileSync('./jobInfo.json', JSON.stringify(jobInfo));
            return true;
        }
    }

    jobInfo[jobInfo.length] = {
        name: name, 
        place: place,
        employer: employer, 
        description: description, 
        tags: tags, 
        contact: contact,
        
    }

    fs.writeFileSync('./jobs.json', JSON.stringify(userInfo));

}