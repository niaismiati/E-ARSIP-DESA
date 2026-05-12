import https from 'https';

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

async function testProxyLogin() {
  try {
    console.log('Testing login through frontend dev server proxy...');
    
    const response = await postData(
      'http://localhost:5174/api/auth/login',
      JSON.stringify({
        email: 'admin@karangasem.desa.id',
        password: 'password123'
      })
    );
    
    console.log('Status:', response.statusCode);
    console.log('Response:', JSON.stringify(response.body, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testProxyLogin();