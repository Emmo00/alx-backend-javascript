import readDatabase from '../utils';

export default class StudentsController {
  static async getAllStudents(req, res) {
    const buff = 'This is the list of our students';
    try {
      const students = await readDatabase(process.argv[2]);
      const report = [];
      for (const field of Object.keys(students).sort()) {
        report.push(
          `Number of students in ${field}: ${
            students[field].length
          }. List: ${students[field].join(', ')}`,
        );
      }
      return res.status(200).send([buff, ...report].join('\n'));
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (!['CS', 'SWE'].find((field) => field === major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }
    try {
      const students = (await readDatabase(process.argv[2]))[major];
      return res.status(200).send(`List: ${students.join(', ')}`);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
}
