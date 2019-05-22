const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
        { id : 'numero', title : 'Numéro de dossier'},
        { id : 'temps', title : 'Temps arrivée'}
    ]
});

const data = [
    {
        numero : '456789',
        temps : '16:23'
    },
    {
        numero : '255696',
        temps : '16:24'
    }
];

function writeCSV(){
    csvWriter.writeRecords(data).then(()=> console.log('The CSV file was written successfully'));
    console.log('Après écriture : ');
    readCSV();
}

function readCSV(){
    fs.createReadStream('data.csv').pipe(csv()).on('data', (row) => {
        console.log('row : ', row);
    }).on('end', () => {
        console.log('CSV file succesfully processed');
    });
}