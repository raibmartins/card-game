var fs = require('fs')
module.exports.log = salvar =(heroi)=>{
    let novo = JSON.stringify(heroi)
    if(fs.existsSync('heroi.json')){
        fs.appendFile('heroi.json',novo,(err)=>{
            if(err){
                console.log("erro");
            }else{
                console.log("Heroi salvo")
            }
        })
    }else{
        fs.writeFile('heroi.json',novo,(err)=>{
            if(err){
                console.log("erro");
            }else{
                console.log("Heroi salvo")
            }
        })
    }
    

}