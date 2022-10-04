const path = require('path');
const fs = require('fs');
const chance = require('chance')();
const {v4: uuid} = require('uuid');

const OUT_PATH = path.join(__dirname, '../server/src/assets/data.json');
const SIZE = 20;
const data = [];
for (let i = 0; i < SIZE; i++) data.push(generateRow());
fs.writeFileSync(OUT_PATH, JSON.stringify(data, null, 2));

function generateRow() {
  return {
    id: uuid(),
    name: chance.name(),
    date: chance.date().toISOString(),
    quantity: chance.integer({min: 0, max: 100}),
    distance: chance.integer({min: 0, max: 500}),
  };
}
