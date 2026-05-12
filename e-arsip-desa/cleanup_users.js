const db = require('./config/database');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Delete related records first (aktivitas, disposisi)
db.prepare("DELETE FROM aktivitas WHERE user_id NOT IN (SELECT id FROM users WHERE email IN ('admin@karangasem.desa.id', 'kades@karangasem.desa.id', 'operator@karangasem.desa.id'))").run();
db.prepare("DELETE FROM disposisi WHERE dari_user_id NOT IN (SELECT id FROM users WHERE email IN ('admin@karangasem.desa.id', 'kades@karangasem.desa.id', 'operator@karangasem.desa.id'))").run();
db.prepare("DELETE FROM disposisi WHERE kepada_user_id NOT IN (SELECT id FROM users WHERE email IN ('admin@karangasem.desa.id', 'kades@karangasem.desa.id', 'operator@karangasem.desa.id'))").run();

// Delete test users
db.prepare("DELETE FROM users WHERE email NOT IN ('admin@karangasem.desa.id', 'kades@karangasem.desa.id', 'operator@karangasem.desa.id')").run();

console.log('Test users deleted');

// Show remaining users
const users = db.prepare('SELECT nama, email, role FROM users').all();
console.log('Remaining users:');
users.forEach(u => console.log('- ' + u.nama + ' (' + u.role + '): ' + u.email));
