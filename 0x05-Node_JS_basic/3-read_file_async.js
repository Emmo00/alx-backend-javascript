const fs = require('fs');

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
      console.log(`Number of students: ${lines.length}`);
      for (const field of Object.keys(fields)) {
        console.log(
          `Number of students in ${field}: ${
            fields[field].length
          }. List: ${fields[field].join(', ')}`,
        );
      }
      resolve();
    });
  });
}

module.exports = countStudents;
