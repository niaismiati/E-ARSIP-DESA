const db = require('./config/database');
const bcrypt = require('bcryptjs');

// Reset passwords to default "password123"
const defaultPassword = 'password123';
const hashedPassword = bcrypt.hashSync(defaultPassword, 10);

db.prepare('UPDATE users SET password = ? WHERE email = ?').run(hashedPassword, 'admin@karangasem.desa.id');
db.prepare('UPDATE users SET password = ? WHERE email = ?').run(hashedPassword, 'kades@karangasem.desa.id');
db.prepare('UPDATE users SET password = ? WHERE email = ?').run(hashedPassword, 'operator@karangasem.desa.id');

console.log('✅ Passwords reset to default: password123');

// Verify
const users = db.prepare('SELECT nama, email, role FROM users').all();
console.log('\nUsers:');
users.forEach(u => console.log('- ' + u.nama + ' (' + u.role + '): ' + u.email));
