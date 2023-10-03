export default function updateStudentGradeByCity(studentList, city, newGrades) {
  return studentList
    .filter((student) => student.location === city)
    .map((student) => {
      const grade = getGrade(newGrades, student.id);
      student.grade = grade === null ? "N/A" : grade;
      return student;
    });
}

function getGrade(newGrades, studentId) {
  const found = newGrades.filter((grade) => grade.studentId === studentId);
  if (found.length === 0 || found[0].grade === undefined) return null;
  else return found[0].grade;
}
