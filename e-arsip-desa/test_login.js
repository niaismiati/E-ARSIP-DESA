const db = require('./config/database');
const bcrypt = require('bcryptjs');

// Test if login works with different passwords
const testPasswords = ['password123', 'admin123', 'operator123', 'kepaladesa123'];

const user = db.prepare('SELECT * FROM users WHERE email = ?').get('admin@karangasem.desa.id');

console.log('User found:', user ? user.email : 'not found');
console.log('Stored hash:', user.password);

if (user) {
  console.log('\nTesting passwords:');
  for (const pwd of testPasswords) {
    const match = bcrypt.compareSync(pwd, user.password);
    console.log(`- ${pwd}: ${match ? 'MATCH ✓' : 'no match'}`);
  }
}
