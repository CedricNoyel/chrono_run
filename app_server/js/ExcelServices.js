const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const path = 'app_server/excels/test.csv';
const csvWriter = createCsvWriter({
    path : path,
    fieldDelimiter: ';',
    append: true,
    encoding: 'utf16',
    header : [
        {id: 'dossard', title: 'Numéro de dossard'},
        {id: 'lastname', title: 'Nom'},
        {id: 'firstname', title: 'Prénom'},
        {id: 'team', title: 'Equipe'}
    ]
});

class ExcelServices {
    read_participants() {
        fs.createReadStream(path)
            .pipe(csvParser({separator: ';'}))
            .on('data', (row) => {
                console.log(row);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
            });
    }

    add_participant(dossard, lastname, firstname, team) {
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
}

module.exports = ExcelServices;
