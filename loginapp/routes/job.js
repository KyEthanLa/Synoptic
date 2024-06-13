const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("job")
})

const getJobListings = () => {
    const data = fs.readFileSync('./jobs.json');
    return JSON.parse(data);
};

const saveJobListings = (jobs) => {
    fs.writeFileSync('./jobs.json', JSON.stringify(jobs, null, 2));
};

router.post('/create', (req, res) => {
    const { name, place, employer, description, contact } = req.body;
    let { tags } = req.body;

    if (!Array.isArray(tags)) {
        tags = tags ? [tags] : [];
    }

    const jobs = getJobListings();
    const job = {
        name,
        place,
        employer,
        description,
        tags,
        contact
    };

    jobs.push(job);
    saveJobListings(jobs);
    res.redirect('/job')
});

module.exports = router