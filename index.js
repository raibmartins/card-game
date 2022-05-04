const express = require('express');
const getAtributeToUse = require('./public/js/getAtributeToUse');
const getCards = require('./public/js/getCards');
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
    }
})
    
app.use('/formCadastro', function(req,res){
    if(req.body.nome =='misael' && req.body.senha ==='123'){
        res.send('deubom')
    }else{
        res.statusCode = 200;
        console.log(req.query)
        res.sendFile(VIEW_PATH + '/login/formCadastro.html')
    }
})

app.get('/getCards', function(req, res) {
    getCards(req,res);
});

app.get('/twoPlayers', function(req, res) {
    res.sendFile(VIEW_PATH + '/game/jogar/1x1/1x1.html');
});

app.get('/coop', function(req,res) {
    res.sendFile(VIEW_PATH + '/game/jogar/coop/coop.html');
});

app.post('/getAtributeToUse', function(req,res) {
    getAtributeToUse(req,res);
})

app.post('/comparar', function(req, res) {
    var winner = {};
    var p1Card = req.body.p1Card;
    var p2Card = req.body.p2Card;
    var atributo = req.body.atributo;
    if (p1Card.poderes[atributo] > p2Card.poderes[atributo]) {
        winner = "player1";
    } else if (p1Card.poderes[atributo] < p2Card.poderes[atributo]){
        winner = "player2";
    } else {
        winner = 'empate';
    }
    res.statusCode = 200;
    res.json(winner)
});

app.use("/heroi", function(req, res){
     save.log(req.body)
     res.download('./heroi.json')

})

// app.use("/download", function(req,res){
//     res.download('./heroi.json')
// })

app.use(cors());
app.listen(PORT);