const fs = require('fs');

function countStudents(path) {
  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }
  const file = fs.readFileSync(path);
  let lines = file.toString().trim().split('\n').slice(1);
  const fields = {};
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
  process.stdout.write(`Number of students: ${lines.length}\n`);
  for (const field of Object.keys(fields)) {
    process.stdout.write(
      `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`
    );
  }
  return;
}

module.exports = countStudents;
