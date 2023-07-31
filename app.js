const fs = require("fs");
// const transformCsvToJson = require('./json-converter');
// const transformJsonToCsv = require('./csv-converter');
// const jsonConverter = require('./json-converter');
// console.log(jsonConverter);

const inputUrl = process.argv[2];
const splittedInputUrl = inputUrl.split('.');
const ext = splittedInputUrl[splittedInputUrl.length -1];  // per prendere l'estensione di un file

let transformFunction;
if (ext.toLowerCase().includes("json")) {
  transformFunction = require("./csv-converter");
} else if (ext.toLowerCase().includes("csv")) {
  transformFunction = require("./json-converter");
} else {
  console.log("non posso convertire i file: " + ext);
  process.exit();
}


const outputUrl = process.argv[3];
let divider = process.argv[4];
if (divider === undefined) { //A2)aggiungere un parametro alla applicazione che mi permette di indicare il carattere divisorio
    divider = ',';
}
console.log(divider);

let data = readFile(inputUrl)

if (data) {

    const result = transformFunction(data, divider)

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





