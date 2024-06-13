const fs = require('fs');
const request = require('supertest');
const app = require('../app');
const { router, getJobListings } = require('../routes/job');


describe('Job Routes', () => {
    beforeAll(() => {
        process.env.JOB_LISTINGS_FILE = '../data/jobListings.test.json';
        process.env.VILLAGERS_FILE = '../data/villagers.test.json';
        process.env.USERDB_FILE = '../data/userdb.test.json';
    });

    beforeEach(() => {
        const testJobData = [{
            position: "farmer",
            date: "12/06/2024",
            deadline: "2024-06-21",
            location: "Norwich",
            employer: "Farmer Association",
            description: "tend to the fields",
            tags: [],
            contactDetails: "2444-66666"
        },
        {
            position: "Driver",
            date: "12/06/2024",
            deadline: "2024-06-19",
            location: "Norwich",
            employer: "Farmer Association",
            description: "Drives the tractor",
            tags: [],
            contactDetails: "123-5555"
        }];

        fs.writeFileSync('./data/jobListings.test.json', JSON.stringify(testJobData));

        const testVillagerData = [{
            name: "OkeDokey",
            phoneNumber: "07878865649",
            language: "english",
            skills: "Manual",
            disability: null
        }];

        fs.writeFileSync('./data/villagers.test.json', JSON.stringify(testVillagerData));

        const testUserData = [{
            username: "test",
            number: "333",
            email: "test@test.com",
            password: "1"
        },
        {
            username: "test",
            number: "333",
            email: "ccq21cuu@uea.ac.uk",
            password: "2"
        }];

        fs.writeFileSync('./data/userdb.test.json', JSON.stringify(testUserData));
    });

    afterEach(() => {
        fs.writeFileSync('./data/jobListings.test.json', JSON.stringify([]));
        fs.writeFileSync('./data/villagers.test.json', JSON.stringify([]));
        fs.writeFileSync('./data/userdb.test.json', JSON.stringify([]));
        jest.restoreAllMocks(); 
    });

    it('should create a new job listing', async () => {
        const response = await request(app)
            .post('/job/create')
            .send({
                position: 'Cleaner',
                deadline: '2024-06-30',
                location: 'Ratanakiri',
                employer: 'Example Corp',
                contactDetails: '123-4567',
                tags: []
            });

        expect(response.statusCode).toBe(302); 

        const jobListings = getJobListings();
        const createdJob = jobListings[jobListings.length - 1];
        expect(createdJob.position).toBe('Cleaner');
        expect(createdJob.location).toBe('Ratanakiri');
        expect(createdJob.employer).toBe('Example Corp');

    });
});

module.exports = {
    router,
    getJobListings,
};
