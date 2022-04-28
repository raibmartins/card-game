const express = require('express');
const app = express();
const PORT = 3000;
const VIEW_PATH = __dirname + '/views'

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public/css'));
app.use(express.static('public/js'));

app.get('/', function(req,res){
    res.sendFile(VIEW_PATH +'/index.html')
})

app.get('/choose', function(req,res) {
    res.sendFile(VIEW_PATH + '/game/game.html');
});

app.get('/login', function(req,res) {
    res.sendFile(VIEW_PATH+'/login/login.html')
});

app.use('/jogar', function(req, res) {
    console.log(res.body)
});

app.use('/formCadastro', function(req,res){
    if(req.body.name =='misael' && req.body.senha ==='123'){
        res.send('deubom')
    }else{
        res.send('usuário ou senha incorreto')
    }
});

app.listen(PORT);