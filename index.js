// backend/index.js
const express = require('express');
const app = express();
const db = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const accountRoutes = require('./routes/account.routes');

var cors = require('cors')

app.use(cors())

app.use(express.json());
app.get('/',(req, res)=>{
    res.send("Hello World!!!");
})
app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
