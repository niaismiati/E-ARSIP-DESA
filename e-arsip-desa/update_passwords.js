const db = require('./config/database');

const newPasswords = {
  'admin': '$2a$10$Oi3rlbhBjyhvh7ZUgiT4xe9VKl8ymmmOjedtQnXkJO1iXn8R141/q',
  'operator': '$2a$10$B263n9DmyanPLc5Peh8nBehsRHghDEYwaABtJhVdKb/3vSokCqFeq',
  'kades': '$2a$10$yMjHFqEJBFTh/AI0B2VHDO3414NAC2dbeI1tHY6DoyItqdJfu23.y'
};

const stmt = db.prepare('UPDATE users SET password = ? WHERE email = ?');

stmt.run(newPasswords.admin, 'admin@karangasem.desa.id');
stmt.run(newPasswords.operator, 'operator@karangasem.desa.id');
stmt.run(newPasswords.kades, 'kades@karangasem.desa.id');

console.log('✅ Passwords updated successfully');

const users = db.prepare('SELECT email, role FROM users').all();
console.log('\nUsers in database:');
users.forEach(u => console.log(`- ${u.email} (${u.role})`));
