const fs = require('fs');
const path = require('path');

// Paths
const accountsPath = path.resolve('C:/Users/saiga/death-record-guardian-app/src/data/accounts.ts');
const loginDataPath = path.resolve(__dirname, '../data/logins.json');

// Helper to read login file as OBJECT
const readLogins = () => {
  try {
    const content = fs.readFileSync(loginDataPath, 'utf-8');
    return JSON.parse(content); // expected to be an object like { username: timestamp }
  } catch {
    return {};
  }
};

// Helper to write login file
const writeLogins = (data) => {
  fs.writeFileSync(loginDataPath, JSON.stringify(data, null, 2));
};

// GET all users (VAO + Admin)
const getVAOUsers = (req, res) => {
  try {
    const content = fs.readFileSync(accountsPath, 'utf-8');
    const matches = [...content.matchAll(/username:\s*["'](.+?)["']/g)];
    const usernames = matches.map(m => m[1]);

    const logins = readLogins();

    const vaoUsers = usernames.map(username => ({
      name: username,
      role: 'VAO',
      lastLogin: logins[username] || null,
    }));

    const adminUsernames = ['anita', 'krishnan'];
    const adminUsers = adminUsernames.map(username => ({
      name: username.charAt(0).toUpperCase() + username.slice(1),
      role: 'Admin',
      lastLogin: logins[username] || null,
    }));

    const allUsers = [...adminUsers, ...vaoUsers];

    res.json(allUsers);
  } catch (error) {
    console.error('Error reading VAO accounts:', error);
    res.status(500).json({ error: 'Failed to read accounts' });
  }
};

// POST login (Admin or VAO)
const logLogin = (req, res) => {
  const { username, role } = req.body;
  const timestamp = new Date().toISOString();
  const logins = readLogins();

  logins[username] = timestamp;

  writeLogins(logins);
  res.json({ message: 'Login time updated', user: { username, role, lastLogin: timestamp } });
};

// GET login timestamps as simple object
const getUserLogins = (req, res) => {
  const logins = readLogins();
  res.json(logins);
};

module.exports = { getVAOUsers, logLogin, getUserLogins };
