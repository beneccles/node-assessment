const express = require('express');
const userCtrl = require('./usersCtrl')
const SERVER_PORT = 3000;

const app = express();

app.use(express.json())

app.get('/api/user', userCtrl.users)
app.get('/api/user/:userId', userCtrl.user)
app.get('/api/admin', userCtrl.admin)
app.get('/api/nonAdmin', userCtrl.nonAdmin)
app.get('/api/type/:userType', userCtrl.userType)
app.put('/api/user/:userId', userCtrl.userUpdate)
app.post('/api/user', userCtrl.newUser)
app.delete('/api/user/:userId', userCtrl.deleteUser)


app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} on station!`))

