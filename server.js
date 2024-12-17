const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const port = 5000;

app.use(cors({
  origin: '*'
}));  // Enable CORS for cross-origin requests

app.use(express.json());  // Middleware to parse JSON bodies

// Function to read employee data from the JSON file
const getEmployeesData = () => {
  const filePath = path.join(__dirname, 'data', 'employees.json');
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData).employees;
};

// Function to write updated employee data back to the JSON file
const saveEmployeesData = (employees) => {
  const filePath = path.join(__dirname, 'data', 'employees.json');
  fs.writeFileSync(filePath, JSON.stringify({ employees }, null, 2));
};

// GET route to return all employees
app.get('/api/employees', (req, res) => {
  const employees = getEmployeesData();
  res.json(employees);
});

// GET route to return a specific employee by empid
app.get('/api/employees/:empid', (req, res) => {
  const { empid } = req.params;
  const employees = getEmployeesData();
  const employee = employees.find((emp) => emp.empid === empid);  // Find employee by empid

  if (employee) {
    res.json(employee);  // Return employee if found
  } else {
    res.status(404).json({ message: 'Employee not found' });  // 404 if employee not found
  }
});

//PUT comments



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
