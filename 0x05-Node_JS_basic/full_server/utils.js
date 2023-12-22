import fs from 'fs';

export default function readDatabase(path) {
  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }
      const students = {};
      const lines = data.toString().trim().split('\n').slice(1);
      for (const line of lines) {
        const columns = line.split(',');
        const field = columns[3];
        const firstname = columns[0];
        if (!students[field] || !Array.isArray(students[field])) {
          students[field] = [];
          students[field].push(firstname);
        } else {
          students[field].push(firstname);
        }
      }
      return resolve(students);
    });
  });
}
