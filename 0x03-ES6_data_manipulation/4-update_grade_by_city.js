function getGrade(newGrades, studentId) {
  const found = newGrades.filter((grade) => grade.studentId === studentId);
  if (found.length === 0 || found[0].grade === undefined) return null;
  return found[0].grade;
}

export default function updateStudentGradeByCity(studentList, city, newGrades) {
  return studentList
    .filter((student) => student.location === city)
    .map((student) => {
      let grade = getGrade(newGrades, student.id);
      grade = grade === null ? 'N/A' : grade;
      return { ...student, grade };
    });
}
