const https = require('https');

function postData(url, data) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(body)
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            body: body
          });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

async function testLogin() {
  const testCases = [
    { email: 'admin@karangasem.desa.id', password: 'password123', label: 'Admin' },
    { email: 'kades@karangasem.desa.id', password: 'password123', label: 'Kepala Desa' },
    { email: 'operator@karangasem.desa.id', password: 'password123', label: 'Operator' }
  ];

  for (const testCase of testCases) {
    try {
      console.log(`Testing ${testCase.label} login...`);
      const response = await postData(
        'http://localhost:5000/api/auth/login',
        JSON.stringify({
          email: testCase.email,
          password: testCase.password
        })
      );
      
      console.log(`${testCase.label}: Status ${response.statusCode}`);
      console.log(`Response:`, JSON.stringify(response.body, null, 2));
      console.log('---');
    } catch (error) {
      console.log(`${testCase.label}: Error -`, error.message);
    }
  }
}

testLogin();