const fs = require("fs");

const DATA_FILE = "data/students.json";

exports.getStudents = (req, res) => {

    const students = JSON.parse(
        fs.readFileSync(DATA_FILE)
    );

    res.json(students);
};

exports.createStudent = (req, res) => {

    const { name, course } = req.body;

    const students = JSON.parse(
        fs.readFileSync(DATA_FILE)
    );

    const newStudent = {
        id: Date.now(),
        name,
        course
    };

    students.push(newStudent);

    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(students, null, 2)
    );

    res.json({
        message: "Student Added Successfully",
        student: newStudent
    });
};

exports.updateStudent = (req, res) => {

    const id = Number(req.params.id);

    const { name, course } = req.body;

    const students = JSON.parse(
        fs.readFileSync(DATA_FILE)
    );

    const index = students.findIndex(
        student => student.id === id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    students[index] = {
        ...students[index],
        name,
        course
    };

    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(students, null, 2)
    );

    res.json({
        message: "Student Updated Successfully"
    });
};

exports.deleteStudent = (req, res) => {

    const id = Number(req.params.id);

    const students = JSON.parse(
        fs.readFileSync(DATA_FILE)
    );

    const filteredStudents =
        students.filter(
            student => student.id !== id
        );

    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(filteredStudents, null, 2)
    );

    res.json({
        message: "Student Deleted Successfully"
    });
};