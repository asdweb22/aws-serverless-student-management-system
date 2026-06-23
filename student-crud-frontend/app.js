const API_URL =
"https://zkkpeycxa7.execute-api.ap-south-1.amazonaws.com/QA/students";


// CREATE

async function addStudent() {

    const id =
        Number(document.getElementById("id").value);

    const name =
        document.getElementById("name").value;

    const course =
        document.getElementById("course").value;

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id,
            name,
            course
        })
    });

    const data = await response.json();

    alert(data.message);

    loadStudents();
}


// READ

async function loadStudents() {

    const response =
        await fetch(API_URL);

    const students =
        await response.json();

    let html = `
        <table border="1" cellpadding="10">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
            </tr>
    `;

    students.forEach(student => {

        html += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
            </tr>
        `;
    });

    html += "</table>";

    document.getElementById("students").innerHTML =
        html;
}


// UPDATE

async function updateStudent() {

    const id =
        Number(document.getElementById("id").value);

    const name =
        document.getElementById("name").value;

    const course =
        document.getElementById("course").value;

    const response = await fetch(API_URL, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id,
            name,
            course
        })
    });

    const data = await response.json();

    alert(data.message);

    loadStudents();
}


// DELETE

async function deleteStudent() {

    const id =
        Number(document.getElementById("id").value);

    const response = await fetch(API_URL, {

        method: "DELETE",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id
        })
    });

    const data = await response.json();

    alert(data.message);

    loadStudents();
}

loadStudents();