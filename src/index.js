const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const googleSpreadsheet = require('google-spreadsheet');
const creds = require('./config/fullstacklab.json');

const docId = '1bx4z8Fn-LI4JvobMgdRRP6PU4mfupJQy9VZjfi984dw';
const worksheetIndex = 0;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname + '/views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.render('home')
})

app.post('/', (req, res) => {

    const doc = new googleSpreadsheet(docId);

    doc.useServiceAccountAuth(creds, (error) => {
        if (error) {
            console.log('Error connecting to spreadsheet');
        }
        else {
            doc.getInfo((err, info) => {

                if (err) {
                    console.log('Error to get Info of Spreadsheet: \n' + err);
                    //console.log("Error to get Info of Spreadsheet");
                } else {

                    let { name, email } = req.body;
                    //console.log(info);
                    
                    
                    let worksheet = info.worksheets[worksheetIndex];
                    worksheet.addRow({
                        Name: name,
                        Email: email
                    }, (err) => {
                        if (err)
                            console.log('Error to write in spreadsheet');
                        else
                            console.log('Sucess');
                    })
                     
                    
                }
            })
        }


    })

    //return res.send(req.body)
    return res.send('Thanks for your help');
})

app.listen(3000, (error)=>{
    if(error){
        console.log('Server not start');
    }
    else{
        console.log('Server start in port 3000');
        
    }
});
