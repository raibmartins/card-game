const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get('/', function(req,res){
    res.sendFile(__dirname +'/index.html')
})

app.use(express.static('public/css'))



app.get('/jogar', function(req,res) {
    res.send('jogar');
})

app.get('/login', function(req,res) {
    res.sendFile(__dirname +'/login.html')
})
app.use('/formCadastro', function(req,res){
    
    console.log(req.body)
    if(req.body.name =='misael' && req.body.senha ==='123'){
        res.send('deubom')
    }else{
        res.send('usuário ou senha incorreto')
    }
})
app.listen(PORT, () => {
    console.log('run')
})