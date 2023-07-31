const fs = require("fs");
const transformCsvToJson = require('./json-converter');
const transformJsonToCsv = require('./csv-converter');
// const jsonConverter = require('./json-converter');
// console.log(jsonConverter);

const inputUrl = process.argv[2];
const outputUrl = process.argv[3];
let divider = process.argv[4];
if (divider === undefined) { //A2)aggiungere un parametro alla applicazione che mi permette di indicare il carattere divisorio
    divider = ',';
}
console.log(divider);

let data = readFile(inputUrl)

if (data) {

    const result = transformJsonToCsv(data, divider)

    writeData(outputUrl, result);
}


function readFile(url){
    try {
        const data = fs.readFileSync(url, "utf8");
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}


function writeData(url, data){
    try {
        fs.writeFileSync(url, data);
    } catch (err) {
        console.error(err.message);
    }
}



// trovare un modo per evitare di trasformare in numero una stringa
// che inizia con un numero