const fs = require('fs');
const sendSMS = require('./sms');

const getUsers = () => {
    const data = fs.readFileSync('./villagers.json');
    return JSON.parse(data);
};

const getJobListings = () => {
    const data = fs.readFileSync('./jobs.json');
    return JSON.parse(data);
};

const matchAndNotify = () => {
    const users = getUsers();
    const jobs = getJobListings();

    users.forEach(user => {
        const suitableJobs = jobs.filter(job => 
            job.tags.length === 0 || job.tags.some(tag => user.skills.includes(tag))
        );
        suitableJobs.forEach(job => {
            const message = `Job Opportunity: ${job.getJobListings} at ${job.place}. Contact: ${job.contact}`;
            sendSMS(user.phoneNumber, message);
        });
    });
};

module.exports = matchAndNotify;