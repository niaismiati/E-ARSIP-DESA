import fetch from 'node-fetch';

async function testFrontendLoginSimulation() {
  try {
    console.log('Simulating frontend login request...');
    
    // Simulate what the frontend sends
    const formData = {
      email: 'kades@karangasem.desa.id',
      password: 'password123'
    };
    
    console.log('Sending data:', JSON.stringify(formData));
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testFrontendLoginSimulation();