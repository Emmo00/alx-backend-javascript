export default function getListStudentsIds(studentList) {
  if (!Array.isArray(studentList)) return [];
  return studentList.map((student) => student.id);
}
