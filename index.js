const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbolChars = '!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
const numberChars = '0123456789';

function generatePassword(length, options) {
  let chars = '';

  if (options.lowercase) {
    chars += lowercaseChars;
  }
  if (options.uppercase) {
    chars += uppercaseChars;
  }
  if (options.symbols) {
    chars += symbolChars;
  }
  if (options.numbers) {
    chars += numberChars;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/generate', (req, res) => {
  const options = {
    lowercase: req.body.lowercase === 'on',
    uppercase: req.body.uppercase === 'on',
    symbols: req.body.symbols === 'on',
    numbers: req.body.numbers === 'on',
  };
  const length = parseInt(req.body.length);

  const password = generatePassword(length, options);
  res.render('result', { password });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
