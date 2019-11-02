const express = require('express');
const SERVER_PORT = 3000;

const app = express();

app.use(express.json())
app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} on station!`))

