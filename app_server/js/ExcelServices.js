const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const path = 'app_server/excels/test.csv';
const csvWriter = createCsvWriter({
    path : path,
    fieldDelimiter: ';',
    append: true,
    header : [
        {id: 'dossard', title: 'Dossard'},
        {id: 'lastname', title: 'Nom'},
        {id: 'firstname', title: 'Prénom'},
        {id: 'team', title: 'Equipe'}
    ]
});

class ExcelServices {


    // const excelServices = new ExcelServices();
    // excelServices.get_participants(function(res){
    //     console.log(res);
    // });

    static get_participants(callback) {
        var participants = [];
        fs.createReadStream(path)
            .pipe(csvParser({separator: ';'}))
            .on('data', (row) => {
                participants.push(row);
            })
            .on('finish', function () {
                console.log('CSV file successfully processed');
                // console.log(participants);
                callback(participants);
            });
    }

    static add_participant(dossard, lastname, firstname, team) {
        let data = [{
            dossard: dossard,
            lastname: lastname,
            firstname: firstname,
            team: team
        }];

        csvWriter
            .writeRecords(data)
            .then(()=> console.log('The CSV file was written successfully'));
    }

    static find_participant(dossard) {

    }
}

module.exports = ExcelServices;
