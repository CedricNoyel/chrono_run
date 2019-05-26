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

    static createCsvFile() {
        csvGenerator({
            columns: ['int', 'bool'],
            length: 2
        });
    }

    static getParticipants(callback) {
        var participants = [];
        fs.createReadStream(path)
            .pipe(csvParser({separator: ';'}))
            .on('data', (row) => {
                participants.push(row);
            })
            .on('finish', function () {
                console.log('CSV file successfully processed');
                callback(participants);
            });
    }

    static addParticipant(dossard, lastname, firstname, team) {
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

    static findParticipant(searchedDossard, callback) {
        this.get_participants(function (participants) {
            callback(participants.filter(participant => participant.dossard == searchedDossard));
        });
    }

    static findTeamParticipants(teamName, callback) {
        this.get_participants(function (participants) {
            callback(participants.filter(participant => participant.team.startsWith(teamName)));
        })
    }
}

module.exports = ExcelServices;
