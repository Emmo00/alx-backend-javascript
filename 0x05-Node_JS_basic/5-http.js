const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
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
          }. List: ${fields[field].join(', ')}`,
        );
      }
      resolve(report.join('\n'));
    });
  });
}

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST);

module.exports = app;
