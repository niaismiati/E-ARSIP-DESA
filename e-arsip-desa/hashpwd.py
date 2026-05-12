import bcrypt

passwords = {
    'admin123': bcrypt.hashpw(b'admin123', bcrypt.gensalt()).decode('utf-8'),
    'operator123': bcrypt.hashpw(b'operator123', bcrypt.gensalt()).decode('utf-8'),
    'kepaladesa123': bcrypt.hashpw(b'kepaladesa123', bcrypt.gensalt()).decode('utf-8')
}

for k, v in passwords.items():
    print(f"{k}: {v}")
