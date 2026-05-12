const db = require('./config/database');

const newPasswords = {
  'admin@karangasem.desa.id': '$2a$10$I.I2LKYKjfUV7G9Bg7eiJO8PepumpCo1PchmQzPeNxc.Egus2Vt4a',
  'operator@karangasem.desa.id': '$2a$10$hRkB9pfkyfPsVwEEK6tbK.lNIh.ZS.zG0wrcgr7f170hJWv17AaYu',
  'kades@karangasem.desa.id': '$2a$10$hEyaZcfmtvoQeL/mdjA.AO/7F8GG/7F4n33s2357FbtIchAcd7Pv2'
};

const stmt = db.prepare('UPDATE users SET password = ? WHERE email = ?');

stmt.run(newPasswords['admin@karangasem.desa.id'], 'admin@karangasem.desa.id');
stmt.run(newPasswords['operator@karangasem.desa.id'], 'operator@karangasem.desa.id');
stmt.run(newPasswords['kades@karangasem.desa.id'], 'kades@karangasem.desa.id');

console.log('✅ Passwords updated successfully');

const users = db.prepare('SELECT email, role FROM users').all();
console.log('\nUsers in database:');
users.forEach(u => console.log(`- ${u.email} (${u.role})`));
