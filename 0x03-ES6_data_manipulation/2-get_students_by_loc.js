export default function getStudentByLocation(studentList, city) {
  return studentList.filter((student) => student.location === city);
}
