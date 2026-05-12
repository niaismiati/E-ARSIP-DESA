const mongoose = require('mongoose').Mongoose; // not used
const fetch = require('node-fetch');

// Simulate the registration call
const registerData = {
  nama: "Test User",
  email: "test@desa.id",
  password: "123456",
  role: "operator"
};

console.log("Testing registration with:", registerData);

// The frontend uses relative path, which Vite proxies to backend
console.log("Frontend should POST to: http://localhost:5174/api/auth/register");
console.log("Backend endpoint: http://localhost:5000/api/auth/register");
