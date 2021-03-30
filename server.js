const express = require('express');
const cors = require('cors');
const router = require('./routes');
const db = require('./database');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', router.users);
app.use('/api/contacts', router.contacts);
app.use('/api/auth', router.auth);

db.connect().then((conn) => console.log('Mongo Connected'));
app.listen(PORT, () => console.log(`Server works on Port: ${PORT}`));
