const express = require('express');
const fs = require('fs');

const app = express();

const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

function countStudents(path) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path)) {
      reject(new Error('Cannot load the database'));
      return;
    }
    fs.readFile(path, (err, file) => {
      if (err) {
        reject(err);
        return;
      }
      const report = [];
      const lines = file
        .toString()
        .trim()
        .split('\n')
        .slice(1)
        .filter((line) => line.length > 0);
      const fields = {};
      for (const line of lines) {
        const field = line.split(',')[3];
        const name = line.split(',')[0];
        if (fields[field]) {
          fields[field] = [...fields[field], name];
        } else {
          fields[field] = [];
          fields[field].push(name);
        }
      }
      report.push(`Number of students: ${lines.length}`);
      for (const field of Object.keys(fields)) {
        report.push(
          `Number of students in ${field}: ${
            fields[field].length
          }. List: ${fields[field].join(', ')}`
        );
      }
      resolve(report.join('\n'));
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  let report = 'This is the list of our students';
  try {
    report = `${report}\n${await countStudents(DB_FILE)}`;
    return res.send(report);
  } catch (err) {
    report = `${report}\n${err.message}`;
    return res.send(report);
  }
});

app.listen(1245);

module.exports = app;
