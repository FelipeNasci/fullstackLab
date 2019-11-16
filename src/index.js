const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const googleSpreadsheet = require('google-spreadsheet');
const creds = require('./config/fullstacklab.json');
const {docId} = require('./config/docId.json');

const { promisify } = require('util')


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname + '/views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.render('home')
})

app.post('/', async (req, res) => {

    const { name, email, issueType, howToReproduce, output, correctOutput } = req.body;
    const doc = new googleSpreadsheet(docId);
    const worksheetIndex = 0;

    try {

        await promisify(doc.useServiceAccountAuth)(creds);

        const info = await promisify(doc.getInfo)()
        const worksheet = info.worksheets[worksheetIndex];

        await promisify(worksheet.addRow)({
            "Name": name,
            "Email": email,
            "Issue Type": issueType,
            "How to reproduce": howToReproduce,
            "Output": output,
            "Correct output": correctOutput,
            "Time": new Date
        })
    } catch (err) {
        console.log(err);

    }

    //return res.send(req.body)
    return res.send('Thanks for your help');
})

app.listen(3000, (error) => {
    if (error) {
        console.log('Server not start');
    }
    else {
        console.log('Server start in port http://localhost:3000');

    }
});
