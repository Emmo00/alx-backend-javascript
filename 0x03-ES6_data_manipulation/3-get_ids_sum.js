export default function getStudentIdSum(studentList) {
  return studentList.reduce((acc, curr) => acc + curr.id, 0);
}
