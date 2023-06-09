const axios = require('axios');
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'data', 'librairy.json');

function writeData(content) {
  try {
    fs.writeFileSync(productsPath, JSON.stringify(content));
  } catch (err) {
    console.error('Error writing file : ', err.message);
  }
}

function readData() {
  try {
    const products = fs.readFileSync(productsPath, 'utf-8');

    return JSON.parse(products); // string ==> Tableau JS
  } catch (err) {
    console.error('Error reading file : ', err.message);
  }
}

exports.writeData = writeData; //exports = module.exports
exports.readData = readData;
