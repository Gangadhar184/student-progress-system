const Student = require("../models/Student");

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message}) ; 
  }
};

const addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
     res.status(400).json({ message: "Bad Request", error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(204).send(); //no content
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllStudents, addStudent, updateStudent, deleteStudent };
