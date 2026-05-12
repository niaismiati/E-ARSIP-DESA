const fetch = require('node-fetch');

async function testFrontendLogin() {
  try {
    console.log('Testing frontend-style login...');
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'kades@karangasem.desa.id', password: 'password123' })
    });
    
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testFrontendLogin();