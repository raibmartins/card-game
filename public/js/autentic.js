const email = document.querySelector("#email")
const senha = document.querySelector("#senha")
const btnAutentic = document.querySelector("form")
btnAutentic.addEventListener('submit', function(e){
    e.preventDefault()
    let request = fetch('/cadastrar',{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            senha: senha.value
        })
    })
    request.then(function (response) {
        if(response.status==200){
           // console.log(response.url)
            window.location.href=response.url;
        }
       if(response.status==401) {
            alert("Usuário ou senha incorreto")
        }
    })  
})

