const bcrypt = require('bcryptjs');
const fs = require('fs');

const passwords = {
  'admin123': bcrypt.hashSync('admin123', 10),
  'operator123': bcrypt.hashSync('operator123', 10),
  'kepaladesa123': bcrypt.hashSync('kepaladesa123', 10)
};

console.log(JSON.stringify(passwords, null, 2));
