interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = { firstName: 'Emmanuel', lastName: 'Nwafor', age: 1000, location: 'Mars' }
const student2: Student = { firstName: 'Emmanuel', lastName: 'Nwafor', age: 1000, location: 'Mars' }

const studentsList = [student1, student2]

// render table

const table = document.createElement('table')

studentsList.forEach(student => {
    const row = table.insertRow()

    row.insertCell().innerHTML = student.firstName;
    row.insertCell().innerHTML = student.location;
})

document.appendChild(table)
