const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const employeesDB = {
  data: require("../data/employees.json"),
  setEmployees: function (data) {
    this.data = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(employeesDB.data);
};

const createNewEmployee = async (req, res) => {
  const newEmployee = {
    id: employeesDB.data[employeesDB.data.length - 1]?.id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).json({
      message: "First and last names are required.",
    });
  }
  employeesDB.setEmployees([...employeesDB.data, newEmployee]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "data", "employees.json"),
    JSON.stringify(employeesDB.data)
  );

  res.status(201).json(employeesDB.data);
};

const updateEmployee = async (req, res) => {
  const employee = employeesDB.data.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res.status(404).json({
      message: `Employee ${req.body.id} is not found`,
    });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredEmployees = employeesDB.data.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedEmployees = [...filteredEmployees, employee];
  const sortedEmployees = unsortedEmployees.sort((a, b) =>
    a.id > b.id ? 1 : a.id < b.id ? -1 : 0
  );
  employeesDB.setEmployees(sortedEmployees);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "data", "employees.json"),
    JSON.stringify(employeesDB.data)
  );

  res.json(employeesDB.data);
};

const deleteEmployee = async (req, res) => {
  const employee = employeesDB.data.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee ${req.body.id} is not found.` });
  }
  const filteredEmployees = employeesDB.data.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  employeesDB.setEmployees(filteredEmployees);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "data", "employees.json"),
    JSON.stringify(employeesDB.data)
  );

  res.json(employeesDB.data);
};

const getEmployee = (req, res) => {
  const employee = employeesDB.data.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee ${req.params.id} is not found.` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
