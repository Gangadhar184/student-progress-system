const Student = require('../models/students');

exports.getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
}

//post: add a student 
exports.addStudent = async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
}

//put : update a student
exports.updateStudent = async(req, res) => {
    const updated = await Student.findByIdAndUpdate(req.params.id);
    res.json(updated);
}

//delete : a student 

exports.deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({message : "Student deleted successfully"});
}
