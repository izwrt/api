const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors({
    origin: '*'
  }));
   // Enable CORS for cross-origin requests

// Function to read employee data from the JSON file
const getEmployeesData = () => {
  const filePath = path.join(__dirname, 'data', 'employees.json');
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData).employees;
};

// GET route to return all employees
app.get('/api/employees', (req, res) => {
  const employees = getEmployeesData();
  res.json(employees);
});

// GET route to return a specific employee by ID
app.get('/api/employees/:id', (req, res) => {
  const { id } = req.params;  // Extract employee ID from request parameters
  const employees = getEmployeesData();
  const employee = employees.find((emp) => emp.id === id);  // Find employee by ID

  if (employee) {
    res.json(employee);  // Return employee if found
  } else {
    res.status(404).json({ message: 'Employee not found' });  // 404 if employee not found
  }
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
