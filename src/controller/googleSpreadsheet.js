const googleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('../config/fullstacklab.json');
const { docId } = require('../config/docId.json');

module.exports = {

    async writeSpreadsheet(req, res) {

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

        } catch (err) { console.log(err); }

        return res.render('sucess');
    }

}