async function saveStudent() {

    const id = document.getElementById("studentId").value;

    const name = document.getElementById("name").value;

    const course = document.getElementById("course").value;

    let response;

    if (id) {

        response = await fetch(`/students/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                course
            })
        });

    } else {

        response = await fetch("/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                course
            })
        });

    }

    const data = await response.json();

    alert(data.message);

    document.getElementById("studentId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("course").value = "";

    loadStudents();
}

async function loadStudents() {

    const response = await fetch("/students");

    const students = await response.json();

    let html = `
        <table border="1" cellpadding="10" cellspacing="0">
            <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Actions</th>
            </tr>
    `;

    students.forEach(student => {

        html += `
            <tr>
                <td>${student.name}</td>
                <td>${student.course}</td>

                <td>

                    <button onclick="editStudent(
                        '${student.id}',
                        '${student.name}',
                        '${student.course}'
                    )">
                        Edit
                    </button>

                    <button onclick="deleteStudent('${student.id}')">
                        Delete
                    </button>

                </td>
            </tr>
        `;

    });

    html += "</table>";

    document.getElementById("students").innerHTML = html;
}

function editStudent(id, name, course) {

    document.getElementById("studentId").value = id;

    document.getElementById("name").value = name;

    document.getElementById("course").value = course;
}

async function deleteStudent(id) {

    const confirmDelete =
        confirm("Are you sure?");

    if (!confirmDelete) {
        return;
    }

    const response =
        await fetch(`/students/${id}`, {
            method: "DELETE"
        });

    const data =
        await response.json();

    alert(data.message);

    loadStudents();
}

loadStudents();