var nome = document.getElementById("nome")
var slug = document.getElementById("slug")
var  strength = document.getElementById("strength")
var intelligence = document.getElementById("intelligence")
var speed = document.getElementById("speed")
var durability = document.getElementById("durability")
var power = document.getElementById("power")
var combat = document.getElementById("combat")
var salvar = document.querySelector("form")

salvar.addEventListener('submit', function(e){
    e.preventDefault()
    let request = fetch('/heroi',{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome:nome.value,
            slug:slug.value,
            powerstats:{
            intelligence: intelligence.value,
            strength:strength.value,
            speed: speed.value,
            durability: durability.value,
            power: power.value,
            combat: combat.value
        }
        })
    })
    request.then(function (response) {
       if(response.status == 200){
           alert("heroi cadastrado com sucesso")
           clear()
       }
       
    })  
})

function clear(){
    nome.value = ""
    slug.value = ""
    intelligence.value = ""
    strength.value = ""
    speed.value = ""
    power.value = ""
    durability.value = ""
    combat.value = ""
}