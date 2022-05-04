const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3000;
const VIEW_PATH = __dirname + '/views'
const save = require('./Save')
var logado;
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('public/image'));
//app.use('/download',express.static('./heroi.json'));

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

app.post('/cadastrar', function(req,res){
    if(req.body.email =='misael@unesc.net' && req.body.senha =='123'){
        res.statusCode = 200;
         logado = true
        res.redirect('/formCadastrar')
    }else{
        res.statusCode = 401
        res.json("Usuário ou senha incorretos")
    }
});

app.use("/formCadastrar", function(req, res) {
    if (!logado){
        res.sendFile(VIEW_PATH+'/login/login.html')
    }else{
        res.statusCode = 200;
        console.log(req.query)
        res.sendFile(VIEW_PATH + '/login/formCadastro.html')
    }    
})

app.use("/heroi", function(req, res){ 
     save.log(req.body)
     res.download('./heroi.json')
   
})

// app.use("/download", function(req,res){
//     res.download('./heroi.json')
// })

app.use(cors())
app.listen(PORT);   