const fs = require('fs');

function countStudents (path) {
  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }
  const file = fs.readFileSync(path);
  const lines = file.toString().trim().split('\n').slice(1);
  const fields = {};
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length < 1) {
      lines.splice(i, 1);
    }
  }
  for (const line of lines) {
    if (!line) continue;
    const field = line.split(',')[3];
    const name = line.split(',')[0];
    if (fields[field]) {
      fields[field] = [...fields[field], name];
    } else {
      fields[field] = [];
      fields[field].push(name);
    }
  }
  console.log(`Number of students: ${lines.length}`);
  for (const field of Object.keys(fields)) {
    console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
  }
}

module.exports = countStudents;
