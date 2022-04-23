const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function(req,res){
    res.sendFile(__dirname +'/index.html')
})

app.use(express.static('public/css'))

app.listen(PORT, () => {
    console.log('run')
})

app.get('/jogar', function(req,res) {
    res.send('jogar');
})

app.get('/login', function(req,res) {
    res.send('login')
})